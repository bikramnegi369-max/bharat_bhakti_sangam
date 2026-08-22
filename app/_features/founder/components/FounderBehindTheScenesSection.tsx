"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Play } from "lucide-react";
import { BEHIND_THE_SCENES } from "../constants/founder.constants";
import { BehindTheScenesItem } from "../types/founder.types";

interface FounderBehindTheScenesSectionProps {
  onSelectVideo?: (item: { title: string; videoUrl?: string }) => void;
}

export function FounderBehindTheScenesSection({
  onSelectVideo,
}: FounderBehindTheScenesSectionProps) {
  const items = BEHIND_THE_SCENES;

  const handleCardClick = (item: BehindTheScenesItem) => {
    if (onSelectVideo) {
      onSelectVideo({
        title: item.title,
        videoUrl: item.videoUrl || "/hero-video.mp4",
      });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#FCFAF5] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.12em] text-[#740E0A] uppercase`}
          >
            BEHIND THE SCENES — THE REAL JOURNEY
          </h2>
          <div className="w-16 h-0.5 bg-[#C49A45] mx-auto mt-3" />
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(item);
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
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E86A17] text-white flex items-center justify-center shadow-[0_0_18px_rgba(232,106,23,0.6)] group-hover:scale-115 group-hover:bg-[#C9530C] transition-all duration-300">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge if available */}
                {item.duration && (
                  <span
                    className={`${poppins.className} absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 text-[10px] text-white/90 font-medium`}
                  >
                    {item.duration}
                  </span>
                )}
              </div>

              {/* Title & Category beneath */}
              <div className="mt-2.5 text-center px-1">
                <span
                  className={`${poppins.className} text-[10px] uppercase font-semibold text-[#9A3412] tracking-wider block`}
                >
                  {item.category}
                </span>
                <h3
                  className={`${poppins.className} text-xs font-semibold text-[#302D2D] line-clamp-2 mt-0.5 leading-snug group-hover:text-[#740E0A] transition-colors`}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
