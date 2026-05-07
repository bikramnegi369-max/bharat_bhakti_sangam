import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/_config/Site.config";
import { jsonLdScript } from "@/_lib/seo";
import { poppins } from "./_lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Spiritual Devotion, Bhajans, and Kirtan Events`,
    template: `%s`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: `${siteConfig.name} Team` }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    site: siteConfig.twitter?.site,
    creator: siteConfig.twitter?.creator,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": siteConfig.organization.type,
    name: siteConfig.organization.name,
    alternateName: "Bharat Bhakti Collective Ventures Pvt Ltd",
    url: siteConfig.url,
    logo: "https://www.bharatbhaktisangam.com/logo.png",
    description:
      "Bharat Bhakti Sangam is India's devotional clubbing movement blending bhajans, kirtans, spiritual music, and modern live experiences through immersive Bhajan Clubbing events.",
    email: "contact@bharatbhaktisangam.com",
    telephone: "+91-8796086743",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Plot No.190, KH No.114 1st Floor, Vipin Garden Extension, Gali No.37, Uttam Nagar",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110059",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/bharatbhaktisangam/",
      "https://www.facebook.com/BharatBhaktiSangam",
      "https://www.youtube.com/channel/UCZCiS4nLt1WtcIwtkla3LaQ",
    ],
    foundingLocation: {
      "@type": "Place",
      name: "India",
    },
    keywords: [
      "Bharat Bhakti Sangam",
      "Bhajan Clubbing",
      "Bhajan Clubbing Event",
      "Upcoming Bhajan Clubbing Event",
      "Bhajan Clubbing Gurugram",
      "Bhajan Clubbing Delhi",
      "Bhajan Party",
      "Devotional Clubbing",
      "Devotional Music Event",
      "Bhakti Event",
      "Bhajan Night",
      "Live Bhajan Event",
      "Bhajan Concert",
      "Spiritual Music Event",
      "Sanatan Event",
      "Krishna Bhajan Event",
      "Hare Krishna Kirtan",
      "Devotional DJ Night",
      "Bhakti Vibes",
      "Bhakti Music Festival",
      "Devotional Concert",
      "Spiritual Gathering",
      "Kirtan Event",
      "Bhajan Sandhya",
      "Devotional Night",
      "Bhajan Mahotsav",
      "Hindu Spiritual Event",
      "Krishna Kirtan Night",
      "Mahadev Bhajan Event",
      "Ram Bhajan Event",
      "Devotional EDM",
      "Bhakti Remix",
      "Bhajan Remix Party",
      "Spiritual Club Vibes",
      "Divine Music Event",
      "Devotional Celebration",
      "Bhakti Utsav",
      "Sanatan Dharma Event",
      "Krishna Devotees",
      "Spiritual Festival",
      "Devotional Reels",
      "Bhajan Shorts",
      "Devotional Shorts",
    ],
  };

  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <head>
        {/* facebook meta tag */}
        <meta property="fb:app_id" content={process.env.FB_APP_ID} />
      </head>
      <body className="min-h-full flex flex-col bg-secondary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd)}
        />
        {children}
      </body>
    </html>
  );
}
