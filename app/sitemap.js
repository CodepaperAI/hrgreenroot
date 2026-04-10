import { services } from "@/lib/full-site-data";
import { getPublishedBlogSlugs } from "@/lib/uplift-blog";

const siteUrl = "https://hrgreenrootslandscaping.com";

export default async function sitemap() {
  const staticRoutes = ["", "/portfolio", "/blog", "/contact"].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = (await getPublishedBlogSlugs()).map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
