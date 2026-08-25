"use client";

import React from "react";
import { playfair, poppins } from "@/_lib/fonts";
import {
  Sparkles,
  Brain,
  Flame,
  Target,
  Compass,
  Heart,
  Award,
} from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { NUMEROLOGY_BENEFITS_DATA } from "../constants/numerology.constants";

export function NumerologyBenefitSection() {
  const benefits = NUMEROLOGY_BENEFITS_DATA;

  const renderIcon = (iconName: string) => {
    const iconClass =
      "w-7 h-7 text-[#FCD34D] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(252,211,77,0.35)]";
    switch (iconName) {
      case "brain":
        return <Brain className={iconClass} strokeWidth={2} />;
      case "flame":
        return <Flame className={iconClass} strokeWidth={2} />;
      case "target":
        return <Target className={iconClass} strokeWidth={2} />;
      case "compass":
        return <Compass className={iconClass} strokeWidth={2} />;
      case "heart":
        return <Heart className={iconClass} strokeWidth={2} />;
      case "award":
        return <Award className={iconClass} strokeWidth={2} />;
      default:
        return <Sparkles className={iconClass} strokeWidth={2} />;
    }
  };


  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#180A06] text-white overflow-hidden border-t border-[#C49A45]/20">
      {/* Ambient Cosmic Background Glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 -left-20 w-125 h-125 bg-[#C49A45]/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-20 w-125 h-125 bg-[#740E0A]/15 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C49A45]/15 border border-[#C49A45]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span
                className={`${poppins.className} text-xs font-semibold text-[#FCD34D] tracking-widest uppercase`}
              >
                Transformative Wisdom
              </span>
            </div>
            <h2
              className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase`}
            >
              Why Study{" "}
              <span className="text-[#C49A45]">Vedic Numerology?</span>
            </h2>
            <p
              className={`${poppins.className} text-sm sm:text-base text-[#D8C7B5]/80 mt-4 max-w-2xl mx-auto font-light leading-relaxed`}
            >
              Understanding your personal vibrational blueprint gives you the
              clarity to navigate life&apos;s karmic cycles with profound
              purpose and conscious awareness.
            </p>
          </ScrollReveal>
        </div>

        {/* Benefits Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {benefits.map((benefit, idx) => (
            <ScrollReveal
              key={benefit.id}
              animation="fade-up"
              duration={650}
              delay={idx * 80}
              className="h-full"
            >
              <div className="group relative h-full flex flex-col justify-start p-7 sm:p-8 rounded-3xl bg-linear-to-b from-[#2E120A] to-[#1C0A06] border-2 border-[#D4AF37]/35 hover:border-[#FCD34D] shadow-[0_12px_32px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_40px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                
                {/* Top Subtle Golden Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-[#FCD34D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ambient Radial Golden Glow on Hover */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FCD34D]/15 rounded-full blur-2xl opacity-40 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Icon and Index Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#FCD34D]/25 via-[#C49A45]/20 to-[#740E0A]/40 border border-[#FCD34D]/50 flex items-center justify-center shadow-md shadow-black/50 group-hover:scale-105 group-hover:border-[#FCD34D] transition-all duration-300">
                      {renderIcon(benefit.iconName)}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[#740E0A]/40 border border-[#C49A45]/40 shadow-inner">
                      <span
                        className={`${poppins.className} text-xs font-bold text-[#FCD34D] tracking-widest select-none`}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`${playfair.className} text-xl sm:text-2xl font-bold text-white group-hover:text-[#FCD34D] transition-colors mb-3 tracking-wide`}
                  >
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`${poppins.className} text-xs sm:text-[13.5px] text-[#E5D7C7] leading-relaxed font-normal`}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
