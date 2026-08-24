import FestivalHero from "@/_features/festivals/components/FestivalHero";
import PopularFestivalsSlider from "@/_features/festivals/components/PopularFestivalsSlider";
import FestivalGrid from "@/_features/festivals/components/FestivalGrid";
import FAQSection from "@/_components/sections/Marketing/FAQSection";
import { festivalsFAQs } from "@/_lib/constants/festivals.constants";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-static"; // pre-render at build, serve from CDN

export const metadata: Metadata = createPageMetadataFromConfig("festivals");

export default function FamousFestivalsPage() {
  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* ── Skip link for accessibility ── */}
      <a
        href="#festival-catalog"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50 shadow-md"
      >
        Skip to festivals list
      </a>

      {/* ── 01. Hero Banner ── */}
      <FestivalHero />

      {/* ── 02. Popular Festivals Horizontal Carousel ── */}
      <PopularFestivalsSlider />

      {/* ── 03. Paginated Full Festivals Catalog ── */}
      <FestivalGrid />

      {/* ── 04. FAQs Section ── */}
      <FAQSection
        title="Frequently Asked Questions"
        items={festivalsFAQs}
        groupName="famous-festivals-faqs"
      />
    </div>
  );
}
