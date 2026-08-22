import type { Metadata } from "next";
import { createPageMetadataFromConfig, jsonLdScript } from "@/_lib/seo";
import { siteConfig } from "@/_config/Site.config";
import { FounderPageClient } from "@/_features/founder/components/FounderPageClient";

export const metadata: Metadata = createPageMetadataFromConfig("founder");

export default function FounderPage() {
  const founderJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Deepak Kothari",
      jobTitle: "Founder & Spiritual Curator",
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      image: `${siteConfig.url}/founder.webp`,
      description:
        "Deepak Kothari is the founder and visionary leader of Bharat Bhakti Sangam, pioneering India's nationwide Bhajan Clubbing movement uniting youth through ecstatic devotional music, Vedic chants, and sober celebrations.",
      sameAs: [
        "https://www.instagram.com/bharatbhaktisangam/",
        "https://www.facebook.com/BharatBhaktiSangam",
        "https://www.youtube.com/channel/UCZCiS4nLt1WtcIwtkla3LaQ",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(founderJsonLd)}
      />
      <FounderPageClient />
    </>
  );
}
