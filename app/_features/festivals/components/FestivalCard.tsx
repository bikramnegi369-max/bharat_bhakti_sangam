"use client";

import Image from "next/image";
import Link from "next/link";
import { FestivalListingCardItem } from "@/_lib/constants/festivals.constants";
import { playfair, poppins } from "@/_lib/fonts";
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

interface FestivalCardProps {
  festival: FestivalListingCardItem;
  priority?: boolean;
}

export default function FestivalCard({
  festival,
  priority = false,
}: FestivalCardProps) {
  return (
    <article
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col md:flex-row items-stretch"
      aria-label={`Festival: ${festival.title}`}
    >
      {/* ── Left Image Banner ── */}
      <div className="relative w-full md:w-5/12 lg:w-4/12 min-h-60 sm:min-h-70 md:min-h-75 shrink-0 overflow-hidden bg-stone-100">
        <Image
          src={festival.image}
          alt={festival.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 42vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent md:hidden" />
      </div>

      {/* ── Right Content ── */}
      <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2.5">
          {/* Title */}
          <h2
            className={`${playfair.className} text-2xl sm:text-3xl font-bold text-heading group-hover:text-primary transition-colors`}
          >
            <Link href={`/${festival.slug}`} className="hover:underline">
              {festival.title}
            </Link>
          </h2>

          {/* Description — Full description without truncation */}
          <p
            className={`${poppins.className} text-stone-600 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal`}
          >
            {festival.shortDescription}
          </p>
        </div>

        {/* Meta Info Metrics & CTA Row */}
        <div className="space-y-4 pt-2 border-t border-stone-100">
          {/* 3 Metric Pills — Full text wrapped, no truncation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            {/* Season/Timing */}
            <div className="flex items-start gap-2.5 text-stone-600 bg-amber-50/70 border border-amber-100/80 rounded-xl px-3 py-2.5">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Timing
                </span>
                <span className="font-semibold text-stone-800 wrap-break-word leading-snug">
                  {festival.season}
                </span>
              </div>
            </div>

            {/* Region */}
            <div className="flex items-start gap-2.5 text-stone-600 bg-amber-50/70 border border-amber-100/80 rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Region
                </span>
                <span className="font-semibold text-stone-800 wrap-break-word leading-snug">
                  {festival.region}
                </span>
              </div>
            </div>

            {/* Significance */}
            <div className="flex items-start gap-2.5 text-stone-600 bg-amber-50/70 border border-amber-100/80 rounded-xl px-3 py-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Significance
                </span>
                <span className="font-semibold text-stone-800 wrap-break-word leading-snug">
                  {festival.significance}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-1 flex items-center justify-start">
            <Link
              href={`/${festival.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-[#520906] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-98"
              aria-label={`Explore ${festival.title}`}
            >
              <span>Explore Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
