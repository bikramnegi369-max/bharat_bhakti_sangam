"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { popularFestivalsList } from "@/_lib/constants/festivals.constants";
import { playfair, poppins } from "@/_lib/fonts";

export default function PopularFestivalsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#FFFDF9] border-b border-amber-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading in Playfair Font */}
        <div className="text-center mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Featured Sacred Observances</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          <h2
            className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-bold text-heading tracking-tight`}
          >
            Popular <span className="text-amber-600">Festivals</span>
          </h2>

          <p
            className={`${poppins.className} text-xs sm:text-sm text-stone-500 font-medium max-w-lg mx-auto`}
          >
            Celebrated with deep devotion, timeless rituals, and festive joy
            across India
          </p>
        </div>

        {/* Carousel Container with Arrow Controls */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-amber-200 text-stone-700 items-center justify-center hover:bg-amber-50 hover:text-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-amber-200 text-stone-700 items-center justify-center hover:bg-amber-50 hover:text-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Track */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scrollbar-hide snap-x snap-mandatory items-stretch"
          >
            {popularFestivalsList.map((festival) => (
              <Link
                key={festival.slug}
                href={`/${festival.slug}`}
                className="w-65 sm:w-70 md:w-75 shrink-0 snap-start bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group/card cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label={`View ${festival.title} details`}
              >
                {/* Image & Date Badge */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={festival.image}
                    alt={festival.title}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 300px"
                    className="object-cover group-hover/card:scale-108 transition-transform duration-500 ease-out"
                  />
                  {/* Date Badge (e.g. 14 Jan) */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs rounded-lg px-2.5 py-1 shadow-sm border border-amber-200/60 text-center">
                    <span className="block text-xs sm:text-sm font-bold text-amber-700 leading-tight">
                      {festival.dateBadge.day}
                    </span>
                    <span className="block text-[10px] font-semibold text-stone-500 uppercase leading-none">
                      {festival.dateBadge.month}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div className="space-y-1.5">
                    <h3
                      className={`${playfair.className} text-base sm:text-lg font-bold text-heading group-hover/card:text-amber-700 transition-colors`}
                    >
                      {festival.title}
                    </h3>

                    <p
                      className={`${poppins.className} text-xs text-stone-600 leading-relaxed font-normal`}
                    >
                      {festival.shortDescription}
                    </p>
                  </div>

                  <span className="inline-flex items-center text-xs font-semibold text-primary group-hover/card:text-amber-700 group-hover/card:translate-x-1 transition-all pt-1">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
