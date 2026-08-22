"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { FOUNDER_DATA } from "../constants/founder.constants";

export function FounderMessageSection() {
  const data = FOUNDER_DATA;

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FCFAF5] overflow-hidden">
      {/* Decorative Warm Ambient Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#FED7AA]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-0 w-96 h-96 rounded-full bg-[#F5D89F]/25 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header with Golden Lines */}
        <div className="flex items-center justify-center gap-4 mb-12 sm:mb-16">
          <span className="w-10 sm:w-16 h-px bg-linear-to-r from-transparent to-[#C49A45]" />
          <h2
            className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.15em] text-[#740E0A] uppercase text-center`}
          >
            {data.messageHeading}
          </h2>
          <span className="w-10 sm:w-16 h-px bg-linear-to-l from-transparent to-[#C49A45]" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Traditional Arch Framed Portrait (lg: 5.5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-100 sm:max-w-110">
              {/* Outer Golden Temple Arch Shape */}
              <div className="relative p-3 sm:p-4 rounded-t-[10rem] rounded-b-2xl border-2 border-[#D4AF37]/60 bg-linear-to-b from-[#FFF9EE] via-[#FDF5E6] to-[#F7EBD6] shadow-[0_20px_50px_rgba(116,14,10,0.12)]">
                {/* Glowing Sacred OM Background Element */}
                <div
                  aria-hidden="true"
                  className={`${playfair.className} absolute top-6 left-1/2 -translate-x-1/2 text-7xl sm:text-8xl font-bold text-[#C49A45]/20 select-none pointer-events-none z-0`}
                >
                  ॐ
                </div>

                {/* Inner Image Frame with Arch Mask */}
                <div className="relative z-10 w-full aspect-4/5 rounded-t-[9.5rem] rounded-b-xl overflow-hidden bg-[#EADBCE]">
                  <Image
                    src={data.messageImage}
                    alt={data.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 460px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle inner gold vignette */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#3F0605]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Decorative Corner Ornaments */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full border-2 border-[#D4AF37] bg-white flex items-center justify-center shadow-md text-[#740E0A] font-bold text-xs"
              >
                ✦
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Story & Personal Narrative (lg: 6.5 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Lead Statement */}
            <p
              className={`${playfair.className} italic text-lg sm:text-xl md:text-2xl text-[#9A3412] font-semibold leading-snug mb-6`}
            >
              &ldquo;{data.messageLead}&rdquo;
            </p>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {data.messageParagraphs.map((para, idx) => (
                <p key={idx} className={`${poppins.className} font-normal`}>
                  {para}
                </p>
              ))}
            </div>

            {/* Founder Sign-off / Signature block (Right aligned or styled) */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-[#E5DFD3] flex flex-col items-end text-right">
              <h3
                className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#740E0A]`}
              >
                {data.name}
              </h3>
              <p
                className={`${poppins.className} text-xs sm:text-sm font-medium text-[#9A3412] mt-0.5`}
              >
                Founder & Spiritual Curator
              </p>
              <p
                className={`${poppins.className} text-xs text-[#5c5c5c] mt-0.5`}
              >
                Bharat Bhakti Sangam
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
