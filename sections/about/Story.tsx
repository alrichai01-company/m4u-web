import { Eyebrow, Reveal, phClass, PlaceholderInner } from "@/components/ui";
import { useLang } from "@/context/lang";

export function Story() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="wrap grid2">
        <Reveal>
          <Eyebrow>{t.aboutStoryEyebrow}</Eyebrow>
          <h2 className="d3">{t.aboutStoryHeading}</h2>
          <p className="lead" style={{ marginTop: "1.4rem" }}>
            {t.aboutStoryBody}
          </p>
        </Reveal>
        <Reveal delay={1}>
          <figure className={phClass("dark")} style={{ aspectRatio: "4 / 5" }}>
            <PlaceholderInner
              tag="Factory Photography"
              src="/images/company/storefront.jpg"
              alt="The M4U by Makhija Trendz storefront, Ahmedabad"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
