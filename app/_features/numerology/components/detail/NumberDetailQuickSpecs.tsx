"use client";

import React from "react";
import { QuickSpecItem } from "../../types/number-detail.types";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import {
  Sun,
  Moon,
  Flame,
  Droplet,
  Compass,
  Gem,
  Calendar,
  Sparkles,
  Shield,
  Hammer,
  Wind,
} from "lucide-react";

interface NumberDetailQuickSpecsProps {
  specs: QuickSpecItem[];
}

export function NumberDetailQuickSpecs({ specs }: NumberDetailQuickSpecsProps) {
  const getIcon = (name: QuickSpecItem["iconName"]) => {
    switch (name) {
      case "sun":
        return <Sun className="w-5 h-5 text-[#D97706]" />;
      case "moon":
        return <Moon className="w-5 h-5 text-[#4F46E5]" />;
      case "flame":
        return <Flame className="w-5 h-5 text-[#EA580C]" />;
      case "droplet":
        return <Droplet className="w-5 h-5 text-[#0284C7]" />;
      case "compass":
        return <Compass className="w-5 h-5 text-[#B45309]" />;
      case "gem":
        return <Gem className="w-5 h-5 text-[#DB2777]" />;
      case "calendar":
        return <Calendar className="w-5 h-5 text-[#059669]" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-[#D97706]" />;
      case "hammer":
        return <Hammer className="w-5 h-5 text-[#7C3AED]" />;
      case "wind":
        return <Wind className="w-5 h-5 text-[#0D9488]" />;
      case "globe":
      case "shield":
      default:
        return <Shield className="w-5 h-5 text-[#B45309]" />;
    }
  };

  return (
    <section className="relative w-full bg-[#FAF5EE] py-6 sm:py-8 border-y border-[#C49A45]/35 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-4 items-stretch">
            {specs.map((item, idx) => (
              <ScrollReveal
                key={idx}
                animation="scale-up"
                duration={500}
                delay={idx * 45}
                className="h-full"
              >
                <div className="h-full flex items-center gap-3 p-3 rounded-xl bg-white border border-[#C49A45]/30 shadow-xs hover:border-[#C49A45] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#FAF5EC] to-[#F0E6D8] border border-[#C49A45]/40 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-108 transition-transform duration-300">
                    {getIcon(item.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`${poppins.className} block text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#740E0A] leading-tight group-hover:text-[#C49A45] transition-colors`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`${playfair.className} block text-xs sm:text-[13px] md:text-sm font-bold text-[#140804] leading-snug wrap-break-word mt-0.5`}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
