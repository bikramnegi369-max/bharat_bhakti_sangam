"use client";

import Image from "next/image";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ABOUT_MISSION_DATA } from "../constants/about.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function AboutMissionSection() {
  const data = ABOUT_MISSION_DATA;

  return (
    <section
      aria-label="Our Mission"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#FCFAF5]"
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image (5 cols on lg) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ScrollReveal animation="fade-right" duration={800} threshold={0.15}>
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
                  className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Text + Quote Card (7 cols on lg) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
            {/* Saffron Badge */}
            <ScrollReveal animation="fade-down" duration={600}>
              <span
                className={clsx(
                  poppins.className,
                  "inline-block text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C47D1C] mb-2 sm:mb-3",
                )}
              >
                {data.badge}
              </span>
            </ScrollReveal>

            {/* Section Heading */}
            <ScrollReveal animation="fade-up" duration={700} delay={80}>
              <h2
                className={clsx(
                  playfair.className,
                  "text-[clamp(1.875rem,calc(1.35rem+2vw),2.875rem)] font-bold leading-[1.18] tracking-tight text-[#4A0E0A] mb-4 sm:mb-5",
                )}
              >
                {data.title}
              </h2>
            </ScrollReveal>

            {/* Paragraphs */}
            <ScrollReveal animation="fade-up" duration={700} delay={160}>
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
            </ScrollReveal>

            {/* Quote Card with Golden Left Border */}
            <ScrollReveal
              animation="scale-up"
              duration={750}
              delay={240}
              className="w-full"
            >
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
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
