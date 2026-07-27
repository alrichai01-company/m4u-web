/**
 * Safe random-id generator.
 *
 * `crypto.randomUUID()` only exists in a "secure context" — HTTPS, or
 * `http://localhost` specifically. It's undefined on any other plain-HTTP
 * origin, including LAN addresses like `http://192.168.x.x:3000` (used when
 * testing from a phone on the same network) or a raw production IP without
 * TLS yet. Session ids don't need cryptographic randomness — this falls
 * back to Math.random()-based generation so tracking/session code never
 * crashes the page regardless of how it's accessed.
 */
export function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // RFC4122-ish v4 fallback — good enough for a session-scoped id.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
