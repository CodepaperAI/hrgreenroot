"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { contact, getServiceImageAlt, portfolioImages, services } from "@/lib/full-site-data";
import styles from "./HomePage.module.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

const reviewAvatars = [
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120",
];
let hasPlayedHomeHeroEntrance = false;

const stats = [
  {
    value: 150,
    suffix: "+",
    label: "Projects Delivered",
    description:
      "Landscape installs, hardscape upgrades, and seasonal improvement scopes completed with careful execution.",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description:
      "Hands-on outdoor construction and landscaping experience across residential and commercial properties.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description:
      "Clients stay with us because we communicate clearly, show up reliably, and finish work with precision.",
  },
];
const heroImage = "/hero-background.jpg";
const marqueeSpeed = 0.07;

function getMarqueeLoopSpan(railElement, firstGroupElement) {
  if (!railElement || !firstGroupElement || typeof window === "undefined") {
    return 0;
  }

  const railStyles = window.getComputedStyle(railElement);
  const gap = Number.parseFloat(railStyles.columnGap || railStyles.gap || "0");

  return firstGroupElement.offsetWidth + gap;
}

function getMarqueeStep(shellElement, firstGroupElement) {
  if (!shellElement || !firstGroupElement || typeof window === "undefined") {
    return 0;
  }

  const groupStyles = window.getComputedStyle(firstGroupElement);
  const gap = Number.parseFloat(groupStyles.columnGap || groupStyles.gap || "0");
  const firstCard = firstGroupElement.firstElementChild;
  const firstCardWidth = firstCard instanceof HTMLElement ? firstCard.getBoundingClientRect().width : 0;

  return Math.max(Math.min(shellElement.clientWidth * 0.82, firstCardWidth + gap), 220);
}

function normalizeMarqueeOffset(offset, loopSpan) {
  if (!loopSpan) {
    return 0;
  }

  let nextOffset = offset;

  while (nextOffset <= -loopSpan) {
    nextOffset += loopSpan;
  }

  while (nextOffset > 0) {
    nextOffset -= loopSpan;
  }

  return nextOffset;
}

function applyMarqueeTransform(railElement, offset) {
  if (!railElement) {
    return;
  }

  railElement.style.transform = `translate3d(${offset}px, 0, 0)`;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 12h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.8 2.6 5.4 5.9.9-4.2 4 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4 5.9-.9L12 2.8Z" fill="currentColor" />
    </svg>
  );
}

function ChevronControlIcon({ direction = "right" }) {
  const rotation = direction === "left" ? "rotate(180 12 12)" : undefined;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <g transform={rotation}>
        <path
          d="M8 12h8m-3.5-3.5L16 12l-3.5 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function StatCard({ value, suffix = "", label, description }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = useCountUp(value, 2000, inView);
  return (
    <article ref={ref} className={styles.statCard}>
      <p className={styles.statValue}>
        {inView ? count : "0"}
        <span>{suffix}</span>
      </p>
      <h3>{label}</h3>
      <p className={styles.statDescription}>{description}</p>
    </article>
  );
}

export function HomePage() {
  const featuredServices = services.slice(0, 3);
  const gallery = portfolioImages.slice(0, 3);
  const marqueeServices = services;
  const [heroMotionState, setHeroMotionState] = useState(() => (
    hasPlayedHomeHeroEntrance ? "ready" : "pending"
  ));
  const marqueeShellRef = useRef(null);
  const marqueeRailRef = useRef(null);
  const marqueeFirstGroupRef = useRef(null);
  const marqueePausedRef = useRef(false);
  const marqueePauseUntilRef = useRef(0);
  const marqueeOffsetRef = useRef(0);
  const marqueeTargetOffsetRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameOne = 0;
    let frameTwo = 0;

    function settleHero(state = "ready") {
      setHeroMotionState(state);
      hasPlayedHomeHeroEntrance = true;
    }

    function scheduleHeroEntrance() {
      frameOne = window.requestAnimationFrame(() => {
        frameTwo = window.requestAnimationFrame(() => {
          settleHero("ready");
        });
      });
    }

    if (reducedMotionQuery.matches) {
      settleHero("reduced");
    } else if (!hasPlayedHomeHeroEntrance) {
      setHeroMotionState("pending");
      scheduleHeroEntrance();
    } else {
      settleHero("ready");
    }

    function handleReducedMotionChange(event) {
      if (event.matches) {
        window.cancelAnimationFrame(frameOne);
        window.cancelAnimationFrame(frameTwo);
        settleHero("reduced");
      }
    }

    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    const marqueeShell = marqueeShellRef.current;
    const marqueeRail = marqueeRailRef.current;
    const marqueeFirstGroup = marqueeFirstGroupRef.current;

    if (!marqueeShell || !marqueeRail || !marqueeFirstGroup) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stackedLayoutQuery = window.matchMedia("(max-width: 760px)");
    let frameId = 0;
    let lastTime = 0;

    function tick(time) {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;
      const loopSpan = getMarqueeLoopSpan(marqueeRail, marqueeFirstGroup);

      if (!loopSpan || stackedLayoutQuery.matches) {
        applyMarqueeTransform(marqueeRail, 0);
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      if (marqueeTargetOffsetRef.current !== null) {
        const targetOffset = marqueeTargetOffsetRef.current;
        const distance = targetOffset - marqueeOffsetRef.current;
        const easing = 1 - Math.exp(-delta / 180);
        const nextOffset = marqueeOffsetRef.current + (distance * easing);

        marqueeOffsetRef.current = nextOffset;

        if (Math.abs(targetOffset - nextOffset) < 0.6) {
          marqueeOffsetRef.current = normalizeMarqueeOffset(targetOffset, loopSpan);
          marqueeTargetOffsetRef.current = null;
        }
      } else if (
        !reducedMotionQuery.matches &&
        !marqueePausedRef.current &&
        time >= marqueePauseUntilRef.current
      ) {
        marqueeOffsetRef.current -= delta * marqueeSpeed;
      }

      if (marqueeTargetOffsetRef.current === null) {
        marqueeOffsetRef.current = normalizeMarqueeOffset(marqueeOffsetRef.current, loopSpan);
      }

      applyMarqueeTransform(marqueeRail, marqueeOffsetRef.current);
      frameId = window.requestAnimationFrame(tick);
    }

    function pauseMarquee() {
      marqueePausedRef.current = true;
    }

    function resumeMarquee() {
      marqueePausedRef.current = false;
      lastTime = 0;
    }

    function resetMarqueeMode() {
      marqueePauseUntilRef.current = 0;
      marqueePausedRef.current = false;
      marqueeTargetOffsetRef.current = null;
      lastTime = 0;

      if (stackedLayoutQuery.matches) {
        marqueeOffsetRef.current = 0;
        applyMarqueeTransform(marqueeRail, 0);
        return;
      }

      const loopSpan = getMarqueeLoopSpan(marqueeRail, marqueeFirstGroup);
      marqueeOffsetRef.current = normalizeMarqueeOffset(marqueeOffsetRef.current, loopSpan);
      applyMarqueeTransform(marqueeRail, marqueeOffsetRef.current);
    }

    marqueeShell.addEventListener("pointerenter", pauseMarquee);
    marqueeShell.addEventListener("pointerleave", resumeMarquee);
    marqueeShell.addEventListener("focusin", pauseMarquee);
    marqueeShell.addEventListener("focusout", resumeMarquee);
    reducedMotionQuery.addEventListener("change", resetMarqueeMode);
    stackedLayoutQuery.addEventListener("change", resetMarqueeMode);
    window.addEventListener("resize", resetMarqueeMode);

    resetMarqueeMode();
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      marqueeShell.removeEventListener("pointerenter", pauseMarquee);
      marqueeShell.removeEventListener("pointerleave", resumeMarquee);
      marqueeShell.removeEventListener("focusin", pauseMarquee);
      marqueeShell.removeEventListener("focusout", resumeMarquee);
      reducedMotionQuery.removeEventListener("change", resetMarqueeMode);
      stackedLayoutQuery.removeEventListener("change", resetMarqueeMode);
      window.removeEventListener("resize", resetMarqueeMode);
    };
  }, []);

  function scrollMarquee(direction) {
    const marqueeShell = marqueeShellRef.current;
    const marqueeRail = marqueeRailRef.current;
    const marqueeFirstGroup = marqueeFirstGroupRef.current;
    const stackedLayoutQuery = typeof window !== "undefined" ? window.matchMedia("(max-width: 760px)") : null;

    if (!marqueeShell || !marqueeRail || !marqueeFirstGroup || stackedLayoutQuery?.matches) {
      return;
    }

    const loopSpan = getMarqueeLoopSpan(marqueeRail, marqueeFirstGroup);
    const jumpDistance = getMarqueeStep(marqueeShell, marqueeFirstGroup);

    if (!loopSpan || !jumpDistance) {
      return;
    }

    marqueePausedRef.current = false;
    marqueePauseUntilRef.current = performance.now() + 2600;

    if (direction === "left" && marqueeOffsetRef.current + jumpDistance > 0) {
      marqueeOffsetRef.current -= loopSpan;
      applyMarqueeTransform(marqueeRail, marqueeOffsetRef.current);
    }

    const nextTarget = direction === "left"
      ? marqueeOffsetRef.current + jumpDistance
      : marqueeOffsetRef.current - jumpDistance;

    if (direction === "right" && nextTarget <= -loopSpan) {
      marqueeTargetOffsetRef.current = nextTarget;
      return;
    }

    marqueeTargetOffsetRef.current = nextTarget;
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.topbar}>
          <SiteHeader mode="overlay" />
        </div>

        <div
          className={[
            styles.stage,
            heroMotionState === "pending" ? styles.stageMotionPending : "",
            heroMotionState === "reduced" ? styles.stageMotionReduced : "",
          ].filter(Boolean).join(" ")}
        >
          <img
            className={styles.stageImage}
            src={heroImage}
            alt="Aerial view of sod installation with a landscaper working along a curved stone border"
          />
          <div className={styles.stageShade} />

          <div className={styles.stageContent}>
            <div className={styles.copy}>
              <p className={`${styles.kicker} ${styles.heroEyebrow}`}>Landscape Design &amp; Build</p>
              <h1 className={styles.heroTitle}>Professional Landscaping Solutions</h1>
              <p className={`${styles.lead} ${styles.heroLead}`}>
                We provide end-to-end landscaping services for homeowners, businesses,
                and large-scale properties, combining expert design, efficient execution,
                and long-term maintenance solutions.
              </p>
              <div className={`${styles.actions} ${styles.heroActions}`}>
                <Link className={styles.primaryButton} href="/portfolio">
                  <span>View Our Projects</span>
                  <ArrowIcon />
                </Link>
                <Link className={styles.secondaryButton} href="/contact">Start Your Estimate</Link>
              </div>
            </div>

            <aside className={`${styles.reviewCard} ${styles.heroReviewCard}`}>
              <div className={styles.reviewHead}>
                <div className={styles.reviewAvatars} aria-hidden="true">
                  {reviewAvatars.map((avatar) => <img key={avatar} src={avatar} alt="" />)}
                </div>
                <p>Based on verified client reviews</p>
              </div>
              <p className={styles.reviewQuote}>
                Our landscape has never looked better, professional and always on time.
              </p>
              <div className={styles.reviewFoot}>
                <div className={styles.scoreWrap}>
                  <span className={styles.score}>4.9</span>
                  <StarIcon />
                </div>
                <p>Average client rating</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.intro} id="about">
        <div>
          <p className={styles.sectionEyebrow}>Why Homeowners Call Us</p>
          <h2>Built for curb appeal, usability, and clean long-term upkeep.</h2>
        </div>
        <p>
          HR Greenroots brings planting, hardscape, and maintenance into one coordinated
          service, so the result feels intentional on day one and still looks sharp after the season changes.
        </p>
      </section>

      <section className={styles.stats}>
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            description={stat.description}
          />
        ))}
      </section>

      <section className={styles.services} id="services">
        <div className={styles.sectionRow}>
          <div>
            <p className={styles.sectionEyebrow}>Services</p>
            <h2>From front-yard upgrades to full outdoor transformations.</h2>
          </div>
          <Link className={styles.inlineLink} href="/portfolio">Explore completed work <ArrowIcon /></Link>
        </div>

        <div className={styles.serviceGrid}>
          {featuredServices.map((service) => (
            <article key={service.slug} className={styles.serviceCard}>
              <div className={styles.serviceImage}><img src={service.image} alt={getServiceImageAlt(service)} loading="lazy" /></div>
              <div className={styles.serviceBody}>
                <p className={styles.cardEyebrow}>Featured Service</p>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <Link className={styles.inlineLink} href={`/services/${service.slug}`}>Learn more <ArrowIcon /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.marqueeSection}>
        <div className={styles.marqueeHeader}>
          <div>
            <p className={styles.sectionEyebrow}>All Services</p>
            <h2>Browse the full scope in one continuous pass.</h2>
          </div>
          <Link className={styles.inlineLink} href="/contact">Talk through your project <ArrowIcon /></Link>
        </div>

        <div ref={marqueeShellRef} className={styles.marqueeShell}>
          <div className={styles.marqueeOverlayControls} aria-label="Service carousel controls">
            <button
              className={`${styles.marqueeButton} ${styles.marqueeButtonLeft}`}
              type="button"
              aria-label="Scroll services left"
              onClick={() => scrollMarquee("left")}
            >
              <ChevronControlIcon direction="left" />
            </button>
            <button
              className={`${styles.marqueeButton} ${styles.marqueeButtonRight}`}
              type="button"
              aria-label="Scroll services right"
              onClick={() => scrollMarquee("right")}
            >
              <ChevronControlIcon direction="right" />
            </button>
          </div>
          <div ref={marqueeRailRef} className={styles.marqueeRail}>
            {[0, 1].map((group) => (
              <div
                key={group}
                ref={group === 0 ? marqueeFirstGroupRef : undefined}
                className={styles.marqueeGroup}
                aria-hidden={group === 1}
              >
                {marqueeServices.map((service) => (
                  <Link
                    key={`${group}-${service.slug}`}
                    className={styles.marqueeCard}
                    href={`/services/${service.slug}`}
                    tabIndex={group === 1 ? -1 : undefined}
                  >
                    <div className={styles.marqueeMedia}>
                      <img src={service.image} alt={getServiceImageAlt(service)} loading="lazy" />
                    </div>
                    <div className={styles.marqueeOverlay} />
                    <div className={styles.marqueeCopy}>
                      <p className={styles.cardEyebrow}>Service</p>
                      <h3>{service.name}</h3>
                      <p>{service.heroBody ?? service.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.projectFeature}>
          <div className={styles.projectImage}><img src={gallery[1].src} alt={gallery[1].alt} loading="lazy" /></div>
          <div className={styles.projectPanel}>
            <p className={styles.sectionEyebrow}>Project Focus</p>
            <h2>Layouts that balance movement, planting depth, and durable materials.</h2>
            <div className={styles.projectList}>
              <article>
                <span>01</span>
                <div>
                  <h3>Structured planting plans</h3>
                  <p>Layered greens, edge definition, and seasonal color chosen for Ontario properties.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Hardscape with purpose</h3>
                  <p>Walkways, interlock, retaining walls, and deck zones that improve circulation.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Maintenance after install</h3>
                  <p>We plan for how the space will be maintained, not just how it will photograph on day one.</p>
                </div>
              </article>
            </div>
            <Link className={styles.inlineLink} href="/portfolio">Browse project gallery <ArrowIcon /></Link>
          </div>
        </div>

        <div className={styles.galleryRow}>
          {gallery.map((item, index) => (
            <article key={`${item.src}-${index}`} className={styles.galleryCard}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div><p>{item.alt}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={styles.contactPanel}>
          <div className={styles.contactCopy}>
            <p className={styles.sectionEyebrow}>Contact</p>
            <h2>Tell us what you want the property to do better.</h2>
            <p>
              Whether the goal is a cleaner front yard, a more usable backyard, or reliable seasonal
              maintenance, we can walk the site and recommend a practical scope.
            </p>
          </div>

          <aside className={styles.contactCard}>
            <p className={styles.cardEyebrow}>Service Area</p>
            <h3>Mississauga &amp; the GTA</h3>
            <p>{contact.serviceAreas}</p>
            <div className={styles.contactLinks}>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={contact.mapHref} target="_blank" rel="noreferrer">View address</a>
            </div>
            <Link className={styles.primaryButton} href="/contact">
              <span>Request a Quote</span>
              <ArrowIcon />
            </Link>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
