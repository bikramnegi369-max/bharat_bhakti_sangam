import type { Metadata } from "next";
import { createPageMetadataFromConfig, jsonLdScript } from "@/_lib/seo";
import { siteConfig } from "@/_config/Site.config";
import { SanatanaJourneyClient } from "@/_features/sanatana-dharma/components/SanatanaJourneyClient";

export const metadata: Metadata = createPageMetadataFromConfig("sanatanaDharma");

export default function SanatanaDharmaPage() {
  const sanatanaJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: "The Eternal Sanatana Dharma Journey",
    url: `${siteConfig.url}/sanatana-dharma`,
    description:
      "Explore the chronological journey of Sanātana Dharma through cosmic origin, Satya, Treta, Dvapara, and Kali Yugas to the modern Bhakti renaissance.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    about: {
      "@type": "Thing",
      name: "Sanatana Dharma",
      description: "The eternal, cosmic spiritual principles and way of life.",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Sanatana Dharma Cosmic Epochs & Milestones",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Cosmic Origins & Vedic Dawn",
          description: "Hiranyagarbha, AUM, and the revelation of the four Vedas.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Satya Yuga (Golden Age)",
          description: "Matsya, Kurma, Narasimha avatars and supreme truth.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Treta Yuga (Age of Righteousness)",
          description: "Lord Rama, Ramayana, and Maryada Purushottam.",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Dvapara Yuga (Age of Wisdom)",
          description: "Lord Krishna, Bhagavad Gita, and Karma Yoga.",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Kali Yuga & Bhakti Movement",
          description: "Nama Sankirtan, Adi Shankaracharya, and saint-poets.",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Modern Sanatana Renaissance",
          description: "Bhajan Clubbing, global youth awakening, and Bharat Bhakti Sangam.",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(sanatanaJsonLd)}
      />
      <SanatanaJourneyClient />
    </>
  );
}
