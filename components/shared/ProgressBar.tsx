"use client";

import { useScrollProgress } from "@/hooks";

/** Thin gold scroll-progress bar pinned to the top of the viewport. */
export function ProgressBar() {
  const progress = useScrollProgress();
  return (
    <div id="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />
  );
}
