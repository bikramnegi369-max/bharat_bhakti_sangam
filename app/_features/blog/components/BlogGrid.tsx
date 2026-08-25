import type { BlogPostCard } from "../types";
import BlogCard from "./BlogCard";
import { BookOpen } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import Link from "next/link";
import ScrollReveal from "@/_components/common/ScrollReveal";

type BlogGridProps = {
  posts: BlogPostCard[];
};

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <ScrollReveal animation="scale-up" duration={700} className="w-full">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#740E0A]/15 bg-white px-6 py-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF7ED] text-[#740E0A]">
            <BookOpen className="h-7 w-7 stroke-[1.5]" />
          </div>
          <h2 className={`${playfair.className} text-2xl font-bold text-[#3F0605]`}>
            No Articles Found
          </h2>
          <p
            className={`${poppins.className} mt-2.5 text-xs sm:text-sm leading-relaxed text-stone-600`}
          >
            We couldn&apos;t find any devotional articles matching your query. Try searching with different keywords or browse the full collection.
          </p>
          <div className="mt-6">
            <Link
              href="/blog"
              className={`${poppins.className} inline-flex items-center justify-center rounded-xl bg-[#740E0A] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#8B140F]`}
            >
              Clear Search & View All
            </Link>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <section
      className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
      aria-label="Blog articles"
    >
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          index={index}
          priority={index < 3}
        />
      ))}
    </section>
  );
}


