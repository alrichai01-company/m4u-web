import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Simple admin auth — validates against ADMIN_PASSWORD env var.
 * Uses a signed session cookie for persistence.
 */

const SESSION_COOKIE = "m4u-admin-session";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "m4u-dev-secret-change-me";

function sign(value: string): string {
  const hmac = crypto.createHmac("sha256", SESSION_SECRET);
  hmac.update(value);
  return `${value}.${hmac.digest("hex")}`;
}

function verify(signed: string): string | null {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  if (sign(value) === signed) return value;
  return null;
}

export async function createSession(): Promise<void> {
  const token = sign(Date.now().toString());
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const cookie = jar.get(SESSION_COOKIE);
  if (!cookie?.value) return false;
  return verify(cookie.value) !== null;
}

export function validatePassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD ?? "m4u-admin-2026";
  return password === adminPassword;
}
