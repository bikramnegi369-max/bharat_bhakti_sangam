"use client";

import { Cinzel } from "next/font/google";
import Image from "next/image"; // ADD THIS
import { Button } from "../ui/Button";
import { useRouter } from "next/dist/client/components/navigation";

type HeroProps = {
  title?: string;
  location?: string;
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

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function Hero({
  title,
  location,
  date,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroProps) {
  const router = useRouter();
  return (
    <section className="relative h-[clamp(14.375rem,calc(6.339rem+40.179vw),42.5rem)] w-full flex items-center justify-center text-center text-white overflow-hidden my-auto">
      {/* Background Image - REPLACED with Next.js Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority // critical for hero LCP
          sizes="100vw"
          className="object-cover"
          quality={75} // reduces file size
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

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

        {/* Location */}
        {location && (
          <p className="mt-4 text-[clamp(0.625rem,calc(0.268rem+1.786vw),1.875rem)] text-gray-200">
            {location}
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
            <Button
              variant="primary"
              onClick={() => primaryCta?.href && router.push(primaryCta.href)}
            >
              {primaryCta?.label}
            </Button>

            {secondaryCta && (
              <Button
                variant="secondary"
                onClick={() =>
                  secondaryCta?.href && router.push(secondaryCta.href)
                }
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
