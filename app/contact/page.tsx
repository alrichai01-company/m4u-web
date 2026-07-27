"use client";

import { PageHero } from "@/components/shared";
import { ContactDetails } from "@/sections/contact";
import { useLang } from "@/context/lang";

export default function ContactPage() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        eyebrow={t.contactPageEyebrow}
        heading={
          <>
            {t.contactPageHeading1}
            <br />
            <span className="it">{t.contactPageHeading2}</span>
          </>
        }
      />
      <ContactDetails />
    </>
  );
}
