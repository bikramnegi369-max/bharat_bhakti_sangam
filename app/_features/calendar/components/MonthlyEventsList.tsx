"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { playfair } from "@/_lib/fonts";
import { CalendarEventItem } from "@/_types/calendar.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface MonthlyEventsListProps {
  monthName: string;
  year: number;
  events: CalendarEventItem[];
  onSelectEventDate?: (dateString: string) => void;
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

export default function MonthlyEventsList({
  monthName,
  year,
  events,
  onSelectEventDate,
}: MonthlyEventsListProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-10 lg:py-14 bg-linear-to-b from-[#FAF8F5] to-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal
          animation="fade-down"
          delay={50}
          className="text-center mb-8 lg:mb-10"
        >
          <h2
            className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-[#370504] tracking-tight`}
          >
            {monthName} {year} Events
          </h2>
          <div className="w-16 h-0.5 bg-[#E86A17] mx-auto mt-2 rounded-full" />
        </ScrollReveal>

        {/* 2-Column Grid of Event Cards matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {events.map((evt, index) => {
            const shortMonth = MONTH_SHORT_MAP[evt.monthNumber] || "JUL";

            return (
              <ScrollReveal
                key={evt.id}
                animation="fade-up"
                delay={100 + index * 50}
              >
                <div
                  onClick={() => onSelectEventDate?.(evt.date)}
                  className="group flex items-center justify-between p-3.5 sm:p-4.5 bg-white hover:bg-[#FCFAF5] rounded-2xl border border-amber-200/70 hover:border-[#740E0A]/40 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Left: Date Badge + Thumbnail */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center w-11 sm:w-12 text-center">
                      <span
                        className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#370504] leading-none group-hover:text-[#740E0A] transition-colors`}
                      >
                        {String(evt.dayNumber).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-semibold text-[#71717A] uppercase tracking-wider mt-0.5">
                        {shortMonth}
                      </span>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-2xs border border-amber-100 shrink-0">
                      <Image
                        src={evt.image || "/festivals/slider/image-1.webp"}
                        alt={evt.title}
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Middle: Title, Subtitle, Description */}
                  <div className="flex-1 px-3 sm:px-4 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <h3
                        className={`${playfair.className} text-sm sm:text-base font-bold text-[#370504] truncate group-hover:text-[#740E0A] transition-colors`}
                      >
                        {evt.title}
                      </h3>
                    </div>

                    {evt.subtitle && (
                      <p className="text-[11px] font-medium text-[#740E0A] truncate">
                        {evt.subtitle}
                      </p>
                    )}

                    {evt.description && (
                      <p className="text-[11px] text-[#71717A] truncate mt-0.5">
                        {evt.description}
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
