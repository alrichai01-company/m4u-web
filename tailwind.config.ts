import type { Config } from "tailwindcss";

/**
 * Tailwind is used for layout utilities only. Every brand value points at a
 * CSS variable defined in styles/tokens.css, so the approved visual identity
 * is the single source of truth and can never drift from a hardcoded hex here.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ivory: "var(--ivory)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        gold: "var(--gold)",
        "gold-deep": "var(--gold-deep)",
        beige: "var(--beige)",
        taupe: "var(--taupe)",
        line: "var(--line)",
      },
      fontFamily: {
        serif: "var(--serif)",
        sans: "var(--sans)",
      },
      boxShadow: {
        luxe: "var(--shadow)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(.22,1,.36,1)",
      },
      maxWidth: {
        measure: "var(--measure)",
        wrap: "1320px",
      },
    },
  },
  plugins: [],
};

export default config;
