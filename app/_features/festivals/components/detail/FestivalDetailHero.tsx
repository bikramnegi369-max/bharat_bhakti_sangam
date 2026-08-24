import Image from "next/image";
import Link from "next/link";
import { FestivalDetailData } from "@/_types/festivals.types";
import { playfair, poppins } from "@/_lib/fonts";
import { ChevronRight } from "lucide-react";

export default function FestivalDetailHero({
  festival,
}: {
  festival: FestivalDetailData;
}) {
  return (
    <header className="relative w-full min-h-130 sm:min-h-145 md:min-h-160 flex flex-col justify-between overflow-hidden bg-[#1f0404]">
      {/* Background Image with Enhanced Visibility */}
      <div className="absolute inset-0 z-0">
        <Image
          src={festival.heroImage}
          alt={festival.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 brightness-100 saturate-125"
        />
        {/* Soft, transparent gradient that lets the background show through */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1b0303]/85 via-black/25 to-black/45" />
      </div>

      {/* Top Breadcrumb Nav */}
      <nav
        aria-label="Breadcrumb"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full"
      >
        <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-200 font-medium drop-shadow-md">
          <li>
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400/80" />
          <li>
            <Link
              href="/festivals"
              className="hover:text-amber-300 transition-colors"
            >
              Festivals
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-amber-400/80" />
          <li className="text-amber-300 font-semibold truncate max-w-45 sm:max-w-none">
            {festival.name}
          </li>
        </ol>
      </nav>

      {/* Center Ultra-Glassmorphic Banner Card letting the background scenery show through */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-12 md:py-16 my-auto">
        <div className="bg-white/10 backdrop-blur-md sm:backdrop-blur-lg border border-white/30 rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.45)] space-y-4 animate-in fade-in zoom-in-95 duration-700">
          {/* Main Name */}
          <h1
            className={`${playfair.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-wider uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]`}
          >
            {festival.name}
          </h1>

          {/* Subtitle / Tagline pill with subtle translucency */}
          <div className="inline-block px-5 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-white/60">
            <p
              className={`${playfair.className} text-sm sm:text-base md:text-lg font-bold text-heading italic tracking-wide`}
            >
              {festival.tagline}
            </p>
          </div>

          {/* Intro Description */}
          <p
            className={`${poppins.className} text-stone-100 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pt-2`}
          >
            {festival.listingCard.shortDescription}
          </p>
        </div>
      </div>

      {/* Bottom Subtle Gradient Spacer */}
      <div className="relative z-10 h-6 bg-linear-to-t from-[#FFFDF9] to-transparent w-full" />
    </header>
  );
}
