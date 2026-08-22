import Link from "next/link";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Star, MapPin, ChevronRight } from "lucide-react";
import type { Temple } from "@/_types/Temples.types";

interface TempleHeroHeaderProps {
  temple: Temple;
}

export default function TempleHeroHeader({ temple }: TempleHeroHeaderProps) {
  return (
    <section className="relative w-full min-h-120 sm:min-h-135 lg:min-h-145 flex flex-col justify-between text-white overflow-hidden bg-stone-900">
      {/* Background Image with Depth Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={temple.heroImage}
          alt={temple.name}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic dark luxury gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/40 to-stone-950/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-16 flex flex-col justify-between flex-1">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className={`${poppins.className} flex items-center gap-2 text-xs sm:text-sm text-stone-300 mb-6`}
        >
          <Link
            href="/"
            className="hover:text-amber-400 transition-colors text-stone-400"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          <Link
            href="/famous-temples"
            className="hover:text-amber-400 transition-colors text-stone-400"
          >
            Temples
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-amber-400 font-medium truncate max-w-50 sm:max-w-none">
            {temple.name}
          </span>
        </nav>

        {/* Hero Title & Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-auto pb-4">
          {/* Main Title & Overview */}
          <div className="lg:col-span-8 space-y-3">
            <h1
              className={`${playfair.className} text-3xl sm:text-5xl lg:text-[54px] font-bold uppercase tracking-wider text-white drop-shadow-md leading-[1.1]`}
            >
              {temple.name}
            </h1>

            {temple.subtitle && (
              <p
                className={`${playfair.className} italic text-stone-300 text-base sm:text-xl font-normal tracking-wide`}
              >
                {temple.subtitle}
              </p>
            )}

            <p
              className={`${poppins.className} text-stone-300/90 text-xs sm:text-sm leading-relaxed max-w-2xl font-light line-clamp-3 sm:line-clamp-none`}
            >
              {temple.description}
            </p>

            {/* Meta Tags: Rating & Location */}
            <div
              className={`${poppins.className} flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-stone-300`}
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="ml-1 text-stone-200 text-xs">
                  {temple.ratingText || "4.9 (42k+ Reviews)"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-stone-300 text-xs">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {temple.location?.title?.replace(" Location", "") ||
                    "Varanasi, UP"}
                </span>
              </div>
            </div>
          </div>

          {/* Luxury ESTD Gold Bordered Frame Badge */}
          <div className="lg:col-span-4 flex lg:justify-end pb-2">
            <div className="border-2 border-amber-300/70 bg-stone-950/40 backdrop-blur-md px-8 py-5 text-center shadow-2xl relative min-w-37.5">
              <div className="w-4 h-0.5 bg-amber-400 mx-auto mb-1.5" />
              <span
                className={`${poppins.className} block text-[10px] tracking-[0.25em] text-stone-300 uppercase font-semibold`}
              >
                ESTD
              </span>
              <span
                className={`${playfair.className} text-2xl sm:text-3xl font-bold text-amber-300 tracking-wider block mt-0.5`}
              >
                {temple.established?.replace(" AD", "") || "1780"}{" "}
                <span className="text-sm font-semibold">AD</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
