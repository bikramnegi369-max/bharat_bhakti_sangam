"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Temple } from "@/_types/Temples.types";

interface TempleCardProps {
  temple: Temple;
  index: number;
  priority?: boolean;
}

export default function TempleCard({
  temple,
  index,
  priority = false,
}: TempleCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(priority);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // fire once, clean up
      }
    },
    [],
  );

  useEffect(() => {
    if (priority) return;

    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect, priority]);

  // Cap stagger so deep-list cards don't wait too long
  const delayMs = Math.min(index * 80, 400);

  return (
    <article
      ref={cardRef}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      className={[
        "bg-amber-50 rounded-2xl overflow-hidden shadow-md border border-amber-100",
        "transition-all duration-500 ease-out",
        "hover:shadow-xl hover:-translate-y-1",
        "flex flex-col h-full",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      aria-label={`Temple: ${temple.name}`}
    >
      {/* ── Image ── */}
      {/* Fixed aspect-ratio wrapper prevents CLS */}
      <div className="relative w-full aspect-video">
        <Image
          src={temple.heroImage}
          alt={temple.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          quality={85}
          className="object-cover"
        />
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Temple name as a link */}
        <Link
          href={`/${temple.slug}`}
          className="text-amber-600 font-semibold text-lg leading-snug hover:text-amber-700 hover:underline transition-colors"
        >
          {temple.name}
        </Link>

        <p className="text-sm text-stone-500 -mt-2">{temple.description}</p>

        {/* ── Meta list ── semantic <dl> for accessibility + SEO */}
        <dl className="text-sm divide-y divide-amber-300 border-t border-amber-300 mt-1">
          <MetaRow label="Best Time to Visit" value={temple.bestTimeToVisit} />
          <MetaRow label="Timings" value={temple.timings} />
          <MetaRow label="Entry Fees" value={temple.entryFee} />
        </dl>

        {/* ── CTA ── prefetch warms detail page while user reads card */}
        <Link
          href={`/${temple.slug}`}
          prefetch
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-3 px-6 transition-colors duration-200"
          aria-label={`Read more about ${temple.name}`}
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}

// ── Sub-component (same file, no extra file needed) ──────────────────────────
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex py-2 gap-2">
      <dt className="font-semibold text-stone-600 min-w-30 shrink-0">
        {label}:
      </dt>
      <dd className="text-stone-500">{value}</dd>
    </div>
  );
}
