import { Eyebrow, GoldThread, Reveal } from "@/components/ui";
import { Stats } from "./Stats";
import { useLang } from "@/context/lang";

export function Standard() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="wrap">
        <Reveal>
          <Eyebrow>{t.standardEyebrow}</Eyebrow>
          <h2 className="d2">
            <span className="mask-line">
              <span>{t.standardLine1}</span>
            </span>
            <span className="mask-line">
              <span className="it gold">{t.standardLine2}</span>
            </span>
          </h2>
          <GoldThread />
        </Reveal>
        <Stats />
      </div>
    </section>
  );
}
