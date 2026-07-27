"use client";

import { PageHero, CtaBand } from "@/components/shared";
import { OrderSteps, Faq } from "@/sections/order";
import { Reveal, SectionHeader } from "@/components/ui";
import { useLang } from "@/context/lang";

export default function HowToOrderPage() {
  const { t } = useLang();

  const partnerBenefits = [
    { title: t.partner1Title, body: t.partner1Body },
    { title: t.partner2Title, body: t.partner2Body },
    { title: t.partner3Title, body: t.partner3Body },
    { title: t.partner4Title, body: t.partner4Body },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.orderPageEyebrow}
        heading={
          <>
            {t.orderPageHeading1}
            <br />
            <span className="it">{t.orderPageHeading2}</span>
          </>
        }
        lead={t.orderPageLead}
      />
      <OrderSteps />
      <Faq />

      {/* ── Become a Partner ── */}
      <section id="partner" className="section" style={{ background: "var(--ivory)" }}>
        <div className="wrap">
          <SectionHeader eyebrow={t.partnerEyebrow}>
            {t.partnerHeading1}
            <br />
            <span className="it">{t.partnerHeading2}</span>
          </SectionHeader>

          <div className="steps">
            {partnerBenefits.map((b, i) => (
              <Reveal key={b.title} className="step">
                <div className="idx">{i + 1}</div>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={
          <>
            {t.orderCtaHeading1} <span className="it gold">{t.orderCtaHeading2}</span>
          </>
        }
        body={t.orderCtaBody}
        cta={{ label: t.orderCtaBtn, href: "/contact", arrow: true }}
      />
    </>
  );
}
