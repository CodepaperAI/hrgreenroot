import Link from "next/link";
import { contact, services } from "@/lib/full-site-data";
import styles from "./SiteFooter.module.css";

const companyLinks = [
  ["About Us", "/#about"],
  ["Project", "/#projects"],
  ["Services", "/#services"],
  ["Blog", "/blog"],
  ["Contact Us", "/contact"],
];

function LeafMark() {
  return (
    <svg className={styles.leafMark} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 42c8.1-5.4 14.4-15.2 14.4-28.2-8.8 1.2-14.3 5.2-17.7 10.7C18 19 12.5 15 3.7 13.8 3.7 26.8 10 36.6 18.1 42V27.7h5.9V42Z" />
      <path d="M24.1 22.4c3.7-6.6 9.4-10 17.2-10.8-3.4 7.9-9 12.4-17.2 13.6-8.3-1.2-13.9-5.7-17.2-13.6 7.8.8 13.5 4.2 17.2 10.8Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
      <rect x="3.5" y="5" width="17" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.2c-4.9 0-8.8 3.5-8.8 7.9 0 2.2 1 4.1 2.7 5.5l-1 3.2 3.6-1.3c1.1.4 2.3.6 3.5.6 4.9 0 8.8-3.5 8.8-8s-3.9-7.9-8.8-7.9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteFooter() {
  const footerServices = services.slice(0, 6);

  return (
    <footer className={styles.wrap}>
      <div className={styles.shell}>
        <div className={styles.grid}>
          <section className={styles.columnWide}>
            <Link className={styles.brand} href="/">
              <span className={styles.brandIcon}>
                <LeafMark />
              </span>
              <span>
                <strong>Greenroots</strong>
                <small>Landscape &amp; Gardening</small>
              </span>
            </Link>
            <h3>Professional Landscaping Solutions</h3>
            <p>
              From design and installation to long-term maintenance, our team delivers
              reliable service with precision and care across Mississauga and the GTA.
            </p>
          </section>

          <section className={styles.column}>
            <h4>Core Services</h4>
            <ul className={styles.list}>
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.column}>
            <h4>Company</h4>
            <ul className={styles.list}>
              {companyLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.column}>
            <h4>Get In Touch</h4>
            <div className={styles.contactStack}>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp Chat
              </a>
              <a href={contact.mapHref} target="_blank" rel="noreferrer">
                {contact.address}
              </a>
            </div>

            <div className={styles.socialBlock}>
              <h4>Social Media</h4>
              <div className={styles.socialRow}>
                <a className={styles.socialLink} href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a className={styles.socialLink} href={contact.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
                  <PlayIcon />
                </a>
                <a className={styles.socialLink} href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <MessageIcon />
                </a>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.bottom}>
          <p>Copyright 2026 HR Greenroots Landscaping. All Rights Reserved.</p>
          <div className={styles.bottomLinks}>
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
