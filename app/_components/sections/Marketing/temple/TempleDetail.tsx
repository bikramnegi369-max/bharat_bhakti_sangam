import type { Temple } from "@/_types/Temples.types";
import { getNormalizedTempleDetail } from "@/_config/temple-details.config";
import TempleHeroHeader from "./TempleHeroHeader";
import TempleQuickInfoBar from "./TempleQuickInfoBar";
import TempleAboutStory from "./TempleAboutStory";
import TempleTimelineSection from "./TempleTimelineSection";
import TempleOriginsSection from "./TempleOriginsSection";
import TempleFactsSection from "./TempleFactsSection";
import TempleFeaturePillars from "./TempleFeaturePillars";
import TempleDailySchedule from "./TempleDailySchedule";
import TemplePlanYourVisit from "./TemplePlanYourVisit";
import TempleNearbyRecommendations from "./TempleNearbyRecommendations";

interface TempleDetailProps {
  temple: Temple;
}

/**
 * Production-grade TempleDetail Master Component.
 * Implements a unified, consistent 8-section layout across ALL temples
 * derived from a type-safe config with automatic fallbacks (SOLID & DRY).
 */
export function TempleDetail({ temple }: TempleDetailProps) {
  // Normalize data with config registry ensuring identical structure for all temples
  const fullDetail = getNormalizedTempleDetail(temple);

  return (
    <article className="w-full min-h-screen bg-[#FFFDF9] text-stone-900 selection:bg-amber-500 selection:text-white">
      {/* ── 00. Hero & Breadcrumbs Section ── */}
      <TempleHeroHeader temple={fullDetail} />

      {/* ── Floating Quick Info Bar (5 metrics) ── */}
      <TempleQuickInfoBar temple={fullDetail} />

      {/* ── 01. Overview: About Temple, Dropcap, Quote & Arch Darshan Image ── */}
      <TempleAboutStory temple={fullDetail} />

      {/* ── 02. History: Visual Document Card & 2x2 Historical Chronology ── */}
      <TempleTimelineSection temple={fullDetail} />

      {/* ── 03. Origins: Historical Narrative & Heritage Image ── */}
      <TempleOriginsSection temple={fullDetail} />

      {/* ── 04. Facts: Sacred Sanctum Showcase & Checkmarked Facts List ── */}
      <TempleFactsSection temple={fullDetail} />

      {/* ── 05. Sacred Heritage: 3 Pillars (Architecture, Mythology, Rituals) ── */}
      <TempleFeaturePillars temple={fullDetail} />

      {/* ── 06. Timings & Daily Schedule: Aarti & Darshan Timetable ── */}
      <TempleDailySchedule temple={fullDetail} />

      {/* ── 07. Plan Your Visit: 4-Column Pilgrim Logistics Guide ── */}
      <TemplePlanYourVisit temple={fullDetail} />

      {/* ── 08. Explore More: Nearby Sacred Temples Recommendations ── */}
      <TempleNearbyRecommendations temple={fullDetail} />
    </article>
  );
}
