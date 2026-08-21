import React from "react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";

export interface EventInfoCardProps {
  date?: {
    primaryText: string;
    subText?: string;
  };
  time?: {
    primaryText: string;
    subText?: string;
  };
  venue?: {
    primaryText: string;
    subText?: string;
  };
  duration?: {
    primaryText: string;
    subText?: string;
  };
  className?: string;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  primaryText: string;
  subText?: string;
}

function InfoItem({ icon, label, primaryText, subText }: InfoItemProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4 min-w-0">
      {/* Icon with warm brand amber/orange styling */}
      <div className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EA580C]/10 text-[#EA580C]">
        {icon}
      </div>

      {/* Text Details */}
      <div className="flex flex-col min-w-0 justify-center">
        {/* Label: 10-11px uppercase bold tracking */}
        <span
          className={clsx(
            poppins.className,
            "text-[0.688rem] sm:text-[0.75rem] font-bold tracking-[0.12em] text-[#6B7280] uppercase leading-none mb-1",
          )}
        >
          {label}
        </span>

        {/* Primary Value: Playfair font bold with natural wrapping */}
        <h3
          className={clsx(
            playfair.className,
            "text-base sm:text-lg md:text-[1.188rem] lg:text-[1.125rem] xl:text-[1.25rem] font-bold text-[#1F2937] leading-snug wrap-break-word",
          )}
        >
          {primaryText}
        </h3>

        {/* Subtitle / Context: Poppins font light text */}
        {subText && (
          <p
            className={clsx(
              poppins.className,
              "text-xs sm:text-[0.813rem] text-[#6B7280] font-normal mt-0.5 leading-snug wrap-break-word",
            )}
          >
            {subText}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EventQuickInfoBar({
  date = {
    primaryText: "22 Aug 2026",
    subText: "Saturday",
  },
  time = {
    primaryText: "6:00 PM",
    subText: "Onwards",
  },
  venue = {
    primaryText: "Dublin Square,",
    subText: "Ahmedabad, Gujarat",
  },
  duration = {
    primaryText: "4 Hours",
    subText: "(Approx.)",
  },
  className,
}: EventInfoCardProps) {
  return (
    <div
      className={clsx(
        "relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12",
        className,
      )}
    >
      <div
        className={clsx(
          "w-full bg-white rounded-2xl md:rounded-3xl",
          "border border-black/6",
          "shadow-[0_20px_45px_-15px_rgba(0,0,0,0.08),0_0_1px_1px_rgba(0,0,0,0.02)]",
          "px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-6.5 lg:px-10 lg:py-7",
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-y-6 sm:gap-x-8 lg:gap-6 xl:gap-8",
          "items-center",
        )}
      >
        {/* Item 1: DATE */}
        <div className="relative">
          <InfoItem
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                aria-hidden="true"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
              </svg>
            }
            label="DATE"
            primaryText={date.primaryText}
            subText={date.subText}
          />
          {/* Divider visible only on LG screens (1024px+) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -right-3 xl:-right-4 top-1/2 -translate-y-1/2 w-px h-10 bg-black/10"
          />
        </div>

        {/* Item 2: TIME */}
        <div className="relative">
          <InfoItem
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
            label="TIME"
            primaryText={time.primaryText}
            subText={time.subText}
          />
          {/* Divider visible only on LG screens (1024px+) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -right-3 xl:-right-4 top-1/2 -translate-y-1/2 w-px h-10 bg-black/10"
          />
        </div>

        {/* Item 3: VENUE */}
        <div className="relative">
          <InfoItem
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                aria-hidden="true"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
            label="VENUE"
            primaryText={venue.primaryText}
            subText={venue.subText}
          />
          {/* Divider visible only on LG screens (1024px+) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -right-3 xl:-right-4 top-1/2 -translate-y-1/2 w-px h-10 bg-black/10"
          />
        </div>

        {/* Item 4: DURATION */}
        <div className="relative">
          <InfoItem
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 6v6l4 2" />
                <path d="M22 2l-3 3" />
              </svg>
            }
            label="DURATION"
            primaryText={duration.primaryText}
            subText={duration.subText}
          />
        </div>
      </div>
    </div>
  );
}
