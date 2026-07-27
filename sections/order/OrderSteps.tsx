import { Reveal } from "@/components/ui";
import { useLang } from "@/context/lang";

export function OrderSteps() {
  const { t } = useLang();

  const steps = [
    { title: t.order1Title, body: t.order1Body },
    { title: t.order2Title, body: t.order2Body },
    { title: t.order3Title, body: t.order3Body },
    { title: t.order4Title, body: t.order4Body },
    { title: t.order5Title, body: t.order5Body },
    { title: t.order6Title, body: t.order6Body },
    { title: t.order7Title, body: t.order7Body },
    { title: t.order8Title, body: t.order8Body },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div className="steps">
          {steps.map((step, i) => (
            <Reveal key={step.title} className="step">
              <div className="idx">{i + 1}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
