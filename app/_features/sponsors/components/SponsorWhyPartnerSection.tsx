"use client";

import React from "react";
import Image from "next/image";
import { Users, Sparkles, Calendar, MapPin, Quote } from "lucide-react";
import {
  SPONSOR_METRICS,
  SPONSOR_QUOTE,
} from "../constants/sponsors.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function SponsorWhyPartnerSection() {
  const renderMetricIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users className="w-6 h-6 text-[#9A3412]" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-[#9A3412]" />;
      case "calendar":
        return <Calendar className="w-6 h-6 text-[#9A3412]" />;
      case "map-pin":
        return <MapPin className="w-6 h-6 text-[#9A3412]" />;
      default:
        return <Users className="w-6 h-6 text-[#9A3412]" />;
    }
  };

  return (
    <section className="relative w-full bg-[#FBF8F2] py-16 sm:py-20 lg:py-24 border-b border-[#EADFCB]/60 overflow-hidden">
      {/* Warm parchment radial illumination from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(254,243,199,0.35),transparent_70%)] pointer-events-none" />

      {/* Decorative Golden Mandala Motifs on Left & Right Sides - Large Full-Height Bleed */}
      <div className="absolute -left-36 sm:-left-48 lg:-left-56 top-1/2 -translate-y-1/2 w-85 sm:w-120 lg:w-150 h-85 sm:h-120 lg:h-150 pointer-events-none select-none opacity-20 sm:opacity-25 z-0">
        <Image
          src="/mandala.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 480px, 600px"
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="absolute -right-36 sm:-right-48 lg:-right-56 top-1/2 -translate-y-1/2 w-85 sm:w-120 lg:w-150 h-85 sm:h-120 lg:h-150 pointer-events-none select-none opacity-25 sm:opacity-35 z-0">
        <Image
          src="/mandala.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 480px, 600px"
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3F0605] tracking-tight">
              WHY <span className="text-[#E86A17]">PARTNER</span> WITH BBS?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed pt-2">
              Be a part of a growing movement that celebrates India&apos;s
              spiritual heritage through music, art, culture and community.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid: 4 Metric Cards + 1 Quote Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {/* 4 Metric Cards (Spanning 4 columns on large screens) */}
          {SPONSOR_METRICS.map((metric, index) => (
            <ScrollReveal
              key={metric.id}
              animation="fade-up"
              delay={100 + index * 80}
              className="h-full"
            >
              <div className="h-full flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-[#FEF8EF] border border-[#E5DFD3] shadow-xs hover:shadow-md hover:border-[#E86A17]/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {renderMetricIcon(metric.iconName)}
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-[#3F0605] tracking-tight mb-1">
                  {metric.value}
                </div>

                <div className="text-sm sm:text-base font-bold text-neutral-800 mb-2">
                  {metric.title}
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed mt-auto">
                  {metric.description}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* 5th Column: Inspirational Quote Card */}
          <ScrollReveal
            animation="fade-up"
            delay={450}
            className="sm:col-span-2 lg:col-span-1 h-full"
          >
            <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#FEF8EF] border border-[#FED7AA] shadow-xs text-center relative overflow-hidden group">
              {/* Decorative background watermark */}
              <div className="absolute -top-4 -right-4 text-[#FED7AA]/30 select-none pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              <div className="flex justify-center text-[#E86A17] mb-3">
                <Quote className="w-7 h-7 rotate-180" />
              </div>

              <blockquote className="text-sm sm:text-base font-semibold text-[#3F0605] leading-snug italic my-auto">
                &ldquo;{SPONSOR_QUOTE.text}&rdquo;
              </blockquote>

              {/* Decorative divider dots */}
              <div className="flex items-center justify-center gap-1.5 pt-4 text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E86A17]" />
                <span className="w-5 h-0.5 bg-[#E86A17]/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#E86A17]" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
