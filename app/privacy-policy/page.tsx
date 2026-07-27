import type { Metadata } from "next";
import { PageHero } from "@/components/shared";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for M4U by Makhija Trendz — how we collect, use and protect your information.",
};

/**
 * /privacy-policy — legal page.
 *
 * Renders structured content from `content/legal.ts` using the `.legal` class
 * from globals.css. Template copy pending legal review.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading={
          <>
            Privacy <span className="it">Policy.</span>
          </>
        }
      />
      <section style={{ paddingTop: "3rem" }}>
        <div className="wrap legal">
          <p>{privacyPolicy.intro}</p>
          {privacyPolicy.sections.map((section) => (
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
            Last updated: {privacyPolicy.updated}. This is template copy — have
            it reviewed for your jurisdiction before publishing.
          </p>
        </div>
      </section>
    </>
  );
}
