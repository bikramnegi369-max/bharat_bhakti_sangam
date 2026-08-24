"use client";

import React, { useEffect, useRef, useState } from "react";
import { playfair, poppins } from "@/_lib/fonts";
import { EpochSectionData } from "../types/sanatana.types";

interface SanatanaEpochHeaderProps {
  epoch: EpochSectionData;
}

export function SanatanaEpochHeader({ epoch }: SanatanaEpochHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const currentEl = headerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className={`relative flex flex-col items-center justify-center text-center my-12 sm:my-16 z-30 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      {/* Background Mask Pill to completely sit above and mask the timeline line */}
      <div className="relative inline-flex flex-col items-center p-3 rounded-3xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-lg shadow-[#3F0605]/5">
        {/* Central Pill Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-white border-2 border-[#D4AF37] shadow-md shadow-[#D4AF37]/25 hover:shadow-lg hover:shadow-[#D4AF37]/40 transition-shadow">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#740E0A] animate-pulse" />
          <span
            className={`${playfair.className} text-base sm:text-lg lg:text-xl font-bold text-[#3F0605] tracking-wide uppercase`}
          >
            {epoch.title}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span
            className={`${poppins.className} text-xs sm:text-sm font-semibold text-[#740E0A] tracking-wider`}
          >
            {epoch.durationLabel}
          </span>
        </div>

        {/* Sanskrit Subtitle */}
        {epoch.sanskritTitle && (
          <span
            className={`${poppins.className} text-xs sm:text-sm font-medium text-[#C49A45] mt-2 tracking-widest`}
          >
            {epoch.sanskritTitle}
          </span>
        )}

        {/* Epoch Philosophical Context */}
        {epoch.description && (
          <p
            className={`${poppins.className} text-xs sm:text-sm text-[#5c5c5c] max-w-xl mt-1.5 px-4 leading-relaxed font-normal`}
          >
            {epoch.description}
          </p>
        )}
      </div>
    </div>
  );
}
