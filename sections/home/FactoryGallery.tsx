"use client";

import { SectionHeader, Reveal, phClass, PlaceholderInner } from "@/components/ui";
import { useLightbox, type LightboxItem } from "@/components/shared";
import { factoryMedia } from "@/content/home";
import { useLang } from "@/context/lang";

/**
 * The factory experience, art-directed toward hands and craft. Each tile opens
 * the shared lightbox across the full set. The bento layout is preserved via
 * the a–f grid-area classes.
 */
export function FactoryGallery() {
  const { open } = useLightbox();
  const { t } = useLang();

  const items: LightboxItem[] = factoryMedia.map((m) => ({
    caption: m.label,
    tone: m.tone ?? "default",
    src: m.src,
  }));

  return (
    <section className="section bg-ivory">
      <div className="wrap">
        <SectionHeader eyebrow={t.factoryEyebrow}>
          {t.factoryHeading1}
          <br />
          <span className="it">{t.factoryHeading2}</span>
        </SectionHeader>

        <Reveal delay={1} as="div" className="fgrid">
          {factoryMedia.map((m, i) => (
            <figure
              key={m.label}
              className={phClass(m.tone, m.area)}
              onClick={() => open(items, i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${m.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(items, i);
                }
              }}
            >
              <PlaceholderInner tag={m.tag ?? m.label} src={m.src} alt={m.label} />
              <figcaption>{m.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
