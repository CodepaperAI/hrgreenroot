import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { blog, portfolioImages, services } from "@/lib/full-site-data";
import { getPublishedBlogs } from "@/lib/uplift-blog";
import styles from "../routes-theme.module.css";

const title = "Landscaping Tips and Resource Guides";
const description = blog.body;

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title,
    description,
    url: "/blog",
    type: "website",
    images: [
      {
        url: portfolioImages[2].src,
        alt: portfolioImages[2].alt,
      },
    ],
  },
  twitter: {
    title,
    description,
    images: [portfolioImages[2].src],
  },
};

export const revalidate = 3600;

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

export default async function BlogPage() {
  const fallbackCards = [
    {
      title: "How to plan a front yard that still looks clean after one season.",
      text: "A practical look at layout, edging, and maintenance-minded planting choices.",
      image: portfolioImages[0],
      href: "/services/landscape-design",
      eyebrow: "Guide",
    },
    {
      title: "When interlock, retaining walls, and planting should be planned together.",
      text: "A stronger outdoor result usually comes from coordinating structure and greenery early.",
      image: portfolioImages[1],
      href: "/services/interlocking-pavers",
      eyebrow: "Guide",
    },
    {
      title: "What homeowners should ask before booking a landscaping quote.",
      text: "Scope, budget, timing, and maintenance expectations make estimates easier to compare.",
      image: portfolioImages[3],
      href: "/contact",
      eyebrow: "Guide",
    },
  ];
  const upliftBlogs = await getPublishedBlogs({ limit: 6 });
  const resourceCards = upliftBlogs.length
    ? upliftBlogs.slice(0, 6).map((item, index) => ({
        title: item.title,
        text: item.excerpt,
        image: {
          src: item.featuredImage || portfolioImages[index % portfolioImages.length].src,
          alt: item.title,
        },
        href: `/blog/${item.slug}`,
        eyebrow: item.categories[0] || "Uplift Article",
      }))
    : fallbackCards;

  return (
    <SiteChrome>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShell}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span>/</span>
                <strong>Blog</strong>
              </p>
              <p className={styles.eyebrow}>Resources</p>
              <h1 className={styles.heroTitle}>Insights that stay connected to the work on the homepage.</h1>
              <p className={styles.heroLead}>{blog.heading}</p>
              <p className={styles.heroBody}>{blog.body}</p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/contact">
                  <span>Request a Quote</span>
                  <ArrowIcon />
                </Link>
                <Link className={styles.secondaryButton} href="/portfolio">
                  View Portfolio
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <img src={portfolioImages[2].src} alt={portfolioImages[2].alt} />
              </div>
              <div className={styles.heroInset}>
                <img src={portfolioImages[5].src} alt={portfolioImages[5].alt} />
              </div>
              <div className={styles.heroBadge}>
                <p className={styles.cardEyebrow}>Resource Focus</p>
                <strong>Guides, planning notes, and service-adjacent insights.</strong>
                <p>Written to support the same landscaping, hardscape, and property-care story as the rest of the site.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.sectionHeading} reveal`}>
            <p className={styles.eyebrow}>Featured Reads</p>
            <h2>
              {upliftBlogs.length
                ? "Latest published posts pulled automatically from your Uplift blog feed."
                : "Editorial cards structured in the same visual system as the rest of the website."}
            </h2>
          </div>

          <div className={styles.postGrid}>
            {resourceCards.map((card, index) => (
              <article key={card.title} className={`${styles.postCard} reveal`} style={{ transitionDelay: `${index * 90}ms` }}>
                <div className={styles.postImage}>
                  <img src={card.image.src} alt={card.image.alt} loading="lazy" />
                </div>
                <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <Link className={styles.inlineLink} href={card.href}>
                  Read more
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.ctaPanel} reveal`}>
            <div>
              <p className={styles.eyebrow}>Related Services</p>
              <h2>Explore the landscaping services behind these topics.</h2>
              <p>
                The resource content stays connected to the actual services offered across the site,
                so users can move from inspiration to action without a theme shift.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link className={styles.primaryButton} href={`/services/${services[0].slug}`}>
                <span>View Services</span>
                <ArrowIcon />
              </Link>
              <Link className={styles.secondaryButton} href="/contact">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
