"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Users, Calendar, Heart, Shield } from "lucide-react";
import { FOUNDER_DATA, FOUNDER_STATS } from "../constants/founder.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function FounderHeroSection() {
  const data = FOUNDER_DATA;
  const stats = FOUNDER_STATS;

  const renderStatIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users className="w-5 h-5 text-[#E5A93C] stroke-2" />;
      case "calendar":
        return <Calendar className="w-5 h-5 text-[#E5A93C] stroke-2" />;
      case "heart":
        return <Heart className="w-5 h-5 text-[#E5A93C] stroke-2" />;
      case "shield":
        return <Shield className="w-5 h-5 text-[#E5A93C] stroke-2" />;
      default:
        return <Users className="w-5 h-5 text-[#E5A93C] stroke-2" />;
    }
  };

  return (
    <section className="relative w-full bg-[#EFE8DC] overflow-hidden">
      {/* 
        Full-bleed Hero Banner Container:
        Combines the full devotional satsang backdrop with an ambient left scrim
        for high-contrast, crystal clear typography matching the design mockup.
      */}
      <div className="relative w-full min-h-135 sm:min-h-155 lg:min-h-175 flex items-center">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src={data.heroImage}
            alt="Deepak Kothari - Founder of Bharat Bhakti Sangam"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover object-top-right sm:object-[center_top] lg:object-[82%_top]"
          />

          {/* Glowing OM Watermark Aura on Top-Center-Left */}
          <div
            aria-hidden="true"
            className={`${playfair.className} absolute top-12 left-[38%] sm:left-[42%] text-8xl sm:text-9xl lg:text-[11rem] font-bold text-[#E5A93C]/20 blur-[1px] select-none pointer-events-none hidden md:block`}
          >
            ॐ
          </div>

          {/* Smooth Warm Scrim Overlay from Left to Right */}
          <div className="absolute inset-0 bg-linear-to-r from-[#EFE7DB] via-[#EFE7DB]/92 via-55% sm:via-50% md:via-45% to-transparent lg:to-transparent/10" />

          {/* Vertical Subtle Vignette to ground top & bottom edges */}
          <div className="absolute inset-0 bg-linear-to-t from-[#EFE7DB]/80 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col items-start text-left">
            {/* Main Headline */}
            <ScrollReveal animation="fade-right" duration={750} delay={50}>
              <h1
                className={`${playfair.className} text-[clamp(2.3rem,4.8vw,4.4rem)] font-bold text-[#3F0605] leading-[1.06] tracking-tight uppercase`}
              >
                ONE VISION.
                <br />
                MILLIONS OF VOICES.
              </h1>
            </ScrollReveal>

            {/* Subtitle Tag with Flanking Gold Lines */}
            <ScrollReveal animation="fade-right" duration={700} delay={150}>
              <div className="flex items-center gap-3 my-4 sm:my-5">
                <span className="w-8 sm:w-12 h-0.5 bg-[#C49A45]" />
                <span
                  className={`${poppins.className} text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#C49A45] uppercase`}
                >
                  {data.heroSubtitle}
                </span>
                <span className="w-8 sm:w-12 h-0.5 bg-[#C49A45]" />
              </div>
            </ScrollReveal>

            {/* Quote Block */}
            <ScrollReveal animation="fade-up" duration={800} delay={250}>
              <div className="relative my-3 sm:my-5">
                <p
                  className={`${playfair.className} italic text-xl sm:text-2xl md:text-[1.75rem] text-[#3F0605] font-medium leading-snug`}
                >
                  &ldquo; {data.heroQuote.split("\n")[0]}
                  <br />
                  {data.heroQuote.split("\n")[1]} &rdquo;
                </p>
              </div>
            </ScrollReveal>

            {/* Founder Attribution */}
            <ScrollReveal animation="fade-up" duration={750} delay={350}>
              <div className="mt-5 sm:mt-7 pt-2">
                <h2
                  className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#3F0605]`}
                >
                  {data.name}
                </h2>
                <p
                  className={`${poppins.className} text-xs sm:text-sm font-medium text-[#740E0A] mt-0.5`}
                >
                  {data.role}
                </p>
                <p
                  className={`${poppins.className} text-xs sm:text-sm text-[#5c5c5c] font-normal mt-0.5`}
                >
                  {data.organization}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Dark Burgundy Stat Bar attached at the bottom of the Hero */}
      <div className="relative z-20 w-full bg-[#3F0605] border-t border-b border-[#522323] py-6 sm:py-8 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={stat.id || index}
                animation="fade-up"
                duration={650}
                delay={index * 70}
                className="h-full"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 p-2 rounded-xl transition-all duration-300 hover:bg-white/5 h-full">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                    {renderStatIcon(stat.iconName)}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#FCD34D] tracking-tight`}
                    >
                      {stat.value}
                    </span>
                    <span
                      className={`${poppins.className} text-xs sm:text-sm font-medium text-white/90 leading-tight mt-0.5`}
                    >
                      {stat.label}
                    </span>
                    {stat.sublabel && (
                      <span
                        className={`${poppins.className} text-[11px] text-white/60 font-normal mt-0.5 hidden sm:block`}
                      >
                        {stat.sublabel}
                      </span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
