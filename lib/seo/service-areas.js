// THE TRUTHFULNESS GATE.
//
// This file lists EXACTLY which {service, city} combinations get a programmatic
// landing page. Add a row = a page exists. Remove a row = page is removed from
// the sitemap on next build.
//
// Rules:
//   1. Never add a {service, city} pair the business does not actually serve.
//   2. If a city is too far for a small/recurring service (e.g., mulching in Barrie),
//      omit that pair — leave only the high-value services that justify travel.
//   3. Client must confirm each pair before it ships. Treat this file like a contract.

import { services } from "../full-site-data.js";
import { locations } from "./locations.js";

// Services that justify travel to far cities (London, Barrie, Niagara).
// Small recurring services like mulching are limited to the GTA core.
const FAR_CITY_SLUGS = new Set(["london", "barrie", "niagara-region"]);
const FAR_CITY_ALLOWED_SERVICES = new Set([
  "interlocking-pavers",
  "retaining-wall",
  "landscape-design",
  "stone-work",
  "deck-services",
  "fence-installation",
  "driveway-extensions",
  "garden-suites",
]);

function isAllowedPair(serviceSlug, citySlug) {
  if (FAR_CITY_SLUGS.has(citySlug)) {
    return FAR_CITY_ALLOWED_SERVICES.has(serviceSlug);
  }
  return true;
}

export const serviceAreas = services.flatMap((service) =>
  locations
    .filter((loc) => isAllowedPair(service.slug, loc.slug))
    .map((loc) => ({
      serviceSlug: service.slug,
      citySlug: loc.slug,
    }))
);

export const serviceAreasByService = services.reduce((acc, service) => {
  acc[service.slug] = locations
    .filter((loc) => isAllowedPair(service.slug, loc.slug))
    .map((loc) => loc.slug);
  return acc;
}, {});

export const serviceAreasByCity = locations.reduce((acc, loc) => {
  acc[loc.slug] = services
    .filter((service) => isAllowedPair(service.slug, loc.slug))
    .map((service) => service.slug);
  return acc;
}, {});

export function isServiceAvailableInCity(serviceSlug, citySlug) {
  return isAllowedPair(serviceSlug, citySlug);
}

export function getServicesForCity(citySlug) {
  return serviceAreasByCity[citySlug] ?? [];
}

export function getCitiesForService(serviceSlug) {
  return serviceAreasByService[serviceSlug] ?? [];
}
