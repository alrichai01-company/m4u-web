"use client";

import {
  Hero,
  Standard,
  FactoryGallery,
  CollectionGrid,
  CampaignGallery,
  WhyGrid,
} from "@/sections/home";
import { CtaBand } from "@/components/shared";
import { useLang } from "@/context/lang";

export default function HomePage() {
  const { t } = useLang();
  return (
    <>
      <Hero />
      <Standard />
      <CollectionGrid />
      <WhyGrid />
      <FactoryGallery />
      <CampaignGallery />
      <CtaBand
        eyebrow={t.homeCtaEyebrow}
        heading={
          <>
            {t.homeCtaHeading1}
            <br />
            <span className="it gold">{t.homeCtaHeading2}</span>
          </>
        }
        body={t.homeCtaBody}
        cta={{ label: t.homeCtaBtn, href: "/contact", arrow: true }}
      />
    </>
  );
}
