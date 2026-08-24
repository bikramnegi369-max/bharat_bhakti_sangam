"use client";

import React from "react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import {
  Lightbulb,
  HeartHandshake,
  Music,
  MapPin,
  Zap,
  Building2,
} from "lucide-react";
import { FOUNDER_TIMELINE } from "../constants/founder.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function FounderTimelineSection() {
  const milestones = FOUNDER_TIMELINE;

  const renderMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case "idea":
      case "spark":
        return (
          <Lightbulb className="w-7 h-7 text-[#D4AF37] stroke-[1.5] transition-colors duration-300 group-hover:text-[#740E0A]" />
        );
      case "volunteers":
      case "hands":
        return (
          <HeartHandshake className="w-7 h-7 text-[#D4AF37] stroke-[1.5] transition-colors duration-300 group-hover:text-[#740E0A]" />
        );
      case "music":
        return (
          <Music className="w-7 h-7 text-[#D4AF37] stroke-[1.5] transition-colors duration-300 group-hover:text-[#740E0A]" />
        );
      case "location":
      case "globe":
        return (
          <MapPin className="w-7 h-7 text-[#D4AF37] stroke-[1.5] transition-colors duration-300 group-hover:text-[#740E0A]" />
        );
      case "energy":
      case "fire":
        return (
          <Zap className="w-7 h-7 text-[#D4AF37] stroke-[1.5] transition-colors duration-300 group-hover:text-[#740E0A]" />
        );
      case "movement":
      case "temple":
        return (
          <Building2 className="w-7 h-7 text-[#D4AF37] stroke-[1.5] transition-colors duration-300 group-hover:text-[#740E0A]" />
        );
      default:
        return (
          <Lightbulb className="w-7 h-7 text-[#D4AF37] stroke-[1.5] transition-colors duration-300 group-hover:text-[#740E0A]" />
        );
    }
  };

  return (
    <section className="relative w-full py-14 sm:py-18 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header: Golden Title with Flanking Horizontal Lines as in Mockup */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-14 sm:mb-18 lg:mb-20">
            <span
              className="w-12 sm:w-20 md:w-28 h-[1.5px] bg-[#D4AF37]"
              aria-hidden="true"
            />
            <h2
              className={clsx(
                playfair.className,
                "text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold tracking-[0.14em] text-[#D4AF37] uppercase text-center select-none",
              )}
            >
              OUR JOURNEY SO FAR
            </h2>
            <span
              className="w-12 sm:w-20 md:w-28 h-[1.5px] bg-[#D4AF37]"
              aria-hidden="true"
            />
          </div>
        </ScrollReveal>

        {/* Milestones Flow Container */}
        <div className="relative">
          {/* Connecting Golden Dashed Line across the milestone centers (desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-9 left-[7%] right-[7%] h-0 border-t-2 border-dashed border-[#D4AF37]/80 z-0"
          />

          {/* 6-Column Milestone Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4 sm:gap-x-6 relative z-10">
            {milestones.map((item, index) => (
              <ScrollReveal
                key={index}
                animation="fade-up"
                duration={700}
                delay={index * 90}
                className="h-full"
              >
                <div className="flex flex-col items-center text-center group cursor-default h-full">
                  {/* Golden Circle Outline Badge */}
                  <div
                    className={clsx(
                      "w-18 h-18 rounded-full flex items-center justify-center mb-5",
                      "bg-white border-[1.5px] border-[#D4AF37] shadow-xs",
                      "transition-all duration-300 ease-out",
                      "group-hover:scale-110 group-hover:border-[#740E0A] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)]",
                    )}
                  >
                    {renderMilestoneIcon(item.iconName)}
                  </div>

                  {/* Milestone Title */}
                  <h3
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[13px] font-bold tracking-[0.08em] uppercase text-[#740E0A] mb-2 px-1 leading-snug min-h-9.5 flex items-center justify-center",
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Milestone Description */}
                  <p
                    className={clsx(
                      poppins.className,
                      "text-[11px] sm:text-[12px] text-[#606060] font-normal leading-relaxed max-w-42.5 px-1",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
