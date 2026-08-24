import Image from "next/image";
import { FestivalDetailData } from "@/_types/festivals.types";
import { playfair, poppins } from "@/_lib/fonts";
import { MapPin } from "lucide-react";

export default function FestivalDetailRegional({
  festival,
}: {
  festival: FestivalDetailData;
}) {
  if (!festival.regionalCelebrations) return null;

  return (
    <section className="w-full py-12 md:py-16 bg-[#FAF7F2] border-t border-amber-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Full-width Panoramic Banner (Standard Rounded as Requested) */}
        {festival.panoramicBanner && (
          <div className="relative w-full aspect-21/9 sm:aspect-24/9 rounded-3xl overflow-hidden shadow-xl border border-amber-200 group">
            <Image
              src={festival.panoramicBanner.image}
              alt={festival.panoramicBanner.alt || "Festival panoramic banner"}
              fill
              sizes="100vw"
              className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-300">
                Spiritual Panorama
              </span>
              <p
                className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-md`}
              >
                {festival.name} Celebrations Across the Sacred Land
              </p>
            </div>
          </div>
        )}

        {/* 2-Column Section: Left Leaf Shaped Image, Right Regional Breakdowns */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Left Leaf Shaped Image (Exact same width/height/aspect ratio: w-full lg:w-1/2 max-w-md aspect-4/3 sm:aspect-16/11) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-16/11 overflow-hidden rounded-tr-[80px] sm:rounded-tr-[110px] md:rounded-tr-[130px] rounded-bl-[80px] sm:rounded-bl-[110px] md:rounded-bl-[130px] rounded-tl-2xl rounded-br-2xl shadow-xl border border-amber-200/90 group">
              <Image
                src={festival.regionalCelebrations.image}
                alt={
                  festival.regionalCelebrations.imageAlt ||
                  festival.regionalCelebrations.title
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Right Regional Traditions List */}
          <div className="w-full lg:w-1/2 space-y-6 text-left">
            <div>
              <h2
                className={`${playfair.className} text-3xl sm:text-4xl font-bold text-heading leading-tight`}
              >
                {festival.regionalCelebrations.title}
              </h2>
              {festival.regionalCelebrations.subtitle && (
                <p
                  className={`${poppins.className} text-xs sm:text-sm text-stone-500 mt-1`}
                >
                  {festival.regionalCelebrations.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {festival.regionalCelebrations.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white border border-amber-100/90 shadow-2xs hover:shadow-xs transition-shadow space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <h3
                      className={`${poppins.className} text-sm sm:text-base font-bold text-stone-800`}
                    >
                      <span className="text-primary font-extrabold">
                        {item.region}:
                      </span>{" "}
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className={`${poppins.className} text-xs sm:text-sm text-stone-600 leading-relaxed font-normal pl-6`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
