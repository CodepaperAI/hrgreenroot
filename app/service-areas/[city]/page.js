import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import {
  contact,
  getServiceBySlug,
  getServiceImageAlt,
} from "@/lib/full-site-data";
import { getLocationBySlug, getAdjacentLocations, locations } from "@/lib/seo/locations";
import { getServicesForCity } from "@/lib/seo/service-areas";
import { getLocalCopy } from "@/lib/seo/local-copy";
import {
  BreadcrumbSchema,
  LocalBusinessSchema,
} from "@/components/seo/Schema";
import styles from "../../services/[slug]/ServicePage.module.css";

export function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({ params }) {
  const { city: citySlug } = await params;
  const city = getLocationBySlug(citySlug);
  if (!city) return {};

  const title = `Landscaping in ${city.name}, ${city.regionShort}`;
  const description = `HR Greenroots Landscaping serves homeowners in ${city.name}, ${city.region}. Lawn care, hardscaping, fences, decks, retaining walls, and full landscape design.`;
  const canonical = `/service-areas/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { title, description },
  };
}

export default async function CityPage({ params }) {
  const { city: citySlug } = await params;
  const city = getLocationBySlug(citySlug);

  if (!city) {
    notFound();
  }

  const localParagraph = getLocalCopy(citySlug);
  const adjacent = getAdjacentLocations(citySlug, 4);
  const cityServices = getServicesForCity(citySlug)
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);

  return (
    <SiteChrome>
      <LocalBusinessSchema city={city} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: city.name },
        ]}
      />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShellSolo}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/service-areas">Service Areas</Link>
                <span>/</span>
                <strong>{city.name}</strong>
              </p>
              <p className={styles.eyebrow}>Serving {city.name}, {city.regionShort}</p>
              <h1>Landscaping in {city.name}, {city.regionShort}.</h1>
              {localParagraph ? (
                <p className={styles.heroBody}>{localParagraph}</p>
              ) : (
                <p className={styles.heroBody}>{city.headline}</p>
              )}
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={contact.phoneHref}>
                  <span>Call {contact.phoneDisplay}</span>
                </a>
                <Link className={styles.secondaryButton} href="/contact">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.relatedSection}`}>
          <div className={`${styles.sectionHeading} reveal`}>
            <p className={styles.eyebrow}>Services in {city.name}</p>
            <h2>What we can do for your {city.name} property.</h2>
          </div>
          <div className={styles.relatedGrid}>
            {cityServices.map((service, index) => (
              <Link
                key={service.slug}
                className={`${styles.relatedCard} reveal`}
                href={`/services/${service.slug}/${city.slug}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className={styles.relatedMedia}>
                  <img src={service.image} alt={getServiceImageAlt(service)} loading="lazy" />
                </div>
                <div className={styles.relatedBody}>
                  <p className={styles.cardEyebrow}>Service</p>
                  <h3>{service.name} in {city.name}</h3>
                  <p>{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {adjacent.length ? (
          <section className={`${styles.section} ${styles.relatedSection}`}>
            <div className={`${styles.sectionHeading} reveal`}>
              <p className={styles.eyebrow}>Nearby cities</p>
              <h2>Other places we serve near {city.name}.</h2>
            </div>
            <div className={styles.relatedGrid}>
              {adjacent.map((adj) => (
                <Link
                  key={adj.slug}
                  className={`${styles.relatedCard} reveal`}
                  href={`/service-areas/${adj.slug}`}
                >
                  <div className={styles.relatedBody}>
                    <p className={styles.cardEyebrow}>Service area</p>
                    <h3>{adj.name}, {adj.regionShort}</h3>
                    <p>{adj.headline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={`${styles.ctaPanel} reveal`}>
            <div>
              <p className={styles.eyebrow}>Ready To Start</p>
              <h2>Looking for a landscaper in {city.name}?</h2>
              <p>
                We can walk the property, confirm scope, and put a clear quote in
                front of you within a few business days.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link className={styles.primaryButton} href="/contact">
                <span>Book a Site Visit</span>
              </Link>
              <a className={styles.secondaryButton} href={contact.phoneHref}>
                Call {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
