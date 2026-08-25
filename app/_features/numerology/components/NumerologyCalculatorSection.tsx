"use client";

import React, { useState } from "react";
import { playfair, poppins } from "@/_lib/fonts";
import {
  Sparkles,
  Calendar,
  User,
  Compass,
  Sun,
  RefreshCw,
} from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import {
  calculateMulank,
  calculateBhagyank,
  calculateNamank,
} from "../utils/numerologyCalculator";
import { NUMEROLOGY_NUMBERS_DATA } from "../constants/numerology.constants";

export function NumerologyCalculatorSection() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [mulank, setMulank] = useState<number | null>(null);
  const [bhagyank, setBhagyank] = useState<number | null>(null);
  const [namank, setNamank] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    const parts = birthDate.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      const rootNum = calculateMulank(day);
      const destinyNum = calculateBhagyank(day, month, year);
      const nameNum = name.trim() ? calculateNamank(name) : rootNum;

      setMulank(rootNum);
      setBhagyank(destinyNum);
      setNamank(nameNum);
      setCalculated(true);
    }
  };

  const handleReset = () => {
    setName("");
    setBirthDate("");
    setCalculated(false);
    setMulank(null);
    setBhagyank(null);
    setNamank(null);
  };

  const rootProfile = mulank
    ? NUMEROLOGY_NUMBERS_DATA.find((item) => item.number === mulank)
    : null;

  return (
    <section
      id="calculator-section"
      className="relative w-full py-16 sm:py-24 bg-[#FCFAF5] text-[#3F0605] overflow-hidden border-t border-[#E8DCC8]"
    >
      {/* Background Decorative Subtle Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 border border-[#C49A45]/40 rounded-full animate-[spin_90s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-dashed border-[#C49A45]/30 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C49A45]/15 border border-[#C49A45]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              <span
                className={`${poppins.className} text-xs font-semibold text-[#740E0A] tracking-widest uppercase`}
              >
                Vedic Numerology Calculator
              </span>
            </div>
            <h2
              className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3F0605] tracking-tight uppercase`}
            >
              Reveal Your <span className="text-[#740E0A]">Sacred Numbers</span>
            </h2>
            <p
              className={`${poppins.className} text-sm sm:text-base text-[#5c5c5c] mt-4 max-w-xl mx-auto`}
            >
              Enter your birth details to uncover your Mulank (Psychic Number),
              Bhagyank (Destiny Number), and planetary strengths.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Input Form Card */}
          <div className="lg:col-span-5 w-full">
            <ScrollReveal animation="fade-right" duration={750}>
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#C49A45]/35 shadow-xl shadow-[#3F0605]/5">
                <h3
                  className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#3F0605] mb-6 flex items-center gap-2`}
                >
                  <Sun className="w-5 h-5 text-[#C49A45]" />
                  Enter Details
                </h3>

                <form onSubmit={handleCalculate} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="num-name"
                      className={`${poppins.className} block text-xs font-medium text-[#5c5c5c] mb-2 uppercase tracking-wider`}
                    >
                      Full Name (Optional for Namank)
                    </label>
                    <div className="relative">
                      <input
                        id="num-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className={`${poppins.className} w-full pl-10 pr-4 py-3 bg-[#FCFAF5] border border-[#C49A45]/30 rounded-lg text-[#3F0605] placeholder-[#5c5c5c]/50 focus:outline-none focus:border-[#740E0A] focus:ring-1 focus:ring-[#740E0A] transition-all text-sm`}
                      />
                      <User className="w-4 h-4 text-[#C49A45] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Date of Birth Input */}
                  <div>
                    <label
                      htmlFor="num-dob"
                      className={`${poppins.className} block text-xs font-medium text-[#5c5c5c] mb-2 uppercase tracking-wider`}
                    >
                      Date of Birth <span className="text-[#740E0A]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="num-dob"
                        type="date"
                        required
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className={`${poppins.className} w-full pl-10 pr-4 py-3 bg-[#FCFAF5] border border-[#C49A45]/30 rounded-lg text-[#3F0605] focus:outline-none focus:border-[#740E0A] focus:ring-1 focus:ring-[#740E0A] transition-all text-sm`}
                      />
                      <Calendar className="w-4 h-4 text-[#C49A45] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Submit and Reset Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className={`${poppins.className} flex-1 py-3.5 px-6 rounded-lg bg-[#740E0A] hover:bg-[#8F140F] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#740E0A]/20 transition-all duration-300`}
                    >
                      Calculate Numbers
                    </button>
                    {calculated && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#C49A45]/30 hover:bg-[#F3ECE0] text-[#3F0605] transition-colors"
                        title="Reset"
                        aria-label="Reset form"
                      >
                        <RefreshCw className="w-4 h-4 text-[#740E0A]" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Results Display Area */}
          <div className="lg:col-span-7 w-full">
            <ScrollReveal animation="fade-left" duration={750}>
              {calculated && rootProfile ? (
                <div className="space-y-6">
                  {/* Quick Numbers Banner */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {/* Mulank Card */}
                    <div className="p-4 rounded-xl bg-white border border-[#C49A45]/40 text-center shadow-md shadow-[#3F0605]/5">
                      <span
                        className={`${poppins.className} text-[11px] font-semibold text-[#5c5c5c] uppercase tracking-wider block mb-1`}
                      >
                        Mulank (Root)
                      </span>
                      <span
                        className={`${playfair.className} text-4xl sm:text-5xl font-black text-[#740E0A]`}
                      >
                        {mulank}
                      </span>
                      <span
                        className={`${poppins.className} text-[10px] text-[#5c5c5c] block mt-1`}
                      >
                        Psychic Core
                      </span>
                    </div>

                    {/* Bhagyank Card */}
                    <div className="p-4 rounded-xl bg-white border border-[#C49A45]/40 text-center shadow-md shadow-[#3F0605]/5">
                      <span
                        className={`${poppins.className} text-[11px] font-semibold text-[#5c5c5c] uppercase tracking-wider block mb-1`}
                      >
                        Bhagyank (Destiny)
                      </span>
                      <span
                        className={`${playfair.className} text-4xl sm:text-5xl font-black text-[#740E0A]`}
                      >
                        {bhagyank}
                      </span>
                      <span
                        className={`${poppins.className} text-[10px] text-[#5c5c5c] block mt-1`}
                      >
                        Life Path
                      </span>
                    </div>

                    {/* Namank Card */}
                    <div className="p-4 rounded-xl bg-white border border-[#C49A45]/40 text-center col-span-2 sm:col-span-1 shadow-md shadow-[#3F0605]/5">
                      <span
                        className={`${poppins.className} text-[11px] font-semibold text-[#5c5c5c] uppercase tracking-wider block mb-1`}
                      >
                        Namank (Name)
                      </span>
                      <span
                        className={`${playfair.className} text-4xl sm:text-5xl font-black text-[#740E0A]`}
                      >
                        {namank}
                      </span>
                      <span
                        className={`${poppins.className} text-[10px] text-[#5c5c5c] block mt-1`}
                      >
                        Vibration
                      </span>
                    </div>
                  </div>

                  {/* Comprehensive Profile Card */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#C49A45]/50 shadow-xl shadow-[#3F0605]/5">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C49A45]/20 pb-4">
                      <div>
                        <span
                          className={`${poppins.className} text-xs font-semibold text-[#740E0A] uppercase tracking-widest`}
                        >
                          Ruling Planet: {rootProfile.planet}
                        </span>
                        <h4
                          className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#3F0605] mt-1`}
                        >
                          {rootProfile.title}
                        </h4>
                      </div>
                      <div className="px-3.5 py-1.5 rounded-full bg-[#740E0A]/10 border border-[#740E0A]/20 text-xs font-semibold text-[#740E0A]">
                        Deity: {rootProfile.deity}
                      </div>
                    </div>

                    <p
                      className={`${poppins.className} text-sm text-[#5c5c5c] leading-relaxed mt-4`}
                    >
                      {rootProfile.description}
                    </p>

                    {/* Vedic Strengths Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#C49A45]/20 text-xs">
                      <div>
                        <span className="text-[#5c5c5c] block">Element</span>
                        <span className="font-semibold text-[#740E0A]">
                          {rootProfile.element}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5c5c5c] block">Gemstone</span>
                        <span className="font-semibold text-[#740E0A]">
                          {rootProfile.gemstone}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5c5c5c] block">
                          Lucky Color
                        </span>
                        <span className="font-semibold text-[#740E0A]">
                          {rootProfile.luckyColor}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5c5c5c] block">Mantra</span>
                        <span className="font-semibold text-[#740E0A] text-[11px] truncate block">
                          {rootProfile.mantra}
                        </span>
                      </div>
                    </div>

                    {/* Traits Pills */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {rootProfile.traits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md bg-[#FAF7F2] border border-[#C49A45]/30 text-xs text-[#3F0605] font-medium"
                        >
                          ✦ {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Placeholder Guidance Box */
                <div className="p-8 sm:p-12 rounded-2xl bg-white border border-dashed border-[#C49A45]/40 text-center flex flex-col items-center justify-center min-h-90 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-[#740E0A]/10 border border-[#740E0A]/20 flex items-center justify-center mb-4 text-[#740E0A]">
                    <Compass className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4
                    className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#3F0605] mb-2`}
                  >
                    Your Vedic Profile Awaits
                  </h4>
                  <p
                    className={`${poppins.className} text-xs sm:text-sm text-[#5c5c5c] max-w-md leading-relaxed`}
                  >
                    Input your date of birth in the form to unlock your detailed
                    cosmic matrix, ruling planetary energy, and spiritual
                    alignment.
                  </p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
