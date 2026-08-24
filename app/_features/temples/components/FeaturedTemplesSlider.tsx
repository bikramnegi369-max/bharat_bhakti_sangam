"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, ArrowRight } from "lucide-react";
import { temples } from "@/_lib/constants/temples.constants";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

// Top 8 iconic pilgrimage shrines for the featured highlight slider
const FEATURED_SLUGS = [
  "kashi-vishwanath-temple",
  "kedarnath-temple",
  "badrinath-temple",
  "tirupati-balaji-temple",
  "somnath-temple",
  "jagannath-temple",
  "meenakshi-temple",
  "ram-mandir-ayodhya",
  "banke-bihari-temple",
];

export default function FeaturedTemplesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter or fallback to first temples if specific slugs not matched
  const featuredTemples = temples.filter((t) => FEATURED_SLUGS.includes(t.slug));
  const displayTemples = featuredTemples.length >= 4 ? featuredTemples : temples.slice(0, 8);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#FCFAF5] border-b border-amber-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal animation="fade-down" duration={750} threshold={0.15} className="text-center mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Iconic Pilgrimage Shrines</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h2
            className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-heading tracking-tight`}
          >
            Featured <span className="text-amber-600">Sacred Sanctums</span>
          </h2>

          <p
            className={`${poppins.className} text-xs sm:text-sm text-stone-600 font-normal max-w-lg mx-auto`}
          >
            Revered across millennia as the spiritual epicenters of devotion,
            cosmic energy, and architectural grandeur.
          </p>
        </ScrollReveal>

        {/* Carousel Container with Controls */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll featured temples left"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-amber-200 text-stone-700 items-center justify-center hover:bg-amber-50 hover:text-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll featured temples right"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-amber-200 text-stone-700 items-center justify-center hover:bg-amber-50 hover:text-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide snap-x snap-mandatory items-stretch"
          >
            {displayTemples.map((temple, idx) => {
              const locationText =
                temple.location?.title?.replace(" Location", "") ||
                temple.location?.description?.split(",")[0] ||
                "India";

              return (
                <div
                  key={temple.slug}
                  className="w-72 sm:w-80 shrink-0 snap-start"
                >
                  <Link
                    href={`/${temple.slug}`}
                    className="h-full bg-white rounded-2xl border border-[#F3E7D7] shadow-sm hover:shadow-xl hover:border-amber-300/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group/card cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                    aria-label={`View ${temple.name} details`}
                  >
                    {/* Image & Badges */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={temple.heroImage}
                        alt={temple.name}
                        fill
                        sizes="(max-width: 640px) 280px, 320px"
                        priority={idx < 2}
                        className="object-cover group-hover/card:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                      {/* Location Chip */}
                      <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-amber-200 text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/10">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate max-w-45">{locationText}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                      <div className="space-y-1.5">
                        <h3
                          className={`${playfair.className} text-lg sm:text-xl font-bold text-heading group-hover/card:text-primary transition-colors line-clamp-1`}
                        >
                          {temple.name}
                        </h3>

                        <p
                          className={`${poppins.className} text-xs text-stone-600 leading-relaxed font-normal line-clamp-2`}
                        >
                          {temple.description}
                        </p>
                      </div>

                      {/* Footer Link */}
                      <div className="pt-2 border-t border-amber-100/80 flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-700">
                          {temple.bestTimeToVisit ? `Season: ${temple.bestTimeToVisit}` : "Open Daily"}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover/card:translate-x-1 transition-transform">
                          <span>Sanctum Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
