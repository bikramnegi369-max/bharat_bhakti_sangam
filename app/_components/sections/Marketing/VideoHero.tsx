import clsx from "clsx";
import { playfair } from "@/_lib/fonts";
import { Mouse } from "lucide-react";
import HeroBackgroundImage from "./HeroBackgroundImage";
import { CTAButton } from "../../ui/CTAButton";

export interface VideoHeroProps {
  /** Video source for desktop/default view */
  src: string;
  /** Optional video source for mobile view for performance optimization */
  mobileSrc?: string;
  /** Poster image shown while video loads or as fallback */
  poster?: string;
  /** Optional eyebrow text displayed above the title */
  eyebrow?: string;
  /** Main hero title */
  title?: string;
  /** Location text */
  location?: string;
  /** Address text */
  address?: string;
  /** Date text */
  date?: string;
  /** Description paragraph */
  description?: string;
  /** Primary CTA button config */
  primaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  /** Secondary CTA button config */
  secondaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  /** Overlay gradient/darkness style */
  overlay?: "dark" | "medium" | "light" | "gradient";
  /** Optional scroll indicator text */
  scrollText?: string;
  /** Additional container CSS class names */
  className?: string;
}

export function VideoHero({
  src,
  mobileSrc,
  poster,
  eyebrow,
  title,
  location,
  address,
  date,
  description,
  primaryAction,
  secondaryAction,
  overlay = "dark",
  scrollText = "SCROLL TO EXPLORE",
  className,
}: VideoHeroProps) {
  const hasContent = Boolean(
    eyebrow ||
    title ||
    location ||
    address ||
    date ||
    description ||
    primaryAction ||
    secondaryAction,
  );

  const overlayClasses = clsx(
    "absolute inset-0 z-10 pointer-events-none transition-opacity duration-300",
    {
      "bg-black/60": overlay === "dark",
      "bg-black/40": overlay === "medium",
      "bg-black/20": overlay === "light",
      "bg-gradient-to-b from-black/70 via-black/40 to-black/80":
        overlay === "gradient",
    },
  );

  return (
    <section
      className={clsx(
        "relative w-full h-[calc(100svh-var(--header-total-offset,5.5rem))] min-h-[calc(100svh-var(--header-total-offset,5.5rem))] flex flex-col justify-between items-center text-center text-white overflow-hidden bg-black",
        className,
      )}
      aria-label="Hero visual and featured content"
    >
      {/* Video Background Layer (z-0) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Poster fallback image */}
        {poster && <HeroBackgroundImage backgroundImage={poster} />}

        {/* Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          poster={poster}
          className="w-full h-full object-cover object-center motion-reduce:hidden"
        >
          {mobileSrc && (
            <source
              src={mobileSrc}
              type="video/mp4"
              media="(max-width: 767px)"
            />
          )}
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* Overlay Layer (z-10) */}
      <div className={overlayClasses} aria-hidden="true" />

      {/* Hero Content Layer (z-20) */}
      {hasContent ? (
        <div className="relative z-20 max-w-4xl px-4 sm:px-6 md:px-8 py-4 my-auto flex flex-col items-center justify-center">
          {/* Eyebrow */}
          {eyebrow && (
            <span className="text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-primary mb-2 sm:mb-3">
              {eyebrow}
            </span>
          )}

          {/* Main Title */}
          {title && (
            <h1
              className={`${playfair.className} text-[clamp(1.75rem,calc(1.1rem+3vw),3.75rem)] font-bold leading-tight tracking-tight text-white drop-shadow-md`}
            >
              {title}
            </h1>
          )}

          {/* Location & Address */}
          {(location || address) && (
            <p className="mt-3 sm:mt-4 text-[clamp(0.875rem,calc(0.7rem+0.8vw),1.35rem)] text-gray-200 font-medium">
              {location}
              {location && address && (
                <span className="mx-2 text-primary">|</span>
              )}
              {address}
            </p>
          )}

          {/* Date */}
          {date && (
            <p className="mt-1 sm:mt-2 font-semibold text-[clamp(0.8rem,calc(0.65rem+0.7vw),1.25rem)] text-primary">
              {date}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base text-gray-300 leading-relaxed">
              {description}
            </p>
          )}

          {/* CTAs */}
          {(primaryAction || secondaryAction) && (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
              {primaryAction && (
                <CTAButton
                  href={primaryAction.href}
                  label={primaryAction.label}
                  variant="primary"
                  external={primaryAction.external}
                />
              )}
              {secondaryAction && (
                <CTAButton
                  href={secondaryAction.href}
                  label={secondaryAction.label}
                  variant="secondary"
                  external={secondaryAction.external}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="my-auto" />
      )}

      {/* Scroll Indicator Layer (z-30) */}
      <div className="relative z-30 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 shrink-0">
        <a
          href="#main-content"
          aria-label="Scroll to main content"
          className="group flex flex-col items-center gap-1.5 text-xs sm:text-sm font-medium tracking-widest text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-sm px-2 py-1"
        >
          <span className="uppercase text-[0.7rem] sm:text-xs tracking-widest text-gray-300">
            {scrollText}
          </span>
          <Mouse className="w-5 h-5 text-primary motion-safe:animate-bounce transition-transform duration-300 group-hover:scale-110" />
        </a>
      </div>
    </section>
  );
}

export default VideoHero;
