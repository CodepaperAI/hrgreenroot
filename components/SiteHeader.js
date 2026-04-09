"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services } from "@/lib/full-site-data";
import styles from "./SiteHeader.module.css";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Project", href: "/portfolio" },
  { label: "Resources", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function LeafMark() {
  return (
    <svg className={styles.leafMark} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 42c8.1-5.4 14.4-15.2 14.4-28.2-8.8 1.2-14.3 5.2-17.7 10.7C18 19 12.5 15 3.7 13.8 3.7 26.8 10 36.6 18.1 42V27.7h5.9V42Z" />
      <path d="M24.1 22.4c3.7-6.6 9.4-10 17.2-10.8-3.4 7.9-9 12.4-17.2 13.6-8.3-1.2-13.9-5.7-17.2-13.6 7.8.8 13.5 4.2 17.2 10.8Z" />
    </svg>
  );
}

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

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="m4.2 6.1 3.8 3.8 3.8-3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader({ mode = "overlay" }) {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerClassName = mode === "fixed"
    ? `${styles.header} ${styles.fixed} ${isMenuOpen ? styles.menuOpen : ""}`
    : `${styles.header} ${styles.overlay} ${isMenuOpen ? styles.menuOpen : ""}`;

  useEffect(() => {
    setIsOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        clearDropdownTimer();
        setIsOpen(false);
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        clearDropdownTimer();
        setIsOpen(false);
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleEscape);

    return () => {
      clearDropdownTimer();
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function clearDropdownTimer() {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  function scheduleDropdownOpen() {
    clearDropdownTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setIsOpen(true);
      hoverTimerRef.current = null;
    }, 1000);
  }

  function openDropdownImmediately() {
    clearDropdownTimer();
    setIsOpen(true);
  }

  function scheduleDropdownClose() {
    clearDropdownTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      hoverTimerRef.current = null;
    }, 280);
  }

  function closeDropdownImmediately() {
    clearDropdownTimer();
    setIsOpen(false);
  }

  function handleMenuToggle() {
    setIsMenuOpen((current) => {
      const next = !current;
      if (!next) {
        closeDropdownImmediately();
      }
      return next;
    });
  }

  function handleNavClick() {
    clearDropdownTimer();
    setIsMenuOpen(false);
    setIsOpen(false);
  }

  return (
    <div ref={headerRef} className={headerClassName}>
      <Link className={styles.brand} href="/" aria-label="HR Greenroots Landscaping home">
        <span className={styles.brandIcon}>
          <LeafMark />
        </span>
        <span className={styles.brandCopy}>
          <strong>Greenroots</strong>
          <small>Landscape &amp; Gardening</small>
        </span>
      </Link>

      <button
        className={styles.menuToggle}
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        onClick={handleMenuToggle}
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div className={`${styles.navWrap} ${isMenuOpen ? styles.navWrapOpen : ""}`}>
        <nav className={styles.nav} aria-label="Primary">
          {primaryLinks.slice(0, 2).map((item) => (
            <Link key={item.label} className={styles.navLink} href={item.href} onClick={handleNavClick}>
              {item.label}
            </Link>
          ))}

          <div
            className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
            onMouseEnter={scheduleDropdownOpen}
            onMouseLeave={scheduleDropdownClose}
          >
            <button
              className={`${styles.navLink} ${styles.dropdownTrigger}`}
              type="button"
              aria-haspopup="menu"
              aria-expanded={isOpen}
              aria-controls="services-menu"
              onClick={() => {
                clearDropdownTimer();
                setIsOpen((current) => !current);
              }}
              onFocus={openDropdownImmediately}
            >
              <span>Services</span>
              <ChevronIcon />
            </button>

            <div id="services-menu" className={styles.dropdownMenu}>
              <div className={styles.dropdownGrid}>
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    className={styles.dropdownLink}
                    href={`/services/${service.slug}`}
                    onClick={handleNavClick}
                  >
                    <span className={styles.dropdownTitle}>{service.name}</span>
                    <span className={styles.dropdownMeta}>Explore this service</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {primaryLinks.slice(2).map((item) => (
            <Link key={item.label} className={styles.navLink} href={item.href} onClick={handleNavClick}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className={styles.cta} href="/contact" onClick={handleNavClick}>
          <span>Request a Quote</span>
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
