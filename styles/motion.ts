/**
 * Motion tokens.
 *
 * These mirror the timing/easing values in styles/tokens.css so that
 * JS-driven animation (Motion, GSAP) stays perfectly in step with the CSS
 * transitions. If you change a duration here, change its CSS counterpart too.
 *
 * The philosophy is deliberate restraint: luxury motion is slow, confident,
 * and travels a short distance. Reveal travel is intentionally small (32px)
 * over a long duration — slower-per-pixel reads as more expensive.
 */

/** The signature easing curve used across the entire site. */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  /** Micro-interactions: hover, focus, small state changes. */
  fast: 0.4,
  /** Standard component transitions. */
  base: 0.6,
  /** Editorial reveals — the default for scroll-in content. */
  reveal: 1.2,
  /** Slow, cinematic moments (loader hand-off, page cover). */
  slow: 2,
} as const;

export const REVEAL = {
  /** Vertical travel for scroll-in reveals. Kept short on purpose. */
  distance: 32,
  /** Stagger between sequential children. */
  stagger: 0.07,
  /** Viewport threshold at which a reveal fires. */
  amount: 0.16,
} as const;

/** Standard Motion variants for a masked/offset reveal. */
export const revealVariants = {
  hidden: { opacity: 0, y: REVEAL.distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE_LUXE },
  },
} as const;

/** Container variant that staggers its children on reveal. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: REVEAL.stagger },
  },
} as const;
