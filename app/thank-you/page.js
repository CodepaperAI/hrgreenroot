import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { contact, portfolioImages } from "@/lib/full-site-data";
import styles from "../routes-theme.module.css";

const title = "Thank You";
const description =
  "Thank you for contacting HR Greenroots Landscaping. We received your request and will be in touch shortly.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/thank-you",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title,
    description,
    url: "/thank-you",
    type: "website",
    images: [
      {
        url: portfolioImages[0].src,
        alt: portfolioImages[0].alt,
      },
    ],
  },
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

export default function ThankYouPage() {
  return (
    <SiteChrome>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShell}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span>/</span>
                <strong>Thank You</strong>
              </p>
              <p className={styles.eyebrow}>Request Received</p>
              <h1 className={styles.heroTitle}>Thank you.</h1>
              <p className={styles.heroLead}>
                Your inquiry has been sent to HR Greenroots Landscaping.
              </p>
              <p className={styles.heroBody}>
                We will review your project details and contact you shortly. For urgent requests, you can call
                us directly or message us on WhatsApp.
              </p>

              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={contact.phoneHref}>
                  <span>Call {contact.phoneDisplay}</span>
                  <ArrowIcon />
                </a>
                <a className={styles.secondaryButton} href={contact.whatsapp} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <img src={portfolioImages[1].src} alt={portfolioImages[1].alt} />
              </div>
              <div className={styles.heroInset}>
                <img src={portfolioImages[2].src} alt={portfolioImages[2].alt} />
              </div>
              <div className={styles.heroBadge}>
                <p className={styles.cardEyebrow}>Next Step</p>
                <strong>We will be in touch</strong>
                <p>{contact.phoneDisplay}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
