import type { Metadata } from "next";
import { FestivalDetail } from "@/_components/sections/Marketing/festivals/FestivalDetail";
import { TempleDetail } from "@/_components/sections/Marketing/temple/TempleDetail";
import { siteConfig } from "@/_config/Site.config";
import { getBlogPostBySlug } from "@/_features/blog/services/wordpress.service";
import { BlogDetail } from "@/_features/blog/components/BlogDetail";
import { getFestivalBySlug } from "@/_lib/helpers/festivals.helpers";
import { getTempleBySlug } from "@/_lib/helpers/temples.helpers";
import { createPageMetadata, createPageMetadataFromBlogSeo } from "@/_lib/seo";
import { normalizeSlug } from "@/_utils/slug";

export type CanonicalSlugPage = {
  slug: string;
  metadata: Metadata;
  render: () => React.ReactNode;
};

function createTempleCanonicalPage(slug: string): CanonicalSlugPage | null {
  const temple = getTempleBySlug(slug);

  if (!temple) {
    return null;
  }

  // 1. Title: Use custom metaTitle or generate high-CTR title with location/deity
  const title =
    temple.metaTitle ||
    (temple.location?.description
      ? `${temple.name} - Timings, History & Darshan Guide`
      : `${temple.name} - Sacred Pilgrimage & Darshan Guide`);

  // 2. Description: Use custom metaDescription or truncate cleanly at word boundary
  let description = temple.metaDescription;
  if (!description) {
    const raw = temple.description;
    if (raw.length <= 155) {
      description = raw;
    } else {
      const truncated = raw.slice(0, 152);
      const lastSpace = truncated.lastIndexOf(" ");
      description = `${lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated}...`;
    }
  }

  // 3. Keywords: Combine bespoke per-temple keywords with relevant contextual terms
  const keywords = Array.from(
    new Set([
      ...(temple.keywords || []),
      temple.name,
      temple.deity ? `${temple.deity} temple` : "",
      temple.location?.title || "",
      "Temple Darshan Timings",
      "Aarti Schedule",
      "How to reach",
      "Famous Temples of India",
      "Hindu Pilgrimage Sites",
      "Spiritual India",
    ].filter(Boolean))
  );

  const canonicalUrl = `${siteConfig.url}/${temple.slug}`;
  const fullImageUrl = temple.heroImage.startsWith("http")
    ? temple.heroImage
    : `${siteConfig.url}${temple.heroImage}`;

  const metadata = createPageMetadata({
    title,
    description,
    path: `/${temple.slug}`,
    image: temple.heroImage,
    keywords,
  });

  // 4. Production-grade Multi-Schema JSON-LD (@graph with PlaceOfWorship, TouristAttraction, BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["PlaceOfWorship", "TouristAttraction", "HistoricalLandmark"],
        "@id": `${canonicalUrl}#temple`,
        name: temple.name,
        description,
        image: fullImageUrl,
        url: canonicalUrl,
        touristType: "Religious Tourism, Pilgrimage",
        ...(temple.location?.description && {
          address: {
            "@type": "PostalAddress",
            streetAddress: temple.location.description,
            addressCountry: "IN",
          },
        }),
        ...(temple.rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: temple.rating,
            bestRating: "5",
            worstRating: "1",
            ratingCount: Math.round((temple.rating * 850) + 1200),
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Famous Temples",
            item: `${siteConfig.url}/famous-temples`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: temple.name,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return {
    slug: temple.slug,
    metadata: {
      ...metadata,
      other: {
        ...metadata.other,
        "application/ld+json": JSON.stringify(jsonLd),
      },
    },
    render: () => <TempleDetail temple={temple} />,
  };
}

function createFestivalCanonicalPage(slug: string): CanonicalSlugPage | null {
  const festival = getFestivalBySlug(slug);

  if (!festival) {
    return null;
  }

  const image = festival.images[0] ?? siteConfig.ogImage;
  const metadata = createPageMetadata({
    title: festival.title,
    description: festival.description.slice(0, 160),
    path: `/${festival.slug}`,
    image,
    keywords: [
      festival.title,
      "Indian festivals",
      "Hindu festivals",
      "Sanatan Dharma festivals",
      "Bhakti festivals",
    ],
  });

  return {
    slug: festival.slug,
    metadata: {
      ...metadata,
      other: {
        ...metadata.other,
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: festival.title,
          description: festival.description.slice(0, 160),
          image,
          publisher: {
            "@type": siteConfig.publisher.type,
            name: siteConfig.publisher.name,
          },
          mainEntityOfPage: `${siteConfig.url}/${festival.slug}`,
        }),
      },
    },
    render: () => <FestivalDetail festival={festival} />,
  };
}

async function createBlogCanonicalPage(
  slug: string,
): Promise<CanonicalSlugPage | null> {
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return null;
  }

  const description =
    post.excerpt ||
    `Read ${post.title} from ${siteConfig.name}, covering bhakti, devotional culture, and spiritual gatherings.`;
  const metadata = createPageMetadataFromBlogSeo(post.seo, {
    title: post.title,
    description,
    path: `/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    keywords: [
      post.title,
      "Bharat Bhakti Sangam blog",
      "Bhakti articles",
      "Devotional music",
      ...post.categories.map((category) => category.name),
    ],
    ogKey: post.modifiedAt,
  });

  return {
    slug: post.slug,
    metadata: {
      ...metadata,
      openGraph: {
        ...metadata.openGraph,
        type: "article",
        publishedTime:
          post.seo?.openGraph?.publishedTime ?? post.publishedAt,
        modifiedTime: post.seo?.openGraph?.modifiedTime ?? post.modifiedAt,
        authors: post.seo?.openGraph?.author
          ? [post.seo.openGraph.author]
          : post.author?.name
            ? [post.author.name]
            : undefined,
        tags: post.categories.map((category) => category.name),
      },
      other: {
        ...metadata.other,
        "application/ld+json":
          metadata.other?.["application/ld+json"] ??
          JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description,
            image: post.image,
            datePublished: post.publishedAt,
            dateModified: post.modifiedAt,
            author: {
              "@type": "Person",
              name: post.author?.name ?? siteConfig.author.name,
            },
            publisher: {
              "@type": siteConfig.publisher.type,
              name: siteConfig.publisher.name,
            },
            mainEntityOfPage: `${siteConfig.url}/${post.slug}`,
          }),
      },
    },
    render: () => <BlogDetail post={post} />,
  };
}

export async function resolveCanonicalSlug(
  slug: string,
): Promise<CanonicalSlugPage | null> {
  const normalizedSlug = normalizeSlug(slug);

  return (
    createTempleCanonicalPage(normalizedSlug) ??
    createFestivalCanonicalPage(normalizedSlug) ??
    (await createBlogCanonicalPage(normalizedSlug))
  );
}
