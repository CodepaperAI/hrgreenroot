"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "../routes-theme.module.css";

const stats = [
  { label: "Projects", value: 150, suffix: "+" },
  { label: "Focus", value: "Planting + hardscape" },
  { label: "Coverage", value: "Homes + commercial" },
];

function StatCard({ label, value, suffix = "" }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = typeof value === "number" ? useCountUp(value, 2000, inView) : value;
  return (
    <article ref={ref} className={`${styles.heroFact} reveal`}>
      <p className={styles.statLabel}>{label}</p>
      <strong>
        {typeof value === "number" ? (inView ? count : "0") : value}
        {suffix ? <span>{suffix}</span> : null}
      </strong>
    </article>
  );
}

export function PortfolioStats() {
  return (
    <div className={styles.heroFacts}>
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} />
      ))}
    </div>
  );
}
