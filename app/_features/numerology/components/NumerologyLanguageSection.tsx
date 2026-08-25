"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { NUMEROLOGY_LANGUAGE_DATA } from "../constants/numerology.constants";

export function NumerologyLanguageSection() {
  const data = NUMEROLOGY_LANGUAGE_DATA;

  return (
    <section className="relative w-full bg-[#FBEEDD] text-[#3F0605] py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-[#E8D4BE]">
      {/* 
        Subtle Sacred Watermark Backdrop
      */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C49A45]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Prominently Enlarged Chart Image with Seamless Background Blending */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-start order-2 lg:order-1">
            <ScrollReveal
              animation="fade-right"
              duration={850}
              delay={150}
              className="w-full"
            >
              <div className="relative w-full max-w-2xl lg:max-w-none group">
                {/* Ambient Golden Glow behind the sacred diagram */}
                <div className="absolute -inset-4 sm:-inset-6 bg-linear-to-tr from-[#C49A45]/20 via-[#D4AF37]/15 to-transparent rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

                {/* Seamless Blended Image Container */}
                <div className="relative aspect-16/10 sm:aspect-[16/9.2] lg:aspect-video xl:aspect-[16/8.8] w-full min-h-85 sm:min-h-105 lg:min-h-115 rounded-2xl overflow-hidden p-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,black_75%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
                  <Image
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 65vw"
                    className="object-contain object-center scale-105 sm:scale-110 lg:scale-115 transition-transform duration-700 group-hover:scale-[1.18] mix-blend-multiply"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Typography, Eyebrow, Title, Divider, Paragraphs & Italic Quote */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left order-1 lg:order-2">
            {/* Eyebrow Label */}
            <ScrollReveal animation="fade-left" duration={700} delay={50}>
              <span
                className={`${poppins.className} text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#C49A45] uppercase block mb-3 sm:mb-4`}
              >
                {data.eyebrow}
              </span>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal animation="fade-left" duration={750} delay={150}>
              <h2
                className={`${playfair.className} text-[clamp(2.2rem,4vw,3.6rem)] font-bold text-[#3F0605] leading-[1.12] tracking-tight`}
              >
                {data.title.line1}
                <br />
                {data.title.line2}
                <br />
                {data.title.line3}
              </h2>
            </ScrollReveal>

            {/* Accent Gold Divider Bar */}
            <ScrollReveal animation="fade-left" duration={650} delay={220}>
              <div className="w-16 sm:w-20 h-0.5 bg-[#C49A45] my-5 sm:my-6" />
            </ScrollReveal>

            {/* Paragraphs */}
            <div className="space-y-3.5 sm:space-y-4 max-w-xl">
              {data.paragraphs.map((p, idx) => (
                <ScrollReveal
                  key={idx}
                  animation="fade-up"
                  duration={700}
                  delay={250 + idx * 80}
                >
                  <p
                    className={`${poppins.className} text-sm sm:text-base lg:text-[15px] text-[#5C4D44] leading-relaxed font-normal`}
                  >
                    {p}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Italic Philosophical Quote */}
            <ScrollReveal animation="fade-up" duration={750} delay={500}>
              <div className="mt-6 sm:mt-8 pt-2">
                <p
                  className={`${playfair.className} italic text-base sm:text-lg lg:text-xl text-[#3F0605] font-normal leading-relaxed`}
                >
                  {data.quote.line1}
                  <br />
                  {data.quote.line2}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
