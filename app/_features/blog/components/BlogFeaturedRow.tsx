import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { BlogPostCard } from "../types";
import { formatBlogDate } from "./formatBlogDate";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

type BlogFeaturedRowProps = {
  posts: BlogPostCard[];
};

export default function BlogFeaturedRow({ posts }: BlogFeaturedRowProps) {
  if (!posts || posts.length === 0) return null;

  // Take the top 4 posts for the featured showcase row
  const featuredPosts = posts.slice(0, 4);

  return (
    <section aria-labelledby="featured-articles-heading" className="w-full">
      {/* Section Header */}
      <ScrollReveal animation="fade-right" duration={700}>
        <div className="flex items-center justify-between gap-4 border-b border-[#740E0A]/15 pb-4 mb-6 sm:mb-8">
          <div className="relative">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden />
              <h2
                id="featured-articles-heading"
                className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#5A100B] tracking-tight`}
              >
                Latest Articles
              </h2>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 sm:-bottom-4.25 left-0 w-24 sm:w-32 h-1 bg-linear-to-r from-[#740E0A] via-[#B31D12] to-[#D4AF37] rounded-full z-10"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* 4-Column Showcase Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredPosts.map((post, idx) => {
          const category = post.categories?.[0]?.name;

          return (
            <ScrollReveal
              key={`featured-${post.id}-${idx}`}
              animation="fade-up"
              duration={650}
              delay={idx * 80}
              threshold={0.1}
            >
              <article className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-[#740E0A]/10 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(116,14,10,0.1)] hover:border-[#740E0A]/30">
                {/* Image */}
                <Link
                  href={`/${post.slug}`}
                  className="relative block aspect-16/10 w-full overflow-hidden bg-stone-100"
                  aria-label={`Read ${post.title}`}
                >
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={idx === 0}
                      quality={85}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#FFF7ED] to-[#F3E5D8] px-4 text-center">
                      <span
                        className={`${playfair.className} text-xs font-semibold text-[#740E0A]/70`}
                      >
                        Bharat Bhakti
                      </span>
                    </div>
                  )}

                  {category && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span
                        className={`${poppins.className} inline-flex items-center rounded-md bg-[#740E0A]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs`}
                      >
                        {category}
                      </span>
                    </div>
                  )}
                </Link>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-4 bg-white">
                  <div>
                    <p
                      className={`${poppins.className} text-[11px] font-medium text-stone-500 mb-1.5`}
                    >
                      {formatBlogDate(post.publishedAt)}
                    </p>
                    <Link
                      href={`/${post.slug}`}
                      className={`${playfair.className} block text-base font-bold leading-snug text-[#2E0503] transition-colors duration-200 hover:text-[#740E0A] line-clamp-2`}
                    >
                      {post.title}
                    </Link>
                    {post.excerpt && (
                      <p
                        className={`${poppins.className} mt-2 text-xs leading-relaxed text-stone-600 line-clamp-2 font-normal`}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span
                      className={`${poppins.className} text-[11px] font-medium text-stone-500 truncate max-w-27.5`}
                    >
                      {post.author?.name || "BBS Editorial"}
                    </span>
                    <Link
                      href={`/${post.slug}`}
                      className={`${poppins.className} inline-flex items-center gap-1 text-xs font-semibold text-[#740E0A] hover:text-[#B31D12] transition-colors group/arrow`}
                    >
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/arrow:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
