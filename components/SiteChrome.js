import Link from "next/link";
import { MotionEffects } from "@/components/MotionEffects";
import { contact, services } from "@/lib/full-site-data";

export function SiteChrome({ children }) {
  return (
    <div className="site-shell">
      <MotionEffects />
      <header className="site-header-wrap">
        <div className="site-header">
          <Link className="brand" href="/" aria-label="HR Greenroots Landscaping home">
            <span className="brand-mark">HR</span>
            <span className="brand-text">
              <span>Greenroots</span>
              <span>Landscaping</span>
            </span>
          </Link>
          <nav className="top-nav" aria-label="Primary">
            <Link href="/">Home</Link>
            <Link href="/portfolio">Portfolio</Link>
            <div className="nav-dropdown">
              <button
                className="nav-dropdown-trigger"
                type="button"
                aria-haspopup="true"
              >
                Services
              </button>
              <div className="nav-dropdown-menu">
                <div className="nav-dropdown-grid">
                  {services.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`}>
                      <span>{service.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link className="header-cta" href="/contact">
            Get a Free Quote
          </Link>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <p className="footer-label">Service Areas</p>
            <p>{contact.serviceAreas}</p>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <p>{contact.address}</p>
            <p><a href={contact.phoneHref}>{contact.phoneDisplay}</a></p>
            <p><a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></p>
          </div>
          <div>
            <p className="footer-label">Follow</p>
            <p><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a></p>
            <p><a href={contact.tiktok} target="_blank" rel="noreferrer">TikTok</a></p>
          </div>
        </div>
        <p className="copyright">Copyright © 2026 HR Greenroots Landscaping - All Rights Reserved.</p>
      </footer>
    </div>
  );
}
