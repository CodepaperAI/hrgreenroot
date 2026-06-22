import { services } from "@/lib/full-site-data";
import { getPublishedBlogSlugs } from "@/lib/uplift-blog";
import { locations } from "@/lib/seo/locations";
import { serviceAreas } from "@/lib/seo/service-areas";

const siteUrl = "https://hrgreenrootslandscaping.com";

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/portfolio", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/service-areas", priority: 0.8, changeFrequency: "monthly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const cityRoutes = locations.map((loc) => ({
    url: `${siteUrl}/service-areas/${loc.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceCityRoutes = serviceAreas.map(({ serviceSlug, citySlug }) => ({
    url: `${siteUrl}/services/${serviceSlug}/${citySlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes = (await getPublishedBlogSlugs()).map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...cityRoutes,
    ...serviceCityRoutes,
    ...blogRoutes,
  ];
}
