import { Eyebrow, GoldThread } from "@/components/ui";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  heading: ReactNode;
  lead?: string;
  thread?: boolean;
}

/**
 * The interior-page header. Renders immediately visible (not scroll-gated), so
 * the reveal classes carry `inview` from the start and the gold thread draws on
 * load where present.
 */
export function PageHero({ eyebrow, heading, lead, thread }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="wrap rv inview">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="d1">{heading}</h1>
        {lead && (
          <p className="lead" style={{ marginTop: "1.2rem" }}>
            {lead}
          </p>
        )}
        {thread && <GoldThread drawn />}
      </div>
    </section>
  );
}
