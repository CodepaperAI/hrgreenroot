// JSON-LD schema components for programmatic SEO pages.
// Each Service x City page renders LocalBusiness + Service + Breadcrumb.
// FAQ schema is opt-in via the FaqSchema component.

const SITE_URL = "https://hrgreenrootslandscaping.com";
const BUSINESS_NAME = "HR Greenroots Landscaping";
const HQ_ADDRESS = {
  streetAddress: "100 Matheson Blvd E unit 202",
  addressLocality: "Mississauga",
  addressRegion: "ON",
  postalCode: "L4Z 3P8",
  addressCountry: "CA",
};
const HQ_PHONE = "+1-647-915-6507";
const HQ_GEO = { latitude: 43.6075, longitude: -79.6437 };

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessSchema({ city }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: HQ_PHONE,
    image: `${SITE_URL}/hero-background.jpg`,
    address: { "@type": "PostalAddress", ...HQ_ADDRESS },
    geo: { "@type": "GeoCoordinates", ...HQ_GEO },
    priceRange: "$$",
    areaServed: city
      ? {
          "@type": "City",
          name: city.name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: city.region,
          },
        }
      : undefined,
    sameAs: [
      "https://www.instagram.com/hrgreenroots",
      "https://www.tiktok.com/@hr.greenroots",
    ],
  };
  return <JsonLd data={data} />;
}

export function ServiceSchema({ service, city }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: city ? `${service.name} in ${city.name}, ${city.regionShort}` : service.name,
    description: service.description,
    provider: { "@id": `${SITE_URL}#business`, "@type": "LandscapingBusiness", name: BUSINESS_NAME },
    areaServed: city
      ? { "@type": "City", name: city.name }
      : { "@type": "AdministrativeArea", name: "Ontario" },
    url: city
      ? `${SITE_URL}/services/${service.slug}/${city.slug}`
      : `${SITE_URL}/services/${service.slug}`,
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
  return <JsonLd data={data} />;
}

export function FaqSchema({ faqs }) {
  if (!faqs?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return <JsonLd data={data} />;
}
