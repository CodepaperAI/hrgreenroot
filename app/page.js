import { HomePage } from "@/components/HomePage";
import { siteMeta } from "@/lib/full-site-data";

const title = "Professional Landscaping Services in Mississauga & the GTA";
const description = siteMeta.heroTitle;

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    images: [
      {
        url: "/hero-background.jpg",
        alt: "Aerial view of sod installation with a landscaper working along a curved stone border",
      },
    ],
  },
  twitter: {
    title,
    description,
    images: ["/hero-background.jpg"],
  },
};

export default function Page() {
  return <HomePage />;
}
