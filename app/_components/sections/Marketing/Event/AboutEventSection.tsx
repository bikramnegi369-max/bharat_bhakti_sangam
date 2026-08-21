import Image from "next/image";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import {
  Sparkles,
  Music2,
  Flame,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";

export interface EventHighlightItem {
  id?: string | number;
  label: string;
  icon?: LucideIcon;
}

export interface AboutEventSectionProps {
  /** Eyebrow label above the title */
  eyebrow?: string;
  /** Main section heading title */
  title?: string;
  /** Paragraph description of the event */
  description?: string;
  /** Highlight bullet points with musical / devotional icons */
  highlights?: EventHighlightItem[];
  /** Right showcase image */
  imageSrc?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Optional custom CSS classes */
  className?: string;
}

const DEFAULT_HIGHLIGHTS: EventHighlightItem[] = [
  { id: 1, label: "Bhajans", icon: Music2 },
  { id: 2, label: "Spiritual Talks", icon: Sparkles },
  { id: 3, label: "Cultural Performances", icon: HeartHandshake },
  { id: 4, label: "Maha Aarti", icon: Flame },
];

export default function AboutEventSection({
  eyebrow = "ABOUT THE EVENT",
  title = "An Evening of Devotion, Culture & Unity",
  description = "Bharat Bhakti Mahotsav 2026 is a soulful celebration of our rich spiritual heritage. Join thousands of devotees for an evening filled with bhajans, spiritual discourses, cultural performances and the divine Maha Aarti.",
  highlights = DEFAULT_HIGHLIGHTS,
  imageSrc = "/gallery/gallery_1.webp",
  imageAlt = "Bharat Bhakti Mahotsav live spiritual performance and celebration",
  className,
}: AboutEventSectionProps) {
  return (
    <section
      aria-labelledby="about-event-heading"
      className={clsx(
        "relative overflow-hidden py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]",
        className,
      )}
    >
      {/* Subtle Background Decorative Star / Sparkle Accent in top-right */}



      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 sm:-top-16 sm:-right-16 w-48 h-48 sm:w-64 sm:h-64 opacity-20 select-none z-0"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-primary"
        >
          {/* 4-point Diamond Star with delicate radiating flairs */}
          <path
            d="M100 0 L107 88 L195 95 L107 102 L100 190 L93 102 L5 95 L93 88 Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path
            d="M100 25 L104 90 L170 95 L104 100 L100 165 L96 100 L30 95 L96 90 Z"
            fill="currentColor"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Eyebrow, Heading, Description Paragraph, Highlight Items */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-left">
          {/* Eyebrow with decorative accent line */}
          <div className="inline-flex items-center gap-3 mb-3.5 sm:mb-4">
            <span
              className={clsx(
                poppins.className,
                "text-[13px] sm:text-[14px] font-semibold tracking-[0.2em] text-[#8C1D18] uppercase",
              )}
            >
              {eyebrow}
            </span>
            <span
              aria-hidden="true"
              className="w-8 sm:w-12 h-px bg-[#8C1D18]/50"
            />
          </div>

          {/* Main Title in Playfair */}
          <h2
            id="about-event-heading"
            className={clsx(
              playfair.className,
              "text-[clamp(2.25rem,3.5vw,3.25rem)] text-heading font-medium leading-[1.18] tracking-tight",
            )}
          >
            {title}
          </h2>

          {/* Description Paragraph in Poppins */}
          <p
            className={clsx(
              poppins.className,
              "mt-5 sm:mt-6 text-[clamp(0.938rem,1.1vw,1.063rem)] text-para leading-relaxed sm:leading-loose font-normal",
            )}
          >
            {description}
          </p>

          {/* Highlights 2-column Grid */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-5">
            {highlights.map((item, idx) => {
              const IconComponent = item.icon ?? Music2;
              return (
                <div
                  key={item.id ?? idx}
                  className="flex items-center gap-3.5 group"
                >
                  {/* Icon Representation */}
                  <span
                    aria-hidden="true"
                    className="shrink-0 flex items-center justify-center w-6 h-6 text-stone-800 transition-transform duration-200 group-hover:scale-110"
                  >
                    <IconComponent
                      className="w-5 h-5 text-stone-700 group-hover:text-primary transition-colors"
                      strokeWidth={1.8}
                    />
                  </span>

                  {/* Label */}
                  <span
                    className={clsx(
                      poppins.className,
                      "text-[0.938rem] sm:text-[1rem] font-medium text-heading group-hover:text-primary transition-colors leading-snug",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Rounded Event Image Showcase */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 max-w-xl lg:max-w-none rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-stone-200/60 group bg-neutral-900">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 45vw, 520px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={false}
            />

            {/* Subtle inner shadow / border accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


