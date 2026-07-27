"use client";

import { PageHero } from "@/components/shared";
import { CtaBand } from "@/components/shared";
import { Story, Timeline, Process } from "@/sections/about";
import { useLang } from "@/context/lang";

export default function AboutPage() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={t.aboutPageEyebrow}
        heading={
          <>
            {t.aboutPageHeading1}
            <br />
            <span className="it">{t.aboutPageHeading2}</span>
          </>
        }
        thread
      />
      <Story />
      <Timeline />
      <Process />
      <CtaBand
        heading={
          <>
            {t.aboutCtaHeading1} <span className="it gold">{t.aboutCtaHeading2}</span>
          </>
        }
        body={t.aboutCtaBody}
        cta={{ label: t.aboutCtaBtn, href: "/contact" }}
      />
    </>
  );
}
