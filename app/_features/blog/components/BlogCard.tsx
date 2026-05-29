"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, UserRound } from "lucide-react";
import type { BlogPostCard } from "../types";
import { formatBlogDate } from "./formatBlogDate";

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
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(priority);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0]?.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    [],
  );

  useEffect(() => {
    if (priority) return;

    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    });

    observer.observe(card);
    return () => observer.disconnect();
  }, [handleIntersect, priority]);

  const delayMs = Math.min(index * 80, 400);

  return (
    <article
      ref={cardRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={[
        "group overflow-hidden rounded-2xl border border-amber-100 bg-amber-50 shadow-md",
        "flex h-full flex-col transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-xl",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      ].join(" ")}
      aria-label={`Blog post: ${post.title}`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-video w-full overflow-hidden bg-stone-200"
        aria-label={`Read ${post.title}`}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            quality={85}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-amber-100 via-secondary to-stone-100 px-6 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
              Bharat Bhakti Sangam
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={`${post.id}-${category.id}-${category.slug}`}
                className="rounded-full border border-amber-200 bg-white/60 px-3 py-1 text-xs font-semibold text-amber-700"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="text-lg font-semibold leading-snug text-stone-800 transition-colors hover:text-amber-700"
        >
          {post.title}
        </Link>

        {post.excerpt && (
          <p className="text-sm leading-relaxed text-stone-600">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-amber-200 pt-4 text-xs font-medium text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-amber-600" aria-hidden />
            {formatBlogDate(post.publishedAt)}
          </span>

          {post.author?.name && (
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-4 w-4 text-amber-600" aria-hidden />
              {post.author.name}
            </span>
          )}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          prefetch
          className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600 active:bg-amber-700"
          aria-label={`Read full article: ${post.title}`}
        >
          Read Article
        </Link>
      </div>
    </article>
  );
}

