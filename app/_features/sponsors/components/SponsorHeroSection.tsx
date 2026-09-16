"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Flame, Users, Music2, Heart } from "lucide-react";
import { SPONSOR_HERO_PILLARS } from "../constants/sponsors.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface SponsorHeroSectionProps {
  onBecomeSponsorClick: () => void;
  onExploreOpportunitiesClick: () => void;
}

export function SponsorHeroSection({
  onBecomeSponsorClick,
  onExploreOpportunitiesClick,
}: SponsorHeroSectionProps) {
  const renderPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "lotus":
        return <Flame className="w-5 h-5 text-[#E5A93C] shrink-0" />;
      case "users":
        return <Users className="w-5 h-5 text-[#E5A93C] shrink-0" />;
      case "music":
        return <Music2 className="w-5 h-5 text-[#E5A93C] shrink-0" />;
      case "heart":
        return <Heart className="w-5 h-5 text-[#E5A93C] shrink-0" />;
      default:
        return <Flame className="w-5 h-5 text-[#E5A93C] shrink-0" />;
    }
  };

  return (
    <section className="relative w-full min-h-145 lg:min-h-160 text-white overflow-hidden border-b border-[#E5A93C]/20 flex items-center">
      {/* 
        Full-Bleed Devotional Concert Stage Background:
        Spans the entire hero section. The right side reveals the illuminated stage, performers, 
        sacred smoke, and energetic crowd, while the left side features an ambient gradient scrim 
        for high-contrast, crystal-clear typography.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home_hero.webp"
          alt="Bharat Bhakti Sangam Devotional Concert Experience"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center brightness-100 contrast-105"
        />
        {/* Soft atmospheric gradient scrim: slightly deeper on the left for text contrast, open and vibrant across the rest */}
        <div className="absolute inset-0 bg-linear-to-r from-[#180404]/90 via-[#180404]/60 via-40% to-black/30" />

        {/* Subtle top & bottom edge blending */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#180404]/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8">
          <ScrollReveal animation="fade-up" delay={50}>
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-white leading-[1.12]">
                PARTNER{" "}
                <span className="text-white/90 font-semibold">WITH A</span>
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E5A93C] via-[#FFD089] to-[#E86A17]">
                  MOVEMENT OF DEVOTION
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl leading-relaxed pt-1">
                Support an experience where music, devotion and community come
                together.
              </p>
            </div>
          </ScrollReveal>

          {/* 4 Pillars with thematic icons */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 pt-1">
              {SPONSOR_HERO_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 border border-white/15 backdrop-blur-md hover:border-[#E5A93C]/40 transition-colors"
                >
                  {renderPillarIcon(pillar.iconName)}
                  <div>
                    <div className="text-[11.5px] sm:text-xs font-bold tracking-wider text-white">
                      {pillar.label}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-300 font-normal">
                      {pillar.sublabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal animation="fade-up" delay={250}>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onBecomeSponsorClick}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-linear-to-r from-[#E86A17] to-[#D4AF37] text-neutral-950 font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 shadow-lg shadow-[#E86A17]/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>BECOME A SPONSOR</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreOpportunitiesClick}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-black/40 hover:bg-white/15 text-white font-semibold text-sm sm:text-base tracking-wide border border-white/30 hover:border-white/60 backdrop-blur-md active:scale-[0.98] transition-all cursor-pointer"
              >
                EXPLORE OPPORTUNITIES
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
