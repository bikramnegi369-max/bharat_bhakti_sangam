import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import type { Temple } from "@/_types/Temples.types";
import ScrollReveal from "@/_components/common/ScrollReveal";

interface TempleTimelineSectionProps {
  temple: Temple;
}

export default function TempleTimelineSection({
  temple,
}: TempleTimelineSectionProps) {
  const videoImg =
    temple.videoThumbnail?.image ||
    temple.heroImage ||
    "/temples-images/vishwanath/features/vishwanath-feature-1.webp";

  return (
    <section
      className="py-16 sm:py-20 border-b border-stone-200/60 bg-[#FCFAF5]"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Featured History Heritage Image Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <ScrollReveal animation="scale-up" duration={800} className="w-full flex justify-center">
              <div className="relative w-full max-w-110 aspect-4/3 min-h-60 sm:min-h-75 rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-900">
                <Image
                  src={videoImg}
                  alt={`${temple.name} Historical Heritage`}
                  fill
                  sizes="(max-width: 640px) 100vw, 440px"
                  quality={85}
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/40 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Historical Chronology Grid */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal animation="fade-left" duration={700}>
              <div>
                <span
                  className={`${poppins.className} block text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1`}
                >
                  02 HISTORY
                </span>
                <h2
                  id="timeline-heading"
                  className={`${playfair.className} text-2xl sm:text-4xl font-bold text-primary leading-tight`}
                >
                  A Legacy Through <br className="hidden sm:inline" />
                  Centuries
                </h2>
              </div>
            </ScrollReveal>

            {/* 2x2 Historical Milestone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
              {temple.timeline?.map((item, idx) => (
                <ScrollReveal
                  key={idx}
                  animation="fade-up"
                  duration={650}
                  delay={idx * 90}
                >
                  <div className="bg-white border border-stone-200/90 p-4 sm:p-5 rounded-xl shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 h-full">
                    <span
                      className={`${playfair.className} block text-lg font-bold text-amber-600 mb-1.5`}
                    >
                      {item.year}
                    </span>
                    <p
                      className={`${poppins.className} text-stone-600 text-xs sm:text-sm leading-relaxed`}
                    >
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

