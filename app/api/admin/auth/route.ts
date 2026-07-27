import { NextResponse } from "next/server";
import { createSession, destroySession, validatePassword } from "@/lib/auth";

/**
 * POST /api/admin/auth — login
 * DELETE /api/admin/auth — logout
 */
export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 },
      );
    }

    await createSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  await destroySession();
  return NextResponse.json({ success: true });
}
