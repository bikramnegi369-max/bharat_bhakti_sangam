"use client";

import React from "react";
import { playfair, poppins } from "@/_lib/fonts";
import { Music, Users, Heart } from "lucide-react";
import { CORE_PILLARS } from "../constants/founder.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function FounderCorePillarsSection() {
  const pillars = CORE_PILLARS;

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FCFAF5] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: WHY BHAJAN CLUBBING? */}
          <ScrollReveal animation="fade-up" duration={750} delay={50} className="h-full">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6D8] shadow-[0_10px_35px_rgba(116,14,10,0.06)] hover:shadow-[0_15px_45px_rgba(116,14,10,0.1)] transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <h3
                  className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#740E0A] text-center mb-8 uppercase tracking-wide`}
                >
                  WHY BHAJAN CLUBBING?
                </h3>

                <div className="grid grid-cols-3 gap-3 text-center">
                  {/* Feature 1: Music */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#E86A17] mb-3 shadow-xs">
                      <Music className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h4
                      className={`${poppins.className} text-xs font-semibold text-[#302D2D] leading-tight mb-1`}
                    >
                      High Energy Beats
                    </h4>
                    <p
                      className={`${poppins.className} text-[11px] text-[#5c5c5c] font-normal leading-relaxed`}
                    >
                      Live dhol, fusion & beats
                    </p>
                  </div>

                  {/* Feature 2: Om */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#E86A17] mb-3 shadow-xs">
                      <span className="text-xl font-bold font-serif leading-none">
                        ॐ
                      </span>
                    </div>
                    <h4
                      className={`${poppins.className} text-xs font-semibold text-[#302D2D] leading-tight mb-1`}
                    >
                      100% Vedic Mantras
                    </h4>
                    <p
                      className={`${poppins.className} text-[11px] text-[#5c5c5c] font-normal leading-relaxed`}
                    >
                      Pure authentic scriptures
                    </p>
                  </div>

                  {/* Feature 3: Users */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#E86A17] mb-3 shadow-xs">
                      <Users className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h4
                      className={`${poppins.className} text-xs font-semibold text-[#302D2D] leading-tight mb-1`}
                    >
                      Clean Space
                    </h4>
                    <p
                      className={`${poppins.className} text-[11px] text-[#5c5c5c] font-normal leading-relaxed`}
                    >
                      100% sober & safe vibe
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F5EDE1] text-center">
                <span
                  className={`${poppins.className} text-xs text-[#9A3412] font-medium`}
                >
                  Spiritual ecstasy, zero intoxication
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: VISION 2030 */}
          <ScrollReveal animation="fade-up" duration={750} delay={150} className="h-full">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6D8] shadow-[0_10px_35px_rgba(116,14,10,0.06)] hover:shadow-[0_15px_45px_rgba(116,14,10,0.1)] transition-all duration-300 flex flex-col justify-between text-center h-full">
              <div>
                <h3
                  className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#740E0A] mb-4 uppercase tracking-wide`}
                >
                  VISION 2030
                </h3>

                {/* Lotus Icon in Gold */}
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#D4AF37] mb-5 shadow-xs">
                  <svg
                    className="w-8 h-8 fill-none stroke-current stroke-[1.8]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21c-4-4-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-4 8-8 12z" />
                    <path d="M12 21c-2-3.5-4-6.5-4-10a4 4 0 0 1 8 0c0 3.5-2 6.5-4 10z" />
                    <path d="M4 14c2.5-1 5-1 8 0 3-1 5.5-1 8 0" />
                  </svg>
                </div>

                <p
                  className={`${poppins.className} text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal`}
                >
                  {pillars[1].content}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F5EDE1]">
                <p
                  className={`${playfair.className} italic text-xs sm:text-sm text-[#9A3412] font-semibold`}
                >
                  {pillars[1].quote}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: MY PROMISE */}
          <ScrollReveal animation="fade-up" duration={750} delay={250} className="h-full">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6D8] shadow-[0_10px_35px_rgba(116,14,10,0.06)] hover:shadow-[0_15px_45px_rgba(116,14,10,0.1)] transition-all duration-300 flex flex-col justify-between text-center h-full">
              <div>
                <h3
                  className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#740E0A] mb-4 uppercase tracking-wide`}
                >
                  MY PROMISE
                </h3>

                {/* Heart Icon in Gold */}
                <div className="w-14 h-14 mx-auto rounded-full bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#D4AF37] mb-5 shadow-xs">
                  <Heart className="w-7 h-7 stroke-[1.8]" />
                </div>

                <p
                  className={`${poppins.className} text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal`}
                >
                  {pillars[2].content}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F5EDE1]">
                <span
                  className={`${playfair.className} text-sm font-bold text-[#740E0A]`}
                >
                  {pillars[2].signature}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
