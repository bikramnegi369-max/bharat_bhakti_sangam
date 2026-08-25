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
    <section className="relative w-full bg-[#180A06] overflow-hidden">
      {/* 
        Full-bleed Cosmic Dark Background with subtle ambient warm glow 
      */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Radial warm golden and burgundy ambient glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-137.5 h-137.5 bg-[#C49A45]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/4 -translate-y-1/2 w-150 h-150 bg-[#E86A17]/12 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-[#120704] to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Typography, Eyebrow, Heading, Description & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
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
                className={`${playfair.className} text-[clamp(2.5rem,5.2vw,4.5rem)] font-black text-white leading-[1.08] tracking-tight uppercase`}
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
                className={`${poppins.className} text-sm sm:text-base lg:text-[15px] text-[#D8C7B5]/85 leading-relaxed mt-6 sm:mt-8 max-w-lg font-light`}
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
                  className={`${poppins.className} group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-md bg-[#C49A45] hover:bg-[#D4AF37] active:scale-95 text-[#180A06] text-xs sm:text-sm font-bold tracking-[0.14em] uppercase shadow-lg shadow-[#C49A45]/20 hover:shadow-xl hover:shadow-[#C49A45]/40 transition-all duration-300 cursor-pointer`}
                >
                  <span>{data.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#180A06] transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hero Image with Sacred Glowing Frame */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <ScrollReveal
              animation="fade-left"
              duration={850}
              delay={200}
              className="w-full"
            >
              <div className="relative w-full max-w-2xl mx-auto lg:max-w-none group">
                {/* Ambient Golden Glow Backdrop behind the image */}
                <div className="absolute -inset-1 sm:-inset-2 bg-linear-to-r from-[#C49A45]/30 via-[#E86A17]/25 to-[#C49A45]/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none" />

                {/* Outer Glassmorphic Border Frame */}
                <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#C49A45]/40 bg-[#220D08]/90 p-2 sm:p-3 shadow-2xl shadow-black/80">
                  {/* Aspect Ratio Container for numerology_hero.webp */}
                  <div className="relative aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden bg-black">
                    <Image
                      src={data.imageSrc}
                      alt={data.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Subtle internal edge vignette */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
