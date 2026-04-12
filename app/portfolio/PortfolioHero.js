"use client";

import Link from "next/link";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import styles from "../routes-theme.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 12h12m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

const stats = [
  { label: "Projects", value: 150, suffix: "+" },
  { label: "Focus", value: "Planting + hardscape" },
  { label: "Coverage", value: "Homes + commercial" },
];

export function PortfolioHero() {
  return (
    <div className={styles.heroCopy}>
      <p className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span>/</span>
        <strong>Portfolio</strong>
      </p>
      <p className={styles.eyebrow}>Portfolio</p>
      <h1 className={styles.heroTitle}>Outdoor work that feels structured, clean, and lasting.</h1>
      <p className={styles.heroLead}>
        A closer look at planting, hardscape, and landscape build imagery across HR Greenroots projects.
      </p>
      <p className={styles.heroBody}>
        These visuals help show how layout, material choice, and maintenance-minded design come together across
        front yards, backyard upgrades, and complete outdoor transformations.
      </p>

      <div className={styles.heroActions}>
        <Link className={styles.primaryButton} href="/contact">
          <span>Request a Quote</span>
          <ArrowIcon />
        </Link>
        <Link className={styles.secondaryButton} href="/#services">
          Explore Services
        </Link>
      </div>

      <div className={styles.heroFacts}>
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} />
        ))}
      </div>
    </div>
  );
}
