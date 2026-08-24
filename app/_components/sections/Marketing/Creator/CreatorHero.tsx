import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

export interface CreatorHighlight {
  id?: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface CreatorHeroProps {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  highlights: CreatorHighlight[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function CreatorHero({
  eyebrow,
  titleLine1,
  titleLine2,
  description,
  highlights,
  imageSrc = "/about_hero.webp",
  imageAlt = "Bharat Bhakti Sangam sacred cultural showcase",
  className,
}: CreatorHeroProps) {
  return (
    <section
      aria-labelledby="creator-hero-heading"
      className={clsx(
        "relative w-full overflow-hidden bg-secondary py-12 sm:py-16 md:py-20 lg:py-24",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 items-center">
          {/* Left Column: Editorial & Value Proposition Content */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-7 xl:space-y-8">
            {/* Eyebrow with gold accent bar */}
            <ScrollReveal animation="fade-down" duration={700}>
              <div className="flex items-center gap-3">
                <span
                  className={clsx(
                    poppins.className,
                    "text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-primary",
                  )}
                >
                  {eyebrow}
                </span>
                <span
                  aria-hidden="true"
                  className="h-0.5 w-10 sm:w-12 bg-amber-400/80 rounded-full"
                />
              </div>
            </ScrollReveal>

            {/* Main Editorial Headline */}
            <ScrollReveal animation="fade-up" duration={750} delay={100}>
              <h1
                id="creator-hero-heading"
                className={clsx(
                  playfair.className,
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold tracking-tight leading-[1.12] text-heading",
                )}
              >
                <span>{titleLine1}</span>
                <br />
                <span className="text-primary">{titleLine2}</span>
              </h1>
            </ScrollReveal>

            {/* Descriptive Body */}
            <ScrollReveal animation="fade-up" duration={700} delay={200}>
              <p
                className={clsx(
                  poppins.className,
                  "max-w-xl text-para text-sm sm:text-base lg:text-[0.975rem] xl:text-base leading-relaxed font-normal",
                )}
              >
                {description}
              </p>
            </ScrollReveal>

            {/* Value Proposition Highlights Grid with Stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-5 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal
                    key={item.id ?? idx}
                    animation="fade-up"
                    duration={650}
                    delay={250 + idx * 100}
                  >
                    <div className="flex items-center sm:items-start gap-3 rounded-xl p-2.5 sm:p-2 md:p-3 transition-colors duration-200">
                      {/* Icon Badge */}
                      <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50 border border-amber-300/60 flex items-center justify-center text-amber-600 shadow-xs">
                        <Icon
                          className="w-5 h-5 text-amber-600"
                          strokeWidth={1.75}
                        />
                      </div>

                      {/* Text Block */}
                      <div className="flex flex-col min-w-0">
                        <span
                          className={clsx(
                            poppins.className,
                            "text-xs sm:text-[0.825rem] md:text-sm font-semibold text-neutral-900 leading-tight",
                          )}
                        >
                          {item.title}
                        </span>
                        <span
                          className={clsx(
                            poppins.className,
                            "text-[11px] sm:text-[0.725rem] md:text-xs text-neutral-500 leading-tight mt-0.5",
                          )}
                        >
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Media Showcase Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <ScrollReveal
              animation="scale-up"
              duration={850}
              delay={150}
              className="w-full flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-xl lg:max-w-none aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 xl:aspect-16/11 rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(63,6,5,0.08)] ring-1 ring-black/5 bg-neutral-100">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 45vw, 600px"
                  className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-60"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
