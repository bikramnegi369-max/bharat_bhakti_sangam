"use client";

import React from "react";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Play } from "lucide-react";
import { DEVOTION_HIGHLIGHT } from "../constants/founder.constants";

interface FounderDevotionVideoSectionProps {
  onWatchVideo?: (item: { title: string; videoUrl?: string }) => void;
}

export function FounderDevotionVideoSection({
  onWatchVideo,
}: FounderDevotionVideoSectionProps) {
  const data = DEVOTION_HIGHLIGHT;

  const handlePlay = () => {
    if (onWatchVideo) {
      onWatchVideo({
        title: data.title,
        videoUrl: data.videoUrl,
      });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#370504] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#E86A17]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#D4AF37]/20 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Description & Gold Button (lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <h2
              className={`${playfair.className} text-[clamp(2.2rem,4vw,3.4rem)] font-bold text-white leading-[1.12] tracking-tight uppercase`}
            >
              THIS IS WHAT
              <br />
              DEVOTION LOOKS LIKE.
            </h2>

            <p
              className={`${poppins.className} mt-5 sm:mt-6 text-sm sm:text-base text-white/85 leading-relaxed font-normal`}
            >
              {data.description}
            </p>

            <div className="mt-7 sm:mt-9">
              <button
                type="button"
                onClick={handlePlay}
                className={`${poppins.className} inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#C49A45] text-[#3F0605] font-semibold text-sm sm:text-base shadow-[0_10px_25px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer`}
              >
                <Play className="w-4 h-4 fill-[#3F0605]" />
                <span>{data.ctaLabel}</span>
              </button>
            </div>
          </div>

          {/* Right Column: 16:9 Cinematic Video Card (lg: 7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              onClick={handlePlay}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePlay();
                }
              }}
              className="group relative w-full aspect-16/9 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]"
            >
              <Image
                src={data.thumbnail}
                alt={data.title}
                fill
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 600px, 720px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              {/* Centered Play Pulse Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-115 group-hover:bg-[#E86A17] transition-all duration-300 shadow-2xl">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white text-white ml-1" />
                  </div>
                  {/* Subtle pulsing outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-30 pointer-events-none" />
                </div>
              </div>

              {/* Bottom Duration Badge */}
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <span
                  className={`${poppins.className} px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-white`}
                >
                  {data.duration}
                </span>
                <span
                  className={`${poppins.className} text-xs font-light text-white/80 hidden sm:inline-block`}
                >
                  Full Concert Highlights
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
