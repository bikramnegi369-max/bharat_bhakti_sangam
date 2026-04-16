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
  ogKey?: string;
};

/* -------------------------------- HELPERS -------------------------------- */

function withCacheBusting(url: string, key?: string) {
  if (!key) return url;
  return `${url}${url.includes("?") ? "&" : "?"}v=${encodeURIComponent(key)}`;
}

function toAbsoluteUrl(url?: string) {
  if (!url) return siteConfig.url;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  const normalized = url.startsWith("/") ? url : `/${url}`;
  return `${siteConfig.url}${normalized}`;
}

function optimizeTitle(title: string) {
  if (title.includes(siteConfig.name)) return title;
  return `${title} | ${siteConfig.name}`;
}

function optimizeDescription(description: string) {
  if (description.length >= 110) return description;
  return `${description} ${siteConfig.tagline}.`;
}

function isCloudinaryUrl(url?: string) {
  return !!url && url.includes("res.cloudinary.com");
}

function getOptimizedOgImage(url?: string) {
  if (!url) return siteConfig.ogImage;

  if (!isCloudinaryUrl(url)) {
    return toAbsoluteUrl(url);
  }

  return url.replace(
    "/upload/",
    "/upload/w_1200,h_630,c_fill,q_auto:eco,f_auto/",
  );
}

/* --------------------------- MAIN METADATA BUILDER --------------------------- */

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  keywords = [],
  noIndex = false,
  ogKey,
}: CreatePageMetadataOptions): Metadata {
  const absoluteUrl = toAbsoluteUrl(path);
  const absoluteImage = withCacheBusting(
    getOptimizedOgImage(image || siteConfig.ogImage),
    ogKey,
  );

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
      creator: siteConfig.twitter?.handle,
      site: siteConfig.twitter?.site,
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

    // underrated but useful
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.creator.name,
    publisher: siteConfig.publisher.name,
    applicationName: siteConfig.name,
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
