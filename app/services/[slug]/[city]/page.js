import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import {
  contact,
  getServiceBySlug,
  getServiceImageAlt,
  services,
} from "@/lib/full-site-data";
import { getLocationBySlug, getAdjacentLocations, locations } from "@/lib/seo/locations";
import {
  getServicesForCity,
  isServiceAvailableInCity,
  serviceAreas,
} from "@/lib/seo/service-areas";
import { getLocalCopy } from "@/lib/seo/local-copy";
import {
  BreadcrumbSchema,
  FaqSchema,
  LocalBusinessSchema,
  ServiceSchema,
} from "@/components/seo/Schema";
import styles from "../ServicePage.module.css";

export function generateStaticParams() {
  return serviceAreas.map(({ serviceSlug, citySlug }) => ({
    slug: serviceSlug,
    city: citySlug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getLocationBySlug(citySlug);
  if (!service || !city || !isServiceAvailableInCity(slug, citySlug)) return {};

  const title = `${service.name} in ${city.name}, ${city.regionShort}`;
  const description = `${service.name} for homeowners in ${city.name}, ${city.region}. ${service.description} Free quotes, transparent scope, and crews based in Mississauga.`;
  const canonical = `/services/${service.slug}/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [{ url: service.image, alt: getServiceImageAlt(service) }],
    },
    twitter: { title, description, images: [service.image] },
  };
}

function localFaqs(service, city) {
  return [
    {
      q: `Do you do ${service.name.toLowerCase()} in ${city.name}?`,
      a: `Yes — ${city.name} is part of our regular service area. ${city.note ?? "Our Mississauga-based crews work across the GTA and book most installs within two to four weeks."}`,
    },
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
      a: `Every property is different, so we quote each ${city.name} job after a quick site walk. Reach out at ${contact.phoneDisplay} for a free, no-pressure estimate.`,
    },
    {
      q: `Are you licensed and insured to work in ${city.name}?`,
      a: `Yes. We carry liability insurance and follow ${city.region} municipal requirements. We can share certificates of insurance on request before work begins.`,
    },
  ];
}

export default async function ServiceCityPage({ params }) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getLocationBySlug(citySlug);

  if (!service || !city || !isServiceAvailableInCity(slug, citySlug)) {
    notFound();
  }

  const localParagraph = getLocalCopy(citySlug);
  const adjacent = getAdjacentLocations(citySlug, 3).filter((l) =>
    isServiceAvailableInCity(slug, l.slug)
  );
  const otherServices = getServicesForCity(citySlug)
    .filter((s) => s !== slug)
    .slice(0, 4)
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);
  const faqs = localFaqs(service, city);
  const heroTitle = `${service.name} in ${city.name}, ${city.regionShort}`;

  return (
    <SiteChrome>
      <LocalBusinessSchema city={city} />
      <ServiceSchema service={service} city={city} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
          { name: city.name },
        ]}
      />
      <FaqSchema faqs={faqs} />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShell}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/services">Services</Link>
                <span>/</span>
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
                <span>/</span>
                <strong>{city.name}</strong>
              </p>

              <p className={styles.eyebrow}>{city.name}, {city.regionShort}</p>
              <h1 className={styles.seoH1}>{heroTitle}</h1>
              <p className={styles.heroLead}>{service.kicker}</p>
              <p className={styles.heroBody}>{service.heroBody}</p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/contact">
                  <span>Request a Quote</span>
                </Link>
                <a className={styles.secondaryButton} href={contact.phoneHref}>
                  Call {contact.phoneDisplay}
                </a>
              </div>

              <div className={styles.heroFacts}>
                <article className={styles.heroFact}>
                  <span>Coverage</span>
                  <strong>{city.name} + {city.regionShort}</strong>
                </article>
                <article className={styles.heroFact}>
                  <span>Estimates</span>
                  <strong>Free quote</strong>
                </article>
                <article className={styles.heroFact}>
                  <span>Service</span>
                  <strong>{service.name}</strong>
                </article>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroMediaPrimary}>
                <img src={service.image} alt={`${service.name} in ${city.name}`} />
              </div>
            </div>
          </div>
        </section>

        {localParagraph ? (
          <section className={`${styles.section} ${styles.storySection}`}>
            <div className={styles.storyShell}>
              <div className={styles.storyCopy}>
                <p className={styles.eyebrow}>About {city.name}</p>
                <h2>What {service.name.toLowerCase()} looks like in {city.name}.</h2>
                <p>{localParagraph}</p>
                {city.neighborhoods?.length ? (
                  <p>
                    Neighbourhoods we work in regularly: {city.neighborhoods.slice(0, 6).join(", ")}.
                  </p>
                ) : null}
              </div>
              <aside className={styles.storyPanel}>
                <p className={styles.cardEyebrow}>Quick Contact</p>
                <h3>Talk through scope for your {city.name} property.</h3>
                <div className={styles.quickContact}>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </aside>
            </div>
          </section>
        ) : null}

        <section className={`${styles.section} ${styles.benefitsSection}`}>
          <div className={`${styles.sectionHeading} reveal`}>
            <p className={styles.eyebrow}>Why homeowners choose us</p>
            <h2>{service.kicker}</h2>
          </div>
          <div className={styles.detailGrid}>
            {service.benefits?.map((benefit, index) => (
              <article
                key={benefit.title}
                className={`${styles.detailCard} reveal`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <p className={styles.cardEyebrow}>
                  Benefit {String(index + 1).padStart(2, "0")}
                </p>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.processSection}`}>
          <div className={`${styles.sectionHeading} reveal`}>
            <p className={styles.eyebrow}>How we work in {city.name}</p>
            <h2>A predictable sequence from quote to clean-up.</h2>
          </div>
          <div className={styles.processGrid}>
            {service.processSteps?.map((step, index) => (
              <article
                key={step.title}
                className={`${styles.processCard} reveal`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className={styles.processNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.storySection}`}>
          <div className={styles.storyShell}>
            <div className={styles.storyCopy}>
              <p className={styles.eyebrow}>Common questions</p>
              <h2>{city.name} homeowners ask</h2>
              {faqs.map((faq) => (
                <div key={faq.q} style={{ marginBottom: "1.5rem" }}>
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {otherServices.length ? (
          <section className={`${styles.section} ${styles.relatedSection}`}>
            <div className={`${styles.sectionHeading} reveal`}>
              <p className={styles.eyebrow}>Other services in {city.name}</p>
              <h2>Often paired with {service.name.toLowerCase()}.</h2>
            </div>
            <div className={styles.relatedGrid}>
              {otherServices.map((item, index) => (
                <Link
                  key={item.slug}
                  className={`${styles.relatedCard} reveal`}
                  href={`/services/${item.slug}/${city.slug}`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div className={styles.relatedMedia}>
                    <img src={item.image} alt={getServiceImageAlt(item)} loading="lazy" />
                  </div>
                  <div className={styles.relatedBody}>
                    <p className={styles.cardEyebrow}>Service</p>
                    <h3>{item.name} in {city.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {adjacent.length ? (
          <section className={`${styles.section} ${styles.relatedSection}`}>
            <div className={`${styles.sectionHeading} reveal`}>
              <p className={styles.eyebrow}>Nearby service areas</p>
              <h2>{service.name} in cities near {city.name}.</h2>
            </div>
            <div className={styles.relatedGrid}>
              {adjacent.map((adj, index) => (
                <Link
                  key={adj.slug}
                  className={`${styles.relatedCard} reveal`}
                  href={`/services/${service.slug}/${adj.slug}`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div className={styles.relatedBody}>
                    <p className={styles.cardEyebrow}>Service area</p>
                    <h3>{service.name} in {adj.name}</h3>
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
              <h2>Need {service.name.toLowerCase()} in {city.name}?</h2>
              <p>
                We can walk the site, confirm scope, and recommend the right next
                step for your property, timing, and budget.
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
