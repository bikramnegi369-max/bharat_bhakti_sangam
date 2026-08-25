"use client";

import Image from "next/image";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ABOUT_OFFERINGS } from "../constants/about.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function AboutWhatWeDoSection() {
  const offerings = ABOUT_OFFERINGS;

  return (
    <section
      aria-label="What We Do"
      className="relative w-full py-14 sm:py-18 lg:py-22 bg-[#FCFAF5]"
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Section Header */}
        <ScrollReveal animation="fade-down" duration={600}>
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <h2
              className={clsx(
                playfair.className,
                "text-[clamp(1.875rem,calc(1.35rem+2vw),2.75rem)] font-bold tracking-tight text-[#4A0E0A] mb-3",
              )}
            >
              What We Do
            </h2>
            <div className="w-16 h-0.5 bg-[#C47D1C]/40 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Responsive Cards Grid:
            - Mobile: 2 columns
            - Tablet & 1024px Laptop/iPad Pro: 3 columns (gives generous width for title + description)
            - Extra Large Desktop: 6 columns
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {offerings.map((item, index) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              duration={650}
              delay={index * 90}
              className="h-full"
            >
              <div
                className={clsx(
                  "group flex flex-col items-center text-center p-4 rounded-xl h-full",
                  "bg-[#FBF8F2] border border-[#EADBCA]/70 shadow-xs",
                  "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#C47D1C]/50",
                )}
              >
                {/* Thumbnail Image */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3.5 shadow-inner">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 33vw, (max-width: 1280px) 33vw, 200px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                  />
                </div>

                {/* Card Title */}
                <h3
                  className={clsx(
                    poppins.className,
                    "text-[13px] sm:text-[14px] font-bold text-[#4A0E0A] mb-1.5 group-hover:text-[#740E0A] transition-colors leading-snug",
                  )}
                >
                  {item.title}
                </h3>

                {/* Card Description */}
                <p
                  className={clsx(
                    poppins.className,
                    "text-xs sm:text-[12px] text-[#6B6B6B] leading-relaxed font-normal",
                  )}
                >
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
