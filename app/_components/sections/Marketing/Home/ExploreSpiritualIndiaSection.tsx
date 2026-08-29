import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
  Flame,
  Landmark,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface CardItem {
  id: string;
  title: string;
  description: string;
  backDescription: string;
  ctaText: string;
  href: string;
  imageSrc: string;
  icon: typeof CalendarDays;
}

const CATEGORIES: CardItem[] = [
  {
    id: "temples",
    title: "Temples",
    description: "Discover sacred sanctuaries across Bharat.",
    backDescription:
      "Explore architectural marvels, darshan timings, and ancient spiritual heritage across India's holy temples.",
    ctaText: "Explore Temples",
    href: "/famous-temples",
    imageSrc: "/temples-images/konark-sun/konark-sun-hero.webp",
    icon: Landmark,
  },
  {
    id: "festivals",
    title: "Festivals",
    description: "Celebrate the divine rhythm of India.",
    backDescription:
      "Immerse in colorful traditions, divine music, devotional gatherings, and festive celebrations year-round.",
    ctaText: "Discover Festivals",
    href: "/festivals",
    imageSrc: "/festivals/holi/holi-1.webp",
    icon: Flame,
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "Stay updated with upcoming events and auspicious days.",
    backDescription:
      "Track Panchang dates, Ekadashi fasts, major festivals, and upcoming Bhajan Clubbing events seamlessly.",
    ctaText: "View Calendar",
    href: "/calendar",
    imageSrc: "/event.webp",
    icon: CalendarDays,
  },
  {
    id: "numerology",
    title: "Numerology",
    description: "Unlock ancient cosmic wisdom & sacred numerical paths.",
    backDescription:
      "Calculate your spiritual life path number, daily alignment, and cosmic energy through ancient Vedic wisdom.",
    ctaText: "Explore Numerology",
    href: "/numerology",
    imageSrc: "/mandala.webp",
    icon: Sparkles,
  },
];

export default function ExploreSpiritualIndiaSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FCFAF5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal
          animation="fade-down"
          duration={750}
          threshold={0.15}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-normal text-[#7C0F0C] tracking-tight`}
          >
            Explore{" "}
            <span className="relative inline-block">Spiritual India</span>
          </h2>
          {/* Subtle Maroon Accent Bar */}
          <div className="w-16 h-1 bg-[#7C0F0C] rounded-full mx-auto mt-4" />
        </ScrollReveal>

        {/* Cards Grid with Staggered Cascading Entrances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {CATEGORIES.map((card, idx) => {
            const IconComponent = card.icon;

            return (
              <ScrollReveal
                key={card.id}
                animation="flip-up"
                delay={idx * 120}
                duration={850}
                threshold={0.1}
                className="h-full w-full"
              >
                <Link
                  href={card.href}
                  className="group cursor-pointer perspective-[1000px] h-100 lg:h-107.5 w-full block focus:outline-none focus:ring-2 focus:ring-[#740E0A]/40 rounded-3xl"
                >
                  {/* Flip Container */}
                  <div className="relative w-full h-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)] rounded-3xl transition-transform ease-out shadow-md hover:shadow-2xl">
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden flex flex-col justify-end p-6 sm:p-8 cursor-pointer">
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />

                      {/* Dark Overlay for WCAG AA Contrast */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

                      {/* Card Content Overlay */}
                      <div className="relative z-10 text-white">
                        <h3
                          className={`${playfair.className} text-2xl md:text-3xl font-semibold text-rose-100 mb-2 drop-shadow-sm`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`${poppins.className} text-stone-200 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2 max-w-65`}
                        >
                          {card.description}
                        </p>

                        {/* Action Arrow Button */}
                        <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white cursor-pointer group-hover:bg-white group-hover:text-[#740E0A] transition-colors duration-300">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)] rounded-3xl overflow-hidden bg-linear-to-br from-[#370504] via-[#522323] to-[#740E0A] p-8 text-white flex flex-col justify-between items-center text-center border border-amber-500/20 cursor-pointer">
                      {/* Decorative Top Accent */}
                      <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-2">
                        <IconComponent className="w-7 h-7 stroke-[1.75]" />
                      </div>

                      <div className="my-auto">
                        <h3
                          className={`${playfair.className} text-2xl md:text-3xl font-semibold text-amber-200 mb-3`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`${poppins.className} text-stone-300 text-xs sm:text-sm leading-relaxed max-w-62.5 mx-auto`}
                        >
                          {card.backDescription}
                        </p>
                      </div>

                      {/* CTA Button Element */}
                      <div
                        className={`${poppins.className} w-full py-3.5 px-6 rounded-full bg-amber-500 group-hover:bg-amber-400 text-[#370504] font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer`}
                      >
                        <span>{card.ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
