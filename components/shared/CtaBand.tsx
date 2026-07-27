import { Button, Eyebrow, Reveal } from "@/components/ui";
import type { ReactNode } from "react";

interface CtaBandProps {
  eyebrow?: string;
  heading: ReactNode;
  body?: string;
  cta: { label: string; href: string; arrow?: boolean };
  size?: "d2" | "d3";
}

/**
 * The recurring dark call-to-action band. Reused verbatim across home, about,
 * collections and order pages so the closing beat of every page is consistent.
 */
export function CtaBand({
  eyebrow,
  heading,
  body,
  cta,
  size = "d2",
}: CtaBandProps) {
  return (
    <section className="section cta-band">
      <div className="wrap">
        <Reveal>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className={size}>{heading}</h2>
          {body && <p>{body}</p>}
          <Button href={cta.href} variant="light" arrow={cta.arrow} magnetic>
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
