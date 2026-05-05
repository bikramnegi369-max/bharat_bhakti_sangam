import TempleGrid from "@/_components/layout/temple/TempleGrid";
import { Carousel } from "@/_components/ui/Carousel/Carousel";
import { famousTemplesCarousal } from "@/_lib/constants/carousal.constants";
import type { Metadata } from "next";

export const dynamic = "force-static"; // pre-render at build, serve from CDN

export const metadata: Metadata = {
  title: "Famous Temples of India | Sacred Heritage Sites",
  description:
    "Explore India's most revered temples — Kedarnath, Badrinath, Tirupati Balaji, Meenakshi, and more. Timings, entry fees, and best time to visit.",
  openGraph: {
    title: "Famous Temples of India",
    description: "Discover sacred temples across India.",
    images: [{ url: "/og/famous-temples.jpg", width: 1200, height: 630 }],
  },
};

export default function FamousTemplesPage() {
  return (
    <main>
      {/* ── Skip link: accessibility for keyboard/screen-reader users ── */}

      <a
        aria-label="Skip to temple list"
        aria-hidden="true"
        tabIndex={-1}
        role="button"
        href="#temple-list"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-500 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to temple list
      </a>

      <Carousel slides={famousTemplesCarousal} />

      {/* ── Hero header ── */}
      <header className="text-center py-12 px-4 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-800 mb-6 leading-tight">
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
      </header>

      {/* ── Temple grid ── */}
      <div id="temple-list">
        <TempleGrid />
      </div>
    </main>
  );
}
