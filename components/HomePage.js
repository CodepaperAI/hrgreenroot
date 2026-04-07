import Link from "next/link";
import {
  about,
  contact,
  homeProofs,
  portfolioImages,
  services,
  siteMeta,
} from "@/lib/full-site-data";
import { SiteChrome } from "@/components/SiteChrome";
import { GoogleFeedbackSection } from "@/components/GoogleFeedbackSection";
import { HeroGoogleBadge } from "@/components/HeroGoogleBadge";

function WhyIcon({ title }) {
  if (title === "Safety Promise") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3l7 3.2v5.4c0 4.4-2.9 8.4-7 9.8-4.1-1.4-7-5.4-7-9.8V6.2L12 3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8.7 12.3l2.1 2.2 4.6-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (title === "Satisfaction Guaranteed") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="10" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M9.2 10.2l1.8 1.9 3.9-4.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.7 15.4l-0.8 4.1 4.1-2.1 4.1 2.1-0.8-4.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.9l2.4 5 5.5 0.8-4 3.9 1 5.5-4.9-2.6-4.9 2.6 1-5.5-4-3.9 5.5-0.8 2.4-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteForm() {
  return (
    <form className="quote-form contact-editorial-form reveal">
      <label>
        <span>Name</span>
        <input type="text" placeholder="Your name" />
      </label>
      <label>
        <span>Email</span>
        <input type="email" placeholder="Your email" />
      </label>
      <label>
        <span>Phone</span>
        <input type="tel" placeholder="Your phone number" />
      </label>
      <label>
        <span>Let us know the details of what you are looking for, and we'll contact you with a quote.</span>
        <textarea rows={5} placeholder="Let us know the details of what you are looking for, and we'll contact you with a quote." />
      </label>
      <button className="button button-dark" type="submit">Send</button>
    </form>
  );
}

function ServicesMarquee() {
  const marqueeServices = [...services, ...services];

  return (
    <section className="services-marquee-section" id="services">
      <div className="services-marquee-shell">
        <div className="services-marquee-heading reveal">
          <p className="eyebrow">Services</p>
          <h2>Landscaping and hardscaping services across the GTA</h2>
        </div>

        <div className="services-marquee-stack">
          <div className="services-marquee-row">
            <div className="services-marquee-track">
              {marqueeServices.map((service, index) => (
                <Link
                  key={`row-one-${service.slug}-${index}`}
                  className="services-marquee-card"
                  href={`/services/${service.slug}`}
                >
                  <div className="services-marquee-media">
                    <img src={service.image} alt={service.name} loading="lazy" />
                  </div>
                  <div className="services-marquee-overlay" />
                  <div className="services-marquee-copy">
                    <p className="eyebrow">Service</p>
                    <h3>{service.name}</h3>
                    <p>{service.kicker}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="services-marquee-row is-reverse">
            <div className="services-marquee-track">
              {marqueeServices.slice().reverse().map((service, index) => (
                <Link
                  key={`row-two-${service.slug}-${index}`}
                  className="services-marquee-card"
                  href={`/services/${service.slug}`}
                >
                  <div className="services-marquee-media">
                    <img src={service.image} alt={service.name} loading="lazy" />
                  </div>
                  <div className="services-marquee-overlay" />
                  <div className="services-marquee-copy">
                    <p className="eyebrow">Service</p>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <SiteChrome>
      <main>
        <section className="hero-stage">
          <div className="hero-media-layer" aria-hidden="true">
            <img className="hero-media" src={siteMeta.heroImage} alt="HR Greenroots landscaping project" />
            <div className="hero-media-gradient" />
            <div className="hero-media-vignette" />
            <div className="hero-media-glow" />
          </div>

          <div className="hero-shell">
            <div className="hero-copy reveal is-visible">
              <p className="eyebrow">{siteMeta.heroEyebrow}</p>
              <h1>{siteMeta.heroTitle}</h1>
              <div className="hero-actions">
                <Link className="button" href="/contact">Get a Free Quote</Link>
                <Link className="button button-outline" href="/portfolio">View Portfolio</Link>
              </div>
              <div className="hero-bottom-bar">
                <div className="hero-contact-bar">
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
            </div>

            <div className="hero-aside">
              <HeroGoogleBadge />
            </div>
          </div>
        </section>

        <ServicesMarquee />

        <section className="section" id="portfolio">
          <div className="section-heading reveal">
            <p className="eyebrow">Portfolio</p>
            <h2>Real outdoor work from HR Greenroots projects and service imagery</h2>
          </div>
          <div className="gallery-grid">
            {portfolioImages.map((image, index) => (
              <Link key={`${image.src}-${index}`} className="gallery-card reveal" href="/portfolio">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </Link>
            ))}
          </div>
        </section>

        <section className="about-immersive-section" id="about">
          <div className="about-immersive-shell">
            <div className="about-immersive-copy reveal">
              <p className="eyebrow">{about.heading}</p>
              <h2>{about.missionHeading}</h2>
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="about-immersive-media reveal">
              <img src={about.image} alt="HR Greenroots landscaping mission" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="why-feature" id="why-choose-us">
          <div className="why-feature-shell">
            <div className="why-feature-visual reveal">
              <div className="why-feature-image why-feature-image-main">
                <img src={portfolioImages[0].src} alt={portfolioImages[0].alt} loading="lazy" />
              </div>
              <div className="why-feature-accent" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="why-feature-image why-feature-image-secondary">
                <img src={portfolioImages[3].src} alt={portfolioImages[3].alt} loading="lazy" />
              </div>
            </div>

            <div className="why-feature-copy">
              <div className="why-feature-intro reveal">
                <p className="eyebrow">Why Choose Us</p>
                <h2>Landscaping built on consistency, care, and execution.</h2>
                <p>
                  HR Greenroots Landscaping provides professional landscaping services in the GTA,
                  specializing in lawn care, garden design, and hardscaping.
                </p>
              </div>

              <div className="why-feature-list">
                {homeProofs.map((item, index) => (
                  <article
                    key={item.title}
                    className={`why-feature-item reveal${index === 0 ? " is-highlighted" : ""}`}
                  >
                    <div className="why-feature-item-head">
                      <span className="why-feature-check" aria-hidden="true">
                        <WhyIcon title={item.title} />
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GoogleFeedbackSection />

        <section className="contact-editorial section" id="contact">
          <div className="contact-editorial-shell">
            <div className="contact-editorial-copy reveal">
              <p className="eyebrow">Contact</p>
              <h2>{contact.heading}</h2>
              <p>{contact.body}</p>

              <div className="contact-editorial-details">
                <p>{contact.address}</p>
                <p>{contact.serviceAreas}</p>
              </div>

              <div className="contact-editorial-actions">
                <a className="button button-dark" href={contact.phoneHref}>{contact.phoneDisplay}</a>
                <a className="button button-dark-outline" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>

            <QuoteForm />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
