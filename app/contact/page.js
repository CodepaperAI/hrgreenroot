import { SiteChrome } from "@/components/SiteChrome";
import { contact, siteMeta } from "@/lib/full-site-data";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <main>
        <section className="interior-hero contact-hero">
          <div
            className="interior-media"
            style={{ backgroundImage: `url('${siteMeta.heroImage}')` }}
          />
          <div className="interior-overlay" />
          <div className="interior-copy reveal">
            <p className="eyebrow">Contact</p>
            <h1>{contact.heading}</h1>
            <p>{contact.body}</p>
          </div>
        </section>

        <section className="contact-page-lead">
          <div className="contact-page-lead-shell">
            <form className="quote-form contact-form-panel reveal">
              <p className="eyebrow">Get in Touch</p>
              <h2>Get a Free Quote!</h2>
              <label>
                <span>Name</span>
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                <span>Email*</span>
                <input type="email" placeholder="Your email" />
              </label>
              <label>
                <span>Phone*</span>
                <input type="tel" placeholder="Your phone number" />
              </label>
              <label>
                <span>Address (Street, City, Zip Code)</span>
                <input type="text" placeholder="Project address" />
              </label>
              <label>
                <span>
                  Let us know the details of what you are looking for, and we'll
                  contact you with a quote.
                </span>
                <textarea
                  rows="6"
                  placeholder="Let us know the details of what you are looking for, and we'll contact you with a quote."
                />
              </label>
              <button className="button button-solid" type="submit">
                Send
              </button>
            </form>

            <aside className="contact-page-side reveal">
              <div className="contact-side-card contact-side-primary">
                <p className="eyebrow">Visit Us</p>
                <h2>{contact.heading}</h2>
                <p>{contact.address}</p>
                <div className="contact-side-links">
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    Message on WhatsApp
                  </a>
                  <a href={contact.mapHref} target="_blank" rel="noreferrer">
                    Get directions
                  </a>
                </div>
              </div>

              <div className="contact-side-card contact-side-hours">
                <p className="eyebrow">Hours</p>
                <div className="hours-block compact-hours">
                  {contact.hours.map((entry) => (
                    <div className="hour-row" key={entry.day}>
                      <span>{entry.day}</span>
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-page-info section">
          <div className="contact-page-info-shell reveal">
            <div className="contact-info-block">
              <p className="eyebrow">Service Areas</p>
              <h2>Serving Mississauga and the GTA</h2>
              <p>{contact.serviceAreas}</p>
            </div>
            <div className="contact-info-block contact-info-social">
              <p className="eyebrow">Follow</p>
              <div className="contact-side-links">
                <a href={contact.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href={contact.tiktok} target="_blank" rel="noreferrer">
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
