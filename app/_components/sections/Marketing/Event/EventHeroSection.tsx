import Link from "next/link";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { ChevronRight } from "lucide-react";
import HeroBackgroundImage from "../HeroBackgroundImage";

export interface EventHeroSectionProps {
  /** Tagline / eyebrow displayed above title */
  eyebrow?: string;
  /** Main event title */
  title: string;
  /** Call to action link text */
  ctaLabel?: string;
  /** Call to action URL */
  ctaHref?: string;
  /** Background image url or path */
  backgroundImage?: string;
  /** Additional container classes */
  className?: string;
}

export default function EventHeroSection({
  eyebrow = "A GRAND CELEBRATION OF DEVOTION, CULTURE & SPIRITUALITY",
  title,
  ctaLabel = "Book Your Pass Now",
  ctaHref = "/booking",
  backgroundImage = "/event.webp",
  className,
}: EventHeroSectionProps) {
  return (
    <section
      aria-label={title}
      className={clsx(
        "relative w-full min-h-115 sm:min-h-130 md:min-h-145 lg:min-h-160 xl:min-h-175 flex items-center overflow-hidden",
        poppins.className,
        className,
      )}
    >
      {/* Background Image with optimized preload and srcset */}
      <HeroBackgroundImage backgroundImage={backgroundImage} />

      {/* Atmospheric Overlays: Darkened vignette + directional gradient for premium contrast & legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/75 pointer-events-none"
      />

      {/* Main Hero Container - extra bottom padding on mobile/tablet to prevent overlap occlusion */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-12 pb-16 sm:pt-16 sm:pb-20 md:pb-24 lg:py-20 flex flex-col justify-center">
        <div className="max-w-3xl lg:max-w-4xl flex flex-col items-start text-left">
          {/* Eyebrow / Tagline with decorative gold accents */}
          {eyebrow && (
            <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
              <span className="w-6 sm:w-10 h-[1.5px] bg-[#D4AF37]/90 rounded-full" />
              <p className="text-[0.688rem] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-[#D4AF37] uppercase">
                {eyebrow}
              </p>
              <span className="w-6 sm:w-10 h-[1.5px] bg-[#D4AF37]/90 rounded-full" />
            </div>
          )}

          {/* Main Title in Playfair */}
          <h1
            className={clsx(
              playfair.className,
              "text-white font-bold leading-[1.15] tracking-tight drop-shadow-md",
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
              "mb-8 sm:mb-10",
            )}
          >
            {title}
          </h1>

          {/* Primary Action Button */}
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className={clsx(
                "group relative inline-flex items-center justify-center gap-2.5",
                "px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl",
                "bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base",
                "border border-primary/40 shadow-lg shadow-black/40",
                "transition-all duration-300 transform active:scale-95 hover:shadow-primary/20",
                "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black",
              )}
            >
              <span>{ctaLabel}</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
