import type { BlogPostCard } from "../types";
import BlogCard from "./BlogCard";

type BlogGridProps = {
  posts: BlogPostCard[];
};

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50/80 px-6 py-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-stone-800">
          No articles found
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Try a different search term or return to the full blog archive.
        </p>
      </div>
    );
  }

  return (
    <section
      className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Blog articles"
    >
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          index={index}
          priority={index < 2}
        />
      ))}
    </section>
  );
}

