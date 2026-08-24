"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, Ticket, MapPin, Star, ArrowRight } from "lucide-react";
import { Temple } from "@/_types/Temples.types";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

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
  // Row-aware modulo stagger delay (0ms, 100ms, 200ms) for natural cascading entrance
  const delayMs = priority ? 0 : (index % 3) * 100;

  // Extract clean location (City, State) from location metadata
  const locationText =
    temple.location?.title?.replace(" Location", "") ||
    temple.location?.description?.split(".")[0]?.split(",").slice(-2).join(",").trim() ||
    "India";

  // Clean concise timing string for display chip
  const cleanTiming = temple.timings
    ? temple.timings.replace("Open: ", "").split(",")[0]?.trim()
    : "Open Daily";

  // Clean concise fee string
  const cleanFee = temple.entryFee
    ? temple.entryFee.toLowerCase().includes("free")
      ? "Free Darshan"
      : temple.entryFee.length > 22
        ? "Entry Pass Available"
        : temple.entryFee
    : "Free Darshan";

  return (
    <ScrollReveal
      animation="fade-up"
      delay={delayMs}
      duration={700}
      threshold={0.08}
      className="h-full w-full"
    >
      <article
        className={[
          "group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#F3E7D7]",
          "hover:shadow-2xl hover:border-amber-300 hover:-translate-y-1.5",
          "transition-all duration-300 ease-out flex flex-col h-full",
        ].join(" ")}
        aria-label={`Temple: ${temple.name}`}
      >
        {/* ── Image & Floating Badges ── */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
          <Image
            src={temple.heroImage}
            alt={temple.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            quality={85}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Ambient Image Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

          {/* Top-Left Significance / Category Badge */}
          {temple.significance ? (
            <div className="absolute top-3 left-3 bg-[#240606]/85 backdrop-blur-md text-amber-300 text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full border border-amber-400/40 shadow-xs uppercase">
              {temple.significance}
            </div>
          ) : (
            <div className="absolute top-3 left-3 bg-[#240606]/80 backdrop-blur-md text-amber-200 text-[11px] font-medium tracking-wide px-3 py-1 rounded-full border border-white/15 shadow-xs">
              Sacred Sanctum
            </div>
          )}

          {/* Bottom Overlay: Location & Rating */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-white">
            <div className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-stone-100 text-xs font-medium px-2.5 py-1 rounded-lg border border-white/15 truncate max-w-[70%]">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{locationText}</span>
            </div>

            <div className="inline-flex items-center gap-1 bg-amber-500/90 backdrop-blur-md text-[#240606] text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{temple.rating ? temple.rating.toFixed(1) : "4.9"}</span>
            </div>
          </div>
        </div>

        {/* ── Card Content Body ── */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1 justify-between">
          <div className="space-y-2.5">
            {/* Deity / Subtitle if available */}
            {temple.deity && (
              <p className="text-[11px] font-semibold text-amber-700 tracking-wider uppercase">
                {temple.deity}
              </p>
            )}

            {/* Temple Name */}
            <h3
              className={`${playfair.className} text-xl sm:text-2xl font-bold text-heading group-hover:text-primary transition-colors leading-snug`}
            >
              <Link
                href={`/${temple.slug}`}
                className="hover:underline focus:outline-none"
              >
                {temple.name}
              </Link>
            </h3>

            {/* Description with clean 2-line clamp */}
            <p
              className={`${poppins.className} text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2`}
            >
              {temple.description}
            </p>
          </div>

          {/* ── Quick Pilgrim Metadata Chips ── */}
          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-amber-100/90 text-xs text-stone-600">
            {/* Timings */}
            <div className="flex items-center gap-2 text-stone-600">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium text-stone-700 shrink-0">Timings:</span>
              <span className="truncate text-stone-500">{cleanTiming}</span>
            </div>

            {/* Best Season */}
            <div className="flex items-center gap-2 text-stone-600">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium text-stone-700 shrink-0">Best Time:</span>
              <span className="truncate text-stone-500">
                {temple.bestTimeToVisit || "October to March"}
              </span>
            </div>

            {/* Entry Fee */}
            <div className="flex items-center gap-2 text-stone-600">
              <Ticket className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium text-stone-700 shrink-0">Entry:</span>
              <span className="truncate text-stone-500">{cleanFee}</span>
            </div>
          </div>

          {/* ── Luxury CTA Action ── */}
          <Link
            href={`/${temple.slug}`}
            prefetch
            className={[
              "mt-2 w-full flex items-center justify-center gap-2 rounded-xl py-3 px-5",
              "bg-primary hover:bg-[#5C0A07] text-white font-medium text-sm tracking-wide",
              "shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-98",
              "group/btn",
            ].join(" ")}
            aria-label={`Explore ${temple.name} details and yatra guide`}
          >
            <span>Explore Sanctum Guide</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
    </ScrollReveal>
  );
}


