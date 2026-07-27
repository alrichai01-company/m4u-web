import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  /** Heading content — pass JSX to control line breaks / italic accents. */
  children: ReactNode;
  /** Display size. Defaults to d2. */
  size?: "d2" | "d3";
  className?: string;
  /** Center the header (used in CTA bands / FAQ intro). */
  centered?: boolean;
}

/**
 * The recurring editorial header: an eyebrow above a display heading, wrapped
 * in a reveal. Keeps every section's headline block rhythm identical.
 */
export function SectionHeader({
  eyebrow,
  children,
  size = "d2",
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <Eyebrow className={centered ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={size}>{children}</h2>
    </Reveal>
  );
}
