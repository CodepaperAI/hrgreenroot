import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { contact } from "@/lib/full-site-data";
import { locations } from "@/lib/seo/locations";
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/seo/Schema";
import styles from "../services/[slug]/ServicePage.module.css";

export const metadata = {
  title: "Service Areas Across Mississauga & the GTA",
  description:
    "HR Greenroots Landscaping serves homeowners across Mississauga, Toronto, and the wider GTA — find your city below.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasIndex() {
  return (
    <SiteChrome>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Service Areas" }]}
      />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShellSolo}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span>/</span>
                <strong>Service Areas</strong>
              </p>
              <p className={styles.eyebrow}>Where we work</p>
              <h1>Landscaping across Mississauga &amp; the GTA.</h1>
              <p className={styles.heroLead}>
                Our crews are based in Mississauga and we serve {locations.length} cities
                and regions across Ontario. Pick your city for a closer look at the work
                we do there.
              </p>
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
          <div className={styles.relatedGrid}>
            {locations.map((loc, index) => (
              <Link
                key={loc.slug}
                className={`${styles.relatedCard} reveal`}
                href={`/service-areas/${loc.slug}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className={styles.relatedBody}>
                  <p className={styles.cardEyebrow}>{loc.regionShort}</p>
                  <h3>{loc.name}</h3>
                  <p>{loc.headline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
