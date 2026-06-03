import Link from "next/link";
import Hero from "@/_components/sections/Marketing/Hero";
import { cinzel } from "@/_lib/fonts";
import type { BlogPost } from "@/_features/blog/types";
import BlogBreadcrumb from "./BlogBreadcrumb";
import { formatBlogDate } from "./formatBlogDate";

export function BlogDetail({ post }: { post: BlogPost }) {
  return (
    <main>
      <Hero title={post.title} backgroundImage={post.image} />

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
