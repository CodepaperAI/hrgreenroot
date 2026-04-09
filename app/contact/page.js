import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { contact, portfolioImages } from "@/lib/full-site-data";
import styles from "../routes-theme.module.css";

export const metadata = {
  title: "Contact",
};

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

export default function ContactPage() {
  const heroStats = [
    ["Availability", "Mon-Fri"],
    ["Estimate", "Free quote"],
    ["Coverage", "GTA"],
  ];

  return (
    <SiteChrome>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShell}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span>/</span>
                <strong>Contact</strong>
              </p>
              <p className={styles.eyebrow}>Contact</p>
              <h1 className={styles.heroTitle}>Let&apos;s plan the next step for your property.</h1>
              <p className={styles.heroLead}>{contact.heading}</p>
              <p className={styles.heroBody}>{contact.body}</p>

              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={contact.phoneHref}>
                  <span>Call {contact.phoneDisplay}</span>
                  <ArrowIcon />
                </a>
                <a className={styles.secondaryButton} href={contact.whatsapp} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
              </div>

              <div className={styles.heroFacts}>
                {heroStats.map(([label, value]) => (
                  <article key={label} className={`${styles.heroFact} reveal`}>
                    <p className={styles.statLabel}>{label}</p>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <img src={portfolioImages[0].src} alt={portfolioImages[0].alt} />
              </div>
              <div className={styles.heroInset}>
                <img src={portfolioImages[3].src} alt={portfolioImages[3].alt} />
              </div>
              <div className={styles.heroBadge}>
                <p className={styles.cardEyebrow}>Visit Us</p>
                <strong>HR Greenroots</strong>
                <p>{contact.address}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.formShell}>
            <form className={`${styles.formPanel} reveal`}>
              <div className={styles.formIntro}>
                <p className={styles.eyebrow}>Get In Touch</p>
                <h2>Request a free quote.</h2>
                <p>Tell us about your property, timing, and the result you want to achieve.</p>
              </div>

              <div className={styles.formGrid}>
                <label>
                  <span>Name</span>
                  <input type="text" placeholder="Your name" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" placeholder="Your email" />
                </label>
                <label>
                  <span>Phone</span>
                  <input type="tel" placeholder="Your phone number" />
                </label>
                <label>
                  <span>Address</span>
                  <input type="text" placeholder="Project address" />
                </label>
                <label>
                  <span>Project Details</span>
                  <textarea rows="6" placeholder="Let us know the details of what you are looking for, and we'll contact you with a quote." />
                </label>
                <button className={styles.primaryButton} type="submit">
                  <span>Send Inquiry</span>
                  <ArrowIcon />
                </button>
              </div>
            </form>

            <div className={styles.contentGrid}>
              <aside className={`${styles.infoCard} reveal`}>
                <p className={styles.cardEyebrow}>Direct Contact</p>
                <h3>Reach us by phone, WhatsApp, or directions.</h3>
                <div className={styles.infoList}>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp Chat</a>
                  <a href={contact.mapHref} target="_blank" rel="noreferrer">Open in Maps</a>
                </div>
              </aside>

              <aside className={`${styles.infoCard} reveal`} style={{ transitionDelay: "100ms" }}>
                <p className={styles.cardEyebrow}>Business Hours</p>
                <h3>Available during normal operating hours.</h3>
                <div className={styles.hoursList}>
                  {contact.hours.map((entry) => (
                    <div className={styles.hourRow} key={entry.day}>
                      <span>{entry.day}</span>
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.ctaPanel} reveal`}>
            <div>
              <p className={styles.eyebrow}>Service Area</p>
              <h2>Serving Mississauga and the GTA.</h2>
              <p>{contact.serviceAreas}</p>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
