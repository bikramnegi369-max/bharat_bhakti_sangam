"use client";

import React from "react";
import { poppins } from "@/_lib/fonts";
import { SANATANA_FILTERS } from "../constants/sanatana.constants";
import { SanatanaEpochKey } from "../types/sanatana.types";

interface SanatanaFilterBarProps {
  activeEpoch: SanatanaEpochKey;
  onSelectEpoch: (epochId: SanatanaEpochKey) => void;
}

export function SanatanaFilterBar({
  activeEpoch,
  onSelectEpoch,
}: SanatanaFilterBarProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 
        Spacious container with generous internal horizontal padding (px-5 sm:px-7 lg:px-9) 
        and clean gaps so tabs never touch the boundary edges.
      */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5 px-5 sm:px-7 lg:px-9 py-3 sm:py-3.5 rounded-2xl lg:rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37]/50 shadow-xl">
        {SANATANA_FILTERS.map((filter) => {
          const isActive = activeEpoch === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onSelectEpoch(filter.id)}
              className={`${poppins.className} shrink-0 px-4 sm:px-5 lg:px-5.5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                isActive
                  ? "bg-[#740E0A] text-white shadow-md shadow-[#740E0A]/30 font-semibold scale-102"
                  : "bg-transparent text-[#3F0605] hover:bg-[#740E0A]/10 hover:text-[#740E0A]"
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{filter.label}</span>
                {filter.sanskritLabel && (
                  <span
                    className={`text-[10px] sm:text-[11px] font-normal ${
                      isActive ? "text-[#FCD34D]" : "text-[#740E0A]/70"
                    }`}
                  >
                    ({filter.sanskritLabel})
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
