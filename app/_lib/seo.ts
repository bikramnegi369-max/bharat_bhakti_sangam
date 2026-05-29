import type { Metadata } from "next";
import { seoConfig, SeoPageKey } from "@/_config/Seo.config";
import { siteConfig } from "@/_config/Site.config";
import type { BlogSeo } from "@/_features/blog/types";

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogKey?: string;
};

type BlogSeoMetadataFallback = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
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
  const brandName = siteConfig.name.trim();
  // Normalize whitespace to prevent double branding caused by extra spaces or hidden characters
  const normalizedTitle = title.replace(/\s+/g, " ").toLowerCase();
  const normalizedName = brandName.replace(/\s+/g, " ").toLowerCase();

  if (normalizedTitle.includes(normalizedName)) return title;

  return `${title} | ${brandName}`;
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

function parseYoastRobotDirective(value?: string) {
  if (!value) return undefined;

  const [, directiveValue] = value.split(":");

  return directiveValue ?? value;
}

function parseYoastRobotNumber(value?: string) {
  const directiveValue = parseYoastRobotDirective(value);
  if (!directiveValue) return undefined;

  const numberValue = Number(directiveValue);

  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function parseYoastImagePreview(value?: string) {
  const directiveValue = parseYoastRobotDirective(value);

  if (
    directiveValue === "none" ||
    directiveValue === "standard" ||
    directiveValue === "large"
  ) {
    return directiveValue;
  }

  return undefined;
}

function createRobotsMetadata(
  seo?: BlogSeo,
  noIndex = false,
): Metadata["robots"] {
  const shouldIndex = seo?.robots?.index
    ? seo.robots.index !== "noindex"
    : !noIndex;
  const shouldFollow = seo?.robots?.follow
    ? seo.robots.follow !== "nofollow"
    : !noIndex;

  return {
    index: shouldIndex,
    follow: shouldFollow,
    googleBot: {
      index: shouldIndex,
      follow: shouldFollow,
      "max-image-preview":
        parseYoastImagePreview(seo?.robots?.maxImagePreview) ?? "large",
      "max-snippet": parseYoastRobotNumber(seo?.robots?.maxSnippet) ?? -1,
      "max-video-preview":
        parseYoastRobotNumber(seo?.robots?.maxVideoPreview) ?? -1,
    },
  };
}

function getPrimarySeoImage(seo?: BlogSeo, fallbackImage?: string) {
  return (
    seo?.openGraph?.images?.[0]?.url ?? seo?.twitter?.image ?? fallbackImage
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
      creator: siteConfig.twitter?.creator,
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

export function createPageMetadataFromBlogSeo(
  seo: BlogSeo | undefined,
  fallback: BlogSeoMetadataFallback,
): Metadata {
  const primarySeoImage = getPrimarySeoImage(seo, fallback.image);
  const metadata = createPageMetadata({
    title: seo?.title ?? fallback.title,
    description: seo?.description ?? fallback.description,
    path: seo?.canonical ?? fallback.path,
    image: primarySeoImage,
    keywords: fallback.keywords,
    noIndex: fallback.noIndex,
    ogKey: fallback.ogKey,
  });

  const openGraphImages =
    seo?.openGraph?.images?.map((image) => ({
      url: withCacheBusting(getOptimizedOgImage(image.url), fallback.ogKey),
      width: image.width ?? 1200,
      height: image.height ?? 630,
      alt: image.alt ?? fallback.imageAlt ?? seo.title ?? fallback.title,
      type: image.type,
    })) ?? metadata.openGraph?.images;

  return {
    ...metadata,
    title: seo?.title ?? metadata.title,
    description: seo?.description ?? metadata.description,
    alternates: {
      ...metadata.alternates,
      canonical: seo?.canonical ?? metadata.alternates?.canonical,
    },
    openGraph: {
      ...metadata.openGraph,
      title: seo?.openGraph?.title ?? seo?.title ?? metadata.openGraph?.title,
      description:
        seo?.openGraph?.description ??
        seo?.description ??
        metadata.openGraph?.description,
      url: seo?.openGraph?.url ?? seo?.canonical ?? metadata.openGraph?.url,
      siteName: seo?.openGraph?.siteName ?? metadata.openGraph?.siteName,
      locale: seo?.openGraph?.locale ?? metadata.openGraph?.locale,
      type: seo?.openGraph?.type === "article" ? "article" : "website",
      images: openGraphImages,
    },
    twitter: {
      ...metadata.twitter,
      card: seo?.twitter?.card === "summary" ? "summary" : "summary_large_image",
      title: seo?.twitter?.title ?? seo?.title ?? metadata.twitter?.title,
      description:
        seo?.twitter?.description ??
        seo?.description ??
        metadata.twitter?.description,
      images: seo?.twitter?.image
        ? [
            withCacheBusting(
              getOptimizedOgImage(seo.twitter.image),
              fallback.ogKey,
            ),
          ]
        : metadata.twitter?.images,
    },
    robots: createRobotsMetadata(seo, fallback.noIndex),
    other: {
      ...metadata.other,
      ...(seo?.schema
        ? {
            "application/ld+json": JSON.stringify(seo.schema),
          }
        : {}),
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
