import FestivalHero from "@/_features/festivals/components/FestivalHero";
import PopularFestivalsSlider from "@/_features/festivals/components/PopularFestivalsSlider";
import FestivalGrid from "@/_features/festivals/components/FestivalGrid";
import FAQ from "@/_components/sections/Marketing/Home/FAQ";
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50 shadow-md font-medium"
      >
        Skip to festivals list
      </a>

      {/* ── 01. Hero Banner ── */}
      <FestivalHero />

      {/* ── 02. Popular Festivals Horizontal Carousel ── */}
      <PopularFestivalsSlider />

      {/* ── 03. Paginated Full Festivals Catalog ── */}
      <FestivalGrid />

      {/* ── 04. Luxury Devotional FAQs Matching Temples Theme ── */}
      <FAQ
        title="Frequently Asked Questions"
        items={festivalsFAQs}
        helpTitle="Have Festival Questions?"
        helpSubtitle="Need guidance on festival tithis, sacred rituals, fasting rules, or regional celebrations? We are here to help."
        ctaText="Ask Festival Helpdesk"
        ctaHref="/contact"
        className="bg-[#FAF8F5] border-t border-amber-200/60"
      />
    </div>
  );
}
