"use client";

import React from "react";
import clsx from "clsx";
import { Sparkles, Music2, Users, Flame, LucideIcon } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export interface WhyJoinUsItem {
  id?: string | number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface WhyJoinUsSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: WhyJoinUsItem[];
  className?: string;
}

const DEFAULT_FEATURES: WhyJoinUsItem[] = [
  {
    id: "spiritual-connection",
    icon: Sparkles,
    title: "Spiritual Connection",
    description:
      "Traditional bhajans and sacred chants connect the soul to divine consciousness.",
  },
  {
    id: "live-experience",
    icon: Music2,
    title: "Live Experience",
    description:
      "Live concert atmosphere with professional sound, immersive lighting & decor.",
  },
  {
    id: "community-positivity",
    icon: Users,
    title: "Community & Positivity",
    description:
      "A space where families gather together to experience positivity, devotion & love.",
  },
  {
    id: "divine-energy",
    icon: Flame,
    title: "Divine Energy",
    description:
      "Immerse in soul-stirring devotional performances by renowned artists.",
  },
];

export default function WhyJoinUsSection({
  eyebrow = "WHY JOIN US?",
  features = DEFAULT_FEATURES,
  className,
}: WhyJoinUsSectionProps) {
  return (
    <section
      aria-labelledby="why-join-us-heading"
      className={clsx(
        "relative overflow-hidden py-[clamp(3rem,5vw,6rem)]",
        "bg-linear-to-b from-[#2E0403] via-[#3B0504] to-[#250302] text-white",
        className,
      )}
    >
      {/* Ambient background glow & sacred radiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-212.5 h-90 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(116,14,10,0.22)_45%,transparent_75%)] blur-3xl" />
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Header with ornamental decorative divider */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-6 w-full max-w-xl">
            <span className="h-px grow bg-linear-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]/80" />
            <span
              className={clsx(
                playfair.className,
                "text-[clamp(0.85rem,1.1vw,1.05rem)] tracking-[0.25em] sm:tracking-[0.35em] text-[#E8C267] font-semibold uppercase px-2 drop-shadow-sm select-none",
              )}
            >
              {eyebrow}
            </span>
            <span className="h-px grow bg-linear-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]/80" />
          </div>
        </div>

        {/* 4 Cards Grid - Responsive from 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 xl:gap-8 items-stretch">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id ?? idx}
                className={clsx(
                  "group relative flex flex-col justify-start rounded-2xl p-7 sm:p-8 transition-all duration-300 ease-out",
                  // Glassmorphism card surface on royal deep burgundy
                  "bg-white/4 backdrop-blur-md",
                  "border border-[#D4AF37]/15 hover:border-[#D4AF37]/45",
                  "hover:bg-white/[0.07] hover:-translate-y-1.5",
                  "shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(212,175,55,0.12)]",
                )}
              >
                {/* Subtle top card golden accent on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Icon Container */}
                <div className="mb-6 flex items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#E8C267] group-hover:scale-110 group-hover:bg-[#D4AF37]/20 group-hover:text-[#F3D78A] transition-all duration-300">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={clsx(
                    playfair.className,
                    "text-xl sm:text-[1.35rem] font-semibold text-neutral-100 leading-snug tracking-wide group-hover:text-[#F9E2A8] transition-colors duration-300 mb-3",
                  )}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={clsx(
                    poppins.className,
                    "text-[0.925rem] sm:text-[0.95rem] text-neutral-300/85 leading-relaxed font-light grow",
                  )}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
