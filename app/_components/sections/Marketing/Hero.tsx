import { CTAButton } from "../../ui/CTAButton";
import { playfair } from "@/_lib/fonts";
import HeroBackgroundImage from "./HeroBackgroundImage";
import ScrollReveal from "@/_components/common/ScrollReveal";

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
  const hasContent = Boolean(
    title || location || address || date || primaryCta || secondaryCta,
  );

  return (
    <section className="relative aspect-video w-full flex items-center justify-center text-center text-white overflow-hidden my-auto">
      <HeroBackgroundImage backgroundImage={backgroundImage} />

      {hasContent ? (
        <>
          {/* Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/50 will-change-transform"
          />

          {/*Content */}
          <div className="relative z-10 max-w-3xl px-6">
            {/* Title */}
            {title && (
              <ScrollReveal animation="fade-down" duration={700}>
                <h1
                  className={`${playfair.className} text-[clamp(1.25rem,calc(0.714rem+2.679vw),3.125rem)] font-bold leading-tight`}
                >
                  {title}
                </h1>
              </ScrollReveal>
            )}

            {/* Location & Address */}
            {(location || address) && (
              <ScrollReveal animation="fade-up" duration={700} delay={100}>
                <p className="mt-5 text-[clamp(0.75rem,calc(0.518rem+1.161vw),1.563rem)] text-gray-200">
                  {location}
                  {location && address && <span className="mx-2">|</span>}
                  {address}
                </p>
              </ScrollReveal>
            )}

            {/* Date */}
            {date && (
              <ScrollReveal animation="fade-up" duration={700} delay={150}>
                <p className="mt-2 font-semibold text-[clamp(0.625rem,calc(0.357rem+1.339vw),1.563rem)] text-gray-300">
                  {date}
                </p>
              </ScrollReveal>
            )}

            {/* CTA Buttons */}
            {(primaryCta || secondaryCta) && (
              <ScrollReveal animation="scale-up" duration={650} delay={200}>
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
              </ScrollReveal>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
}

