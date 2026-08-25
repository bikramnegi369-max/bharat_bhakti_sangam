"use client";

import React from "react";
import Image from "next/image";
import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { Sparkles, Sun, Moon, CheckCircle2 } from "lucide-react";

interface NumberDetailRulingPlanetSectionProps {
  rulingPlanet: NumerologyNumberDetailConfig["rulingPlanet"];
  number: number;
}

export function NumberDetailRulingPlanetSection({
  rulingPlanet,
  number,
}: NumberDetailRulingPlanetSectionProps) {
  const isSun = number === 1;

  return (
    <section
      id="ruling-planet"
      className="relative w-full py-16 sm:py-20 bg-[#0E0402] text-white border-t border-[#C49A45]/40 overflow-hidden"
    >
      {/* Background Celestial Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-150 h-150 bg-[#C49A45]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-125 h-125 bg-[#740E0A]/30 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Golden Grand Banner Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C49A45]/15 border border-[#C49A45]/30 mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FCD34D]" />
              <span
                className={`${poppins.className} text-[11px] font-semibold text-[#FCD34D] tracking-widest uppercase`}
              >
                Sanatan Cosmic Realm
              </span>
            </div>
            <h2
              className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-[#FCD34D] via-[#FFFDF8] to-[#C49A45]`}
            >
              RULING PLANET &amp; DEVOTIONAL GUIDANCE
            </h2>
            <div className="w-48 h-0.5 mx-auto bg-linear-to-r from-transparent via-[#FCD34D] to-transparent mt-3" />
          </ScrollReveal>
        </div>

        {/* 3-Section Master Container (1-col on mobile, 3-col on 1024px & desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Box 1: Ruling Planet Box with Sun/Moon Icon */}
          <ScrollReveal
            animation="fade-right"
            duration={700}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-linear-to-b from-[#1E0803] to-[#120401] border border-[#C49A45]/40 p-6 shadow-2xl flex flex-col justify-between hover:border-[#FCD34D] transition-all duration-300">
              <div>
                <span
                  className={`${poppins.className} text-[11px] font-bold text-[#FCD34D]/75 uppercase tracking-widest block mb-4`}
                >
                  ✦ RULING PLANET
                </span>

                {/* Planet Name & Visual Header */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#C49A45]/20">
                  <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#FCD34D]/30 to-[#740E0A]/70 border border-[#FCD34D]/80 flex items-center justify-center shadow-lg shadow-[#C49A45]/30 shrink-0">
                    {isSun ? (
                      <Sun className="w-7 h-7 text-[#FCD34D]" />
                    ) : (
                      <Moon className="w-7 h-7 text-[#FCD34D]" />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`${playfair.className} text-lg font-bold text-[#FCD34D]`}
                    >
                      {rulingPlanet.planetName}
                    </h3>
                    <span
                      className={`${poppins.className} text-xs text-[#D8C7B5]/80 block mt-0.5 font-light`}
                    >
                      {rulingPlanet.subTitle}
                    </span>
                  </div>
                </div>

                <p
                  className={`${poppins.className} text-xs text-[#D8C7B5]/85 leading-relaxed font-light mb-5`}
                >
                  {rulingPlanet.description}
                </p>
              </div>

              {/* Attributes List */}
              <div
                className={`${poppins.className} space-y-2 pt-3 border-t border-[#C49A45]/20`}
              >
                {rulingPlanet.attributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0"
                  >
                    <span className="text-[#D8C7B5]/70">{attr.label}</span>
                    <span className="font-semibold text-[#FCD34D] text-right">
                      {attr.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Box 2: Navagraha Presiding Deities Grid */}
          <ScrollReveal
            animation="fade-up"
            duration={700}
            delay={100}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-linear-to-b from-[#1E0803] to-[#120401] border border-[#C49A45]/40 p-6 shadow-2xl flex flex-col justify-between hover:border-[#FCD34D] transition-all duration-300">
              <div>
                <span
                  className={`${poppins.className} text-[11px] font-bold text-[#FCD34D]/75 uppercase tracking-widest block mb-4`}
                >
                  ✦ NAVAGRAHA DEITIES
                </span>

                {/* 4 Circular Deities Grid */}
                <div className="grid grid-cols-2 gap-4 text-center my-2">
                  {rulingPlanet.deities.map((deity, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center group cursor-default"
                    >
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-[#C49A45]/60 group-hover:border-[#FCD34D] group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/60 mb-2">
                        {deity.imageSrc ? (
                          <Image
                            src={deity.imageSrc}
                            alt={deity.name}
                            fill
                            sizes="72px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#250F08] flex items-center justify-center text-[#FCD34D]">
                            <Sparkles className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <h4
                        className={`${playfair.className} text-xs font-bold text-white group-hover:text-[#FCD34D] transition-colors`}
                      >
                        {deity.name}
                      </h4>
                      <span
                        className={`${poppins.className} text-[10px] text-[#D8C7B5]/70 mt-0.5 font-light`}
                      >
                        {deity.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`${poppins.className} mt-4 p-2.5 rounded-xl bg-[#250F08]/80 text-center border border-[#C49A45]/30 text-[11px] text-[#D8C7B5]`}
              >
                ✦ Divine Guardians of Cosmic Order
              </div>
            </div>
          </ScrollReveal>

          {/* Box 3: Devotional Guidance & Upasanas */}
          <ScrollReveal
            animation="fade-left"
            duration={700}
            delay={200}
            className="h-full md:col-span-2 lg:col-span-1"
          >
            <div className="h-full rounded-2xl bg-linear-to-b from-[#1E0803] to-[#120401] border border-[#C49A45]/40 p-6 shadow-2xl flex flex-col justify-between hover:border-[#FCD34D] transition-all duration-300">
              <div>
                <span
                  className={`${poppins.className} text-[11px] font-bold text-[#FCD34D]/75 uppercase tracking-widest block mb-4`}
                >
                  ✦ DAILY DEVOTIONAL UPASANA
                </span>

                <div className={`${poppins.className} space-y-3`}>
                  {rulingPlanet.devotionalPractices.map((practice, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-[#D8C7B5]/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-light">{practice}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-3.5 rounded-xl bg-linear-to-r from-[#740E0A]/40 to-[#250F08] border border-[#C49A45]/40 text-center">
                <span
                  className={`${poppins.className} text-xs font-semibold text-[#FCD34D] block mb-0.5`}
                >
                  Sanatan Upasana Rule
                </span>
                <span
                  className={`${poppins.className} text-[11px] text-[#D8C7B5]/85 block font-light`}
                >
                  Regularity in practice enhances planetary harmony and
                  dissolves karmic friction.
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
