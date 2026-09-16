"use client";

import React from "react";
import Image from "next/image";
import { Megaphone, Tv, Share2, Store, Mic2, Star, Video } from "lucide-react";
import { SPONSOR_BENEFITS } from "../constants/sponsors.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function SponsorBenefitsSection() {
  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "megaphone":
        return <Megaphone className="w-6 h-6 text-[#FED7AA]" />;
      case "tv":
        return <Tv className="w-6 h-6 text-[#FED7AA]" />;
      case "share2":
        return <Share2 className="w-6 h-6 text-[#FED7AA]" />;
      case "store":
        return <Store className="w-6 h-6 text-[#FED7AA]" />;
      case "mic":
        return <Mic2 className="w-6 h-6 text-[#FED7AA]" />;
      case "star":
        return <Star className="w-6 h-6 text-[#FED7AA]" />;
      case "video":
        return <Video className="w-6 h-6 text-[#FED7AA]" />;
      default:
        return <Star className="w-6 h-6 text-[#FED7AA]" />;
    }
  };

  return (
    <section className="relative w-full bg-[#2B0604] text-white py-16 sm:py-20 overflow-hidden border-b border-[#E5A93C]/20">
      {/* Devotional Ambient Scrim & Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E86A17]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Golden Mandala at Top-Left (Bigger & Brighter) */}
      <div className="absolute -top-24 sm:-top-32 -left-24 sm:-left-32 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 pointer-events-none select-none opacity-30 sm:opacity-40 z-0">
        <Image
          src="/mandala.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 320px, 384px"
          className="object-contain brightness-125 contrast-110"
          aria-hidden="true"
        />
      </div>

      {/* Golden Mandala at Bottom-Right (Bigger & Brighter) */}
      <div className="absolute -bottom-24 sm:-bottom-32 -right-24 sm:-right-32 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 pointer-events-none select-none opacity-30 sm:opacity-40 z-0">
        <Image
          src="/mandala.webp"
          alt=""
          fill
          sizes="(max-width: 1024px) 320px, 384px"
          className="object-contain brightness-125 contrast-110"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
          {/* Main Content Area: 10 Columns on Desktop */}
          <div className="lg:col-span-10 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                BRAND VISIBILITY{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFD089] to-[#E86A17]">
                  &amp; BENEFITS
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-normal pt-1.5">
                As a valued partner, your brand will receive visibility across
                multiple touchpoints, including:
              </p>
            </div>

            {/* 7 Horizontal/Grid Benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-3 pt-4">
              {SPONSOR_BENEFITS.map((benefit, index) => (
                <ScrollReveal
                  key={benefit.id}
                  animation="fade-up"
                  delay={50 + index * 50}
                  className="relative z-10"
                >
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#2A0503]/85 backdrop-blur-md border border-white/15 hover:border-[#FED7AA]/50 hover:bg-[#320705]/95 transition-all duration-300 min-h-30 justify-center shadow-sm group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                      {renderBenefitIcon(benefit.iconName)}
                    </div>
                    <span className="text-[11.5px] sm:text-xs text-neutral-200 font-medium leading-tight">
                      {benefit.title}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Footnote */}
            <p className="text-[11px] sm:text-xs text-neutral-400 italic pt-1">
              *Benefits may vary based on the selected sponsorship category.
            </p>
          </div>

          {/* Right Callout: Slogan Motif matching Mockup */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center text-center lg:text-right border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#FFD089] font-bold">
                Good Brands
              </span>
              <div className="text-lg sm:text-xl font-bold italic text-amber-200 leading-tight">
                Build Greater Tomorrows
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
