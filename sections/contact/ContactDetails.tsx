import { Eyebrow, Reveal, phClass, PlaceholderInner } from "@/components/ui";
import { ContactForm } from "./ContactForm";
import { channels, siteConfig } from "@/config/site";
import { useLang } from "@/context/lang";

export function ContactDetails() {
  const { t } = useLang();
  return (
    <section className="section" style={{ paddingTop: "3rem" }}>
      <div className="wrap">
        <div className="contact-split">
          <Reveal className="contact-media">
            <figure className={phClass("dark")}>
              <PlaceholderInner
                tag="Office / Studio Imagery"
                src="/images/company/design-room.jpg"
                alt="The M4U design studio, Ahmedabad"
              />
            </figure>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="d3" style={{ marginBottom: "2rem" }}>
              {t.contactFormHeading}
            </h2>
            <ContactForm />

            <div className="contact-actions">
              <a className="pill" href={channels.whatsapp} target="_blank" rel="noopener noreferrer">
                {t.contactWhatsApp}
              </a>
              <a className="pill" href={channels.phone}>
                {t.contactCallUs}
              </a>
              <a className="pill" href={channels.instagram} target="_blank" rel="noopener noreferrer">
                {t.contactInstagram}
              </a>
            </div>
          </Reveal>
        </div>

        <div style={{ marginTop: "4rem" }}>
          <Eyebrow>{t.contactVisitEyebrow}</Eyebrow>
          <p className="lead">
            {siteConfig.legalName} · {siteConfig.city}, {siteConfig.region},{" "}
            {siteConfig.country}
          </p>
          <div className="map">
            <iframe
              title="M4U location map"
              loading="lazy"
              src={channels.mapEmbed}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
