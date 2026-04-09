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

const stats = [
  ["Projects", "150+"],
  ["Focus", "Planting + hardscape"],
  ["Coverage", "Homes + commercial"],
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
        {stats.map(([label, value]) => (
          <StatCard key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}
