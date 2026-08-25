"use client";

import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import {
  Users2,
  HeartPulse,
  Sparkles,
  CheckCircle2,
  Award,
} from "lucide-react";

interface NumberDetailCompatibilitySectionProps {
  insightsRow2: NumerologyNumberDetailConfig["insightsRow2"];
  currentNumber: number;
}

export function NumberDetailCompatibilitySection({
  insightsRow2,
}: NumberDetailCompatibilitySectionProps) {
  const {
    relationshipsCard,
    compatibilitySummary,
    healthGuidance,
    growthPractices,
  } = insightsRow2;

  return (
    <section
      id="compatibility"
      className="relative w-full py-14 sm:py-18 bg-[#FAF7F2] text-[#140804]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#740E0A]/10 border border-[#740E0A]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span
                className={`${poppins.className} text-xs font-semibold text-[#740E0A] uppercase tracking-widest`}
              >
                Interpersonal &amp; Holistic Dynamics
              </span>
            </div>
            <h2
              className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#140804] tracking-tight`}
            >
              Compatibility Matrix &amp;{" "}
              <span className="text-[#C49A45]">Holistic Health</span>
            </h2>
            <p
              className={`${poppins.className} text-xs sm:text-sm text-[#5A4A3E] mt-2 font-light`}
            >
              In-depth vibrational harmony with Numbers 1–9 and Ayurvedic
              lifestyle balance
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Cards Grid: 1-col mobile, 2-col on 768px & 1024px (iPad Pro), 4-col on 1280px+ desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {/* Card 1: Relationship Dynamics */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={0}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#EC4899]/15 border border-[#EC4899]/30 flex items-center justify-center text-[#EC4899] shrink-0">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className={`${playfair.className} text-base font-bold text-[#140804]`}
                    >
                      {relationshipsCard.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`${poppins.className} block text-[11px] font-bold text-[#8C6D23] mb-2 uppercase`}
                >
                  {relationshipsCard.subtitle}
                </span>

                <ul
                  className={`${poppins.className} space-y-2 text-xs text-[#5A4A3E]`}
                >
                  {relationshipsCard.points.map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Compatibility Matrix / Ratings */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={100}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#C49A45]/20 border border-[#C49A45]/35 flex items-center justify-center text-[#740E0A] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className={`${playfair.className} text-base font-bold text-[#140804]`}
                    >
                      {compatibilitySummary.title}
                    </h3>
                  </div>
                </div>

                {/* Compatibility Table Row Items */}
                <div className={`${poppins.className} space-y-1 text-xs`}>
                  {compatibilitySummary.matches.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#FAF5EC] transition-colors border-b border-[#C49A45]/10 last:border-0"
                    >
                      <span className="font-semibold text-[#140804] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#FAF5EC] border border-[#C49A45]/30 flex items-center justify-center text-[10px] font-bold text-[#740E0A]">
                          {item.targetNumber}
                        </span>
                        <span>Number {item.targetNumber}</span>
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          item.isGreen
                            ? "bg-[#ECFDF5] text-[#047857] border border-[#10B981]/30"
                            : item.isRed
                              ? "bg-[#FEF2F2] text-[#B91C1C] border border-[#EF4444]/30"
                              : "bg-[#F3F4F6] text-[#4B5563] border border-gray-200"
                        }`}
                      >
                        {item.relation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Health Guidance */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={200}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shrink-0">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className={`${playfair.className} text-base font-bold text-[#140804]`}
                    >
                      {healthGuidance.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`${poppins.className} block text-[11px] font-bold text-[#047857] mb-2 uppercase`}
                >
                  {healthGuidance.subtitle}
                </span>

                <ul
                  className={`${poppins.className} space-y-2 text-xs text-[#5A4A3E]`}
                >
                  {healthGuidance.points.map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Daily Growth Habits */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={300}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#C49A45]/20">
                  <div className="w-9 h-9 rounded-xl bg-[#740E0A]/10 border border-[#740E0A]/20 flex items-center justify-center text-[#740E0A] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className={`${playfair.className} text-base font-bold text-[#140804]`}
                    >
                      {growthPractices.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`${poppins.className} block text-[11px] font-bold text-[#740E0A] mb-2 uppercase`}
                >
                  {growthPractices.subtitle}
                </span>

                <ul
                  className={`${poppins.className} space-y-2 text-xs text-[#5A4A3E]`}
                >
                  {growthPractices.points.map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
