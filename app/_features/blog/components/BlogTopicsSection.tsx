import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Music, Sparkles, Flame } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

const CURATED_TOPICS = [
  {
    title: "Utsav & Festival Stories",
    subtitle: "Celebrations, rituals & festive bliss",
    icon: Flame,
    href: "/blog?q=festival",
    image: "/festivals/holi/holi-1.webp",
    items: [
      "The Cosmic Significance of Maha Shivratri",
      "Vrindavan Holi: Colors of Divine Love",
      "Ghat Aarti Traditions of Kashi",
    ],
  },
  {
    title: "Devotional Music & Kirtan",
    subtitle: "Sacred chants, ragas & clubbing beats",
    icon: Music,
    href: "/blog?q=kirtan",
    image: "/gallery/gallery_1.webp",
    items: [
      "The Ecstasy of Modern Harinaam Sankirtan",
      "Harmonium & Mridanga: Instruments of Soul",
      "Devotional EDM & Youth Awakening",
    ],
  },
  {
    title: "Sacred Knowledge & Dharma",
    subtitle: "Timeless Vedic wisdom & reflections",
    icon: BookOpen,
    href: "/blog?q=dharma",
    image: "/about_mission.webp",
    items: [
      "Understanding Bhakti Yoga in Daily Life",
      "Sanatana Dharma: The Eternal Path",
      "The Power of Chanting the Mahamantra",
    ],
  },
  {
    title: "Satsang & Live Gatherings",
    subtitle: "Community reflections & fellowship",
    icon: Sparkles,
    href: "/blog?q=bhajan",
    image: "/event.webp",
    items: [
      "Inside Bharat Bhakti Sangam Gatherings",
      "Why Youth Are Choosing Bhajan Clubbing",
      "Prasad, Seva, and Community Harmony",
    ],
  },
];

export default function BlogTopicsSection() {
  return (
    <section aria-labelledby="topics-heading" className="w-full pt-4">
      {/* Header Row */}
      <ScrollReveal animation="fade-right" duration={700}>
        <div className="flex items-center justify-between gap-4 border-b border-[#740E0A]/15 pb-4 mb-6 sm:mb-8">
          <div className="relative">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden />
              <h2
                id="topics-heading"
                className={`${playfair.className} text-2xl sm:text-3xl font-bold text-[#5A100B] tracking-tight`}
              >
                Explore by Collection
              </h2>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 sm:-bottom-4.25 left-0 w-24 sm:w-32 h-1 bg-linear-to-r from-[#740E0A] via-[#B31D12] to-[#D4AF37] rounded-full z-10"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* 4 Thematic Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CURATED_TOPICS.map((topic, index) => {
          const Icon = topic.icon;

          return (
            <ScrollReveal
              key={index}
              animation="fade-up"
              duration={650}
              delay={index * 90}
              threshold={0.1}
            >
              <div
                className="group flex flex-col justify-between h-full overflow-hidden rounded-2xl bg-white border border-[#740E0A]/10 p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(116,14,10,0.1)] hover:border-[#740E0A]/30"
              >
                <div>
                  {/* Header with Title and Thumbnail */}
                  <div className="relative mb-3.5 aspect-video w-full overflow-hidden rounded-xl bg-stone-100">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-white">
                      <Icon className="h-4 w-4 text-[#FDE68A]" aria-hidden />
                      <span
                        className={`${poppins.className} text-[11px] font-semibold text-white/95`}
                      >
                        {topic.subtitle}
                      </span>
                    </div>
                  </div>

                  <h3
                    className={`${playfair.className} text-base sm:text-lg font-bold text-[#2E0503] group-hover:text-[#740E0A] transition-colors`}
                  >
                    {topic.title}
                  </h3>

                  {/* Sub items */}
                  <ul className="mt-3 space-y-1.5 border-t border-stone-100 pt-3">
                    {topic.items.map((item, i) => (
                      <li
                        key={i}
                        className={`${poppins.className} flex items-center gap-2 text-xs text-stone-600 font-normal`}
                      >
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <Link
                    href={topic.href}
                    className={`${poppins.className} inline-flex items-center gap-1.5 text-xs font-semibold text-[#740E0A] hover:text-[#B31D12] transition-colors group/link`}
                  >
                    <span>Explore Articles</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
