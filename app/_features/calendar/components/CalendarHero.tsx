"use client";

import React from "react";
import Image from "next/image";
import {
  Flame,
  Compass,
  Sparkles,
  Moon,
  Calendar as CalendarIcon,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import {
  HeroConfig,
  MetricPill,
  CalendarCategory,
} from "@/_types/calendar.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

const ICON_MAP = {
  Flame,
  Compass,
  Sparkles,
  Moon,
  Calendar: CalendarIcon,
};

interface CalendarHeroProps {
  heroConfig: HeroConfig;
  onFilterClick?: (category: CalendarCategory | "all") => void;
}

export default function CalendarHero({
  heroConfig,
  onFilterClick,
}: CalendarHeroProps) {
  return (
    <section className="relative w-full pt-8 pb-12 lg:pt-14 lg:pb-16 overflow-hidden bg-linear-to-b from-[#F7F2E9] via-[#FAF7F0] to-[#FAF8F5]">
      {/* Subtle Sacred Mandala Background Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/mandala.webp')" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Interactive Metric Cards */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Top Tagline */}
            <ScrollReveal animation="fade-down" delay={50}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300/60 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E86A17] animate-pulse" />
                <span className="text-xs font-semibold tracking-widest text-[#740E0A] uppercase">
                  {heroConfig.tagline}
                </span>
              </div>
            </ScrollReveal>

            {/* Main Hero Title */}
            <ScrollReveal animation="fade-up" delay={150}>
              <h1
                className={`${playfair.className} text-4xl sm:text-5xl lg:text-6xl font-bold text-[#370504] tracking-tight leading-[1.15]`}
              >
                {heroConfig.title.prefix}{" "}
                <span className="italic font-normal text-[#740E0A] underline decoration-amber-400/50 decoration-wavy underline-offset-8">
                  {heroConfig.title.highlight}
                </span>{" "}
                {heroConfig.title.suffix}
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal animation="fade-up" delay={250}>
              <p
                className={`${poppins.className} text-base sm:text-lg text-[#5c5c5c] max-w-2xl leading-relaxed`}
              >
                {heroConfig.description}
              </p>
            </ScrollReveal>

            {/* 4 Interactive Category Metric Pills */}
            <ScrollReveal animation="fade-up" delay={350} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 w-full">
                {heroConfig.metricPills.map((pill: MetricPill) => {
                  const IconComponent = ICON_MAP[pill.iconName] || Flame;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => onFilterClick?.(pill.category)}
                      className="group flex flex-col items-start p-3 sm:p-3.5 bg-white/90 hover:bg-white rounded-xl border border-amber-200/70 hover:border-[#740E0A]/40 shadow-xs hover:shadow-md transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-0.5"
                      title={`Filter calendar by ${pill.title}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: `${pill.accentColor}15`,
                            color: pill.accentColor,
                          }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-bold text-[#740E0A] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
                          {pill.count}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#370504] line-clamp-1 group-hover:text-[#740E0A]">
                        {pill.title}
                      </div>
                      <div className="text-[11px] text-[#71717A] line-clamp-1">
                        {pill.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Custom Asymmetric Organic Shield Curved Frame matching User Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal
              animation="fade-left"
              delay={200}
              className="relative w-full max-w-lg"
            >
              <div className="relative p-3">
                {/* 1. Underlying Translucent Backdrop Leaf Layer */}
                <div className="absolute inset-0 bg-stone-300/40 backdrop-blur-xs rounded-tr-[130px] rounded-bl-[130px] sm:rounded-tr-[170px] sm:rounded-bl-[170px] rounded-tl-2xl rounded-br-2xl border border-white/70 shadow-2xl -translate-x-3 translate-y-3 pointer-events-none" />

                {/* 2. Main Picture Container with Exact Diagonal Curved Silhouette */}
                <div className="relative aspect-16/11 w-full rounded-tr-[120px] rounded-bl-[120px] sm:rounded-tr-[160px] sm:rounded-bl-[160px] rounded-tl-xl rounded-br-xl overflow-hidden shadow-2xl border-4 sm:border-6 border-white group">
                  <Image
                    src={heroConfig.heroImage}
                    alt={heroConfig.heroImageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
