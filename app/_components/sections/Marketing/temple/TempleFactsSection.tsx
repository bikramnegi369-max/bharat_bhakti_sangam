import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { CheckCircle2 } from "lucide-react";
import type { Temple } from "@/_types/Temples.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface TempleFactsSectionProps {
  temple: Temple;
}

export default function TempleFactsSection({
  temple,
}: TempleFactsSectionProps) {
  const showcaseImage =
    temple.factsBookImage || temple.descriptionImages?.[1] || temple.heroImage;

  return (
    <section
      className="py-16 sm:py-20 border-b border-stone-200/60 bg-[#FCFAF5]"
      aria-labelledby="facts-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Signature Temple Arch Image / Book Showcase */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 w-full">
            <ScrollReveal animation="scale-up" duration={800} className="w-full flex justify-center">
              <div className="relative w-full max-w-95 aspect-4/3 min-h-60 sm:min-h-70 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/80 bg-stone-900">
                <Image
                  src={showcaseImage}
                  alt={`${temple.name} Sacred Sanctum`}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  quality={85}
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span
                    className={`${playfair.className} inline-block bg-amber-500/90 text-stone-950 px-4 py-1.5 rounded-lg text-sm font-bold tracking-wider uppercase backdrop-blur-sm border border-white/40 shadow-lg`}
                  >
                    SACRED HERITAGE
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interesting Facts List */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <ScrollReveal animation="fade-left" duration={700}>
              <div>
                <span
                  className={`${poppins.className} block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1`}
                >
                  04 INTERESTING FACTS
                </span>
                <h2
                  id="facts-heading"
                  className={`${playfair.className} text-2xl sm:text-4xl font-bold uppercase tracking-wide text-primary leading-tight`}
                >
                  Interesting Facts
                </h2>
              </div>
            </ScrollReveal>

            {/* Checkmarked Facts List */}
            <ul className="space-y-4 pt-1" role="list">
              {temple.facts?.map((fact, idx) => (
                <ScrollReveal
                  key={idx}
                  animation="fade-up"
                  duration={650}
                  delay={idx * 80 + 50}
                >
                  <li
                    className={`${poppins.className} flex items-start gap-3.5 text-stone-700 text-sm sm:text-base leading-relaxed`}
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 border border-amber-300">
                      <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                    </div>
                    <span>{fact}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

