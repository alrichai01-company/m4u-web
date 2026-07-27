import { SectionHeader, Reveal } from "@/components/ui";
import { useLang } from "@/context/lang";

export function Timeline() {
  const { t } = useLang();

  const entries = [
    { period: t.timeline1Period, title: t.timeline1Title, body: t.timeline1Body },
    { period: t.timeline2Period, title: t.timeline2Title, body: t.timeline2Body },
    { period: t.timeline3Period, title: t.timeline3Title, body: t.timeline3Body },
    { period: t.timeline4Period, title: t.timeline4Title, body: t.timeline4Body },
  ];

  return (
    <section className="section" style={{ background: "var(--ivory)" }}>
      <div className="wrap">
        <SectionHeader eyebrow={t.aboutTimelineEyebrow}>
          {t.aboutTimelineHeading1} <span className="it">{t.aboutTimelineHeading2}</span>
        </SectionHeader>

        <div className="timeline">
          {entries.map((entry) => (
            <Reveal key={entry.title} className="t-item">
              <span className="yr">{entry.period}</span>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
