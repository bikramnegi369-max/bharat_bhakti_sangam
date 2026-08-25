"use client";

import React from "react";
import { playfair, poppins } from "@/_lib/fonts";
import { User, Calendar, Disc, Users, Footprints, Flower2 } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { NUMEROLOGY_JOURNEY_STEPS } from "../constants/numerology.constants";

export function NumerologyJourneySection() {
  const steps = NUMEROLOGY_JOURNEY_STEPS;

  const renderIcon = (iconName: string, isHighlighted?: boolean) => {
    const iconClass = `w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110 ${
      isHighlighted ? "text-[#C49A45]" : "text-[#522323]"
    }`;

    switch (iconName) {
      case "user":
        return <User className={iconClass} strokeWidth={1.75} />;
      case "calendar":
        return <Calendar className={iconClass} strokeWidth={1.75} />;
      case "chakra":
        return <Disc className={iconClass} strokeWidth={1.75} />;
      case "personality":
        return <Users className={iconClass} strokeWidth={1.75} />;
      case "purpose":
        return <Footprints className={iconClass} strokeWidth={1.75} />;
      case "growth":
        return <Flower2 className={iconClass} strokeWidth={1.75} />;
      default:
        return <User className={iconClass} strokeWidth={1.75} />;
    }
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-secondary text-[#3F0605] overflow-hidden border-t border-[#E8DCC8]">
      {/* Background Soft Light Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-75 bg-[#C49A45]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Main Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal animation="fade-up" duration={750}>
            <h2
              className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.25em] text-[#3F0605] uppercase`}
            >
              YOUR NUMEROLOGY JOURNEY
            </h2>
          </ScrollReveal>
        </div>

        {/* 6 Steps Horizontal Connected Stepper */}
        <div className="relative">
          {/* Connecting Dashed Timeline Line behind the circular icons */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-[#D4AF37]/50 -translate-y-1/2 pointer-events-none z-0"
          />

          {/* Steps Grid: Responsive on all viewports (2 cols mobile, 3 cols tablet, 6 cols desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 xl:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <ScrollReveal
                key={step.id}
                animation="fade-up"
                duration={650}
                delay={idx * 90}
                className="h-full"
              >
                <div className="group flex flex-col items-center text-center h-full">
                  {/* Circular Step Badge with Gold Accent Ring */}
                  <div
                    className={`relative w-22 h-22 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 mb-5 sm:mb-6 shadow-md ${
                      step.isHighlighted
                        ? "bg-[#FCFAF5] border-2 border-[#C49A45] shadow-[#C49A45]/30 ring-4 ring-[#C49A45]/15 group-hover:scale-105"
                        : "bg-white border border-[#D4AF37]/45 shadow-black/5 group-hover:border-[#C49A45] group-hover:shadow-lg group-hover:shadow-[#C49A45]/20 group-hover:scale-105"
                    }`}
                  >
                    {renderIcon(step.iconName, step.isHighlighted)}
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`${poppins.className} text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase mb-2 min-h-9 flex items-center justify-center ${
                      step.isHighlighted ? "text-[#C49A45]" : "text-[#3F0605]"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p
                    className={`${poppins.className} text-xs sm:text-[12.5px] text-[#5C4D44] leading-relaxed max-w-47.5 font-normal`}
                  >
                    {step.description}
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
