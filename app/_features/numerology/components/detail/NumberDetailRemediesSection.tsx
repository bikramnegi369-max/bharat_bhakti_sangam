"use client";

import { useState } from "react";
import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import {
  Sparkles,
  Volume2,
  Calendar,
  Gift,
  Gem,
  CheckCircle2,
  ChevronDown,
  Clock,
  ShieldAlert,
} from "lucide-react";

interface NumberDetailRemediesSectionProps {
  remedies: NumerologyNumberDetailConfig["remedies"];
  faqs: NumerologyNumberDetailConfig["faqs"];
  number: number;
}

export function NumberDetailRemediesSection({
  remedies,
  faqs,
  number,
}: NumberDetailRemediesSectionProps) {
  const { mantras, luckyNumbers, luckyElements, sacredDonation } = remedies;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="remedies"
      className="relative w-full py-16 sm:py-20 bg-linear-to-b from-[#100402] via-[#160603] to-[#0A0201] text-white border-t border-[#C49A45]/40 overflow-hidden"
    >
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-137.5 h-137.5 bg-[#C49A45]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 w-125 h-125 bg-[#740E0A]/25 rounded-full blur-[170px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <ScrollReveal animation="fade-down" duration={600}>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C49A45]/15 border border-[#C49A45]/30 mb-3 backdrop-blur-md shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#FCD34D] animate-pulse" />
              <span
                className={`${poppins.className} text-[11px] font-semibold text-[#FCD34D] tracking-widest uppercase`}
              >
                Sacred Remedies &amp; Planetary Alignments
              </span>
            </div>
            <h2
              className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white`}
            >
              Vedic Remedies &amp;{" "}
              <span className="text-[#FCD34D]">Auspicious Alignments</span>
            </h2>
            <div className="w-36 h-0.5 mx-auto bg-linear-to-r from-transparent via-[#FCD34D] to-transparent mt-3" />
            <p
              className={`${poppins.className} text-xs sm:text-sm text-[#D8C7B5]/85 mt-2.5 font-light`}
            >
              Spiritual Upasanas, auspicious harmonic frequencies, and sacred
              Daan to balance karmic flow
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Rich Dark Maroon & Gold Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-16">
          {/* Card 1: Mantras for Number */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={0}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-linear-to-b from-[#220904] via-[#1A0703] to-[#120402] border border-[#C49A45]/45 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:border-[#FCD34D] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(252,211,77,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div>
                <div className="pb-3 mb-4 border-b border-[#C49A45]/25 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C49A45]/20 border border-[#C49A45]/40 flex items-center justify-center text-[#FCD34D]">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <h3
                      className={`${playfair.className} text-sm sm:text-base font-bold text-[#FCD34D] uppercase tracking-wide`}
                    >
                      MANTRAS FOR NUMBER {number}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {mantras.map((mantra, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#2D0F08]/80 border border-[#C49A45]/30 shadow-inner hover:border-[#C49A45]/70 transition-colors"
                    >
                      <span
                        className={`${poppins.className} text-[10.5px] font-bold text-[#FCD34D] uppercase block mb-1 tracking-wider`}
                      >
                        ✦ {mantra.title}
                      </span>
                      <p
                        className={`${playfair.className} text-[12.5px] font-bold text-white leading-snug my-1`}
                      >
                        {mantra.sanskrit}
                      </p>
                      <span
                        className={`${poppins.className} text-[10.5px] text-[#D8C7B5]/85 italic block leading-tight font-light`}
                      >
                        {mantra.english}
                      </span>
                      <div
                        className={`${poppins.className} mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-[#D8C7B5]/75`}
                      >
                        <span>
                          <strong>Recitation:</strong> {mantra.chantCount}
                        </span>
                        <span className="text-[#FCD34D] font-semibold">
                          108 Mala
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`${poppins.className} mt-4 pt-2.5 border-t border-[#C49A45]/20 flex items-center justify-between text-[10.5px] text-[#D8C7B5]/80`}
              >
                <span>✦ Vedic Sound Vibrations</span>
                <span className="font-semibold text-[#FCD34D]">
                  Brahma Muhurta
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Lucky Numbers & Dates */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={100}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-linear-to-b from-[#220904] via-[#1A0703] to-[#120402] border border-[#C49A45]/45 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:border-[#FCD34D] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(252,211,77,0.2)] transition-all duration-300 group">
              <div>
                <div className="pb-3 mb-4 border-b border-[#C49A45]/25 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C49A45]/20 border border-[#C49A45]/40 flex items-center justify-center text-[#FCD34D]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h3
                      className={`${playfair.className} text-sm sm:text-base font-bold text-[#FCD34D] uppercase tracking-wide`}
                    >
                      LUCKY NUMBERS
                    </h3>
                  </div>
                </div>

                {/* Auspicious Numbers Grid */}
                <div className="mb-4">
                  <span
                    className={`${poppins.className} block text-[11px] font-bold text-[#34D399] uppercase tracking-wider mb-2`}
                  >
                    ✓ Auspicious Numbers:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {luckyNumbers.auspicious.map((n) => (
                      <span
                        key={n}
                        className={`${playfair.className} w-9 h-9 rounded-xl bg-linear-to-b from-[#2D0F08] to-[#1C0803] border border-[#C49A45]/50 flex items-center justify-center text-sm font-bold text-[#FCD34D] shadow-xs group-hover:scale-105 transition-transform`}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Harmonious Dates */}
                <div className="mb-4">
                  <span
                    className={`${poppins.className} block text-[11px] font-bold text-[#FCD34D] uppercase tracking-wider mb-2`}
                  >
                    ✦ Harmonious Dates:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {luckyNumbers.favorableDates.map((d) => (
                      <span
                        key={d}
                        className={`${poppins.className} px-2.5 py-1 rounded-lg bg-[#2D0F08] text-[11px] font-semibold text-[#E2D4C6] border border-[#C49A45]/35 shadow-xs`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mindful Caution */}
                <div>
                  <span
                    className={`${poppins.className} block text-[11px] font-bold text-[#F87171] uppercase tracking-wider mb-1.5`}
                  >
                    ✕ Mindful Caution:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {luckyNumbers.challengingNumbers.map((cn) => (
                      <span
                        key={cn}
                        className={`${poppins.className} px-2.5 py-1 rounded-lg bg-[#380A08] text-[11px] font-bold text-[#FCA5A5] border border-[#EF4444]/40 flex items-center gap-1`}
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-[#EF4444]" />{" "}
                        Number {cn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`${poppins.className} mt-4 pt-2.5 border-t border-[#C49A45]/20 text-[10.5px] text-[#D8C7B5]/75`}
              >
                ✦ Align crucial signatures &amp; ventures
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Lucky Factors */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={200}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-linear-to-b from-[#220904] via-[#1A0703] to-[#120402] border border-[#C49A45]/45 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:border-[#FCD34D] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(252,211,77,0.2)] transition-all duration-300 group">
              <div>
                <div className="pb-3 mb-4 border-b border-[#C49A45]/25 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C49A45]/20 border border-[#C49A45]/40 flex items-center justify-center text-[#FCD34D]">
                      <Gem className="w-4 h-4" />
                    </div>
                    <h3
                      className={`${playfair.className} text-sm sm:text-base font-bold text-[#FCD34D] uppercase tracking-wide`}
                    >
                      LUCKY FACTORS
                    </h3>
                  </div>
                </div>

                <div className={`${poppins.className} space-y-3 text-xs`}>
                  <div className="p-2.5 rounded-xl bg-[#2D0F08]/80 border border-[#C49A45]/25">
                    <span className="block font-bold text-[#FCD34D] uppercase text-[10.5px] tracking-wider mb-0.5">
                      Auspicious Colors:
                    </span>
                    <span className="text-[#E2D4C6] font-medium text-[11.5px]">
                      {luckyElements.luckyColors.join(", ")}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#2D0F08]/80 border border-[#C49A45]/25">
                    <span className="block font-bold text-[#FCD34D] uppercase text-[10.5px] tracking-wider mb-0.5">
                      Sacred Gemstone:
                    </span>
                    <span className="text-[#E2D4C6] font-medium text-[11.5px]">
                      {luckyElements.luckyGems.join(", ")}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#2D0F08]/80 border border-[#C49A45]/25">
                    <span className="block font-bold text-[#FCD34D] uppercase text-[10.5px] tracking-wider mb-0.5">
                      Harmonic Metals:
                    </span>
                    <span className="text-[#E2D4C6] font-medium text-[11.5px]">
                      {luckyElements.luckyMetals.join(", ")}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#2D0F08]/80 border border-[#C49A45]/25">
                    <span className="block font-bold text-[#FCD34D] uppercase text-[10.5px] tracking-wider mb-0.5">
                      Direction &amp; Ruling Day:
                    </span>
                    <span className="text-[#E2D4C6] font-medium text-[11.5px]">
                      {luckyElements.luckyDirection} • {luckyElements.rulingDay}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`${poppins.className} mt-4 pt-2.5 border-t border-[#C49A45]/20 text-[10.5px] text-[#FCD34D]/80`}
              >
                ✦ Wear gemstone in right ring finger
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Sacred Donation (Daan) */}
          <ScrollReveal
            animation="fade-up"
            duration={600}
            delay={300}
            className="h-full"
          >
            <div className="h-full rounded-2xl bg-linear-to-b from-[#220904] via-[#1A0703] to-[#120402] border border-[#C49A45]/45 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between hover:border-[#FCD34D] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(252,211,77,0.2)] transition-all duration-300 group">
              <div>
                <div className="pb-3 mb-4 border-b border-[#C49A45]/25 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C49A45]/20 border border-[#C49A45]/40 flex items-center justify-center text-[#FCD34D]">
                      <Gift className="w-4 h-4" />
                    </div>
                    <h3
                      className={`${playfair.className} text-sm sm:text-base font-bold text-[#FCD34D] uppercase tracking-wide`}
                    >
                      SACRED DAAN (GIVING)
                    </h3>
                  </div>
                </div>

                <p
                  className={`${poppins.className} text-xs text-[#D8C7B5]/85 mb-3.5 leading-relaxed font-light`}
                >
                  {sacredDonation.spiritualSignificance}
                </p>

                <div className="space-y-2 mb-3.5">
                  <span
                    className={`${poppins.className} block text-[10.5px] font-bold text-[#34D399] uppercase tracking-wider`}
                  >
                    Recommended Offerings:
                  </span>
                  <ul
                    className={`${poppins.className} space-y-1.5 text-xs text-[#E2D4C6]`}
                  >
                    {sacredDonation.recommendedItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`${poppins.className} pt-2.5 border-t border-[#C49A45]/20 text-[11px] text-[#FCD34D]/90 flex items-center gap-1.5`}
              >
                <Clock className="w-3.5 h-3.5 text-[#FCD34D] shrink-0" />
                <span>
                  <strong>Best Time: </strong>
                  {sacredDonation.bestTime}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive FAQs Accordion Block */}
        <div id="faq" className="mt-8 max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up" duration={600}>
            <div className="text-center mb-8">
              <span
                className={`${poppins.className} text-xs font-semibold text-[#FCD34D] uppercase tracking-widest block mb-1`}
              >
                ✦ Knowledge Base &amp; Guidance ✦
              </span>
              <h3
                className={`${playfair.className} text-xl sm:text-2xl font-bold text-white uppercase tracking-wide`}
              >
                Number {number} Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#1A0703] border border-[#C49A45]/40 overflow-hidden transition-all duration-300 hover:border-[#FCD34D] shadow-lg shadow-black/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-hidden"
                    >
                      <h4
                        className={`${playfair.className} text-sm sm:text-base font-bold text-[#FCD34D]`}
                      >
                        {faq.question}
                      </h4>
                      <ChevronDown
                        className={`w-4 h-4 text-[#FCD34D] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        className={`${poppins.className} px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#D8C7B5]/90 leading-relaxed font-light border-t border-[#C49A45]/20 pt-3.5`}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
