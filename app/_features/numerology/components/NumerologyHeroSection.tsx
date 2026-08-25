"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { NUMEROLOGY_HERO_DATA } from "../constants/numerology.constants";

interface NumerologyHeroSectionProps {
  onDiscoverClick?: () => void;
}

export function NumerologyHeroSection({
  onDiscoverClick,
}: NumerologyHeroSectionProps) {
  const data = NUMEROLOGY_HERO_DATA;

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
    <section className="relative w-full min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] bg-[#120501] flex items-center overflow-hidden">
      {/* 
        Full-Bleed Right Master Artwork Background
        The entire right half of the banner is occupied by the glowing numerology temple artwork, 
        smoothly blended towards the left text and edges into #120501
      */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Right Half Artwork Container */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-full">
          <Image
            src={data.imageSrc}
            alt={data.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[center_right] mix-blend-screen"
          />

          {/* Smooth left-to-right gradient fade so text on the left sits on pure solid #120501 */}
          <div className="absolute inset-0 bg-linear-to-r from-[#120501] via-[#120501]/80 to-transparent w-full lg:w-3/5" />
          
          {/* Top and bottom edge gradient blends */}
          <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-[#120501] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#120501] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#120501] to-transparent" />
        </div>

        {/* Ambient Warm Golden & Amber Glows */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#C49A45]/15 rounded-full blur-[140px]" />
      </div>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl flex flex-col items-start text-left">
          {/* Eyebrow Inscription */}
          <ScrollReveal animation="fade-right" duration={700} delay={50}>
            <p
              className={`${playfair.className} italic text-xs sm:text-sm lg:text-[15px] font-normal tracking-[0.22em] text-[#C49A45] uppercase mb-4 sm:mb-6 select-none`}
            >
              {data.eyebrow}
            </p>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal animation="fade-right" duration={750} delay={150}>
            <h1
              className={`${playfair.className} text-[clamp(2.6rem,5.5vw,4.8rem)] font-black text-white leading-[1.06] tracking-tight uppercase`}
            >
              <span>YOUR</span>
              <br />
              <span>NUMBERS.</span>
              <br />
              <span>YOUR KARMA.</span>
              <br />
              <span className="text-[#C49A45]">YOUR</span>
              <br />
              <span className="text-[#C49A45]">JOURNEY.</span>
            </h1>
          </ScrollReveal>

          {/* Paragraph / Description */}
          <ScrollReveal animation="fade-up" duration={750} delay={250}>
            <p
              className={`${poppins.className} text-sm sm:text-base lg:text-[15.5px] text-[#D8C7B5]/85 leading-relaxed mt-6 sm:mt-8 max-w-lg font-light`}
            >
              {data.description}
            </p>
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal animation="fade-up" duration={750} delay={350}>
            <div className="mt-8 sm:mt-10">
              <a
                href={data.ctaHref}
                onClick={handleCtaClick}
                className={`${poppins.className} group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-md bg-[#C49A45] hover:bg-[#D4AF37] active:scale-95 text-[#180A06] text-xs sm:text-sm font-bold tracking-[0.14em] uppercase shadow-lg shadow-[#C49A45]/20 hover:shadow-xl hover:shadow-[#C49A45]/40 transition-all duration-300 cursor-pointer`}
              >
                <span>{data.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#180A06] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );

}

