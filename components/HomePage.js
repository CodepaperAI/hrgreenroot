import Link from "next/link";
import { contact, portfolioImages, services } from "@/lib/full-site-data";
import styles from "./HomePage.module.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const reviewAvatars = [
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120",
];
const stats = [
  ["250+", "Projects delivered"],
  ["4.9", "Average client rating"],
  ["1 crew", "Design, build, and upkeep"],
];
const heroImage =
  "https://images.pexels.com/photos/33235614/pexels-photo-33235614.jpeg?auto=compress&cs=tinysrgb&w=2200";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 12h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.8 2.6 5.4 5.9.9-4.2 4 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4 5.9-.9L12 2.8Z" fill="currentColor" />
    </svg>
  );
}

export function HomePage() {
  const featuredServices = services.slice(0, 3);
  const gallery = portfolioImages.slice(0, 3);
  const marqueeServices = services;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.topbar}>
          <SiteHeader mode="overlay" />
        </div>

        <div className={styles.stage}>
          <img className={styles.stageImage} src={heroImage} alt="Aerial view of a landscaped property with pathways and garden beds" />
          <div className={styles.stageShade} />

          <div className={styles.stageContent}>
            <div className={styles.copy}>
              <p className={styles.kicker}>Landscape Design &amp; Build</p>
              <h1>Professional Landscaping Solutions</h1>
              <p className={styles.lead}>
                We provide end-to-end landscaping services for homeowners, businesses,
                and large-scale properties, combining expert design, efficient execution,
                and long-term maintenance solutions.
              </p>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} href="/portfolio">
                  <span>View Our Projects</span>
                  <ArrowIcon />
                </Link>
                <Link className={styles.secondaryButton} href="/contact">Start Your Estimate</Link>
              </div>
            </div>

            <aside className={styles.reviewCard}>
              <div className={styles.reviewHead}>
                <div className={styles.reviewAvatars} aria-hidden="true">
                  {reviewAvatars.map((avatar) => <img key={avatar} src={avatar} alt="" />)}
                </div>
                <p>Based on verified client reviews</p>
              </div>
              <p className={styles.reviewQuote}>
                Our landscape has never looked better, professional and always on time.
              </p>
              <div className={styles.reviewFoot}>
                <div className={styles.scoreWrap}>
                  <span className={styles.score}>4.9</span>
                  <StarIcon />
                </div>
                <p>Average client rating</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.intro} id="about">
        <div>
          <p className={styles.sectionEyebrow}>Why Homeowners Call Us</p>
          <h2>Built for curb appeal, usability, and clean long-term upkeep.</h2>
        </div>
        <p>
          HR Greenroots brings planting, hardscape, and maintenance into one coordinated
          service, so the result feels intentional on day one and still looks sharp after the season changes.
        </p>
      </section>

      <section className={styles.stats}>
        {stats.map(([value, label]) => (
          <article key={label} className={styles.statCard}>
            <p className={styles.statValue}>{value}</p>
            <h3>{label}</h3>
          </article>
        ))}
      </section>

      <section className={styles.services} id="services">
        <div className={styles.sectionRow}>
          <div>
            <p className={styles.sectionEyebrow}>Services</p>
            <h2>From front-yard upgrades to full outdoor transformations.</h2>
          </div>
          <Link className={styles.inlineLink} href="/portfolio">Explore completed work <ArrowIcon /></Link>
        </div>

        <div className={styles.serviceGrid}>
          {featuredServices.map((service) => (
            <article key={service.slug} className={styles.serviceCard}>
              <div className={styles.serviceImage}><img src={service.image} alt={service.name} loading="lazy" /></div>
              <div className={styles.serviceBody}>
                <p className={styles.cardEyebrow}>Featured Service</p>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <Link className={styles.inlineLink} href={`/services/${service.slug}`}>Learn more <ArrowIcon /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.marqueeSection}>
        <div className={styles.marqueeHeader}>
          <div>
            <p className={styles.sectionEyebrow}>All Services</p>
            <h2>Browse the full scope in one continuous pass.</h2>
          </div>
          <Link className={styles.inlineLink} href="/contact">Talk through your project <ArrowIcon /></Link>
        </div>

        <div className={styles.marqueeShell}>
          <div className={styles.marqueeRail}>
            {[0, 1].map((group) => (
              <div key={group} className={styles.marqueeGroup} aria-hidden={group === 1}>
                {marqueeServices.map((service) => (
                  <Link
                    key={`${group}-${service.slug}`}
                    className={styles.marqueeCard}
                    href={`/services/${service.slug}`}
                    tabIndex={group === 1 ? -1 : undefined}
                  >
                    <div className={styles.marqueeMedia}>
                      <img src={service.image} alt={service.name} loading="lazy" />
                    </div>
                    <div className={styles.marqueeOverlay} />
                    <div className={styles.marqueeCopy}>
                      <p className={styles.cardEyebrow}>Service</p>
                      <h3>{service.name}</h3>
                      <p>{service.heroBody ?? service.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.projects} id="projects">
        <div className={styles.projectFeature}>
          <div className={styles.projectImage}><img src={gallery[1].src} alt={gallery[1].alt} loading="lazy" /></div>
          <div className={styles.projectPanel}>
            <p className={styles.sectionEyebrow}>Project Focus</p>
            <h2>Layouts that balance movement, planting depth, and durable materials.</h2>
            <div className={styles.projectList}>
              <article>
                <span>01</span>
                <div>
                  <h3>Structured planting plans</h3>
                  <p>Layered greens, edge definition, and seasonal color chosen for Ontario properties.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Hardscape with purpose</h3>
                  <p>Walkways, interlock, retaining walls, and deck zones that improve circulation.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Maintenance after install</h3>
                  <p>We plan for how the space will be maintained, not just how it will photograph on day one.</p>
                </div>
              </article>
            </div>
            <Link className={styles.inlineLink} href="/portfolio">Browse project gallery <ArrowIcon /></Link>
          </div>
        </div>

        <div className={styles.galleryRow}>
          {gallery.map((item, index) => (
            <article key={`${item.src}-${index}`} className={styles.galleryCard}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div><p>{item.alt}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={styles.contactPanel}>
          <div className={styles.contactCopy}>
            <p className={styles.sectionEyebrow}>Contact</p>
            <h2>Tell us what you want the property to do better.</h2>
            <p>
              Whether the goal is a cleaner front yard, a more usable backyard, or reliable seasonal
              maintenance, we can walk the site and recommend a practical scope.
            </p>
          </div>

          <aside className={styles.contactCard}>
            <p className={styles.cardEyebrow}>Service Area</p>
            <h3>Mississauga &amp; the GTA</h3>
            <p>{contact.serviceAreas}</p>
            <div className={styles.contactLinks}>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={contact.mapHref} target="_blank" rel="noreferrer">View address</a>
            </div>
            <Link className={styles.primaryButton} href="/contact">
              <span>Request a Quote</span>
              <ArrowIcon />
            </Link>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
