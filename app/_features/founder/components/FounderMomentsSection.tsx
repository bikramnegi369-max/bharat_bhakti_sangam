"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Play, Heart, Sparkles } from "lucide-react";
import { DEVOTIONAL_MOMENTS } from "../constants/founder.constants";
import { DevotionalMoment } from "../types/founder.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface FounderMomentsSectionProps {
  onSelectMoment?: (item: { title: string; videoUrl?: string }) => void;
}

export function FounderMomentsSection({
  onSelectMoment,
}: FounderMomentsSectionProps) {
  const moments = DEVOTIONAL_MOMENTS;

  const renderIcon = (type: "play" | "heart" | "star") => {
    switch (type) {
      case "play":
        return <Play className="w-4 h-4 fill-white text-white ml-0.5" />;
      case "heart":
        return <Heart className="w-4 h-4 fill-white text-white" />;
      case "star":
        return <Sparkles className="w-4 h-4 fill-white text-white" />;
      default:
        return <Play className="w-4 h-4 fill-white text-white ml-0.5" />;
    }
  };

  const handleClick = (item: DevotionalMoment) => {
    if (onSelectMoment) {
      onSelectMoment({
        title: item.title,
        videoUrl: item.videoUrl || "/hero-video.mp4",
      });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#EADFCF] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#740E0A] uppercase`}
            >
              MOMENTS THAT INSPIRED THOUSANDS
            </h2>
            <div className="w-16 h-0.5 bg-[#C49A45] mx-auto mt-3" />
          </div>
        </ScrollReveal>

        {/* 5-Card Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {moments.map((item, index) => (
            <ScrollReveal
              key={item.id}
              animation="scale-up"
              duration={650}
              delay={index * 90}
            >
              <div
                onClick={() => handleClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick(item);
                  }
                }}
                className="group flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#740E0A] rounded-2xl"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-md border border-[#E5DFD3] bg-[#EADBCE]">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Dark Scrim */}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />

                  {/* Centered Circular Icon Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-115 group-hover:bg-[#E86A17] transition-all duration-300 shadow-md">
                      {renderIcon(item.iconType)}
                    </div>
                  </div>
                </div>

                {/* Title & Location beneath */}
                <div className="mt-2.5 text-center px-1">
                  <h3
                    className={`${poppins.className} text-xs font-semibold text-[#302D2D] line-clamp-1 group-hover:text-[#740E0A] transition-colors`}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={`${poppins.className} text-[11px] text-[#5c5c5c] font-normal block mt-0.5`}
                  >
                    {item.location}
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
