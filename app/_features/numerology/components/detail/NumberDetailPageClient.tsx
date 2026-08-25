"use client";

import React from "react";
import { NumerologyNumberDetailConfig } from "../../types/number-detail.types";
import { NumberDetailHero } from "./NumberDetailHero";
import { NumberDetailQuickSpecs } from "./NumberDetailQuickSpecs";
import { NumberDetailCoreInsights } from "./NumberDetailCoreInsights";
import { NumberDetailLifeDimensions } from "./NumberDetailLifeDimensions";
import { NumberDetailCompatibilitySection } from "./NumberDetailCompatibilitySection";
import { NumberDetailRulingPlanetSection } from "./NumberDetailRulingPlanetSection";
import { NumberDetailRemediesSection } from "./NumberDetailRemediesSection";
import { NumberDetailNavigationFooter } from "./NumberDetailNavigationFooter";

interface NumberDetailPageClientProps {
  config: NumerologyNumberDetailConfig;
}

export function NumberDetailPageClient({ config }: NumberDetailPageClientProps) {
  return (
    <main className="w-full bg-[#140804] min-h-screen text-[#4A3B32]">
      {/* 1. Grand Hero Section */}
      <NumberDetailHero config={config} />

      {/* 2. Half-Overlapping Quick Specs Bar (Top half over hero, bottom half below hero) */}
      <NumberDetailQuickSpecs specs={config.quickSpecs} />

      {/* 3. Core Insights Section */}
      <NumberDetailCoreInsights config={config} />

      {/* 4. 4 Life Dimensions Section */}
      <NumberDetailLifeDimensions
        lifeDimensions={config.lifeDimensions}
        number={config.number}
      />

      {/* 5. 4 Insights & Compatibility Row */}
      <NumberDetailCompatibilitySection
        insightsRow2={config.insightsRow2}
        currentNumber={config.number}
      />

      {/* 6. Ruling Planet & Navagraha Deities Section */}
      <NumberDetailRulingPlanetSection
        rulingPlanet={config.rulingPlanet}
        number={config.number}
      />

      {/* 7. Remedies, Mantras, Lucky Factors & FAQ */}
      <NumberDetailRemediesSection
        remedies={config.remedies}
        faqs={config.faqs}
        number={config.number}
      />

      {/* 8. 1-9 Number Navigator & Footer with CTA Button */}
      <NumberDetailNavigationFooter currentNumber={config.number} />
    </main>
  );
}
