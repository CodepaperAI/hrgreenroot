"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(target);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const numericTarget = parseFloat(target);
    if (isNaN(numericTarget)) return;

    const isFloat = String(target).includes(".");
    const decimals = isFloat ? String(target).split(".")[1].length : 0;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;

      setCount(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.floor(current)
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, duration]);

  return count;
}
