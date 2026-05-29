import BlogBreadcrumb from "@/_features/blog/components/BlogBreadcrumb";
import { formatBlogDate } from "@/_features/blog/components/formatBlogDate";
import {
  getBlogPostBySlug,
  getLatestBlogPostSlugs,
} from "@/_features/blog/services/wordpress.service";
import { siteConfig } from "@/_config/Site.config";
import Hero from "@/_components/sections/Marketing/Hero";
import { cinzel } from "@/_lib/fonts";
import { createPageMetadata } from "@/_lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;
export const dynamicParams = true;

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getLatestBlogPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("[blog] Failed to generate static params", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  const description =
    post.excerpt ||
    `Read ${post.title} from ${siteConfig.name}, covering bhakti, devotional culture, and spiritual gatherings.`;

  const metadata = createPageMetadata({
    title: post.title,
    description,
    path: `/blog/${post.slug}`,
    image: post.image,
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
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.categories.map((category) => category.name),
    },
    other: {
      ...metadata.other,
      "application/ld+json": JSON.stringify({
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
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
      }),
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Hero title={post.title} backgroundImage={post.image ?? siteConfig.ogImage} />

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <BlogBreadcrumb title={post.title} />

        <header className="mx-auto max-w-3xl py-8 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {post.categories.slice(0, 3).map((category) => (
              <span
                key={`${post.id}-${category.id}-${category.slug}`}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
              >
                {category.name}
              </span>
            ))}
          </div>

          <h1
            className={`${cinzel.className} mt-4 text-3xl font-bold leading-tight text-stone-800 sm:text-4xl`}
          >
            {post.title}
          </h1>

          <p className="mt-4 text-sm font-medium text-stone-500">
            {formatBlogDate(post.publishedAt)}
            {post.author?.name ? ` by ${post.author.name}` : ""}
          </p>

          {post.excerpt && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600">
              {post.excerpt}
            </p>
          )}
        </header>

        <div
          className="blog-content mx-auto max-w-3xl pb-12 text-stone-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="border-t border-amber-200 pb-14 pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-colors duration-150 hover:text-amber-700"
          >
            Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}

