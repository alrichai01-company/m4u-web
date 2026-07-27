"use client";

import { useReveal, useCountUp } from "@/hooks";
import { useLang } from "@/context/lang";
import type { Stat } from "@/types";

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const display = useCountUp({ to: stat.value, active });
  return (
    <div className="stat">
      <div className="n">
        {display}
        {stat.suffix && <b>{stat.suffix}</b>}
      </div>
      <div className="l">{stat.label}</div>
    </div>
  );
}

/** The four proof-points, counting up once they enter view. */
export function Stats() {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const { t } = useLang();

  const stats: Stat[] = [
    { value: 10000, suffix: "+", label: t.statSqFt },
    { value: 250, suffix: "K+", label: t.statGarments },
    { value: 100, suffix: "%", label: t.statQuality },
    { value: 4, suffix: "+", label: t.statFabricHouses },
  ];

  return (
    <div className="stats" ref={ref}>
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} active={inView} />
      ))}
    </div>
  );
}
