import type { Metadata } from "next";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import { SponsorPageClient } from "@/_features/sponsors/components/SponsorPageClient";
import { siteConfig } from "@/_config/Site.config";

export const metadata: Metadata = createPageMetadataFromConfig("sponsors");

export default function SponsorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sponsorship Opportunities | Bharat Bhakti Sangam",
    description:
      "Partner with Bharat Bhakti Sangam. Support an experience where music, devotion, and community come together. Explore title, stage, musical, and hospitality sponsorship opportunities.",
    url: `${siteConfig.url}/sponsors`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    mainEntity: {
      "@type": "Action",
      name: "Sponsor Bharat Bhakti Sangam",
      target: `${siteConfig.url}/sponsors#sponsorship-form`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full">
        <SponsorPageClient />
      </main>
    </>
  );
}
