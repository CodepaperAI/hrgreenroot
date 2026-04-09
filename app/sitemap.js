import { services } from "@/lib/full-site-data";

const siteUrl = "https://hrgreenrootslandscaping.com";

export default function sitemap() {
  const staticRoutes = ["", "/portfolio", "/blog", "/contact"].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes];
}
