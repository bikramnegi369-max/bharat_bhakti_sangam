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

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  keywords = [],
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
  };
}

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
    keywords: overrides?.keywords ?? base.keywords,
    noIndex: overrides?.noIndex ?? base.noIndex ?? false,
  });
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
