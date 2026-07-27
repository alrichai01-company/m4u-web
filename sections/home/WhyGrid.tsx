import { SectionHeader, Reveal } from "@/components/ui";
import { useLang } from "@/context/lang";

export function WhyGrid() {
  const { t } = useLang();

  const cards = [
    { index: "i.", title: t.why1Title, body: t.why1Body },
    { index: "ii.", title: t.why2Title, body: t.why2Body },
    { index: "iii.", title: t.why3Title, body: t.why3Body },
    { index: "iv.", title: t.why4Title, body: t.why4Body },
    { index: "v.", title: t.why5Title, body: t.why5Body },
    { index: "vi.", title: t.why6Title, body: t.why6Body },
    { index: "vii.", title: t.why7Title, body: t.why7Body },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <SectionHeader eyebrow={t.whyEyebrow}>
          {t.whyHeading1}
          <br />
          <span className="it">{t.whyHeading2}</span>
        </SectionHeader>

        <Reveal delay={1} className="why">
          {cards.map((card) => (
            <div className="card" key={card.title}>
              <div className="num">{card.index}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
