"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ABOUT_HERO_DATA } from "../constants/about.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function AboutHeroSection() {
  const data = ABOUT_HERO_DATA;

  return (
    <section
      aria-label="Welcome to Bharat Bhakti Sangam"
      className="relative w-full overflow-hidden pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 lg:pb-24 bg-[#FCFAF5]"
    >
      {/* Decorative ambient gold radial light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-120 md:w-160 aspect-square rounded-full bg-[#FFE8C2]/40 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Saffron Pill Badge */}
            <ScrollReveal animation="fade-down" duration={600}>
              <span
                className={clsx(
                  poppins.className,
                  "inline-block text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C47D1C] mb-3 sm:mb-4",
                )}
              >
                {data.badge}
              </span>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal animation="fade-up" duration={700} delay={80}>
              <h1
                className={clsx(
                  playfair.className,
                  "text-[clamp(2.125rem,calc(1.45rem+2.8vw),3.75rem)] font-bold leading-[1.12] tracking-tight text-[#4A0E0A] mb-5 sm:mb-6",
                )}
              >
                {data.titlePart1}{" "}
                <span className="block text-[#740E0A]">
                  {data.titleHighlight}
                </span>
              </h1>
            </ScrollReveal>

            {/* Description Paragraphs */}
            <ScrollReveal animation="fade-up" duration={700} delay={180}>
              <p
                className={clsx(
                  poppins.className,
                  "text-[#5C5C5C] text-[clamp(0.9rem,calc(0.85rem+0.25vw),1.063rem)] leading-[1.75] font-normal max-w-xl mb-4",
                )}
              >
                {data.description1}
              </p>

              <p
                className={clsx(
                  poppins.className,
                  "text-[#5C5C5C] text-[clamp(0.9rem,calc(0.85rem+0.25vw),1.063rem)] leading-[1.75] font-normal max-w-xl mb-8 sm:mb-10",
                )}
              >
                {data.description2}
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal animation="fade-up" duration={700} delay={280}>
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                <Link
                  href={data.primaryCta.href}
                  className={clsx(
                    poppins.className,
                    "px-7 py-3 rounded-lg text-sm sm:text-[15px] font-semibold text-white",
                    "bg-[#740E0A] hover:bg-[#590B08] shadow-md shadow-[#740E0A]/20",
                    "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#740E0A] focus-visible:ring-offset-2",
                  )}
                >
                  {data.primaryCta.label}
                </Link>

                <Link
                  href={data.secondaryCta.href}
                  className={clsx(
                    poppins.className,
                    "px-7 py-3 rounded-lg text-sm sm:text-[15px] font-semibold text-[#740E0A]",
                    "border border-[#740E0A]/30 bg-[#740E0A]/5 hover:bg-[#740E0A]/10",
                    "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#740E0A] focus-visible:ring-offset-2",
                  )}
                >
                  {data.secondaryCta.label}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Arch Frame Devotee Image (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal
              animation="blur-in"
              duration={900}
              delay={120}
              className="relative w-full max-w-85 sm:max-w-100 lg:max-w-110"
            >
              {/* Arch Frame with luxury border & shadow */}
              <div
                className={clsx(
                  "relative w-full aspect-4/5 overflow-hidden",
                  "rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[210px] rounded-b-2xl",
                  "border-[5px] sm:border-[6px] border-[#FCFAF5] shadow-[0_20px_50px_rgba(74,14,10,0.18)]",
                  "bg-linear-to-b from-[#FAF4EB] to-[#EBDCC5]",
                )}
              >
                <Image
                  src={data.heroImage}
                  alt={data.heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 440px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle bottom vignette gradient */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent pointer-events-none"
                />
              </div>

              {/* Decorative golden accent halo behind the arch */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-[#E5A84B]/20 blur-2xl -z-10"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
