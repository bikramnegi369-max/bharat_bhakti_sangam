import type { Metadata } from "next";
import { seoConfig, SeoPageKey } from "@/_config/Seo.config";
import { siteConfig } from "@/_config/Site.config";

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

/* -------------------------------- HELPERS -------------------------------- */

function toAbsoluteUrl(url: string) {
  if (!url) return siteConfig.url;
  if (url.startsWith("http")) return url;
  return `${siteConfig.url}${url}`;
}

function optimizeTitle(title: string) {
  if (title.length >= 50) return title;
  return `${title}`;
}

function optimizeDescription(description: string) {
  if (description.length >= 110) return description;
  return `${description} Explore events, book tickets, and experience unforgettable moments.`;
}

/* --------------------------- MAIN METADATA BUILDER --------------------------- */

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  keywords = [],
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const absoluteUrl = toAbsoluteUrl(path);
  const absoluteImage = toAbsoluteUrl(image);

  const finalTitle = optimizeTitle(title);
  const finalDescription = optimizeDescription(description);

  return {
    metadataBase: new URL(siteConfig.url),

    title: finalTitle,
    description: finalDescription,

    keywords: [...siteConfig.keywords, ...keywords],

    alternates: {
      canonical: absoluteUrl,
    },

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: absoluteUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [absoluteImage],
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

    // 🔥 underrated but useful
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

/* --------------------------- CONFIG WRAPPER --------------------------- */

export function createPageMetadataFromConfig(
  page: SeoPageKey,
  overrides?: Partial<CreatePageMetadataOptions>,
): Metadata {
  const base = seoConfig[page];

  return createPageMetadata({
    title: overrides?.title ?? base.title,
    description: overrides?.description ?? base.description,
    path: overrides?.path ?? base.path,
    image: overrides?.image ?? base.image ?? siteConfig.ogImage,
    keywords: overrides?.keywords ?? base.keywords ?? [],
    noIndex: overrides?.noIndex ?? base.noIndex ?? false,
  });
}

/* --------------------------- JSON-LD --------------------------- */

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
