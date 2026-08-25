import Image from "next/image";
import Link from "next/link";
import { CalendarDays, UserRound, ArrowRight } from "lucide-react";
import type { BlogPostCard } from "../types";
import { formatBlogDate } from "./formatBlogDate";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

type BlogCardProps = {
  post: BlogPostCard;
  index: number;
  priority?: boolean;
};

export default function BlogCard({
  post,
  index,
  priority = false,
}: BlogCardProps) {
  // Stagger delays gracefully across grid columns
  const delayMs = (index % 6) * 70;

  return (
    <ScrollReveal
      animation="fade-up"
      duration={650}
      delay={priority ? 0 : delayMs}
      threshold={0.08}
      className="h-full"
    >
      <article
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-[#740E0A]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(116,14,10,0.12)] hover:border-[#740E0A]/25"
        aria-label={`Blog post: ${post.title}`}
      >
        {/* Thumbnail Container */}
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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={priority}
              quality={85}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#FFF7ED] via-[#FDF6EC] to-[#F7EFE1] px-6 text-center">
              <span
                className={`${playfair.className} text-base font-bold text-[#740E0A]/80 tracking-wide`}
              >
                Bharat Bhakti Sangam
              </span>
            </div>
          )}

          {/* Floating Category Pill */}
          {post.categories &&
            post.categories.length > 0 &&
            post.categories[0]?.name && (
              <div className="absolute top-3.5 left-3.5 z-10">
                <span
                  className={`${poppins.className} inline-flex items-center rounded-md bg-[#740E0A]/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md shadow-sm border border-white/20`}
                >
                  {post.categories[0].name}
                </span>
              </div>
            )}

          {/* Subtle Dark Gradient at bottom of image for contrast */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        </Link>

        {/* Content Section */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 bg-white">
          <div>
            {/* Post Title */}
            <Link
              href={`/${post.slug}`}
              className={`${playfair.className} block text-lg sm:text-xl font-bold leading-snug text-[#2E0503] transition-colors duration-200 hover:text-[#740E0A]`}
            >
              {post.title}
            </Link>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className={`${poppins.className} mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 line-clamp-3 font-normal`}
              >
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Footer Meta & Action */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1 text-[11px] sm:text-xs text-stone-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays
                  className="h-3.5 w-3.5 text-[#E5A93C]"
                  aria-hidden
                />
                {formatBlogDate(post.publishedAt)}
              </span>
              {post.author?.name && (
                <span className="inline-flex items-center gap-1.5 truncate max-w-32.5 sm:max-w-40">
                  <UserRound
                    className="h-3.5 w-3.5 text-[#740E0A]/70"
                    aria-hidden
                  />
                  {post.author.name}
                </span>
              )}
            </div>

            <Link
              href={`/${post.slug}`}
              prefetch
              className={`${poppins.className} inline-flex items-center gap-1.5 text-xs font-semibold text-[#740E0A] hover:text-[#B31D12] transition-colors group/btn py-1 px-2 rounded-lg hover:bg-[#FFF7ED]`}
              aria-label={`Read article: ${post.title}`}
            >
              <span>Read</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
