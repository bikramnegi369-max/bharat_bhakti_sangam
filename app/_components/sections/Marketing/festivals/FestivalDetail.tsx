import type { Festival } from "@/_types/festivals.types";
import { getFestivalDetail } from "@/_config/festival-details.config";
import FestivalDetailHero from "@/_features/festivals/components/detail/FestivalDetailHero";
import FestivalDetailStory from "@/_features/festivals/components/detail/FestivalDetailStory";
import FestivalDetailRituals from "@/_features/festivals/components/detail/FestivalDetailRituals";
import FestivalDetailFood from "@/_features/festivals/components/detail/FestivalDetailFood";
import FestivalDetailRegional from "@/_features/festivals/components/detail/FestivalDetailRegional";
import FestivalDetailMoments from "@/_features/festivals/components/detail/FestivalDetailMoments";
import FestivalDetailExplore from "@/_features/festivals/components/detail/FestivalDetailExplore";

export function FestivalDetail({ festival }: { festival: Festival }) {
  // Normalize with full config registry, or build dynamic fallback
  const fullDetail = getFestivalDetail(festival.slug) || {
    slug: festival.slug,
    name: festival.title,
    tagline: "Sacred Spiritual Festival of India",
    dateBadge: festival.dateBadge || { day: "Sacred", month: "Tithi" },
    heroImage: festival.images[0] || "/ogDefault.png",
    featuredOverviewImage: festival.images[1] || festival.images[0],
    aboutStory: {
      title: `About ${festival.title}`,
      paragraphs: [
        festival.description,
        "Celebrated with great reverence, devotion, and joy, bringing families and communities together in the spirit of Sanatana Dharma.",
      ],
      image: festival.images[0] || "/ogDefault.png",
    },
    historyStory: {
      title: `History of ${festival.title}`,
      paragraphs: [
        `${festival.title} carries profound historical and scriptural significance rooted in ancient Vedic and Puranic traditions.`,
      ],
      image: festival.images[1] || festival.images[0] || "/ogDefault.png",
    },
    rituals: {
      title: `Rituals of ${festival.title}`,
      items: [
        {
          title: "Sacred Puja & Prayers",
          description:
            "Offering hymns, flowers, and deep devotion to the Supreme.",
        },
        {
          title: "Community Gatherings",
          description:
            "Sharing festive happiness, sanctified prasad, and goodwill.",
        },
      ],
      image: festival.images[0] || "/ogDefault.png",
    },
    traditionalFoods: {
      title: "Traditional Festive Foods",
      subtitle: "Aromatic prasad and traditional delicacies prepared with pure ingredients.",
      items: [
        { name: "Prasad", image: festival.images[0] },
        { name: "Mithai", image: festival.images[1] || festival.images[0] },
      ],
      showcaseImage: festival.images[0] || "/ogDefault.png",
    },
    exploreMoreSlugs: ["holi", "diwali", "navratri"],
    listingCard: {
      shortDescription: festival.description,
      season: festival.season || "Auspicious Tithi",
      significance: festival.significance || "Bhakti & Dharma",
      region: festival.region || "Pan-India",
    },
  };

  return (
    <article className="w-full min-h-screen bg-[#FFFDF9] text-stone-900 selection:bg-amber-500 selection:text-white">
      {/* ── 01. Hero & Breadcrumbs Section ── */}
      <FestivalDetailHero festival={fullDetail} />

      {/* ── 02. About, History, & Legends Zigzag Story ── */}
      <FestivalDetailStory festival={fullDetail} />

      {/* ── 03. Rituals & Observances ── */}
      <FestivalDetailRituals festival={fullDetail} />

      {/* ── 04. Traditional Food Delicacies ── */}
      <FestivalDetailFood festival={fullDetail} />

      {/* ── 05. Celebrations Across India (Regional) ── */}
      <FestivalDetailRegional festival={fullDetail} />

      {/* ── 06. Moments Photo Gallery ── */}
      <FestivalDetailMoments festival={fullDetail} />

      {/* ── 07. Explore More Festivals ── */}
      <FestivalDetailExplore festival={fullDetail} />
    </article>
  );
}
