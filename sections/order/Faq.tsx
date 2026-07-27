"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeader } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { useLang } from "@/context/lang";
import { cn } from "@/lib/cn";
import { DURATION, EASE_LUXE } from "@/styles/motion";

// motion's Easing type expects a mutable bezier tuple.
const easeLuxe: [number, number, number, number] = [...EASE_LUXE];

/**
 * Accordion FAQ. One panel open at a time, with an accessible toggle.
 *
 * This is the first component to adopt `motion/react` (see HANDOFF §5) —
 * the open/close height animation uses the shared timing tokens so it stays
 * in step with every CSS transition on the site, and collapses to an
 * instant toggle under prefers-reduced-motion.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const { t } = useLang();

  const faqItems = [
    { question: t.faq1Q, answer: t.faq1A },
    { question: t.faq2Q, answer: t.faq2A },
    { question: t.faq3Q, answer: t.faq3A },
    { question: t.faq4Q, answer: t.faq4A },
    { question: t.faq5Q, answer: t.faq5A },
    { question: t.faq6Q, answer: t.faq6A },
  ];

  const transition = reduced
    ? { duration: 0 }
    : { duration: DURATION.base, ease: easeLuxe };

  return (
    <section className="section" style={{ background: "var(--ivory)" }}>
      <div className="wrap">
        <SectionHeader eyebrow={t.faqEyebrow} centered>
          {t.faqHeading1} <span className="it">{t.faqHeading2}</span>
        </SectionHeader>

        <div className="faq">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className={cn("faq-item", isOpen && "open")}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.question}
                  <span className="pl" aria-hidden>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-a"
                      style={{ maxHeight: "none" }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
