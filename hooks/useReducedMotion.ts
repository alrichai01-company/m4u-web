"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's reduced-motion preference reactively. All motion in the app
 * should gate on this so the reduced-motion contract is honoured everywhere.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
