"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import ScrollReveal from "@/_components/common/ScrollReveal";
import {
  Sparkles,
  Sun,
  Crown,
  Mountain,
  Eye,
  Flag,
  Shield,
  Gem,
  Calendar,
  Flame,
} from "lucide-react";

interface NumberDetailHeroProps {
  config: NumerologyNumberDetailConfig;
}

export function NumberDetailHero({ config }: NumberDetailHeroProps) {
  const getPillIcon = (iconName: string) => {
    switch (iconName) {
      case "crown":
        return <Crown className="w-4 h-4 text-[#FCD34D]" />;
      case "mountain":
        return <Mountain className="w-4 h-4 text-[#FCD34D]" />;
      case "eye":
        return <Eye className="w-4 h-4 text-[#FCD34D]" />;
      case "flag":
        return <Flag className="w-4 h-4 text-[#FCD34D]" />;
      case "shield":
        return <Shield className="w-4 h-4 text-[#FCD34D]" />;
      case "sun":
        return <Sun className="w-4 h-4 text-[#FCD34D]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#FCD34D]" />;
    }
  };

  return (
    <section className="relative w-full text-white bg-[#0D0402] overflow-hidden">
      {/* Background Hero Banner Image with Radiant Ambient Aura */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={config.heroBgImageSrc}
          alt={config.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-top-right opacity-95 brightness-110 contrast-105 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Softened Radiant Overlays for Maximum Background Radiance */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0D0402]/80 via-[#0D0402]/45 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0D0402] via-transparent to-[#0D0402]/30" />
        <div className="absolute top-1/4 left-1/3 w-150 h-150 bg-[#FCD34D]/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 right-1/4 w-137.5 h-137.5 bg-[#C49A45]/20 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-18">
        {/* Main Content Grid (1-col on mobile, 12-col on desktop and 1024px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* Left Hero Area */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {/* Eyebrow badge */}
            <ScrollReveal animation="fade-down" duration={600}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C49A45]/20 border border-[#C49A45]/40 backdrop-blur-md shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#FCD34D] animate-pulse" />
                <span
                  className={`${poppins.className} text-[10.5px] uppercase tracking-[0.22em] text-[#FCD34D] font-semibold`}
                >
                  Vedic Numerology Cosmic Profile
                </span>
              </div>
            </ScrollReveal>

            {/* Emblem and Title Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              {/* Grand Golden Mandala Number Emblem with Radiant Glow */}
              <ScrollReveal
                animation="scale-up"
                duration={750}
                className="shrink-0"
              >
                <div className="relative w-26 h-26 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-1 bg-linear-to-br from-[#FCD34D] via-[#C49A45] to-[#740E0A] shadow-[0_0_45px_rgba(252,211,77,0.5)] group cursor-pointer hover:shadow-[0_0_60px_rgba(252,211,77,0.7)] transition-shadow duration-500">
                  <div className="absolute -inset-1 rounded-full border border-dashed border-[#FCD34D]/60 animate-spin-slow pointer-events-none" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#FCD34D] bg-[#160603]">
                    <Image
                      src={config.heroImageSrc}
                      alt={`Cosmic Number ${config.number}`}
                      fill
                      sizes="(max-width: 640px) 104px, 144px"
                      className="object-cover brightness-110 contrast-105 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-1">
                <ScrollReveal animation="fade-up" duration={650} delay={100}>
                  <h1
                    className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]`}
                  >
                    {config.title}
                  </h1>
                </ScrollReveal>
                <ScrollReveal animation="fade-up" duration={650} delay={150}>
                  <p
                    className={`${playfair.className} text-base sm:text-lg lg:text-xl text-[#FCD34D] italic tracking-wide font-medium`}
                  >
                    “{config.tagline}”
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Complete Narrative Description */}
            <ScrollReveal animation="fade-up" duration={650} delay={200}>
              <p
                className={`${poppins.className} text-xs sm:text-[13.5px] text-[#EADCCE] leading-relaxed max-w-2xl font-light`}
              >
                {config.description}
              </p>
            </ScrollReveal>
          </div>

          {/* Right Floating Cosmic Coordinates Widget */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-start lg:justify-end">
            <ScrollReveal
              animation="fade-left"
              duration={750}
              delay={200}
              className="w-full max-w-md"
            >
              <div className="relative rounded-2xl bg-linear-to-b from-[#240B05]/95 via-[#1A0703]/95 to-[#120402]/95 border border-[#C49A45]/50 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl hover:border-[#FCD34D] hover:shadow-[0_20px_50px_rgba(252,211,77,0.15)] transition-all duration-300 group">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-[#FCD34D] to-transparent opacity-80" />

                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#C49A45]/25">
                  <span
                    className={`${poppins.className} text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C7B5]/80`}
                  >
                    Cosmic Coordinates
                  </span>
                  <span
                    className={`${poppins.className} text-[10.5px] px-2.5 py-0.5 rounded-full bg-[#C49A45]/20 text-[#FCD34D] border border-[#C49A45]/30 font-medium`}
                  >
                    Active Navagraha
                  </span>
                </div>

                <div
                  className={`${poppins.className} space-y-3 divide-y divide-[#C49A45]/15`}
                >
                  <div className="flex items-center justify-between pt-1 first:pt-0 gap-3">
                    <span className="text-xs tracking-wide text-[#D8C7B5]/80 flex items-center gap-2 font-medium shrink-0">
                      <Sun className="w-4 h-4 text-[#FCD34D]" /> Ruling Planet
                    </span>
                    <span className="text-xs font-bold text-white text-right">
                      {config.heroCard.planet}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 gap-3">
                    <span className="text-xs tracking-wide text-[#D8C7B5]/80 flex items-center gap-2 font-medium shrink-0">
                      <Flame className="w-4 h-4 text-[#F59E0B]" /> Primary
                      Element
                    </span>
                    <span className="text-xs font-bold text-white text-right">
                      {config.heroCard.element}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 gap-3">
                    <span className="text-xs tracking-wide text-[#D8C7B5]/80 flex items-center gap-2 font-medium shrink-0">
                      <Gem className="w-4 h-4 text-[#EC4899]" /> Gemstone
                    </span>
                    <span className="text-xs font-bold text-white text-right">
                      {config.heroCard.gemstone}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 gap-3">
                    <span className="text-xs tracking-wide text-[#D8C7B5]/80 flex items-center gap-2 font-medium shrink-0">
                      <Calendar className="w-4 h-4 text-[#10B981]" /> Auspicious
                      Day
                    </span>
                    <span className="text-xs font-bold text-[#FCD34D] text-right">
                      {config.heroCard.luckyDay}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 gap-3">
                    <span className="text-xs tracking-wide text-[#D8C7B5]/80 flex items-center gap-2 font-medium shrink-0">
                      <Crown className="w-4 h-4 text-[#FCD34D]" /> Presiding
                      Deity
                    </span>
                    <span className="text-xs font-bold text-white text-right">
                      {config.heroCard.deity}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Horizontal Traits Bar */}
        <ScrollReveal animation="fade-up" duration={700} delay={250}>
          <div className="mt-8 pt-5 border-t border-[#C49A45]/30 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 text-center">
            {config.heroPills.map((pill, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#1C0803]/70 border border-[#C49A45]/20 hover:border-[#FCD34D]/70 hover:bg-[#250F08] hover:-translate-y-0.5 transition-all duration-300 group cursor-default shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#200A04] border border-[#C49A45]/50 flex items-center justify-center shadow-md group-hover:border-[#FCD34D] group-hover:bg-[#331108] transition-all duration-300">
                  {getPillIcon(pill.iconName)}
                </div>
                <span
                  className={`${poppins.className} text-[10px] font-semibold tracking-wider text-[#D8C7B5] group-hover:text-[#FCD34D] uppercase transition-colors`}
                >
                  {pill.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
