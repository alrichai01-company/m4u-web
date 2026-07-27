import type { Metadata } from "next";
import { PageHero } from "@/components/shared";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for wholesale orders with M4U by Makhija Trendz.",
};

/**
 * /terms-and-conditions — legal page.
 *
 * Same pattern as privacy-policy. Template copy pending legal review.
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading={
          <>
            Terms &amp; <span className="it">Conditions.</span>
          </>
        }
      />
      <section style={{ paddingTop: "3rem" }}>
        <div className="wrap legal">
          {termsAndConditions.sections.map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              {"body" in section && <p>{section.body}</p>}
              {"list" in section && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p
            style={{
              marginTop: "2rem",
              color: "var(--taupe)",
              fontSize: ".85rem",
            }}
          >
            Last updated: {termsAndConditions.updated}. This is template copy —
            have it reviewed by your legal advisor before publishing.
          </p>
        </div>
      </section>
    </>
  );
}
