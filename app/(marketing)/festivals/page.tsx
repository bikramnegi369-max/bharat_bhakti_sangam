import FestivalSection from "@/_components/sections/Marketing/festivals/festivalSection";
import Carousel from "@/_components/ui/Carousel/Carousel";
import {
  famousFestivalsCarousel,
  festivalsData,
} from "@/_lib/constants/festivals.constants";
import { cinzel } from "@/_lib/fonts";
import { Metadata } from "next";

export const dynamic = "force-static"; // pre-render at build, serve from CDN

export const metadata: Metadata = {
  title: "Famous Festivals of India",
  description:
    "Explore India's most revered festivals — Diwali, Holi, Durga Puja, Navratri, and more. Timings, entry fees, and best time to visit.",
  openGraph: {
    title: "Famous Festivals of India",
    description: "Discover sacred festivals across India.",
    images: [{ url: "/og/famous-festivals.jpg", width: 1200, height: 630 }],
  },
};

export default function FamousFestivalsPage() {
  return (
    <div>
      <Carousel slides={famousFestivalsCarousel} />
      {/* ── Hero header ── */}
      <header className="text-center p-12 lg:p-24 px-4 max-w-2xl mx-auto">
        <h1
          className={`${cinzel.className} text-4xl sm:text-5xl font-bold text-stone-800 mb-6 leading-tight`}
        >
          Famous <span className="text-amber-500">Festivals</span> of India
        </h1>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-4">
          Festivals in Sanatana Dharma are vibrant celebrations that honor the
          divine, nature, and the cycles of life. These sacred occasions, such
          as Diwali, Navratri, and Holi, bring communities together in joy,
          devotion, and gratitude. Each festival carries deep spiritual
          significance, symbolizing the victory of good over evil, the renewal
          of life, and the importance of dharma.
        </p>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Through rituals, prayers, and festivities, individuals reconnect with
          their cultural heritage, celebrate the divine presence, and foster a
          sense of unity. Explore the beauty of these festivals and the timeless
          values they represent.
        </p>
      </header>
      {/* ── Festival sections ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-16 mb-20">
        {festivalsData.map((festival, index) => (
          <FestivalSection
            key={index}
            title={festival.title}
            description={festival.description}
            images={festival.images}
            descriptionAnchor={festival.descriptionAnchor}
            alts={festival.alts}
          />
        ))}
      </div>
    </div>
  );
}
