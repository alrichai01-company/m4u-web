import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/schemas/inquiry";
import { addInquiry } from "@/lib/db";

/**
 * Rate-limit store. In-memory for simplicity — resets on server restart.
 * For production at scale, swap for Redis (Upstash) or Vercel KV.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW = 60 * 1000; // per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

/** Escape user strings before interpolating into email HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** One table row per field, only when the value is present. */
function row(label: string, value?: string): string {
  if (!value) return "";
  return `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">${esc(
    label,
  )}</td><td style="padding:8px;border-bottom:1px solid #eee;">${esc(value)}</td></tr>`;
}

/**
 * POST /api/inquiry
 *
 * Accepts a wholesale inquiry, validates against the shared Zod schema,
 * checks the honeypot, rate-limits, stores it for the dashboard, and sends a
 * notification email via Resend. Falls back to console logging if Resend
 * isn't configured.
 */
export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = inquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = result.data;

  // --- Honeypot check ---
  if (data.website) {
    return NextResponse.json({ success: true });
  }

  // --- Store inquiry for the dashboard ---
  // Maps the detailed form onto the (extended) Inquiry record. `name` and
  // `businessType` keep the dashboard's existing columns populated.
  addInquiry({
    name: data.contactName,
    email: data.email,
    mobile: data.mobile1,
    mobile2: data.mobile2 || undefined,
    company: data.agencyName,
    businessType: data.businessCategory,
    city: data.city,
    state: data.state,
    address: data.address,
    pinCode: data.pinCode,
    gstin: data.gstin,
    aadhaarPan: data.aadhaarPan,
    agencyName: data.agencyName,
    agencyContactName: data.agencyContactName,
    agencyContactNumber: data.agencyContactNumber,
    message: data.message || undefined,
  });

  // --- Send email via Resend ---
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@makhijatrendz.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "M4U Inquiry <onboarding@resend.dev>";

  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Wholesale Inquiry — ${esc(data.contactName)}`,
        html: `
          <h2>New Wholesale Inquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:640px;">
            ${row("Business Category", data.businessCategory)}
            ${row("GSTIN", data.gstin)}
            ${row("Aadhaar / PAN", data.aadhaarPan)}
            ${row("Address", data.address)}
            ${row("City", data.city)}
            ${row("State", data.state)}
            ${row("PIN Code", data.pinCode)}
            ${row("Contact Person", data.contactName)}
            ${row("Mobile 1", data.mobile1)}
            ${row("Mobile 2", data.mobile2)}
            ${row("Email", data.email)}
            ${row("Agency / Adat Name", data.agencyName)}
            ${row("Agency Contact Person", data.agencyContactName)}
            ${row("Agency Contact Number", data.agencyContactNumber)}
            ${data.message ? row("Message", data.message) : ""}
          </table>
        `,
      });
    } catch (err) {
      console.error("Resend email failed:", err);
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again or contact us directly." },
        { status: 500 },
      );
    }
  } else {
    console.log("📩 Inquiry received (no RESEND_API_KEY set):", {
      contactName: data.contactName,
      email: data.email,
      mobile1: data.mobile1,
      businessCategory: data.businessCategory,
      gstin: data.gstin,
    });
  }

  return NextResponse.json({ success: true });
}
