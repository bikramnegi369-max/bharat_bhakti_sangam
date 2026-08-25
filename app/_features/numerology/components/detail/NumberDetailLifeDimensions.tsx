"use client";

import React from "react";
import Image from "next/image";
import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import {
  Briefcase,
  TrendingUp,
  Coins,
  Heart,
  Sparkles,
} from "lucide-react";

interface NumberDetailLifeDimensionsProps {
  lifeDimensions: NumerologyNumberDetailConfig["lifeDimensions"];
  number: number;
}

export function NumberDetailLifeDimensions({
  lifeDimensions,
  number,
}: NumberDetailLifeDimensionsProps) {
  const {
    professionalLife,
    businessAndEntrepreneurship,
    wealthAndFinancial,
    loveAndRelationships,
  } = lifeDimensions;

  return (
    <section id="life-dimensions" className="relative w-full py-14 sm:py-18 bg-[#F5ECE0] border-t border-[#C49A45]/30 text-[#140804]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#740E0A]/10 border border-[#740E0A]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span className={`${poppins.className} text-xs font-semibold text-[#740E0A] uppercase tracking-widest`}>
                4 Key Life Arenas
              </span>
            </div>
            <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#140804] tracking-tight`}>
              Career, Business &amp; <span className="text-[#C49A45]">Relationships</span>
            </h2>
            <p className={`${poppins.className} text-xs sm:text-sm text-[#5A4A3E] mt-2 font-light`}>
              How Number {number} manifests planetary power across major worldly aspirations
            </p>
          </ScrollReveal>
        </div>

        {/* 4-Card Responsive Grid: 1-col mobile, 2-col on 768px & 1024px (iPad Pro), 4-col on 1280px+ desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Professional Life */}
          <ScrollReveal animation="fade-up" duration={600} delay={0} className="h-full">
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#740E0A]/10 border border-[#740E0A]/20 flex items-center justify-center text-[#740E0A] shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className={`${playfair.className} text-base font-bold text-[#140804]`}>
                    {professionalLife.title}
                  </h3>
                </div>

                <p className={`${poppins.className} text-xs text-[#5A4A3E] mb-3.5 leading-relaxed font-light`}>
                  {professionalLife.description}
                </p>

                <ul className={`${poppins.className} space-y-1.5 text-xs text-[#4A3B32]`}>
                  {professionalLife.careers.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] shrink-0" />
                      <span className="font-normal">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${poppins.className} mt-5 pt-3 border-t border-[#C49A45]/20 text-[11px] text-[#665345]`}>
                <strong className="text-[#140804]">Style: </strong>{professionalLife.workStyle}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Business & Entrepreneurship */}
          <ScrollReveal animation="fade-up" duration={600} delay={100} className="h-full">
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#C49A45]/20 border border-[#C49A45]/30 flex items-center justify-center text-[#740E0A] shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className={`${playfair.className} text-base font-bold text-[#140804]`}>
                    {businessAndEntrepreneurship.title}
                  </h3>
                </div>

                <p className={`${poppins.className} text-xs text-[#5A4A3E] mb-3.5 leading-relaxed font-light`}>
                  {businessAndEntrepreneurship.description}
                </p>

                {/* Lucky Dates Grid Badges */}
                <div className="mb-3.5">
                  <span className={`${poppins.className} block text-[11px] font-bold text-[#8C6D23] uppercase mb-2`}>
                    LUCKY BUSINESS DATES:
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {businessAndEntrepreneurship.luckyDates.map((date) => (
                      <div
                        key={date}
                        className={`${poppins.className} py-1.5 rounded-lg bg-linear-to-b from-[#FAF5EC] to-[#F5ECE0] border border-[#C49A45]/40 font-bold text-xs text-[#740E0A] shadow-xs`}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className={`${poppins.className} block text-[11px] font-bold text-[#740E0A] uppercase mb-1.5`}>
                    TOP SECTORS:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {businessAndEntrepreneurship.bestSectors.map((s, i) => (
                      <span key={i} className={`${poppins.className} px-2 py-0.5 rounded-md bg-[#FAF5EC] text-[10.5px] text-[#5A4A3E] border border-[#C49A45]/25`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${poppins.className} mt-5 pt-3 border-t border-[#C49A45]/20 text-[11px] text-[#665345]`}>
                <strong className="text-[#140804]">Auspicious Days: </strong>{businessAndEntrepreneurship.luckyDays.join(", ")}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Wealth & Financial */}
          <ScrollReveal animation="fade-up" duration={600} delay={200} className="h-full">
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shrink-0">
                    <Coins className="w-4 h-4" />
                  </div>
                  <h3 className={`${playfair.className} text-base font-bold text-[#140804]`}>
                    {wealthAndFinancial.title}
                  </h3>
                </div>

                <p className={`${poppins.className} text-xs text-[#5A4A3E] mb-3.5 leading-relaxed font-light`}>
                  {wealthAndFinancial.description}
                </p>

                <ul className={`${poppins.className} space-y-2 text-xs text-[#4A3B32]`}>
                  {wealthAndFinancial.financialTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                      <span className="font-normal">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${poppins.className} mt-5 pt-3 border-t border-[#C49A45]/20 text-[11px] text-[#665345]`}>
                <strong className="text-[#140804]">Mindset: </strong>{wealthAndFinancial.mindset}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Love & Relationships */}
          <ScrollReveal animation="fade-up" duration={600} delay={300} className="h-full">
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center text-[#EC4899] shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h3 className={`${playfair.className} text-base font-bold text-[#140804]`}>
                    {loveAndRelationships.title}
                  </h3>
                </div>

                <p className={`${poppins.className} text-xs text-[#5A4A3E] mb-3 leading-relaxed font-light`}>
                  {loveAndRelationships.description}
                </p>

                <div className="mb-3">
                  <span className={`${poppins.className} block text-[11px] font-bold text-[#EC4899] uppercase mb-1.5`}>
                    COMPATIBLE MATCHES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {loveAndRelationships.bestMatches.map((m) => (
                      <span
                        key={m}
                        className={`${poppins.className} w-7 h-7 rounded-full bg-linear-to-b from-[#FAF5EC] to-[#F5ECE0] border border-[#C49A45]/40 flex items-center justify-center text-xs font-bold text-[#740E0A] shadow-xs`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <p className={`${poppins.className} text-xs text-[#5A4A3E]`}>
                  <strong>Romantic Nature: </strong>{loveAndRelationships.romanticStyle}
                </p>
              </div>

              {/* Romantic Couple Silhouette banner */}
              <div className="mt-4 relative h-20 w-full rounded-xl overflow-hidden border border-[#C49A45]/40 shadow-inner">
                <Image
                  src={loveAndRelationships.illustrationSrc || "/welcome.webp"}
                  alt="Relationship harmony"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <span className={`${poppins.className} absolute bottom-1.5 left-2.5 text-[10px] text-white font-medium flex items-center gap-1`}>
                  <Sparkles className="w-3 h-3 text-[#FCD34D]" /> Sacred Partnership
                </span>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
