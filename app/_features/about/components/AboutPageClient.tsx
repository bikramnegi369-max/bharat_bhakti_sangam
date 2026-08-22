"use client";

import { AboutHeroSection } from "./AboutHeroSection";
import { AboutVisionSection } from "./AboutVisionSection";
import { AboutJourneyTimeline } from "./AboutJourneyTimeline";
import { AboutMissionSection } from "./AboutMissionSection";
import { AboutImpactMetrics } from "./AboutImpactMetrics";
import { AboutFounderQuoteSection } from "./AboutFounderQuoteSection";
import { AboutWhatWeDoSection } from "./AboutWhatWeDoSection";
import { AboutGalleryGridSection } from "./AboutGalleryGridSection";
import StayConnectedNewsletter from "@/_components/sections/Marketing/StayConnectedNewsletter";

export function AboutPageClient() {
  return (
    <main className="w-full bg-[#FCFAF5] min-h-screen text-[#302D2D]">
      {/* 1. Hero Section with Arch Image & Primary Introduction */}
      <AboutHeroSection />

      {/* Subtle Devotional Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px w-full bg-linear-to-r from-transparent via-[#EADBCA] to-transparent" />
      </div>

      {/* 2. Vision Section (Ancient Temple Roots + Narrative + Pillars) */}
      <AboutVisionSection />

      {/* 3. Our Journey So Far (6 Circular Milestones) */}
      <AboutJourneyTimeline />

      {/* 4. Mission Section (Aarti Celebration + Mission Statement) */}
      <AboutMissionSection />

      {/* 5. Impact Metrics in Numbers (Gold stats) */}
      <AboutImpactMetrics />

      {/* 6. Founder Note / Quote Section (Deepak Kothari) */}
      <AboutFounderQuoteSection />

      {/* 7. What We Do (6 Devotional Offerings Cards) */}
      <AboutWhatWeDoSection />

      {/* 8. Divine Gallery Grid (7 Mosaic Photos + View More) */}
      <AboutGalleryGridSection />

      {/* 9. Stay Connected Newsletter CTA Banner */}
      <StayConnectedNewsletter />
    </main>
  );
}
