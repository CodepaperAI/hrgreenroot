import { SiteChrome } from "@/components/SiteChrome";
import { blog, siteMeta } from "@/lib/full-site-data";

export const metadata = {
  title: "Blog",
  description: blog.body,
};

export default function BlogPage() {
  return (
    <SiteChrome>
      <main>
        <section className="interior-hero">
          <div
            className="interior-media"
            style={{ backgroundImage: `url('${siteMeta.heroImage}')` }}
          />
          <div className="interior-overlay" />
          <div className="interior-copy reveal">
            <p className="eyebrow">Blog</p>
            <h1>{blog.heading}</h1>
            <p>{blog.body}</p>
          </div>
        </section>

        <section className="section blog-shell">
          <article className="blog-card reveal">
            <p className="eyebrow">Source Site</p>
            <h2>{blog.heading}</h2>
            <p>{blog.body}</p>
          </article>
        </section>
      </main>
    </SiteChrome>
  );
}
