import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import {
  getBlogDescription,
  getBlogOgImage,
  getBlogTitle,
  getPublishedBlogBySlug,
  getPublishedBlogs,
  getPublishedBlogSlugs,
} from "@/lib/uplift-blog";
import styles from "./BlogArticle.module.css";

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

function formatDate(dateString) {
  if (!dateString) return "Latest article";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  const title = getBlogTitle(blog);
  const description = getBlogDescription(blog);
  const image = getBlogOgImage(blog, "/hero-background.jpg");
  const canonicalPath = `/blog/${blog.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: blog.meta?.ogTitle || title,
      description: blog.meta?.ogDescription || description,
      url: canonicalPath,
      type: blog.meta?.ogType || "article",
      images: [
        {
          url: image,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = (await getPublishedBlogs({ limit: 6 }))
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);
  const articleDate = formatDate(blog.publishDate || blog.updatedAt);

  return (
    <SiteChrome>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroShell}>
            <p className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <strong>{blog.title}</strong>
            </p>
            <p className={styles.eyebrow}>{blog.categories[0] || "Uplift Article"}</p>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.excerpt}>{blog.excerpt}</p>

            <div className={styles.metaRow}>
              <p className={styles.metaItem}>{articleDate}</p>
              <p className={styles.metaItem}>{blog.authorName}</p>
              {blog.customFields?.readingTime ? (
                <p className={styles.metaItem}>{blog.customFields.readingTime}</p>
              ) : null}
              {blog.categories[0] ? (
                <p className={styles.metaItem}>{blog.categories[0]}</p>
              ) : null}
            </div>

            {blog.featuredImage ? (
              <div className={styles.heroImage}>
                <img src={blog.featuredImage} alt={blog.title} />
              </div>
            ) : null}
          </div>
        </section>

        <section className={styles.articleWrap}>
          <div className={styles.articleGrid}>
            <article className={styles.articlePanel}>
              <div className={styles.articleIntro}>
                <p className={styles.eyebrow}>Article Overview</p>
                <p className={styles.articleLead}>{blog.excerpt}</p>
              </div>

              {blog.hasRichContent && blog.contentHtml ? (
                <div className={styles.articleBody} dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />
              ) : (
                <div className={styles.articleBody}>
                  {blog.paragraphs.length
                    ? blog.paragraphs.map((paragraph, index) => <p key={`${blog.slug}-${index}`}>{paragraph}</p>)
                    : <p>{blog.excerpt}</p>}
                </div>
              )}
            </article>

            <aside className={styles.articleSidebar}>
              <div className={styles.sidebarCard}>
                <p className={styles.eyebrow}>Post Details</p>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span>Published</span>
                    <strong>{articleDate}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Author</span>
                    {blog.authorUrl ? (
                      <a href={blog.authorUrl} target="_blank" rel="noreferrer">
                        {blog.authorName}
                      </a>
                    ) : (
                      <strong>{blog.authorName}</strong>
                    )}
                  </div>
                  {blog.customFields?.readingTime ? (
                    <div className={styles.detailItem}>
                      <span>Reading Time</span>
                      <strong>{blog.customFields.readingTime}</strong>
                    </div>
                  ) : null}
                  {blog.freshness?.lastUpdatedAt ? (
                    <div className={styles.detailItem}>
                      <span>Last Updated</span>
                      <strong>{formatDate(blog.freshness.lastUpdatedAt)}</strong>
                    </div>
                  ) : null}
                </div>
              </div>

              {blog.tags.length ? (
                <div className={styles.sidebarCard}>
                  <p className={styles.eyebrow}>Tags</p>
                  <div className={styles.tagRow}>
                    {blog.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </section>

        {relatedBlogs.length ? (
          <section className={styles.relatedSection}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>More Articles</p>
              <h2>Related blog posts from the same Uplift feed.</h2>
            </div>

            <div className={styles.cards}>
              {relatedBlogs.map((item) => (
                <article key={item.slug} className={styles.card}>
                  {item.featuredImage ? (
                    <div className={styles.cardImage}>
                      <img src={item.featuredImage} alt={item.title} loading="lazy" />
                    </div>
                  ) : null}
                  <p className={styles.eyebrow}>{item.categories[0] || "Article"}</p>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <Link className={styles.inlineLink} href={`/blog/${item.slug}`}>
                    Read article
                    <ArrowIcon />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </SiteChrome>
  );
}
