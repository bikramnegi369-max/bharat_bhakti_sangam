"use client";

import React from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { playfair } from "@/_lib/fonts";
import { HighlightCardData, MoonStatusData } from "@/_types/calendar.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface SpiritualHighlightsSectionProps {
  highlights: HighlightCardData[];
  moonStatus: MoonStatusData;
}

export default function SpiritualHighlightsSection({
  highlights,
  moonStatus,
}: SpiritualHighlightsSectionProps) {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <ScrollReveal animation="fade-down" delay={50}>
          <div className="text-left">
            <h2
              className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#370504] tracking-tight`}
            >
              Today&apos;s Spiritual Highlights
            </h2>
            <div className="w-12 h-0.5 bg-[#E86A17] mt-2 rounded-full" />
          </div>
        </ScrollReveal>

        {/* 3 Highlight Cards Grid matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {highlights.map((card, idx) => (
            <ScrollReveal
              key={card.id}
              animation="fade-up"
              delay={100 + idx * 80}
            >
              <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-white rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all duration-300">
                <div>
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 mb-3">
                    <Sparkles className="w-3 h-3 text-[#E86A17]" />
                    <span className="text-[10px] font-bold tracking-wider text-[#740E0A] uppercase">
                      {card.tag}
                    </span>
                  </div>

                  {/* Sanskrit Script if available */}
                  {card.sanskritScript && (
                    <div className="p-3 mb-3 rounded-xl bg-[#FAF8F5] border border-amber-100">
                      <p className="text-sm sm:text-base font-medium text-[#740E0A] leading-relaxed whitespace-pre-line font-serif">
                        {card.sanskritScript}
                      </p>
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <h3
                    className={`${playfair.className} text-base sm:text-lg font-bold text-[#370504] mb-1.5`}
                  >
                    {card.title}
                  </h3>

                  {card.subtitle && (
                    <p className="text-xs font-semibold text-[#740E0A] mb-2 leading-snug">
                      {card.subtitle}
                    </p>
                  )}

                  {card.description && (
                    <p className="text-xs text-[#5c5c5c] leading-relaxed line-clamp-3">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Full-width Dark Crimson Moon Status Bar matching Mockup */}
        <ScrollReveal animation="fade-up" delay={250}>
          <div className="w-full p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#370504] via-[#520B08] to-[#370504] text-white shadow-xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Moon Status Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  MOON STATUS & TITHI
                </span>
                <p className="text-sm sm:text-base font-semibold text-amber-50">
                  {moonStatus.tithiName}
                </p>
              </div>
            </div>

            {/* Middle: Sunrise / Sunset & Nakshatra */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-amber-100/90">
              <div className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Sunrise: {moonStatus.sunrise}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Moon className="w-4 h-4 text-indigo-300" />
                <span>Sunset: {moonStatus.sunset}</span>
              </div>
              {moonStatus.nakshatra && (
                <div className="hidden sm:flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Nakshatra: {moonStatus.nakshatra}</span>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
