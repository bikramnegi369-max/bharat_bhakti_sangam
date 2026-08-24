import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import type { Temple } from "@/_types/Temples.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface TempleOriginsSectionProps {
  temple: Temple;
}

export default function TempleOriginsSection({
  temple,
}: TempleOriginsSectionProps) {
  const originImage =
    temple.history?.historyImages?.[0] ||
    temple.location?.locationImages?.[0] ||
    temple.heroImage;

  return (
    <section
      className="py-16 sm:py-20 border-b border-stone-200/60"
      aria-labelledby="origins-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Origins Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <ScrollReveal animation="fade-right" duration={700}>
              <div>
                <span
                  className={`${poppins.className} block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1`}
                >
                  03 ORIGINS
                </span>
                <h2
                  id="origins-heading"
                  className={`${playfair.className} text-2xl sm:text-4xl font-bold uppercase tracking-wide text-primary leading-tight`}
                >
                  History &amp; Origins
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {temple.originsParagraphs &&
              temple.originsParagraphs.length > 0 ? (
                temple.originsParagraphs.map((paragraph, idx) => (
                  <ScrollReveal
                    key={idx}
                    animation="fade-right"
                    duration={750}
                    delay={idx * 80 + 50}
                  >
                    <p
                      className={`${poppins.className} text-stone-700 text-sm sm:text-base leading-relaxed`}
                    >
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))
              ) : (
                <ScrollReveal animation="fade-right" duration={750} delay={60}>
                  <p
                    className={`${poppins.className} text-stone-700 text-sm sm:text-base leading-relaxed`}
                    dangerouslySetInnerHTML={{
                      __html: temple.history?.description || temple.description,
                    }}
                  />
                </ScrollReveal>
              )}
            </div>
          </div>

          {/* Right Column: Historical Panoramic Arch Image */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <ScrollReveal animation="scale-up" duration={850} delay={100} className="w-full flex justify-center">
              <div className="relative w-full max-w-105 aspect-4/3 min-h-60 sm:min-h-75 rounded-3xl overflow-hidden shadow-xl border-2 border-stone-200 bg-stone-900">
                <Image
                  src={originImage}
                  alt={`${temple.name} Heritage View`}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  quality={85}
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/40 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

