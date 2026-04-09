import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import { contact, getServiceBySlug, getServiceImageAlt, services } from "@/lib/full-site-data";
import styles from "./ServicePage.module.css";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return {};
  }

  const title = service.name;
  const description = service.description;
  const canonicalPath = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "website",
      images: [
        {
          url: service.image,
          alt: getServiceImageAlt(service),
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [service.image],
    },
  };
}

function sentence(text) {
  const trimmed = text?.trim() ?? "";
  if (!trimmed) return "";
  const match = trimmed.match(/.*?[.!?](?:\s|$)/);
  return (match ? match[0] : trimmed).trim();
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

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className={`${styles.sectionHeading} reveal`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className={styles.sectionBody}>{body}</p> : null}
    </div>
  );
}

function BenefitsGrid({ service }) {
  return (
    <div className={styles.detailGrid}>
      {service.benefits.map((benefit, index) => (
        <article
          key={benefit.title}
          className={`${styles.detailCard} reveal`}
          style={{ transitionDelay: `${index * 90}ms` }}
        >
          <p className={styles.cardEyebrow}>Benefit {String(index + 1).padStart(2, "0")}</p>
          <h3>{benefit.title}</h3>
          <p>{benefit.text}</p>
        </article>
      ))}
    </div>
  );
}

function ProcessGrid({ service, emphasized = false }) {
  return (
    <div className={`${styles.processGrid} ${emphasized ? styles.processGridTight : ""}`}>
      {service.processSteps.map((step, index) => (
        <article
          key={step.title}
          className={`${styles.processCard} reveal`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <span className={styles.processNumber}>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </article>
      ))}
    </div>
  );
}

function ContactPanel() {
  return (
    <aside className={`${styles.storyPanel} reveal`} style={{ transitionDelay: "120ms" }}>
      <p className={styles.cardEyebrow}>Quick Contact</p>
      <h3>Need to talk through timing, scope, or the property layout?</h3>
      <div className={styles.quickContact}>
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a href={contact.mapHref} target="_blank" rel="noreferrer">
          View address
        </a>
      </div>
    </aside>
  );
}

function buildRelatedServices(service) {
  const preferred = (service.relatedSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);
  const remaining = services.filter(
    (item) => item.slug !== service.slug && !preferred.some((related) => related.slug === item.slug)
  );

  return [...preferred, ...remaining].slice(0, 3);
}

function renderVariantSections(service) {
  if (service.layoutVariant === "copy") {
    return (
      <>
        <section className={`${styles.section} ${styles.copyLeadSection}`}>
          <div className={styles.copyLeadShell}>
            <div className={`${styles.copyLeadCopy} reveal`}>
              <p className={styles.eyebrow}>Service Overview</p>
              <h2>{service.kicker}</h2>
              {service.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.copyLeadStack}>
              {service.benefits.map((benefit, index) => (
                <article
                  key={benefit.title}
                  className={`${styles.copyLeadCard} reveal`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <p className={styles.cardEyebrow}>Benefit {String(index + 1).padStart(2, "0")}</p>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.processSection}`}>
          <SectionHeading
            eyebrow="Project Flow"
            title={`How ${service.name.toLowerCase()} moves from idea to finished work.`}
            body={service.heroBody}
          />
          <ProcessGrid service={service} emphasized />
        </section>
      </>
    );
  }

  if (service.layoutVariant === "process") {
    return (
      <>
        <section className={`${styles.section} ${styles.processSection}`}>
          <div className={styles.processShell}>
            <div className={`${styles.processIntro} reveal`}>
              <p className={styles.eyebrow}>Execution Flow</p>
              <h2>Built around the sequence that keeps the finish stable and clean.</h2>
              <p>{service.paragraphs[0]}</p>
              <p>{service.paragraphs[1]}</p>
            </div>

            <div className={styles.processTimeline}>
              {service.processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className={`${styles.timelineStep} reveal`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className={styles.timelineNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.storySection}`}>
          <div className={styles.storyShell}>
            <div className={`${styles.storyCopy} reveal`}>
              <p className={styles.eyebrow}>Why This Scope Works</p>
              <h2>{service.heroTitle}</h2>
              <p>{service.paragraphs[0]}</p>
              <p>{service.paragraphs[1]}</p>
            </div>

            <ContactPanel />
          </div>
        </section>

        <section className={`${styles.section} ${styles.benefitsSection}`}>
          <SectionHeading
            eyebrow="Client Value"
            title={`What homeowners gain from well-planned ${service.name.toLowerCase()}.`}
          />
          <BenefitsGrid service={service} />
        </section>
      </>
    );
  }

  return (
    <>
      <section className={`${styles.section} ${styles.storySection}`}>
        <div className={styles.storyShell}>
          <div className={`${styles.storyCopy} reveal`}>
            <p className={styles.eyebrow}>Service Overview</p>
            <h2>{service.kicker}</h2>
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className={`${styles.storyPanel} reveal`} style={{ transitionDelay: "120ms" }}>
            <p className={styles.cardEyebrow}>Project Fit</p>
            <h3>{service.benefits[0]?.title ?? service.name}</h3>
            <ul className={styles.featureList}>
              {service.benefits.map((benefit) => (
                <li key={benefit.title}>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.text}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.benefitsSection}`}>
        <SectionHeading
          eyebrow="What This Improves"
          title={`Why ${service.name.toLowerCase()} makes the property feel more resolved.`}
        />
        <BenefitsGrid service={service} />
      </section>

      <section className={`${styles.section} ${styles.processSection}`}>
        <SectionHeading
          eyebrow="Execution Flow"
          title="A cleaner process from prep to finish."
          body={service.heroBody}
        />
        <ProcessGrid service={service} />
      </section>
    </>
  );
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const gallery = service.gallery?.length
    ? service.gallery
    : [{ src: service.image, alt: getServiceImageAlt(service) }];

  const relatedServices = buildRelatedServices(service);
  const heroFacts = service.heroFacts?.length
    ? service.heroFacts
    : [
        { label: "Coverage", value: "Mississauga + GTA" },
        { label: "Estimates", value: "Free quote" },
        { label: "Project Type", value: service.name },
      ];
  const badgeSource =
    service.layoutVariant === "process"
      ? service.processSteps[0]
      : service.benefits[0];
  const pageClassName = `${styles.page} ${styles[`variant${service.layoutVariant[0].toUpperCase()}${service.layoutVariant.slice(1)}`] ?? ""}`;

  return (
    <SiteChrome>
      <main className={pageClassName}>
        <section className={styles.hero}>
          <div className={styles.heroShell}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span>/</span>
                <span>Services</span>
                <span>/</span>
                <strong>{service.name}</strong>
              </p>

              <p className={styles.eyebrow}>Service Spotlight</p>
              <h1>{service.heroTitle}</h1>
              <p className={styles.heroLead}>{service.kicker}</p>
              <p className={styles.heroBody}>{service.heroBody}</p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/contact">
                  <span>Request a Quote</span>
                  <ArrowIcon />
                </Link>
                <Link className={styles.secondaryButton} href="/portfolio">
                  View Portfolio
                </Link>
              </div>

              <div className={styles.heroFacts}>
                {heroFacts.map((fact) => (
                  <article key={`${fact.label}-${fact.value}`} className={styles.heroFact}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroMediaPrimary}>
                <img src={gallery[0].src} alt={gallery[0].alt} />
              </div>

              {gallery[1] ? (
                <div className={styles.heroMediaSecondary}>
                  <img src={gallery[1].src} alt={gallery[1].alt} />
                </div>
              ) : null}

              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeLabel}>
                  {service.layoutVariant === "process" ? "Starting Point" : "Key Advantage"}
                </span>
                <strong>{badgeSource?.title ?? service.name}</strong>
                <p>{badgeSource?.text ?? sentence(service.description)}</p>
              </div>
            </div>
          </div>
        </section>

        {renderVariantSections(service)}

        <section className={`${styles.section} ${styles.gallerySection}`}>
          <SectionHeading
            eyebrow="Project Inspiration"
            title={`${service.name} visuals that match the scope and finish quality.`}
          />

          <div className={styles.galleryGrid}>
            {gallery.map((image, index) => (
              <figure
                key={`${image.src}-${index}`}
                className={`${styles.galleryCard} ${styles[`galleryCard${Math.min(index + 1, 3)}`]} reveal`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.relatedSection}`}>
          <SectionHeading
            eyebrow="Related Services"
            title="Often paired with adjacent outdoor improvements."
          />

          <div className={styles.relatedGrid}>
            {relatedServices.map((item, index) => (
              <Link
                key={item.slug}
                className={`${styles.relatedCard} reveal`}
                href={`/services/${item.slug}`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className={styles.relatedMedia}>
                  <img src={item.image} alt={getServiceImageAlt(item)} loading="lazy" />
                </div>
                <div className={styles.relatedBody}>
                  <p className={styles.cardEyebrow}>Service</p>
                  <h3>{item.name}</h3>
                  <p>{sentence(item.heroBody ?? item.description)}</p>
                  <span className={styles.inlineLink}>
                    Explore service
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={`${styles.ctaPanel} reveal`}>
            <div>
              <p className={styles.eyebrow}>Ready To Start</p>
              <h2>Need help planning your {service.name.toLowerCase()} project?</h2>
              <p>
                We can walk the site, confirm scope, and recommend the right next step for your
                property, timing, and budget.
              </p>
            </div>

            <div className={styles.ctaActions}>
              <Link className={styles.primaryButton} href="/contact">
                <span>Book a Site Visit</span>
                <ArrowIcon />
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
