import Image from "next/image";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ABOUT_VISION_DATA } from "../constants/about.constants";

export function AboutVisionSection() {
  const data = ABOUT_VISION_DATA;

  return (
    <section
      aria-label="Our Vision"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FCFAF5]"
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image (5 cols on lg) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              className={clsx(
                "relative w-full aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden shadow-xl",
                "border border-[#EBDCC5]",
              )}
            >
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none"
              />
            </div>
          </div>

          {/* Right Column: Text + Quote Card + Pillars (7 cols on lg) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
            {/* Saffron Badge */}
            <span
              className={clsx(
                poppins.className,
                "text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C47D1C] mb-2 sm:mb-3",
              )}
            >
              {data.badge}
            </span>

            {/* Section Heading */}
            <h2
              className={clsx(
                playfair.className,
                "text-[clamp(1.875rem,calc(1.35rem+2vw),2.875rem)] font-bold leading-[1.18] tracking-tight text-[#4A0E0A] mb-4 sm:mb-5",
              )}
            >
              {data.title}
            </h2>

            {/* Paragraphs */}
            <p
              className={clsx(
                poppins.className,
                "text-[#5C5C5C] text-[clamp(0.875rem,calc(0.825rem+0.2vw),1rem)] leading-[1.75] font-normal mb-3",
              )}
            >
              {data.paragraph1}
            </p>

            <p
              className={clsx(
                poppins.className,
                "text-[#5C5C5C] text-[clamp(0.875rem,calc(0.825rem+0.2vw),1rem)] leading-[1.75] font-normal mb-6",
              )}
            >
              {data.paragraph2}
            </p>

            {/* Quote Card with Golden Left Border */}
            <div
              className={clsx(
                "w-full rounded-r-xl rounded-l-xs p-4 sm:p-5",
                "bg-[#FBF6EE] border-l-4 border-[#C47D1C] shadow-xs",
              )}
            >
              <p
                className={clsx(
                  playfair.className,
                  "text-[#4A0E0A] italic text-[clamp(1rem,calc(0.95rem+0.3vw),1.188rem)] font-medium leading-snug",
                )}
              >
                {data.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Pillars - Full Width Bottom Row */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#EADBCA]/40 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto">
          {data.pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="flex items-start gap-4 sm:gap-5"
              >
                {/* Deep Crimson Circular Icon Badge */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#590B08] text-white flex items-center justify-center shadow-md">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9]" />
                </div>

                <div className="flex flex-col text-left">
                  <h3
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[13px] font-bold tracking-wider text-[#4A0E0A] uppercase mb-1",
                    )}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[13px] text-[#6B6B6B] leading-relaxed",
                    )}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
