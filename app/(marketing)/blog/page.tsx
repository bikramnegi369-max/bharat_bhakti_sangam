import BlogGrid from "@/_features/blog/components/BlogGrid";
import BlogSearchAndPagination from "@/_features/blog/components/BlogSearchAndPagination";
import { getBlogPosts } from "@/_features/blog/services/wordpress.service";
import { cinzel } from "@/_lib/fonts";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = createPageMetadataFromConfig("blog");

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, q } = await searchParams;
  const searchQuery = q?.trim() ?? "";
  const blog = await getBlogPosts({
    page,
    search: searchQuery,
  });

  return (
    <div>
      <a
        href="#blog-list"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-lg bg-amber-500 px-4 py-2 text-white"
      >
        Skip to blog list
      </a>

      <section className="bg-linear-to-b from-secondary via-white to-white px-4 py-14 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
            Devotion, culture, and gatherings
          </p>
          <h1
            className={`${cinzel.className} mt-4 text-4xl font-bold leading-tight text-stone-800 sm:text-5xl`}
          >
            Bharat Bhakti <span className="text-amber-500">Blog</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-lg">
            Read stories, guides, and reflections from Bharat Bhakti Sangam
            covering devotional music, spiritual celebrations, and India&apos;s
            living bhakti traditions.
          </p>
        </div>
      </section>

      <section
        id="blog-list"
        className="mx-auto max-w-7xl space-y-8 px-4 pb-16 sm:px-6 lg:px-8"
      >
        <BlogSearchAndPagination
          currentPage={blog.page}
          totalPages={blog.totalPages}
          total={blog.total}
          searchQuery={searchQuery}
        />
        <BlogGrid posts={blog.posts} />
        <BlogSearchAndPagination
          currentPage={blog.page}
          totalPages={blog.totalPages}
          total={blog.total}
          searchQuery={searchQuery}
        />
      </section>
    </div>
  );
}
