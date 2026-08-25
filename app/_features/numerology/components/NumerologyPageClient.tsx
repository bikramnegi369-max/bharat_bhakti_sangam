"use client";

import React from "react";
import { NumerologyHeroSection } from "./NumerologyHeroSection";
import { NumerologyLanguageSection } from "./NumerologyLanguageSection";
import { NumerologyPillarsSection } from "./NumerologyPillarsSection";
import { NumerologyCalculatorSection } from "./NumerologyCalculatorSection";
import { NumerologyGridSection } from "./NumerologyGridSection";
import { NumerologyJourneySection } from "./NumerologyJourneySection";
import { NumerologyBenefitSection } from "./NumerologyBenefitSection";
import { NumerologyBeginJourneySection } from "./NumerologyBeginJourneySection";

export function NumerologyPageClient() {
  const scrollToCalculator = () => {
    const el = document.getElementById("calculator-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#180A06]">
      {/* 1. First Hero Mockup Section */}
      <NumerologyHeroSection onDiscoverClick={scrollToCalculator} />

      {/* 2. Second Language of the Universe Mockup Section */}
      <NumerologyLanguageSection />

      {/* 3. Three Pillars of Vedic Numerology (Mulank, Bhagyank, Namank) */}
      <NumerologyPillarsSection />

      {/* 4. Interactive Vedic Numerology Calculator */}
      <NumerologyCalculatorSection />

      {/* 5. The 9 Divine Numbers Knowledge Grid */}
      <NumerologyGridSection />

      {/* 6. Your Numerology Journey Section */}
      <NumerologyJourneySection />

      {/* 7. Numerology Benefits Section */}
      <NumerologyBenefitSection />

      {/* 8. Begin Your Spiritual Journey Section */}
      <NumerologyBeginJourneySection onDiscoverClick={scrollToCalculator} />
    </div>
  );
}




