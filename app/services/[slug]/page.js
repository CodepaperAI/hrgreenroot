import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import { getServiceBySlug, services } from "@/lib/full-site-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return {};
  }

  return {
    title: service.name,
    description: service.description,
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <SiteChrome>
      <main>
        <section className="interior-hero">
          <div
            className="interior-media"
            style={{ backgroundImage: `url('${service.image}')` }}
          />
          <div className="interior-overlay" />
          <div className="interior-copy reveal">
            <p className="eyebrow">Service</p>
            <h1>{service.name}</h1>
            <p>{service.kicker}</p>
          </div>
        </section>

        <section className="section split-section">
          <div className="split-copy reveal">
            <p className="eyebrow">HR Greenroots Landscaping</p>
            <h2>{service.kicker}</h2>
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="hero-actions">
              <a className="button button-solid" href="/contact">
                Get a Free Quote
              </a>
              <a className="button button-dark-outline" href="/">
                Back to Home
              </a>
            </div>
          </div>
          <div className="split-media reveal">
            <img src={service.image} alt={service.name} loading="lazy" />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
