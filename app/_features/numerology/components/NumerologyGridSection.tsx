"use client";

import React from "react";
import Link from "next/link";
import { playfair, poppins } from "@/_lib/fonts";
import { Sparkles, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { NUMEROLOGY_NUMBERS_DATA } from "../constants/numerology.constants";

export function NumerologyGridSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#140804] text-white overflow-hidden border-t border-[#C49A45]/20">
      {/* Subtle Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#C49A45]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#740E0A]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C49A45]/15 border border-[#C49A45]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span
                className={`${poppins.className} text-xs font-semibold text-[#FCD34D] tracking-widest uppercase`}
              >
                The 9 Divine Cosmic Numbers
              </span>
            </div>
            <h2
              className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase`}
            >
              Explore the <span className="text-[#C49A45]">Vedic Numbers</span>
            </h2>
            <p
              className={`${poppins.className} text-sm sm:text-base text-[#D8C7B5]/80 mt-4 max-w-2xl mx-auto font-light`}
            >
              Each number from 1 to 9 is presided over by a Navagraha deity,
              carrying distinct spiritual vibrations and karmic lessons.
            </p>
          </ScrollReveal>
        </div>

        {/* 1 to 9 Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {NUMEROLOGY_NUMBERS_DATA.map((item, idx) => (
            <ScrollReveal
              key={item.number}
              animation="fade-up"
              duration={650}
              delay={idx * 60}
              className="h-full"
            >
              <Link
                href={`/numerology/${item.slug}`}
                className="group relative h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl transition-all duration-300 bg-[#250F08] hover:bg-[#33140C] border border-[#C49A45]/40 hover:border-[#FCD34D] shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-[#C49A45]/25 hover:-translate-y-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCD34D]"
              >
                {/* Ambient Top Glow Line on Hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-[#FCD34D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

                {/* Top Section */}
                <div>
                  {/* Header with Number & Planet */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#C49A45]/30 to-[#740E0A]/60 border border-[#C49A45]/60 flex items-center justify-center shadow-lg shadow-black/40 group-hover:scale-105 group-hover:border-[#FCD34D] transition-all duration-300">
                      <span
                        className={`${playfair.className} text-3xl font-black text-[#FCD34D]`}
                      >
                        {item.number}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`${poppins.className} text-xs font-semibold text-[#FCD34D] uppercase tracking-wider block`}
                      >
                        {item.planet}
                      </span>
                      <span
                        className={`${poppins.className} text-[11px] text-[#D8C7B5]/75`}
                      >
                        {item.deity}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`${playfair.className} text-lg sm:text-xl font-bold text-white group-hover:text-[#FCD34D] transition-colors min-h-14 flex items-center`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`${poppins.className} text-xs sm:text-[13px] text-[#D8C7B5]/85 leading-relaxed mt-2.5 min-h-16`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 pt-3.5 border-t border-[#C49A45]/25">
                  {/* Quick Attributes */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-white/50">Element: </span>
                      <span className="text-[#FCD34D] font-medium">
                        {item.element}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/50">Color: </span>
                      <span className="text-[#FCD34D] font-medium">
                        {item.luckyColor}
                      </span>
                    </div>
                  </div>

                  {/* Traits Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {item.traits.slice(0, 3).map((trait, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-[#180A06] border border-[#C49A45]/30 text-[11px] text-[#D8C7B5] font-medium"
                      >
                        ✦ {trait}
                      </span>
                    ))}
                  </div>

                  {/* Micro Action Bar */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#C49A45] group-hover:text-[#FCD34D] transition-colors">
                    <span
                      className={`${poppins.className} text-[11px] font-semibold tracking-wider uppercase`}
                    >
                      Read Complete Profile
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
