import "./globals.css";

const siteUrl = "https://hrgreenrootslandscaping.com/";
const defaultDescription =
  "HR Greenroots Landscaping provides landscaping, hardscaping, sod installation, interlocking, deck, fence, and garden design services across Mississauga and the GTA.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HR Greenroots Landscaping",
    template: "%s | HR Greenroots Landscaping",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "HR Greenroots Landscaping",
    title: "HR Greenroots Landscaping",
    description: defaultDescription,
    images: [
      {
        url: "/hero-background.jpg",
        width: 1316,
        height: 740,
        alt: "HR Greenroots Landscaping hero background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Greenroots Landscaping",
    description: defaultDescription,
    images: ["/hero-background.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
