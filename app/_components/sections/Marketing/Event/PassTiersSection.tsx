import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { Check, BookOpen, Star, ArrowUp, LucideIcon } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export type PassIconType =
  | "book"
  | "star"
  | "arrow"
  | LucideIcon
  | React.ReactNode;

export interface PassTierItem {
  id: string;
  passId?: string;
  name: string;
  subtitle: string;
  price: number;
  priceSuffix?: string;
  features: string[];
  isPopular?: boolean;
  icon?: PassIconType;
  ctaText?: string;
  bookingUrl?: string;
}

export interface PassTiersSectionProps {
  /** Optional custom section title, defaults to "CHOOSE YOUR PASS" */
  title?: string;
  /** List of passes. If not provided, uses standard fallback passes */
  passes?: PassTierItem[];
  /** Base URL for booking navigation (defaults to "/booking") */
  bookingBaseUrl?: string;
  /** Optional custom CSS classes */
  className?: string;
}

export const DEFAULT_EVENT_PASSES: PassTierItem[] = [
  {
    id: "standard-pass",
    name: "STANDARD PASS",
    subtitle: "General Entry",
    price: 499,
    priceSuffix: "/ Person",
    icon: "book",
    features: [
      "General Entry",
      "Common Seating",
      "Event Access",
      "Event Access",
    ],
  },
  {
    id: "premium-pass",
    name: "PREMIUM PASS",
    subtitle: "Better Experience",
    price: 999,
    priceSuffix: "/ Person",
    icon: "star",
    isPopular: true,
    features: [
      "Front Seating",
      "Faster Entry",
      "Better View of Stage",
      "Better View of Stage",
    ],
  },
  {
    id: "vip-pass",
    name: "VIP PASS",
    subtitle: "Premium Experience",
    price: 1999,
    priceSuffix: "/ Person",
    icon: "arrow",
    features: [
      "Reserved Seating",
      "Priority Entry",
      "Prasadam Kit",
      "VIP Support",
    ],
  },
];

function PassIconRenderer({ icon }: { icon?: PassIconType }) {
  if (!icon) {
    return (
      <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-[#E86A17] stroke-[1.75]" />
    );
  }

  if (React.isValidElement(icon)) {
    return icon;
  }

  const iconClass = "w-6 h-6 sm:w-7 sm:h-7 text-[#E86A17] stroke-[1.75]";

  if (icon === "book") {
    return <BookOpen className={iconClass} />;
  }
  if (icon === "star") {
    return <Star className={iconClass} />;
  }
  if (icon === "arrow") {
    return <ArrowUp className={iconClass} />;
  }

  if (typeof icon === "function" || typeof icon === "object") {
    const CustomIcon = icon as LucideIcon;
    return <CustomIcon className={iconClass} />;
  }

  return <BookOpen className={iconClass} />;
}

/**
 * Transforms raw API bookingType array/object into structured PassTierItem list
 */
export function mapEventBookingTypesToPasses(
  bookingTypeData?:
    | { _id?: string; name?: string; price?: number }
    | { _id?: string; name?: string; price?: number }[]
    | null,
): PassTierItem[] {
  if (!bookingTypeData) {
    return DEFAULT_EVENT_PASSES;
  }

  const list = Array.isArray(bookingTypeData)
    ? bookingTypeData
    : [bookingTypeData];
  const validList = list.filter(
    (item) => !!item && (item.name || item.price !== undefined),
  );

  if (validList.length === 0) {
    return DEFAULT_EVENT_PASSES;
  }

  // If the API returns only 1 booking type, use the default 3 tiers and update the first tier's price
  if (validList.length === 1) {
    const single = validList[0];
    return DEFAULT_EVENT_PASSES.map((pass, idx) => {
      if (idx === 0 && single.price !== undefined) {
        return {
          ...pass,
          passId: single._id,
          price: single.price,
          name: single.name?.toUpperCase() || pass.name,
        };
      }
      return pass;
    });
  }

  return validList.map((item, index) => {
    const name = item.name?.trim() || `Pass Tier ${index + 1}`;
    const lowerName = name.toLowerCase();
    const price = item.price ?? 0;

    // Intelligent default mapping for features and badge styling based on tier name
    let subtitle = "Event Access";
    let icon: PassIconType = "book";
    let isPopular = false;
    let features: string[] = [
      "General Entry",
      "Common Seating",
      "Event Access",
      "Event Access",
    ];

    // Default middle item or second tier as popular highlight if 3 items
    const isMiddleItem = validList.length === 3 ? index === 1 : index === 1;

    if (lowerName.includes("vip") || lowerName.includes("vvip")) {
      subtitle = "Premium Experience";
      icon = "arrow";
      isPopular = isMiddleItem;
      features = [
        "Reserved Seating",
        "Priority Entry",
        "Prasadam Kit",
        "VIP Support",
      ];
    } else if (
      lowerName.includes("premium") ||
      lowerName.includes("gold") ||
      lowerName.includes("silver")
    ) {
      subtitle = "Better Experience";
      icon = "star";
      isPopular = true;
      features = [
        "Front Seating",
        "Faster Entry",
        "Better View of Stage",
        "Better View of Stage",
      ];
    } else {
      subtitle = "General Entry";
      icon = "book";
      isPopular = isMiddleItem;
      features = [
        "General Entry",
        "Common Seating",
        "Event Access",
        "Event Access",
      ];
    }

    return {
      id: item._id || `pass-tier-${index}-${name.toLowerCase().replace(/\s+/g, "-")}`,
      passId: item._id,
      name: name.toUpperCase(),
      subtitle,
      price,
      priceSuffix: "/ Person",
      icon,
      isPopular,
      features,
    };
  });
}

export default function PassTiersSection({
  title = "CHOOSE YOUR PASS",
  passes,
  bookingBaseUrl = "/booking",
  className,
}: PassTiersSectionProps) {
  const displayPasses =
    passes && passes.length > 0 ? passes : DEFAULT_EVENT_PASSES;

  return (
    <section
      aria-labelledby="choose-your-pass-heading"
      className={clsx(
        "w-full py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] bg-[#FCFAF5]",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Section Header with decorative golden dash markers */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 select-none">
          <span
            aria-hidden="true"
            className="flex items-center gap-1 text-[#E86A17] font-semibold text-sm sm:text-base tracking-widest"
          >
            &#8212; &#9646; &#8212;
          </span>

          <h2
            id="choose-your-pass-heading"
            className={clsx(
              playfair.className,
              "text-[clamp(1.5rem,calc(1.143rem+1.786vw),2.5rem)] font-bold text-[#5A120E] tracking-[0.15em] sm:tracking-[0.2em] text-center uppercase leading-none",
            )}
          >
            {title}
          </h2>

          <span
            aria-hidden="true"
            className="flex items-center gap-1 text-[#E86A17] font-semibold text-sm sm:text-base tracking-widest"
          >
            &#8212; &#9646; &#8212;
          </span>
        </div>

        {/* Dynamic Pass Grid: 1 col on mobile, 2 col on tablet, 3 col on 1024px (lg) */}
        <div
          className={clsx(
            "grid gap-6 lg:gap-7 xl:gap-8 items-stretch justify-items-center",
            displayPasses.length === 1 && "grid-cols-1 max-w-md mx-auto",
            displayPasses.length === 2 &&
              "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto",
            displayPasses.length >= 3 &&
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {displayPasses.map((pass) => {
            const queryParam = pass.passId
              ? `passId=${encodeURIComponent(pass.passId)}`
              : `pass=${encodeURIComponent(pass.name)}`;
            const passBookingHref =
              pass.bookingUrl || `${bookingBaseUrl}?${queryParam}`;

            return (
              <Link
                key={pass.id}
                href={passBookingHref}
                aria-label={`Book ${pass.name} for ₹${pass.price}`}
                className={clsx(
                  "group block w-full max-w-[24rem] lg:max-w-none text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl",
                )}
              >
                <div
                  className={clsx(
                    "h-full w-full flex flex-col justify-between rounded-2xl bg-white transition-all duration-300",
                    "p-6 sm:p-7 lg:p-7 xl:p-8 relative",
                    pass.isPopular
                      ? "border-2 border-[#FDBA74] shadow-[0_10px_30px_rgba(234,88,12,0.12)] ring-1 ring-[#FDBA74]/60 group-hover:shadow-[0_16px_40px_rgba(234,88,12,0.2)] group-hover:-translate-y-1"
                      : "border border-[#E5E7EB] shadow-sm hover:shadow-md group-hover:shadow-lg group-hover:border-gray-300 group-hover:-translate-y-1",
                  )}
                >
                  <div>
                    {/* Top Row: Icon Circle + Titles & Pricing */}
                    <div className="flex items-center gap-4">
                      {/* Circle badge with soft peach tinted background */}
                      <div className="shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFF7ED] transition-transform duration-300 group-hover:scale-105">
                        <PassIconRenderer icon={pass.icon} />
                      </div>

                      {/* Pass Title, Subtitle, Price */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className={clsx(
                            poppins.className,
                            "text-[0.938rem] sm:text-[1.063rem] font-bold text-[#740E0A] tracking-wider uppercase leading-snug",
                          )}
                        >
                          {pass.name}
                        </h3>

                        <p
                          className={clsx(
                            poppins.className,
                            "text-xs sm:text-[0.813rem] text-[#6B7280] font-normal mt-0.5 leading-tight",
                          )}
                        >
                          {pass.subtitle}
                        </p>

                        {/* Pricing Display */}
                        <div className="mt-1.5 flex items-baseline gap-1">
                          <span
                            className={clsx(
                              playfair.className,
                              "text-2xl sm:text-[1.875rem] font-extrabold text-[#1F2937] leading-none",
                            )}
                          >
                            ₹{pass.price}
                          </span>
                          {pass.priceSuffix && (
                            <span
                              className={clsx(
                                poppins.className,
                                "text-[0.688rem] sm:text-xs text-[#9CA3AF] font-normal",
                              )}
                            >
                              {pass.priceSuffix}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Feature List with Orange Tick checkmarks */}
                    <div className="mt-7 sm:mt-8 space-y-3 sm:space-y-3.5">
                      {pass.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check
                            aria-hidden="true"
                            className="w-4 h-4 text-[#E86A17] shrink-0 mt-0.5 stroke-[2.5]"
                          />
                          <span
                            className={clsx(
                              poppins.className,
                              "text-xs sm:text-[0.813rem] text-[#4B5563] font-medium leading-relaxed",
                            )}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call-To-Action Button - Styled exactly like Secondary CTAButton */}
                  <div className="mt-8 sm:mt-9">
                    <div
                      className={clsx(
                        poppins.className,
                        "w-full inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-5 rounded-xl font-medium",
                        "text-primary border-2 border-primary bg-transparent text-xs sm:text-sm tracking-wider uppercase",
                        "transition-all duration-200 group-hover:bg-primary group-hover:text-white active:scale-95",
                      )}
                    >
                      <span>{pass.ctaText || "BOOK NOW"}</span>
                      <span
                        aria-hidden="true"
                        className="text-xs transition-transform duration-200 group-hover:translate-x-1"
                      >
                        &gt;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
