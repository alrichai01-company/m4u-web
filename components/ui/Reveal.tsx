"use client";

import { cn } from "@/lib/cn";
import { useReveal } from "@/hooks";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay slot (1–4), mapping to the approved .d1–.d4 classes. */
  delay?: 1 | 2 | 3 | 4;
  /** Render as a different element (default div). */
  as?: ElementType;
  className?: string;
  once?: boolean;
}

/**
 * Wraps content in the approved reveal (opacity + short Y translate on scroll).
 * This is the default way sections animate in — cheap, CSS-driven, reduced-
 * motion safe. Reach for Motion only when a component needs real orchestration.
 */
export function Reveal({
  children,
  delay,
  as: Tag = "div",
  className,
  once = true,
}: RevealProps) {
  const { ref } = useReveal<HTMLElement>({ once });
  const delayClass = delay ? `d${delay}` : undefined;

  return (
    <Tag ref={ref} className={cn("rv", delayClass, className)}>
      {children}
    </Tag>
  );
}
