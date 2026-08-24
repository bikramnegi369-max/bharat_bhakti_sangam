import TempleListHero from "@/_features/temples/components/TempleListHero";
import FeaturedTemplesSlider from "@/_features/temples/components/FeaturedTemplesSlider";
import TempleCatalog from "@/_features/temples/components/TempleCatalog";
import TempleDevotionalQuote from "@/_features/temples/components/TempleDevotionalQuote";
import FAQ from "@/_components/sections/Marketing/Home/FAQ";
import { templesFAQs } from "@/_lib/constants/temples.constants";
import { getAllNormalizedTemples } from "@/_lib/helpers/temples.helpers";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-static"; // pre-render at build, serve from CDN

export const metadata: Metadata = createPageMetadataFromConfig("famousTemples");

export default function FamousTemplesPage() {
  const allTemples = getAllNormalizedTemples();

  return (
    <div className="w-full bg-[#FAF8F5]">
      {/* ── Skip link: accessibility for keyboard/screen-reader users ── */}
      <a
        href="#temple-catalog"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50 shadow-md font-medium"
      >
        Skip to temples catalog
      </a>

      {/* ── 01. Cinematic Devotional Hero Header ── */}
      <TempleListHero />

      {/* ── 02. Featured Sacred Sanctums Slider ── */}
      <FeaturedTemplesSlider />

      {/* ── 03. Interactive Temples Catalog (Search, Category Filters & Paginated Grid) ── */}
      <TempleCatalog temples={allTemples} />

      {/* ── 04. Sacred Devotional Quote Callout ── */}
      <TempleDevotionalQuote />

      {/* ── 05. Luxury Devotional FAQs Matching Brand Theme ── */}
      <FAQ
        title="Frequently Asked Questions"
        items={templesFAQs}
        helpTitle="Have Temple Questions?"
        helpSubtitle="Need guidance on darshan timings, best travel seasons, or pilgrimage yatra planning? We are here to help."
        ctaText="Contact Pilgrimage Helpdesk"
        ctaHref="/contact"
        className="bg-[#FAF8F5] border-t border-amber-200/60"
      />
    </div>
  );
}



