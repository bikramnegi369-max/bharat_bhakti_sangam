"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { playfair, poppins } from "@/_lib/fonts";
import {
  Sparkles,
  Compass,
  BookOpen,
  SunMedium,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { SANATANA_HERO_DATA } from "../constants/sanatana.constants";

export function SanatanaHeroSection() {
  const data = SANATANA_HERO_DATA;

  const scrollToTimeline = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("sanatana-timeline-anchor");
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Container with subtle fade-in */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-18 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography, Sanskrit Mantra, CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-fade-in-up">
            {/* Top Subtitle with Sanskrit Mantra */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-6 sm:w-10 h-0.5 bg-[#C49A45]" />
              <span
                className={`${poppins.className} text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#C49A45] uppercase`}
              >
                {data.bannerSubtitle}
              </span>
            </div>

            {/* Sanskrit Inscription Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#740E0A]/10 border border-[#740E0A]/20 mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#740E0A] shrink-0" />
              <span
                className={`${poppins.className} text-xs sm:text-sm font-medium text-[#740E0A] tracking-wider`}
              >
                {data.sanskritMantra}
              </span>
            </div>

            {/* Main Page Title (Playfair) */}
            <h1
              className={`${playfair.className} text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3F0605] leading-[1.08] tracking-tight uppercase`}
            >
              SANĀTANA <span className="text-[#740E0A]">DHARMA</span>
            </h1>

            {/* Subheading */}
            <h2
              className={`${playfair.className} italic text-xl sm:text-2xl lg:text-2xl text-[#C49A45] font-semibold mt-3 sm:mt-4 leading-snug`}
            >
              {data.subheading}
            </h2>

            {/* Description Text */}
            <p
              className={`${poppins.className} text-sm sm:text-base text-[#5c5c5c] leading-relaxed mt-4 sm:mt-5 max-w-2xl font-normal`}
            >
              {data.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-6 sm:mt-8">
              <a
                href="#sanatana-timeline-anchor"
                onClick={scrollToTimeline}
                className={`${poppins.className} inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-[#740E0A] hover:bg-[#8F140F] active:scale-95 text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#740E0A]/25 hover:shadow-xl hover:shadow-[#740E0A]/40 transition-all duration-300 cursor-pointer`}
              >
                <Compass className="w-4 h-4 text-[#FCD34D] animate-spin [animation-duration:12s]" />
                {data.primaryCtaText}
              </a>

              <Link
                href="/about"
                className={`${poppins.className} inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-white/80 hover:bg-white active:scale-95 text-[#3F0605] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-sm sm:text-base font-medium shadow-sm transition-all duration-300`}
              >
                <BookOpen className="w-4 h-4 text-[#740E0A]" />
                About BBS Movement
              </Link>
            </div>
          </div>

          {/* Right Column: Sacred Scripture Altar Card Display */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-down">
            <div className="relative w-full max-w-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/75 backdrop-blur-md border border-[#D4AF37]/40 shadow-2xl shadow-[#C49A45]/15 animate-glow">
              {/* Inner Sacred Frame */}
              <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-linear-to-br from-[#3F0605] via-[#2A0404] to-[#1F0303] flex items-center justify-center p-6 text-center shadow-inner">
                {/* Subtle Mandala Watermark */}
                <div className="absolute inset-0 opacity-25 select-none pointer-events-none">
                  <Image
                    src="/mandala.webp"
                    alt="Sacred Mandala Background"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                    className="object-contain animate-[spin_120s_linear_infinite]"
                  />
                </div>

                {/* Center OM Emblem */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`${playfair.className} text-7xl sm:text-8xl font-extrabold text-[#FCD34D] drop-shadow-[0_4px_18px_rgba(252,211,77,0.5)] leading-none select-none animate-float`}
                  >
                    ॐ
                  </div>
                  <span
                    className={`${poppins.className} text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#FCD34D]/90 uppercase mt-3`}
                  >
                    सत्यं शिवं सुन्दरम्
                  </span>
                  <p
                    className={`${poppins.className} text-[11px] sm:text-xs text-white/75 mt-1 font-light italic max-w-55`}
                  >
                    The Timeless Cosmic Principle of Harmony & Truth
                  </p>
                </div>
              </div>

              {/* Bottom Quick Feature Highlights */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#D4AF37]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#740E0A]/10 flex items-center justify-center shrink-0">
                    <SunMedium className="w-4 h-4 text-[#740E0A]" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`${poppins.className} text-xs font-semibold text-[#3F0605]`}
                    >
                      Eternal Truth
                    </span>
                    <span
                      className={`${poppins.className} text-[10px] text-[#5c5c5c]`}
                    >
                      Sanātana Parampara
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#740E0A]/10 flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4 text-[#740E0A]" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`${poppins.className} text-xs font-semibold text-[#3F0605]`}
                    >
                      Pure Devotion
                    </span>
                    <span
                      className={`${poppins.className} text-[10px] text-[#5c5c5c]`}
                    >
                      Bhakti Marg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stat Highlights Bar */}
        <div className="relative mt-10 sm:mt-14 pt-8 border-t border-[#D4AF37]/30">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-xs border border-[#D4AF37]/25 shadow-xs transition-all duration-300 hover:bg-white/85 hover:shadow-md hover:border-[#D4AF37]/60 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#740E0A]/10 border border-[#740E0A]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {idx === 0 ? (
                    <Compass className="w-6 h-6 text-[#740E0A]" />
                  ) : idx === 1 ? (
                    <ShieldCheck className="w-6 h-6 text-[#740E0A]" />
                  ) : (
                    <SunMedium className="w-6 h-6 text-[#740E0A]" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#740E0A] tracking-tight`}
                  >
                    {stat.value}
                  </span>
                  <span
                    className={`${poppins.className} text-xs sm:text-sm font-medium text-[#3F0605]`}
                  >
                    {stat.label}
                  </span>
                  {stat.sublabel && (
                    <span
                      className={`${poppins.className} text-[11px] text-[#5c5c5c]`}
                    >
                      {stat.sublabel}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
