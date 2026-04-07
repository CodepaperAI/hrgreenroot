"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const headerWrap = document.querySelector(".site-header-wrap");
    const forms = document.querySelectorAll("form");
    const onSubmit = (event) => event.preventDefault();
    forms.forEach((form) => form.addEventListener("submit", onSubmit));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    const revealItems = document.querySelectorAll(".reveal");
    revealItems.forEach((item) => observer.observe(item));

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroMedia = document.querySelector(".hero-media");
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateScrollEffects() {
      const currentScrollY = window.scrollY;

      if (heroMedia) {
        heroMedia.style.transform = `scale(1.08) translateY(${currentScrollY * 0.18}px)`;
      }

      if (headerWrap) {
        const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 120;
        headerWrap.classList.toggle("is-hidden", scrollingDown);
        headerWrap.classList.toggle("is-compact", currentScrollY > 28);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }

    if (!prefersReduced) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    updateScrollEffects();

    return () => {
      forms.forEach((form) => form.removeEventListener("submit", onSubmit));
      revealItems.forEach((item) => observer.unobserve(item));
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
