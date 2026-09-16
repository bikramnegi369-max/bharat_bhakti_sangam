"use client";

import React from "react";
import Image from "next/image";
import {
  Crown,
  Sparkles,
  Music,
  Flame,
  UtensilsCrossed,
  Coffee,
  Droplet,
  ConciergeBell,
  Camera,
  Smartphone,
  Plane,
  Gift,
  Laptop,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { SPONSORSHIP_OPPORTUNITIES } from "../constants/sponsors.constants";
import { SponsorOpportunity } from "../types/sponsors.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface SponsorOpportunitiesSectionProps {
  onSelectOpportunity: (opportunity: SponsorOpportunity) => void;
}

export function SponsorOpportunitiesSection({
  onSelectOpportunity,
}: SponsorOpportunitiesSectionProps) {
  const renderOpportunityIcon = (iconName: string) => {
    switch (iconName) {
      case "crown":
        return <Crown className="w-5 h-5 text-[#E86A17]" />;
      case "stage":
        return <Sparkles className="w-5 h-5 text-[#E86A17]" />;
      case "music":
        return <Music className="w-5 h-5 text-[#E86A17]" />;
      case "flame":
        return <Flame className="w-5 h-5 text-[#E86A17]" />;
      case "bowl":
        return <UtensilsCrossed className="w-5 h-5 text-[#E86A17]" />;
      case "coffee":
        return <Coffee className="w-5 h-5 text-[#E86A17]" />;
      case "droplet":
        return <Droplet className="w-5 h-5 text-[#E86A17]" />;
      case "bell":
        return <ConciergeBell className="w-5 h-5 text-[#E86A17]" />;
      case "camera":
        return <Camera className="w-5 h-5 text-[#E86A17]" />;
      case "smartphone":
        return <Smartphone className="w-5 h-5 text-[#E86A17]" />;
      case "plane":
        return <Plane className="w-5 h-5 text-[#E86A17]" />;
      case "gift":
        return <Gift className="w-5 h-5 text-[#E86A17]" />;
      case "monitor":
        return <Laptop className="w-5 h-5 text-[#E86A17]" />;
      case "heart":
        return <HeartHandshake className="w-5 h-5 text-[#E86A17]" />;
      default:
        return <Crown className="w-5 h-5 text-[#E86A17]" />;
    }
  };

  return (
    <section
      id="sponsorship-opportunities"
      className="relative w-full bg-[#FAF6EE] py-16 sm:py-20 lg:py-24 scroll-mt-20 border-b border-[#EADFCB]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3F0605] tracking-tight">
              SPONSORSHIP <span className="text-[#E86A17]">OPPORTUNITIES</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed pt-2">
              Choose an opportunity that aligns with your brand&apos;s purpose.
              Together, we can create a meaningful impact.
            </p>
          </ScrollReveal>
        </div>

        {/* Opportunities Grid: 14 cards (2 rows of 7 on desktop or responsive 2-4-7 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4 items-stretch">
          {SPONSORSHIP_OPPORTUNITIES.map((opp, index) => (
            <ScrollReveal
              key={opp.id}
              animation="fade-up"
              delay={50 + (index % 7) * 40}
              className="h-full flex flex-col"
            >
              <div
                onClick={() => onSelectOpportunity(opp)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectOpportunity(opp);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${opp.title} sponsorship opportunity`}
                className="group relative flex flex-col h-full rounded-xl overflow-hidden bg-white border border-[#E5DFD3] shadow-xs hover:shadow-lg hover:border-[#E86A17] transition-all duration-300 cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E86A17] active:scale-[0.98]"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-neutral-900">
                  <Image
                    src={opp.imageSrc}
                    alt={opp.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 180px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500 brightness-95"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Card Bottom Body: flex-1 ensures every card stretches to exact equal height */}
                <div className="p-3 sm:p-3.5 flex flex-col flex-1 items-center justify-between bg-white group-hover:bg-[#FFF7ED] transition-colors">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-8 h-8 rounded-full bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center mb-1.5 transition-colors shrink-0">
                      {renderOpportunityIcon(opp.iconName)}
                    </div>

                    <h3 className="text-[12px] sm:text-[12.5px] font-bold text-[#3F0605] line-clamp-2 leading-snug min-h-[2.4rem] flex items-center justify-center">
                      {opp.title}
                    </h3>
                  </div>

                  {/* Micro action hint visible on focus/hover */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#E86A17] opacity-0 group-hover:opacity-100 transition-opacity pt-1 mt-auto">
                    Select <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
