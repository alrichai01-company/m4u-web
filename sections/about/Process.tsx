import { SectionHeader, phClass, PlaceholderInner, Reveal } from "@/components/ui";
import { useLang } from "@/context/lang";

export function Process() {
  const { t } = useLang();

  const steps = [
    { title: t.process1Title, tag: t.process1Tag, body: t.process1Body, tone: "default" as const, src: "/images/company/fabric-sourcing.jpg" },
    { title: t.process2Title, tag: t.process2Tag, body: t.process2Body, tone: "rose" as const, src: "/images/company/design-room.jpg" },
    { title: t.process3Title, tag: t.process3Tag, body: t.process3Body, tone: "dark" as const, src: "/images/company/fabric-cutting.jpg" },
    { title: t.process4Title, tag: t.process4Tag, body: t.process4Body, tone: "gold-t" as const, src: "/images/company/embroidery.jpg" },
    { title: t.process5Title, tag: t.process5Tag, body: t.process5Body, tone: "sage" as const, src: "/images/company/stitching-line.jpg" },
    { title: t.process6Title, tag: t.process6Tag, body: t.process6Body, tone: "default" as const, src: "/images/company/quality-check.jpg" },
    { title: t.process7Title, tag: t.process7Tag, body: t.process7Body, tone: "rose" as const, src: "/images/company/packaging.jpg" },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <SectionHeader eyebrow={t.aboutProcessEyebrow}>
          {t.aboutProcessHeading1}
          <br />
          <span className="it">{t.aboutProcessHeading2}</span>
        </SectionHeader>
      </div>
      <div className="wrap">
        <div className="hscroll">
          {steps.map((step) => (
            <Reveal key={step.title} className="hcard">
              <figure className={phClass(step.tone)}>
                <PlaceholderInner tag={step.tag ?? step.title} src={step.src} alt={step.title} />
              </figure>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
