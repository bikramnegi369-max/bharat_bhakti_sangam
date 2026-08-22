import Image from "next/image";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ABOUT_FOUNDER_DATA } from "../constants/about.constants";

export function AboutFounderQuoteSection() {
  const data = ABOUT_FOUNDER_DATA;

  return (
    <section
      aria-label="Founder Note and Philosophy"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FCFAF5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Circular Founder Portrait (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-95 lg:max-w-105 aspect-square">
              {/* Circular Om Aura in background */}
              <div
                aria-hidden="true"
                className="absolute -top-6 -left-6 w-full h-full rounded-full bg-[#F5EAD4] -z-10 blur-xl opacity-70"
              />

              {/* Founder Image Circle Frame */}
              <div
                className={clsx(
                  "relative w-full h-full rounded-full overflow-hidden shadow-2xl",
                  "border-[6px] border-white shadow-[0_20px_45px_rgba(74,14,10,0.14)]",
                )}
              >
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle light vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Large Quote + Om Background + Signature (7 cols on lg) */}
          <div className="lg:col-span-7 relative flex flex-col items-start text-left">
            {/* Stylized Double Quote Icon */}
            <div
              aria-hidden="true"
              className="text-[#C47D1C] text-5xl sm:text-6xl font-serif leading-none mb-2 select-none"
            >
              “
            </div>

            {/* Founder Main Headline Quote */}
            <h2
              className={clsx(
                playfair.className,
                "text-[clamp(1.75rem,calc(1.35rem+1.8vw),2.625rem)] font-bold leading-[1.22] tracking-tight text-[#4A0E0A] mb-6",
              )}
            >
              {data.quote}
            </h2>

            {/* Bio Paragraph */}
            <p
              className={clsx(
                poppins.className,
                "text-[#5C5C5C] text-[clamp(0.875rem,calc(0.825rem+0.2vw),1.025rem)] leading-[1.8] font-normal mb-8 max-w-xl",
              )}
            >
              {data.bioParagraph}
            </p>

            {/* Signature & Name */}
            <div className="flex flex-col items-start">
              <h3
                className={clsx(
                  playfair.className,
                  "text-xl sm:text-2xl font-bold text-[#740E0A] tracking-wide",
                )}
              >
                {data.name}
              </h3>
              <p
                className={clsx(
                  poppins.className,
                  "text-xs sm:text-[13px] text-[#C47D1C] font-semibold tracking-wider uppercase mt-0.5",
                )}
              >
                {data.title}
              </p>
              <p
                className={clsx(
                  poppins.className,
                  "text-xs text-[#8A8A8A] font-normal",
                )}
              >
                {data.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
