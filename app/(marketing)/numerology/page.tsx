import type { Metadata } from "next";
import { createPageMetadataFromConfig, jsonLdScript } from "@/_lib/seo";
import { siteConfig } from "@/_config/Site.config";
import { NumerologyPageClient } from "@/_features/numerology/components/NumerologyPageClient";

export const metadata: Metadata = createPageMetadataFromConfig("numerology");

export default function NumerologyPage() {
  const numerologyJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: "Vedic Numerology - The Ancient Science of Numbers",
    url: `${siteConfig.url}/numerology`,
    description:
      "Discover the spiritual energy hidden within your birth date and name through the timeless wisdom of Vedic Numerology.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    about: {
      "@type": "Thing",
      name: "Vedic Numerology",
      description:
        "The ancient science of numbers, planetary vibrations, and spiritual karma.",
    },
    mainEntity: {
      "@type": "WebApplication",
      name: "Vedic Numerology Calculator",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(numerologyJsonLd)}
      />
      <NumerologyPageClient />
    </>
  );
}
