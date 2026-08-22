import TempleGrid from "@/_components/layout/temple/TempleGrid";
import FAQSection from "@/_components/sections/Marketing/FAQSection";
import Carousel from "@/_components/ui/Carousel/Carousel";
import { famousTemplesCarousel } from "@/_lib/constants/carousal.constants";
import { templesFAQs } from "@/_lib/constants/temples.constants";
import { playfair } from "@/_lib/fonts";
import { createPageMetadataFromConfig } from "@/_lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-static"; // pre-render at build, serve from CDN

export const metadata: Metadata = createPageMetadataFromConfig("famousTemples");

export default function FamousTemplesPage() {
  return (
    <div>
      {/* ── Skip link: accessibility for keyboard/screen-reader users ── */}

      <a
        href="#temple-list"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-500 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to temple list
      </a>

      <Carousel slides={famousTemplesCarousel} />

      {/* ── Hero header ── */}
      <div className="text-center py-12 px-4 max-w-2xl mx-auto">
        <h1
          className={`${playfair.className} text-4xl sm:text-5xl font-bold text-stone-800 mb-6 leading-tight`}
        >
          Famous <span className="text-amber-500">Temples</span> of India
        </h1>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-4">
          India is home to some of the world&rsquo;s most revered temples, each
          reflecting timeless devotion, rich heritage, and architectural
          brilliance.
        </p>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          From Kedarnath and Badrinath to Tirupati Balaji, Meenakshi, and
          Jagannath temples, these sacred sites inspire millions and stand as
          enduring symbols of Sanatana Dharma, faith, and India&rsquo;s vibrant
          spiritual legacy.
        </p>
      </div>

      {/* ── Temple grid ── */}
      <div id="temple-list">
        <TempleGrid />
      </div>
      <FAQSection
        title="Frequently Asked Questions"
        items={templesFAQs}
        groupName="famous-temples-faqs"
      />
    </div>
  );
}
