"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Subtle magnetic pull for CTAs. Deliberately gentle (per the Phase-1 review:
 * .12 / .18 pull factors) and gated to fine pointers so it never produces a
 * stuck transform on touch devices. Returns a ref to attach to the element.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const fine = window.matchMedia(
      "(hover:hover) and (pointer:fine)",
    ).matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.12;
      const y = (e.clientY - r.top - r.height / 2) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      reset();
    };
  }, [reduced]);

  return ref;
}
