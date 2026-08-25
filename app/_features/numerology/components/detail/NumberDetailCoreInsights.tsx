"use client";

import React from "react";
import Image from "next/image";
import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import {
  Sparkles,
  Quote,
  BookOpen,
  User,
  HeartHandshake,
  TrendingUp,
  Coins,
  Shield,
  Gift,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Compass,
} from "lucide-react";

interface NumberDetailCoreInsightsProps {
  config: NumerologyNumberDetailConfig;
}

export function NumberDetailCoreInsights({ config }: NumberDetailCoreInsightsProps) {
  const { understanding, personality, strengthsAndWeaknesses } = config;

  const sidebarLinks = [
    { label: "Personality Traits", href: "#personality", icon: User },
    { label: "Professional Life", href: "#life-dimensions", icon: TrendingUp },
    { label: "Business & Career", href: "#life-dimensions", icon: BookOpen },
    { label: "Wealth & Finance", href: "#life-dimensions", icon: Coins },
    { label: "Love & Bonds", href: "#life-dimensions", icon: HeartHandshake },
    { label: "Compatibility Matrix", href: "#compatibility", icon: HeartHandshake },
    { label: "Ruling Planet & Deities", href: "#ruling-planet", icon: Shield },
    { label: "Sacred Remedies", href: "#remedies", icon: Gift },
    { label: "Lucky Factors", href: "#remedies", icon: Sparkles },
    { label: "Frequently Asked Questions", href: "#faq", icon: HelpCircle },
  ];

  return (
    <section id="understanding" className="relative w-full py-14 sm:py-18 bg-linear-to-b from-[#FAF7F2] to-[#F5ECE0] text-[#140804]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Section Header with Golden Accent & Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#740E0A]/10 border border-[#740E0A]/20 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45] animate-pulse" />
              <span className={`${poppins.className} text-xs font-semibold text-[#740E0A] uppercase tracking-widest`}>
                Core Cosmic Identity
              </span>
            </div>
            <h2 className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#140804] tracking-tight`}>
              Personality, Nature &amp; <span className="text-[#C49A45]">Vedic Strengths</span>
            </h2>
            <div className="w-36 h-0.5 mx-auto bg-linear-to-r from-transparent via-[#C49A45] to-transparent mt-3" />
          </ScrollReveal>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Quick Anchor Navigation */}
          <ScrollReveal animation="fade-right" duration={600} className="h-full">
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 shadow-xl shadow-[#C49A45]/10 overflow-hidden flex flex-col hover:border-[#C49A45] hover:shadow-2xl transition-all duration-300">
              
              {/* Royal Maroon Header with Gold Trims */}
              <div className="bg-linear-to-r from-[#740E0A] to-[#500A07] p-4 text-white border-b-2 border-[#C49A45]">
                <span className={`${poppins.className} text-xs font-bold uppercase tracking-[0.2em] block text-[#FCD34D]`}>
                  ✦ QUICK NAVIGATION ✦
                </span>
                <span className={`${poppins.className} text-[11px] text-[#E7DACD] mt-0.5 block font-light`}>
                  Jump to Section
                </span>
              </div>

              {/* Nav Links */}
              <div className="p-3 divide-y divide-[#C49A45]/15 flex-1 flex flex-col justify-around text-xs">
                {sidebarLinks.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      className="flex items-center justify-between py-2 px-2.5 rounded-lg text-[#5A4A3E] hover:text-[#740E0A] hover:bg-[#FAF5EC] font-medium transition-all group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <IconComp className="w-3.5 h-3.5 text-[#C49A45] group-hover:text-[#740E0A] transition-colors shrink-0" />
                        <span className={`${poppins.className} truncate font-medium`}>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C49A45]/50 group-hover:text-[#740E0A] group-hover:translate-x-1 transition-transform shrink-0" />
                    </a>
                  );
                })}
              </div>

            </div>
          </ScrollReveal>

          {/* Card 2: UNDERSTANDING & NATURE */}
          <ScrollReveal animation="fade-up" duration={650} className="h-full">
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
              <div>
                <h3
                  className={`${playfair.className} text-base sm:text-lg font-bold text-[#140804] uppercase pb-3 mb-3.5 border-b border-[#C49A45]/25 flex items-center justify-between`}
                >
                  <span>UNDERSTANDING &amp; NATURE</span>
                  <Compass className="w-4 h-4 text-[#C49A45]" />
                </h3>

                <div className={`${poppins.className} space-y-3 text-xs sm:text-[13px] text-[#4A3B32] leading-relaxed font-light`}>
                  {understanding.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Golden Sacred Quote Block */}
              <div className="mt-6 p-4 rounded-xl bg-linear-to-br from-[#FAF5EC] via-[#F5ECE0] to-[#EFE2CF] border border-[#C49A45]/50 relative shadow-inner">
                <Quote className="w-5 h-5 text-[#C49A45]/35 absolute top-3 right-3" />
                <p
                  className={`${playfair.className} text-xs sm:text-sm text-[#740E0A] italic font-semibold leading-relaxed`}
                >
                  “{understanding.quote.text}”
                </p>
                {understanding.quote.author && (
                  <span className={`${poppins.className} block mt-2 text-[10.5px] font-semibold text-[#8C6D23] uppercase tracking-wider`}>
                    — {understanding.quote.author}
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: PERSONALITY TRAITS */}
          <ScrollReveal animation="fade-up" duration={650} delay={100} className="h-full">
            <div id="personality" className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300">
              <div>
                <h3
                  className={`${playfair.className} text-base sm:text-lg font-bold text-[#140804] uppercase pb-3 mb-3.5 border-b border-[#C49A45]/25 flex items-center justify-between`}
                >
                  <span>PERSONALITY TRAITS</span>
                  <User className="w-4 h-4 text-[#740E0A]" />
                </h3>

                {/* Positive Traits */}
                <div className="mb-5">
                  <span className={`${poppins.className} inline-flex items-center gap-1.5 text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-2.5 px-2.5 py-0.5 rounded-md bg-[#ECFDF5] border border-[#10B981]/30`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> POSITIVE TRAITS
                  </span>
                  <ul className={`${poppins.className} space-y-2 text-xs text-[#3D312A]`}>
                    {personality.positiveTraits.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#10B981]/15 flex items-center justify-center text-[#10B981] shrink-0 font-bold text-[10px] mt-0.5">
                          ✓
                        </span>
                        <span className="font-medium leading-tight">{t.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shadow Traits */}
                <div>
                  <span className={`${poppins.className} inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B91C1C] uppercase tracking-wider mb-2.5 px-2.5 py-0.5 rounded-md bg-[#FEF2F2] border border-[#EF4444]/30`}>
                    <AlertCircle className="w-3.5 h-3.5" /> CHALLENGES / SHADOW
                  </span>
                  <ul className={`${poppins.className} space-y-2 text-xs text-[#3D312A]`}>
                    {personality.shadowTraits.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#EF4444]/15 flex items-center justify-center text-[#EF4444] shrink-0 font-bold text-[10px] mt-0.5">
                          ✕
                        </span>
                        <span className="font-medium leading-tight">{t.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: STRENGTHS & WEAKNESSES */}
          <ScrollReveal animation="fade-left" duration={650} delay={150} className="h-full">
            <div className="h-full rounded-2xl bg-white border border-[#C49A45]/40 p-5 sm:p-6 shadow-xl shadow-[#C49A45]/10 flex flex-col justify-between hover:border-[#C49A45] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              
              {/* Sacred Lotus Background Graphic */}
              <div className="absolute -bottom-8 -right-8 w-44 h-44 opacity-25 pointer-events-none">
                <Image
                  src="/numerology/numerology_language.webp"
                  alt="Sacred Lotus Mandala"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="relative z-10">
                <h3
                  className={`${playfair.className} text-base sm:text-lg font-bold text-[#140804] uppercase pb-3 mb-3.5 border-b border-[#C49A45]/25 flex items-center justify-between`}
                >
                  <span>STRENGTHS &amp; TASKS</span>
                  <Shield className="w-4 h-4 text-[#C49A45]" />
                </h3>

                {/* Strengths */}
                <div className="mb-4">
                  <span className={`${poppins.className} block text-[11px] font-bold text-[#047857] uppercase tracking-wider mb-2`}>
                    KEY STRENGTHS
                  </span>
                  <ul className={`${poppins.className} space-y-1.5 text-xs text-[#4A3B32]`}>
                    {strengthsAndWeaknesses.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
                        <span className="font-normal">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pitfalls */}
                <div>
                  <span className={`${poppins.className} block text-[11px] font-bold text-[#740E0A] uppercase tracking-wider mb-2`}>
                    AREAS TO GUARD
                  </span>
                  <ul className={`${poppins.className} space-y-1.5 text-xs text-[#4A3B32]`}>
                    {strengthsAndWeaknesses.weaknesses.map((weak, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                        <span className="font-normal">{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Karmic Mission Tag */}
              <div className="relative z-10 mt-4 p-3 rounded-xl bg-linear-to-r from-[#200A04] to-[#140602] text-white border border-[#C49A45]/50 text-[11px] shadow-md">
                <strong className={`${poppins.className} text-[#FCD34D] block mb-0.5 font-semibold`}>✦ Karmic Mission:</strong>
                <p className={`${poppins.className} text-[#D8C7B5]/90 font-light leading-relaxed`}>
                  {strengthsAndWeaknesses.karmicLesson}
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
