"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "../routes-theme.module.css";

const stats = [
  ["Projects", "150+"],
  ["Focus", "Planting + hardscape"],
  ["Coverage", "Homes + commercial"],
];

function StatCard({ label, value }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = useCountUp(value, 2000, inView);
  return (
    <article ref={ref} className={`${styles.heroFact} reveal`}>
      <p className={styles.statLabel}>{label}</p>
      <strong>{inView ? count : "0"}</strong>
    </article>
  );
}

export function PortfolioStats() {
  return (
    <div className={styles.heroFacts}>
      {stats.map(([label, value]) => (
        <StatCard key={label} label={label} value={value} />
      ))}
    </div>
  );
}
