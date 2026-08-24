import Image from "next/image";
import Link from "next/link";
import { FestivalDetailData } from "@/_types/festivals.types";
import { FESTIVAL_DETAILS_CONFIG_REGISTRY } from "@/_config/festival-details.config";
import { playfair } from "@/_lib/fonts";
import { Compass, ArrowRight } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";

export default function FestivalDetailExplore({
  festival,
}: {
  festival: FestivalDetailData;
}) {
  // Resolve explore more items
  const exploreItems = festival.exploreMoreSlugs
    .map((slug) => FESTIVAL_DETAILS_CONFIG_REGISTRY[slug])
    .filter(Boolean);

  if (exploreItems.length === 0) return null;

  return (
    <section className="w-full py-14 md:py-20 bg-[#FAF7F2] border-t border-amber-100/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Discover More</span>
            </div>
            <h2
              className={`${playfair.className} text-3xl sm:text-4xl font-bold text-heading`}
            >
              Explore More Festivals
            </h2>
          </div>
        </ScrollReveal>

        {/* 3-Column Cards Grid with Staggered Cascading Reveals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exploreItems.map((item, idx) => (
            <ScrollReveal
              key={item.slug}
              animation="fade-up"
              duration={700}
              delay={idx * 100}
            >
              <Link
                href={`/${item.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.heroImage}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                      {item.dateBadge.day} {item.dateBadge.month}
                    </span>
                    <h3
                      className={`${playfair.className} text-xl font-bold leading-snug`}
                    >
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between mt-auto border-t border-stone-100 text-xs font-semibold text-primary group-hover:text-amber-700">
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
