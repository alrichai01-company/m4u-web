import { NextResponse } from "next/server";
import { addPageView } from "@/lib/db";

/**
 * POST /api/track — records a single pageview for the admin dashboard.
 *
 * Deliberately minimal: { path, sessionId }. No cookies, no fingerprinting,
 * no third-party script — the sessionId is a random value generated
 * client-side and kept in sessionStorage for the life of the tab. Admin and
 * API paths are ignored server-side as a second line of defence.
 */
export async function POST(request: Request) {
  let body: { path?: string; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const path = body.path?.trim();
  const sessionId = body.sessionId?.trim();

  if (!path || !sessionId || path.length > 200 || sessionId.length > 64) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  // Never count admin or API traffic.
  if (path.startsWith("/admin") || path.startsWith("/api")) {
    return NextResponse.json({ success: true });
  }

  addPageView({ path, sessionId });
  return NextResponse.json({ success: true });
}
