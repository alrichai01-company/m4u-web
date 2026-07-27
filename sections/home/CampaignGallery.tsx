"use client";

import { SectionHeader, Reveal, phClass, PlaceholderInner } from "@/components/ui";
import { useLightbox, type LightboxItem } from "@/components/shared";
import { campaignMedia } from "@/content/home";
import { cn } from "@/lib/cn";
import { useLang } from "@/context/lang";

export function CampaignGallery() {
  const { open } = useLightbox();
  const { t } = useLang();

  const items: LightboxItem[] = campaignMedia.map((m) => ({
    caption: m.label,
    tone: m.tone ?? "default",
    src: m.src,
  }));

  return (
    <section className="section bg-ivory">
      <div className="wrap">
        <SectionHeader eyebrow={t.campaignEyebrow}>
          {t.campaignHeading1}
          <br />
          <span className="it">{t.campaignHeading2}</span>
        </SectionHeader>

        <Reveal delay={1} className="campaign">
          {campaignMedia.map((m, i) => (
            <figure
              key={m.label}
              className={phClass(m.tone, cn(m.span, m.off && "off"))}
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
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
