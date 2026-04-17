
import Image from "next/image"; // ADD THIS
import { CTAButton } from "../../ui/CTAButton";
import { getOptimizedImageUrl } from "@/_lib/helpers";
import { cinzel } from "@/_lib/fonts";

type HeroProps = {
  title?: string;
  location?: string;
  address?: string;
  date?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
};


export default function Hero({
  title,
  location,
  address,
  date,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative h-[clamp(14.375rem,calc(6.339rem+40.179vw),42.5rem)] w-full flex items-center justify-center text-center text-white overflow-hidden my-auto">
      {backgroundImage && (
        <Image
          src={getOptimizedImageUrl(backgroundImage, { width: 1200 })}
          alt="Hero background"
          fill
          priority
          sizes="(max-width: 640px) 100vw,
       (max-width: 1024px) 100vw,
       1200px"
          className="object-cover"
          quality={60}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/*Content */}
      <div className="relative z-10 max-w-3xl px-6">
        {/* Title */}
        {title && (
          <h1
            className={`${cinzel.className} text-[clamp(1.25rem,calc(0.536rem+3.571vw),3.75rem)] font-bold leading-tight`}
          >
            {title}
          </h1>
        )}

        {/* Location & Address */}
        {(location || address) && (
          <p className="mt-4 text-[clamp(0.625rem,calc(0.268rem+1.786vw),1.875rem)] text-gray-200">
            {location}
            {location && address && <span className="mx-2">|</span>}
            {address}
          </p>
        )}

        {/* Date */}
        {date && (
          <p className="mt-2 text-[clamp(0.625rem,calc(0.268rem+1.786vw),1.875rem)] text-gray-300">
            {date}
          </p>
        )}

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex gap-4 justify-center">
            {primaryCta && (
              <CTAButton
                href={primaryCta.href}
                label={primaryCta.label}
                variant="primary"
              />
            )}
            {secondaryCta && (
              <CTAButton
                href={secondaryCta.href}
                label={secondaryCta.label}
                variant="secondary"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
