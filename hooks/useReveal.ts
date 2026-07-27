"use client";

import { useEffect, useRef, useState } from "react";
import { REVEAL } from "@/styles/motion";

interface UseRevealOptions {
  /** Viewport intersection ratio that triggers the reveal. */
  amount?: number;
  /** Reveal only once (default) or every time it enters view. */
  once?: boolean;
}

/**
 * Adds the `inview` class to an element when it scrolls into view, reproducing
 * the approved CSS reveal (opacity + short Y translate) without pulling motion
 * work onto the main thread. This is the workhorse for editorial section
 * reveals; use Motion variants only where component-level orchestration is
 * genuinely needed.
 *
 * Returns a ref to attach and the current in-view state (handy for counters).
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  amount = REVEAL.amount,
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("inview");
            setInView(true);
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("inview");
            setInView(false);
          }
        });
      },
      { threshold: amount },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount, once]);

  return { ref, inView };
}
