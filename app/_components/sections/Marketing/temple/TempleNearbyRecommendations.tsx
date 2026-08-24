import NextLink from "next/link";
import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { ChevronRight } from "lucide-react";
import type { Temple } from "@/_types/Temples.types";
import { getTempleBySlug } from "@/_lib/helpers/temples.helpers";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface TempleNearbyRecommendationsProps {
  temple: Temple;
}

export default function TempleNearbyRecommendations({
  temple,
}: TempleNearbyRecommendationsProps) {
  const nearbySlugs = temple.nearbyTempleSlugs || [];
  const nearbyTemples = nearbySlugs
    .map((slug) => getTempleBySlug(slug))
    .filter((t): t is Temple => Boolean(t))
    .slice(0, 4);

  if (nearbyTemples.length === 0) return null;

  return (
    <section
      className="py-16 sm:py-20 bg-[#FCFAF5]"
      aria-labelledby="nearby-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span
                className={`${poppins.className} block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1`}
              >
                08 EXPLORE MORE
              </span>
              <h2
                id="nearby-heading"
                className={`${playfair.className} text-2xl sm:text-4xl font-bold uppercase tracking-wide text-primary leading-tight`}
              >
                Nearby &amp; Sacred Temples
              </h2>
            </div>

            <NextLink
              href="/famous-temples"
              className={`${poppins.className} inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider`}
            >
              All Temples <ChevronRight className="w-4 h-4" />
            </NextLink>
          </div>
        </ScrollReveal>

        {/* 4 Arch Cutout Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {nearbyTemples.map((item, idx) => (
            <ScrollReveal
              key={item.slug}
              animation="fade-up"
              duration={650}
              delay={idx * 90}
            >
              <NextLink
                href={`/${item.slug}`}
                className="group relative flex flex-col items-center text-center p-2 rounded-t-[100px] rounded-b-2xl bg-linear-to-b from-amber-200 via-amber-100 to-amber-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
              >
                <div className="relative w-full aspect-4/5 rounded-t-[94px] rounded-b-xl overflow-hidden border border-amber-400/80 bg-stone-900">
                  <Image
                    src={item.heroImage}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

                  {/* Card Title Label */}
                  <div className="absolute bottom-3 left-2 right-2 px-2 py-1">
                    <h3
                      className={`${playfair.className} text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1`}
                    >
                      {item.name}
                    </h3>
                    <span
                      className={`${poppins.className} text-[11px] text-stone-300 block truncate`}
                    >
                      {item.location?.title?.replace(" Location", "") ||
                        "India"}
                    </span>
                  </div>
                </div>
              </NextLink>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
