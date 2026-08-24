import Image from "next/image";
import { FestivalDetailData } from "@/_types/festivals.types";
import { playfair, poppins } from "@/_lib/fonts";
import { CheckCircle2 } from "lucide-react";

export default function FestivalDetailRituals({
  festival,
}: {
  festival: FestivalDetailData;
}) {
  return (
    <section className="w-full py-12 md:py-16 bg-[#FAF7F2] border-y border-amber-100/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Left Leaf Shaped Frame Image — Exact same width/height/aspect ratio as other sections */}
          <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-16/11 overflow-hidden rounded-tr-[80px] sm:rounded-tr-[110px] md:rounded-tr-[130px] rounded-bl-[80px] sm:rounded-bl-[110px] md:rounded-bl-[130px] rounded-tl-2xl rounded-br-2xl shadow-xl border border-amber-200/90 group">
              <Image
                src={festival.rituals.image}
                alt={festival.rituals.imageAlt || festival.rituals.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Right Rituals List — Exact 1/2 width matching other sections */}
          <div className="w-full lg:w-1/2 space-y-5 order-1 lg:order-2 text-left">
            <div>
              <h2
                className={`${playfair.className} text-3xl sm:text-4xl font-bold text-heading leading-tight`}
              >
                {festival.rituals.title}
              </h2>
              <p className={`${poppins.className} text-xs sm:text-sm text-stone-500 mt-1`}>
                Time-honored sacred customs and observances
              </p>
            </div>

            <div className="space-y-3 sm:space-y-3.5">
              {festival.rituals.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-amber-100/90 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/15 text-amber-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  </div>

                  <div className="space-y-0.5">
                    <h3
                      className={`${poppins.className} text-xs sm:text-sm font-semibold text-stone-800`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`${poppins.className} text-xs text-stone-600 leading-relaxed font-normal`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
