import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { portfolioImages, services } from "@/lib/full-site-data";
import styles from "../routes-theme.module.css";

export const metadata = {
  title: "Portfolio",
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
  const stats = [
    ["Projects", `${portfolioImages.length}+`],
    ["Focus", "Planting + hardscape"],
    ["Coverage", "Homes + commercial"],
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
                  <article key={label} className={`${styles.heroFact} reveal`}>
                    <p className={styles.statLabel}>{label}</p>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
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
                  <img src={service.image} alt={service.name} loading="lazy" />
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
