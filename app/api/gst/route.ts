import { NextResponse } from "next/server";
import { GSTIN_REGEX } from "@/lib/schemas/inquiry";

/**
 * Normalized shape returned to the client. Every field is optional — the
 * form fills in whatever the provider could supply and leaves the rest for
 * the user to complete.
 */
interface GstDetails {
  legalName?: string;
  tradeName?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  businessCategory?: "Retail" | "Wholesale" | "Malls" | "Corporate";
  status?: string;
}

/**
 * Maps the provider's "nature of business" / constitution text to one of the
 * form's four business categories, best-effort. Anything unrecognized is left
 * blank so the user picks it themselves.
 */
function mapCategory(natureText: string): GstDetails["businessCategory"] | undefined {
  const t = natureText.toLowerCase();
  if (t.includes("retail")) return "Retail";
  if (t.includes("wholesale") || t.includes("whole sale")) return "Wholesale";
  // "Malls" and "Corporate" have no direct GST equivalent; left for the user.
  return undefined;
}

/**
 * Extracts a 6-digit PIN code from a free-text address, if present.
 */
function extractPin(address: string): string | undefined {
  const m = address.match(/\b[1-9][0-9]{5}\b/);
  return m ? m[0] : undefined;
}

/**
 * Normalizes the gstincheck.co.in response into our GstDetails shape.
 *
 * ── TO SWITCH GST PROVIDERS ──────────────────────────────────────────────
 * If you move to a different provider (Sandbox, Cashfree, Attestr, etc.),
 * this is the ONLY function you need to rewrite — map that provider's JSON
 * fields onto the GstDetails shape below. The rest of the route, and the
 * entire form, stay exactly the same.
 * ─────────────────────────────────────────────────────────────────────────
 */
function normalizeGstinCheck(json: unknown): GstDetails | null {
  const root = json as {
    flag?: boolean;
    data?: {
      lgnm?: string;
      tradeNam?: string;
      sts?: string;
      ctb?: string;
      nba?: string[];
      pradr?: {
        addr?: {
          bnm?: string;
          st?: string;
          loc?: string;
          city?: string;
          dst?: string;
          stcd?: string;
          pncd?: string;
          bno?: string;
          flno?: string;
        };
        adr?: string;
      };
    };
  };

  if (!root || root.flag === false || !root.data) return null;
  const d = root.data;
  const addr = d.pradr?.addr;

  // Build a single-line address from whichever parts the provider returned.
  const addressLine =
    d.pradr?.adr ||
    [addr?.flno, addr?.bno, addr?.bnm, addr?.st, addr?.loc]
      .filter(Boolean)
      .join(", ") ||
    undefined;

  const natureText = (d.nba ?? []).join(" ") + " " + (d.ctb ?? "");

  return {
    legalName: d.lgnm || undefined,
    tradeName: d.tradeNam || undefined,
    status: d.sts || undefined,
    address: addressLine,
    city: addr?.city || addr?.dst || addr?.loc || undefined,
    state: addr?.stcd || undefined,
    pinCode: addr?.pncd || (addressLine ? extractPin(addressLine) : undefined),
    businessCategory: mapCategory(natureText),
  };
}

/**
 * GET /api/gst?gstin=XXXXXXXXXXXXXXX
 *
 * Looks up a GSTIN via the configured provider and returns normalized
 * details for auto-filling the contact form. The provider key
 * (GST_API_KEY) stays server-side and is never exposed to the browser.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gstin = (searchParams.get("gstin") ?? "").trim().toUpperCase();

  if (!GSTIN_REGEX.test(gstin)) {
    return NextResponse.json(
      { error: "Please enter a valid 15-character GSTIN." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GST_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GST lookup is not configured on the server." },
      { status: 503 },
    );
  }

  try {
    const url = `https://sheet.gstincheck.co.in/check/${apiKey}/${gstin}`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(20_000),
    });
    const stdout = await response.text();

    let json: unknown;
    try {
      json = JSON.parse(stdout);
    } catch {
      console.error("GST API returned non-JSON:", stdout.slice(0, 300));
      return NextResponse.json(
        { error: "Could not read GST details right now. Please fill the form manually." },
        { status: 502 },
      );
    }

    const details = normalizeGstinCheck(json);
    if (!details) {
      return NextResponse.json(
        { error: "No details found for this GSTIN. Please check the number or fill the form manually." },
        { status: 404 },
      );
    }

    return NextResponse.json({ details });
  } catch (err) {
    console.error("GST lookup error:", err);
    return NextResponse.json(
      { error: "GST lookup failed. Please fill the form manually." },
      { status: 500 },
    );
  }
}
