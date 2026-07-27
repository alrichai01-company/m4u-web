import { cn } from "@/lib/cn";

interface GoldThreadProps {
  /**
   * When true, forces the drawn state (used on interior page heroes that are
   * visible immediately). On scroll-revealed sections the parent `.inview`
   * class drives the draw instead.
   */
  drawn?: boolean;
  className?: string;
}

/**
 * The gold thread — the site's signature animation (thread → textile). A single
 * stroked path that draws itself over 2.2s. Intentionally the one flourish;
 * everything around it stays quiet.
 */
export function GoldThread({ drawn = false, className }: GoldThreadProps) {
  return (
    <svg
      className={cn("thread", drawn && "drawn", className)}
      viewBox="0 0 320 14"
      aria-hidden
    >
      <path d="M2 8 C 30 2, 50 12, 80 8 S 130 2, 160 8 S 210 14, 240 8 S 300 2, 318 8" />
    </svg>
  );
}
