"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { generateId } from "@/lib/id";

const SESSION_KEY = "m4u-session";

/**
 * Fires a lightweight pageview beacon to /api/track on every route change.
 *
 * Renders nothing. The session id is a random value scoped to the tab
 * (sessionStorage) — enough for the dashboard's unique-visitor counts
 * without cookies or third-party analytics. Admin routes are skipped.
 */
function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = generateId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // Storage unavailable (privacy mode) — fall back to a per-load id.
    return generateId();
  }
}

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const payload = JSON.stringify({ path: pathname, sessionId: getSessionId() });
    // sendBeacon survives navigation; fetch keepalive is the fallback.
    try {
      if (!navigator.sendBeacon?.("/api/track", new Blob([payload], { type: "application/json" }))) {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Tracking must never break the page.
    }
  }, [pathname]);

  return null;
}
