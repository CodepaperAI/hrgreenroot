import Script from "next/script";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import "./globals.css";

const siteUrl = "https://hrgreenrootslandscaping.com/";
const defaultDescription =
  "HR Greenroots Landscaping provides landscaping, hardscaping, sod installation, interlocking, deck, fence, and garden design services across Mississauga and the GTA.";
const googleAnalyticsId = "G-ZDQJHLKZ0Q";
const googleTagManagerId = "GTM-KJDG3Q2K";

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
