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

  const description = temple.description.slice(0, 160);
  const metadata = createPageMetadata({
    title: temple.name,
    description,
    path: `/${temple.slug}`,
    image: temple.heroImage,
    keywords: [
      temple.name,
      "Famous Temples of India",
      "Hindu Temples",
      "Spiritual Sites",
      "Indian Heritage",
    ],
  });

  return {
    slug: temple.slug,
    metadata: {
      ...metadata,
      other: {
        ...metadata.other,
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: temple.name,
          description,
          image: temple.heroImage,
          touristType: "Religious tourism",
          mainEntityOfPage: `${siteConfig.url}/${temple.slug}`,
        }),
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
