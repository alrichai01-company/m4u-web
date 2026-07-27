"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { formatIndianNumber } from "@/utils/format";

interface UseCountUpOptions {
  /** Target value to count to. */
  to: number;
  /** Whether the count should run (typically tied to in-view state). */
  active: boolean;
  /** Duration in ms. */
  duration?: number;
}

/**
 * Counts up to a target using an eased curve (quartic ease-out), matching the
 * approved stats animation. Skips straight to the target under reduced motion.
 */
export function useCountUp({
  to,
  active,
  duration = 1800,
}: UseCountUpOptions): string {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (reduced) {
      setDisplay(formatIndianNumber(to));
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(formatIndianNumber(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration, reduced]);

  return display;
}
