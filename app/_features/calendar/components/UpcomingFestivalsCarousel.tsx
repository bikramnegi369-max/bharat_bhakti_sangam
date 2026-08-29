"use client";

import Image from "next/image";
import { playfair } from "@/_lib/fonts";
import { CalendarEventItem } from "@/_types/calendar.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface UpcomingFestivalsCarouselProps {
  festivals: CalendarEventItem[];
  onSelectFestivalDate?: (dateString: string) => void;
}

const MONTH_SHORT_MAP: Record<number, string> = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

export default function UpcomingFestivalsCarousel({
  festivals,
  onSelectFestivalDate,
}: UpcomingFestivalsCarouselProps) {
  if (!festivals || festivals.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-10 lg:py-14 bg-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header with Title */}
        <ScrollReveal animation="fade-right" delay={50}>
          <div>
            <h2
              className={`${playfair.className} text-xl sm:text-2xl lg:text-3xl font-bold text-[#370504] tracking-tight`}
            >
              Upcoming Major Festivals
            </h2>
            <div className="w-12 h-0.5 bg-[#E86A17] mt-1.5 rounded-full" />
          </div>
        </ScrollReveal>

        {/* 5-Column Responsive Cards Grid matching Mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {festivals.map((fest, idx) => {
            const shortMonth = MONTH_SHORT_MAP[fest.monthNumber] || "JUL";

            return (
              <ScrollReveal
                key={fest.id}
                animation="fade-up"
                delay={100 + idx * 50}
              >
                <div
                  onClick={() => onSelectFestivalDate?.(fest.date)}
                  className="group h-full flex flex-col justify-between p-3.5 bg-[#FAF8F5] hover:bg-white rounded-2xl border border-amber-200/70 hover:border-[#740E0A]/40 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Top Row: Date Badge + Thumbnail */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-10 text-center">
                        <span
                          className={`${playfair.className} text-lg sm:text-xl font-bold text-[#370504] leading-none group-hover:text-[#740E0A] transition-colors`}
                        >
                          {String(fest.dayNumber).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] font-semibold text-[#71717A] uppercase tracking-wider">
                          {shortMonth}
                        </span>
                      </div>

                      {/* Thumbnail Image */}
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-2xs border border-amber-100 shrink-0">
                        <Image
                          src={fest.image || "/festivals/slider/image-1.webp"}
                          alt={fest.title}
                          fill
                          sizes="44px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Festival Title */}
                    <h3
                      className={`${playfair.className} text-xs sm:text-sm font-bold text-[#370504] line-clamp-2 group-hover:text-[#740E0A] transition-colors leading-snug mb-1`}
                    >
                      {fest.title}
                    </h3>

                    {fest.subtitle && (
                      <p className="text-[10px] text-[#740E0A] font-medium truncate">
                        {fest.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
