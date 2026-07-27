"use client";

import { PageHero } from "@/components/shared";
import { CtaBand } from "@/components/shared";
import { CollectionPortfolio } from "@/sections/collections";
import { Suspense } from "react";
import { useLang } from "@/context/lang";

export default function CollectionsPage() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={t.collectionsPageEyebrow}
        heading={
          <>
            {t.collectionsPageHeading1} <span className="it">{t.collectionsPageHeading2}</span>
          </>
        }
        lead={t.collectionsPageLead}
      />
      <Suspense>
        <CollectionPortfolio />
      </Suspense>
      <CtaBand
        heading={
          <>
            {t.collectionsCtaHeading1}{" "}
            <span className="it gold">{t.collectionsCtaHeading2}</span>
          </>
        }
        body={t.collectionsCtaBody}
        cta={{ label: t.collectionsCtaBtn, href: "/contact" }}
        size="d3"
      />
    </>
  );
}
