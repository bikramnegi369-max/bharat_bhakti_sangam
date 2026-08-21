import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Sparkles, Award, Ticket, LucideIcon } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export interface InfluencerHighlight {
  id?: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface InfluencerHeroProps {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  highlights?: InfluencerHighlight[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const DEFAULT_HIGHLIGHTS: InfluencerHighlight[] = [
  {
    id: "inspire-millions",
    icon: Award,
    title: "Inspire Millions",
    subtitle: "through your content",
  },
  {
    id: "get-recognized",
    icon: Sparkles,
    title: "Get Recognized",
    subtitle: "on our official platforms",
  },
  {
    id: "exclusive-access",
    icon: Ticket,
    title: "Exclusive Access",
    subtitle: "to events & experiences",
  },
];

export default function InfluencerHero({
  eyebrow = "INFLUENCER COLLABORATION",
  titleLine1 = "Become an Official",
  titleLine2 = "Influencer",
  description = "Join Bharat Bhakti Sangam and be a part of a spiritual movement. Share devotion, culture and tradition with millions of hearts.",
  highlights = DEFAULT_HIGHLIGHTS,
  imageSrc = "/about_hero.webp",
  imageAlt = "Bharat Bhakti Sangam Influencer capturing devotional concert moments on camera",
  className,
}: InfluencerHeroProps) {
  return (
    <section
      aria-labelledby="influencer-hero-heading"
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
                className="h-[2px] w-10 sm:w-12 bg-amber-400/80 rounded-full"
              />
            </div>

            {/* Main Editorial Headline */}
            <h1
              id="influencer-hero-heading"
              className={clsx(
                playfair.className,
                "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold tracking-tight leading-[1.12] text-heading",
              )}
            >
              <span>{titleLine1}</span>
              <br />
              <span className="text-primary">{titleLine2}</span>
            </h1>

            {/* Descriptive Body */}
            <p
              className={clsx(
                poppins.className,
                "max-w-xl text-para text-sm sm:text-base lg:text-[0.975rem] xl:text-base leading-relaxed font-normal",
              )}
            >
              {description}
            </p>

            {/* Value Proposition Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-5 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id ?? idx}
                    className="flex items-center sm:items-start gap-3 rounded-xl p-2.5 sm:p-2 md:p-3 transition-colors duration-200"
                  >
                    {/* Icon Badge */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50 border border-amber-300/60 flex items-center justify-center text-amber-600 shadow-xs">
                      <Icon className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
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
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Media Showcase Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl lg:max-w-none aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11] rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(63,6,5,0.08)] ring-1 ring-black/5 bg-neutral-100">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 45vw, 600px"
                className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle ambient lighting vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
