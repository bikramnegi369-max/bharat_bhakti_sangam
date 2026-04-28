import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/_config/Site.config";
import { jsonLdScript } from "@/_lib/seo";
import { poppins } from "./_lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Spiritual Devotion, Bhajans, and Kirtan Events`,
    template: `%s | ${siteConfig.name}`,
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
    url: siteConfig.url,
    description: siteConfig.description,
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
