import BlogHero from "@/_features/blog/components/BlogHero";
import BlogFeaturedRow from "@/_features/blog/components/BlogFeaturedRow";
import BlogGrid from "@/_features/blog/components/BlogGrid";
import BlogSearchAndPagination from "@/_features/blog/components/BlogSearchAndPagination";
import BlogTopicsSection from "@/_features/blog/components/BlogTopicsSection";
import {
  getBlogIndexSeo,
  getBlogPosts,
} from "@/_features/blog/services/wordpress.service";
import { playfair } from "@/_lib/fonts";
import {
  createPageMetadataFromBlogSeo,
  createPageMetadataFromConfig,
} from "@/_lib/seo";
import { getSeoPageConfig } from "@/_config/Seo.config";
import type { Metadata } from "next";
import ScrollReveal from "@/_components/common/ScrollReveal";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const fallback = getSeoPageConfig("blog");

  try {
    const seo = await getBlogIndexSeo();

    return createPageMetadataFromBlogSeo(seo, fallback);
  } catch (error) {
    console.error("[blog] Failed to load WordPress Yoast SEO", error);

    return createPageMetadataFromConfig("blog");
  }
}

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, q } = await searchParams;
  const searchQuery = q?.trim() ?? "";
  const currentPageNumber = Number(page) || 1;
  const isFirstPageWithoutSearch = currentPageNumber === 1 && !searchQuery;

  const blog = await getBlogPosts({
    page,
    search: searchQuery,
  });

  return (
    <div className="w-full bg-[#FCFAF5] min-h-screen">
      {/* Screen reader skip navigation link */}
      <a
        href="#blog-list"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-lg bg-[#740E0A] px-4 py-2 text-white font-medium shadow-lg"
      >
        Skip to blog articles
      </a>

      {/* 1. Sacred Hero Banner */}
      <BlogHero />

      {/* Main Content Container with high responsiveness across mobile, 1024px tablet/laptop, and widescreen */}
      <div
        id="blog-list"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14 space-y-12 sm:space-y-16"
      >
        {/* 2. Top Search & Controls Bar */}
        <section aria-label="Search and filter articles">
          <BlogSearchAndPagination
            currentPage={blog.page}
            totalPages={blog.totalPages}
            total={blog.total}
            searchQuery={searchQuery}
            variant="top-bar"
          />
        </section>

        {/* 3. Latest Featured Row (Shown prominently on page 1 without search filter) */}
        {isFirstPageWithoutSearch && blog.posts.length > 0 && (
          <BlogFeaturedRow posts={blog.posts} />
        )}

        {/* 4. Main Articles Grid Header & Grid */}
        <section
          aria-labelledby="all-articles-heading"
          className="space-y-6 sm:space-y-8"
        >
          <ScrollReveal animation="fade-right" duration={700}>
            <div className="flex items-center justify-between gap-4 border-b border-[#740E0A]/15 pb-4">
              <div className="relative">
                <h2
                  id="all-articles-heading"
                  className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#5A100B] tracking-tight`}
                >
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : "All Articles"}
                </h2>
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 sm:-bottom-4.25 left-0 w-20 sm:w-28 h-1 bg-linear-to-r from-[#740E0A] via-[#B31D12] to-[#D4AF37] rounded-full z-10"
                />
              </div>
            </div>
          </ScrollReveal>

          <BlogGrid posts={blog.posts} />

          {/* Bottom Pagination Bar directly after Articles Grid */}
          {blog.totalPages > 1 && (
            <ScrollReveal animation="fade-up" duration={600}>
              <div
                aria-label="Articles Pagination"
                className="border-t border-[#740E0A]/10 pt-8 flex justify-center"
              >
                <BlogSearchAndPagination
                  currentPage={blog.page}
                  totalPages={blog.totalPages}
                  total={blog.total}
                  searchQuery={searchQuery}
                  variant="pagination-only"
                />
              </div>
            </ScrollReveal>
          )}
        </section>

        {/* 5. Thematic Explore Collections (Mockup bottom buckets) */}
        {isFirstPageWithoutSearch && <BlogTopicsSection />}
      </div>
    </div>
  );
}
