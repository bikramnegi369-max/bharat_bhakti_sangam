import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import type { Temple } from "@/_types/Temples.types";

interface TempleFeaturePillarsProps {
  temple: Temple;
}

export default function TempleFeaturePillars({
  temple,
}: TempleFeaturePillarsProps) {
  return (
    <section
      className="py-16 sm:py-20 border-b border-stone-200/60"
      aria-labelledby="pillars-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className={`${poppins.className} block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1.5`}
          >
            05 SACRED HERITAGE
          </span>
          <h2
            id="pillars-heading"
            className={`${playfair.className} text-2xl sm:text-4xl font-bold text-primary leading-tight`}
          >
            Architectural &amp; Mythological Wonders
          </h2>
          <p
            className={`${poppins.className} text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed`}
          >
            Discover the intricate architecture, timeless puranic legends, and
            sacred rituals that define {temple.name}.
          </p>
        </div>

        {/* 3-Column Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {temple.featurePillars?.map((pillar, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-4/3 bg-stone-900 overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    className={`${poppins.className} text-[10px] font-bold tracking-widest uppercase bg-amber-500/90 text-stone-950 px-2.5 py-1 rounded-md backdrop-blur-xs`}
                  >
                    {pillar.tag}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3
                  className={`${playfair.className} text-xl font-bold text-stone-900 mb-2.5 group-hover:text-amber-600 transition-colors`}
                >
                  {pillar.title}
                </h3>
                <p
                  className={`${poppins.className} text-stone-600 text-xs sm:text-sm leading-relaxed flex-1`}
                >
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
