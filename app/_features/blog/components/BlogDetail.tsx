import Link from "next/link";
import Hero from "@/_components/sections/Marketing/Hero";
import { playfair } from "@/_lib/fonts";
import type { BlogPost } from "@/_features/blog/types";
import BlogBreadcrumb from "./BlogBreadcrumb";
import { formatBlogDate } from "./formatBlogDate";
import "wp-block-styles/index.min.css"; // Import default WordPress block styles for proper rendering of content

export function BlogDetail({ post }: { post: BlogPost }) {
  return (
    <main>
      <Hero title={post.title} backgroundImage={post.image} />

      <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <BlogBreadcrumb title={post.title} />

        <header className="mx-auto max-w-5xl py-8 text-center">

          <h1
            className={`${playfair.className} mt-4 text-3xl font-bold leading-tight text-stone-800 sm:text-4xl`}
          >
            {post.title}
          </h1>

          <p className="mt-4 text-sm font-medium text-stone-500">
            {formatBlogDate(post.publishedAt)}
            {post.author?.name ? ` by ${post.author.name}` : ""}
          </p>
        </header>

        <div
          className="wp-content mx-auto max-w-5xl pb-12 text-stone-700"
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
