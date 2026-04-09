import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { getServiceImageAlt, portfolioImages, services } from "@/lib/full-site-data";
import styles from "../routes-theme.module.css";
import { PortfolioStats } from "./PortfolioStats";

const title = "Landscaping Project Portfolio";
const description =
  "Browse HR Greenroots Landscaping portfolio images featuring planting, hardscape, interlocking, deck work, and outdoor transformation projects across the GTA.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title,
    description,
    url: "/portfolio",
    type: "website",
    images: [
      {
        url: portfolioImages[1].src,
        alt: portfolioImages[1].alt,
      },
    ],
  },
  twitter: {
    title,
    description,
    images: [portfolioImages[1].src],
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

export default function PortfolioPage() {
  return (
    <SiteChrome>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShell}>
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

              <PortfolioStats />
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <img src={portfolioImages[1].src} alt={portfolioImages[1].alt} />
              </div>
              <div className={styles.heroInset}>
                <img src={portfolioImages[4].src} alt={portfolioImages[4].alt} />
              </div>
              <div className={styles.heroBadge}>
                <p className={styles.cardEyebrow}>Project Focus</p>
                <strong>Built around curb appeal and daily use.</strong>
                <p>Examples across pathways, retaining walls, deck work, and landscaped planting zones.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.sectionHeading} reveal`}>
            <p className={styles.eyebrow}>Gallery</p>
            <h2>Selected project imagery across the same home-page visual language.</h2>
          </div>

          <div className={styles.galleryGrid}>
            {portfolioImages.map((image, index) => {
              const variant =
                index === 0 ? styles.galleryLarge :
                index === 1 ? styles.galleryMedium :
                index === portfolioImages.length - 1 ? styles.galleryWide :
                styles.gallerySquare;

              return (
                <figure
                  key={`${image.src}-${index}`}
                  className={`${styles.galleryCard} ${variant} reveal`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <figcaption className={styles.galleryOverlay}>
                    <p className={styles.galleryCaption}>{image.alt}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.postGrid}>
            {services.slice(0, 3).map((service, index) => (
              <article key={service.slug} className={`${styles.postCard} reveal`} style={{ transitionDelay: `${index * 90}ms` }}>
                <div className={styles.postImage}>
                  <img src={service.image} alt={getServiceImageAlt(service)} loading="lazy" />
                </div>
                <p className={styles.cardEyebrow}>Service Connection</p>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <Link className={styles.inlineLink} href={`/services/${service.slug}`}>
                  Explore service
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
