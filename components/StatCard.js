"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

export function StatCard({ value, label, className, labelClass }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = useCountUp(value, 2000, inView);

  return (
    <article ref={ref} className={className}>
      <p className={labelClass}>{label}</p>
      <strong>{inView ? count : "0"}</strong>
    </article>
  );
}
