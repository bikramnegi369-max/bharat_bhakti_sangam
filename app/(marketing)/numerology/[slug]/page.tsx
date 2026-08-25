import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/_config/Site.config";
import { jsonLdScript } from "@/_lib/seo";
import {
  getNumberDetailBySlug,
  getAllNumberDetailSlugs,
} from "@/_features/numerology/constants/numbers";
import { NumberDetailPageClient } from "@/_features/numerology/components/detail/NumberDetailPageClient";

interface NumberDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllNumberDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NumberDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getNumberDetailBySlug(slug);

  if (!config) {
    return {
      title: "Numerology Number Profile",
      description: "Discover the deep spiritual vibrations of your Vedic numerology number.",
    };
  }

  const pageTitle = `Number ${config.number} Numerology - ${config.title}: Traits, Career, Compatibility & Remedies`;
  const pageDescription = `Explore Number ${config.number} (${config.heroCard.planet}) Vedic numerology profile. Comprehensive guide to personality traits, business success, lucky dates, ruling deities, and remedies.`;
  const pageUrl = `${siteConfig.url}/numerology/${config.slug}`;

  return {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: [
        {
          url: `${siteConfig.url}${config.heroImageSrc}`,
          width: 1200,
          height: 630,
          alt: `${config.title} Number ${config.number} Vedic Numerology`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${siteConfig.url}${config.heroImageSrc}`],
    },
  };
}

export default async function NumberDetailPage({ params }: NumberDetailPageProps) {
  const { slug } = await params;
  const config = getNumberDetailBySlug(slug);

  if (!config) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Number ${config.number} Vedic Numerology: ${config.title}`,
    description: config.description,
    url: `${siteConfig.url}/numerology/${config.slug}`,
    image: `${siteConfig.url}${config.heroImageSrc}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    about: {
      "@type": "Thing",
      name: `Vedic Numerology Number ${config.number}`,
      description: `${config.title} ruled by ${config.heroCard.planet}`,
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: config.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(structuredData)}
      />
      <NumberDetailPageClient config={config} />
    </>
  );
}
