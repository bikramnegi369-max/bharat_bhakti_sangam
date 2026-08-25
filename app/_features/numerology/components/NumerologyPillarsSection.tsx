"use client";

import React from "react";
import { playfair, poppins } from "@/_lib/fonts";
import { Sun, Compass, Sparkles, BookOpen } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { NUMEROLOGY_FEATURES } from "../constants/numerology.constants";

export function NumerologyPillarsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="w-6 h-6 text-[#C49A45]" />;
      case "compass":
        return <Compass className="w-6 h-6 text-[#C49A45]" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-[#C49A45]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#C49A45]" />;
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#180A06] text-white overflow-hidden border-t border-[#C49A45]/20">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {NUMEROLOGY_FEATURES.map((feature, idx) => (
            <ScrollReveal
              key={feature.id}
              animation="fade-up"
              duration={650}
              delay={idx * 100}
            >
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#220D08]/90 border border-[#C49A45]/30 hover:border-[#C49A45]/70 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-[#C49A45]/15 border border-[#C49A45]/30 flex items-center justify-center mb-5">
                  {getIcon(feature.iconName)}
                </div>
                <h3
                  className={`${playfair.className} text-xl font-bold text-white mb-2`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${poppins.className} text-xs sm:text-sm text-[#D8C7B5]/80 leading-relaxed`}
                >
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
