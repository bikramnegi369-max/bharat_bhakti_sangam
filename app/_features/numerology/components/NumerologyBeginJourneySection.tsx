"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { ArrowRight, User } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { NUMEROLOGY_BEGIN_JOURNEY_DATA } from "../constants/numerology.constants";

interface NumerologyBeginJourneySectionProps {
  onDiscoverClick?: () => void;
}

export function NumerologyBeginJourneySection({
  onDiscoverClick,
}: NumerologyBeginJourneySectionProps) {
  const data = NUMEROLOGY_BEGIN_JOURNEY_DATA;

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onDiscoverClick) {
      e.preventDefault();
      onDiscoverClick();
      return;
    }
    const target = document.querySelector(data.ctaHref);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#240804] text-white py-20 sm:py-28 lg:py-32">
      {/* 
        Full-bleed Background Image with sacred meditation yogi, golden yantras and temple atmosphere
      */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={data.bgImageSrc}
          alt={data.bgImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_35%] lg:object-center"
        />

        {/* Ambient Lighter Golden/Crimson Overlay to let the sacred yogi & glowing lotus shine brightly */}
        <div className="absolute inset-0 bg-[#240804]/25 via-[#180503]/20 to-[#240804]/45" />
        
        {/* Subtle center illumination and soft edge vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#240804]/15 to-[#120402]/60" />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        {/* Main Section Headline */}
        <ScrollReveal animation="fade-up" duration={750}>
          <h2
            className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[0.16em] uppercase leading-tight`}
          >
            {data.title}
          </h2>
        </ScrollReveal>

        {/* Subtitle / Philosophical Copy */}
        <ScrollReveal animation="fade-up" duration={750} delay={150}>
          <div className="mt-5 sm:mt-7 max-w-3xl space-y-1.5">
            <p
              className={`${poppins.className} text-base sm:text-lg md:text-xl text-[#F2E8DC] font-normal leading-relaxed`}
            >
              {data.subtitleLines[0]}
            </p>
            <p
              className={`${poppins.className} text-sm sm:text-base md:text-lg text-[#D8C7B5] font-light leading-relaxed`}
            >
              {data.subtitleLines[1]}
            </p>
          </div>
        </ScrollReveal>

        {/* Golden Action Button */}
        <ScrollReveal animation="fade-up" duration={750} delay={250}>
          <div className="mt-8 sm:mt-10 mb-16 sm:mb-20">
            <a
              href={data.ctaHref}
              onClick={handleCtaClick}
              className={`${poppins.className} group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-md bg-[#C49A45] hover:bg-[#D4AF37] active:scale-95 text-[#180A06] text-xs sm:text-sm font-bold tracking-[0.14em] uppercase shadow-xl shadow-[#C49A45]/25 hover:shadow-2xl hover:shadow-[#C49A45]/45 transition-all duration-300 cursor-pointer`}
            >
              <span>{data.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#180A06] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>

        {/* 4 Brand Pillars Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pt-8 border-t border-[#D4AF37]/25">
          {data.pillars.map((pillar, idx) => (
            <ScrollReveal
              key={pillar.id}
              animation="fade-up"
              duration={650}
              delay={350 + idx * 80}
              className="h-full"
            >
              <div className="flex items-start text-left gap-3.5 sm:gap-4 p-3 rounded-xl transition-colors duration-300 hover:bg-white/5 h-full">
                {/* Outlined User/Soul Icon Badge matching mockup */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 flex items-center justify-center shrink-0 text-white/90 shadow-sm mt-0.5">
                  <User className="w-5 h-5 stroke-[1.5]" />
                </div>

                {/* Pillar Content */}
                <div className="flex flex-col">
                  <h3
                    className={`${poppins.className} text-xs sm:text-[13px] font-bold text-white tracking-wider uppercase leading-snug`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`${poppins.className} text-[11px] sm:text-xs text-[#D8C7B5]/85 leading-relaxed mt-1 font-light`}
                  >
                    {pillar.description}
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
