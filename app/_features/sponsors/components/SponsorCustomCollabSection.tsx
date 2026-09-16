"use client";

import React from "react";
import Image from "next/image";
import { Handshake, ArrowRight } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface SponsorCustomCollabSectionProps {
  onLetsDiscussClick: () => void;
}

export function SponsorCustomCollabSection({
  onLetsDiscussClick,
}: SponsorCustomCollabSectionProps) {
  return (
    <section className="relative w-full py-16 sm:py-20 border-b border-[#E5DFD3] overflow-hidden">
      {/* Background Devotional Architectural Atmosphere spanning the entire section */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home_hero.webp"
          alt="Bharat Bhakti Sangam Heritage Architecture"
          fill
          sizes="100vw"
          className="object-cover object-[center_60%] brightness-100 contrast-105"
        />
        {/* Background is solid #FBF3E6 across the content area, then transitions to transparent */}
        <div className="absolute inset-0 bg-linear-to-r from-[#FBF3E6] from-45% via-[#FBF3E6]/90 via-60% to-transparent" />

        {/* Big Decorative Golden Mandala aligned to the bottom under the content, showing half rising up */}
        <div className="absolute left-8 sm:left-16 lg:left-24 -bottom-36 sm:-bottom-48 lg:-bottom-64 w-80 sm:w-110 lg:w-140 h-80 sm:h-110 lg:h-140 pointer-events-none select-none opacity-25 sm:opacity-30 z-0">
          <Image
            src="/mandala.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 440px, 560px"
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
            {/* Left Content with Handshake Icon */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 max-w-3xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/90 backdrop-blur-md border border-[#FED7AA] flex items-center justify-center shrink-0 shadow-sm">
                <Handshake className="w-9 h-9 sm:w-10 sm:h-10 text-[#E86A17]" />
              </div>

              <div className="space-y-2.5">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#3F0605] tracking-tight">
                  HAVE SOMETHING ELSE IN MIND?
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-700 font-normal leading-relaxed max-w-2xl">
                  From products and services to experiences and infrastructure,
                  if your brand can contribute meaningfully to Bharat Bhakti
                  Sangam, we would love to explore a customized partnership.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onLetsDiscussClick}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-lg bg-linear-to-r from-[#5A0A06] to-[#6B0C0D] hover:from-[#740E0A] hover:to-[#851213] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <span>LET&apos;S DISCUSS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Architectural Slogan Motif */}
            <div className="shrink-0 flex items-center justify-center w-full lg:w-auto">
              <div className="p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border border-[#FED7AA] text-center space-y-1 min-w-52.5 shadow-sm">
                <div className="text-xs uppercase tracking-widest font-semibold text-neutral-600">
                  SAME SPIRIT
                </div>
                <div className="text-base sm:text-lg font-bold text-[#3F0605] tracking-wide">
                  BIGGER IMPACT
                </div>
                <div className="text-sm text-[#E86A17] font-bold">⟶</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
