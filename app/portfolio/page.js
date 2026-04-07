import { SiteChrome } from "@/components/SiteChrome";
import { portfolioImages, siteMeta } from "@/lib/full-site-data";

export const metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <SiteChrome>
      <main>
        <section className="interior-hero portfolio-hero">
          <div
            className="interior-media"
            style={{ backgroundImage: `url('${siteMeta.aboutImage}')` }}
          />
          <div className="interior-overlay" />
          <div className="interior-copy reveal">
            <p className="eyebrow">Portfolio</p>
            <h1>HR Greenroots Landscaping</h1>
          </div>
        </section>

        <section className="portfolio-page section">
          <div className="portfolio-page-shell">
            <div className="portfolio-page-grid">
              {portfolioImages.map((image, index) => (
                <figure
                  className={`portfolio-page-card reveal portfolio-page-card-${(index % 6) + 1}`}
                  key={image.src}
                >
                  <img src={image.src} alt={image.alt} />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
