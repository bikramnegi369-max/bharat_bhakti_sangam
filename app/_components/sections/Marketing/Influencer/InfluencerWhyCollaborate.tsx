import React from "react";
import clsx from "clsx";
import {
  Users,
  CalendarDays,
  Camera,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export interface BenefitCardItem {
  id?: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface InfluencerWhyCollaborateProps {
  title?: string;
  benefits?: BenefitCardItem[];
  className?: string;
}

const DEFAULT_BENEFITS: BenefitCardItem[] = [
  {
    id: "official-collaboration",
    icon: Users,
    title: "Official Collaboration",
    description:
      "Partner with a trusted spiritual organization with a global reach.",
  },
  {
    id: "event-invitations",
    icon: CalendarDays,
    title: "Event Invitations",
    description:
      "Get exclusive invitations to our festivals, events and programs.",
  },
  {
    id: "creator-recognition",
    icon: Camera,
    title: "Creator Recognition",
    description: "Featured on our website and social media channels.",
  },
  {
    id: "grow-together",
    icon: TrendingUp,
    title: "Grow Together",
    description: "Be part of a growing community of passionate creators.",
  },
];

export default function InfluencerWhyCollaborate({
  title = "WHY COLLABORATE WITH BHARAT BHAKTI SANGAM?",
  benefits = DEFAULT_BENEFITS,
  className,
}: InfluencerWhyCollaborateProps) {
  return (
    <section
      aria-labelledby="why-collaborate-heading"
      className={clsx(
        "relative w-full bg-[#FDFCF8] py-14 sm:py-16 md:py-20 lg:py-24",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header with decorative golden side lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          <div
            aria-hidden="true"
            className="h-px w-12 sm:w-16 md:w-24 lg:w-28 bg-linear-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]"
          />
          <h2
            id="why-collaborate-heading"
            className={clsx(
              playfair.className,
              "text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-heading",
            )}
          >
            {title}
          </h2>
          <div
            aria-hidden="true"
            className="h-px w-12 sm:w-16 md:w-24 lg:w-28 bg-linear-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]"
          />
        </div>

        {/* Responsive Grid of 4 Cards: 1 col on mobile, 2 cols on tablet, 4 cols at 1024px (lg) and up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 xl:gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id ?? idx}
                className="group relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-7 md:p-8 xl:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-neutral-100/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(63,6,5,0.06)] hover:border-[#D4AF37]/30"
              >
                {/* Circular Icon Pill with soft gold border & background */}
                <div
                  aria-hidden="true"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FCF8EC] border border-[#F3E6BA] flex items-center justify-center text-[#C99727] mb-5 sm:mb-6 transition-transform duration-300 group-hover:scale-108"
                >
                  <Icon
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#C99727]"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Card Title */}
                <h3
                  className={clsx(
                    playfair.className,
                    "text-lg sm:text-xl font-bold text-heading mb-2.5 sm:mb-3 leading-snug",
                  )}
                >
                  {benefit.title}
                </h3>

                {/* Card Description */}
                <p
                  className={clsx(
                    poppins.className,
                    "text-xs sm:text-sm text-para leading-relaxed font-normal max-w-62.5 mx-auto",
                  )}
                >
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
