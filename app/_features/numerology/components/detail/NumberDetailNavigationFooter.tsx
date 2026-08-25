"use client";

import React from "react";
import Link from "next/link";
import { playfair } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { ArrowRight } from "lucide-react";

interface NumberDetailNavigationFooterProps {
  currentNumber: number;
}

export function NumberDetailNavigationFooter({
  currentNumber,
}: NumberDetailNavigationFooterProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section className="relative w-full py-12 bg-[#0E0502] text-white border-t border-[#C49A45]/30 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <ScrollReveal animation="fade-up" duration={600}>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#FCD34D] uppercase tracking-widest block mb-1">
              EXPLORE OTHER NUMBERS
            </span>
            <p className="text-xs text-[#D8C7B5]/75">
              Select any number from 1 to 9 to examine its Vedic ruling profile
            </p>
          </div>

          {/* 1 to 9 Circular Selector Row with Active Gold Highlight */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8">
            {numbers.map((num) => {
              const isActive = num === currentNumber;
              return (
                <Link
                  key={num}
                  href={`/numerology/number-${num}`}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                    isActive
                      ? "bg-linear-to-b from-[#FCD34D] to-[#C49A45] text-[#140804] shadow-lg shadow-[#C49A45]/50 scale-110 border-2 border-white ring-2 ring-[#FCD34D]"
                      : "bg-[#250F08] text-[#D8C7B5] border border-[#C49A45]/40 hover:border-[#FCD34D] hover:bg-[#33140C] hover:scale-105"
                  }`}
                >
                  <span className={`${playfair.className}`}>{num}</span>
                </Link>
              );
            })}
          </div>

          {/* Golden CTA Button from Mockup */}
          <div className="flex justify-center">
            <Link
              href="/numerology#calculator-section"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-[#FCD34D] via-[#C49A45] to-[#8C6D23] text-[#140804] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <span>DISCOVER YOUR NUMBERS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
