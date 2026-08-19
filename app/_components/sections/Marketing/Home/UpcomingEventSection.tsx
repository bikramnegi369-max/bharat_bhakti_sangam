"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { MapPin, CalendarDays, Ticket } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export interface UpcomingEventSectionProps {
  eventName?: string;
  categoryLabel?: string;
  venueName?: string;
  venueAddress?: string;
  eventDate?: string;
  eventTime?: string;
  targetIsoDate?: string;
  imageSrc?: string;
  maxSeats?: number;
  bookedSeats?: number;
  availableTickets?: number;
  ctaHref?: string;
  ctaText?: string;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(targetDateStr?: string): TimeRemaining {
  if (!targetDateStr) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };
  }

  const target = new Date(targetDateStr).getTime();
  if (isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };
  }

  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export default function UpcomingEventSection({
  eventName = "Bharat Bhakti Sangam 2026",
  categoryLabel = "UPCOMING EVENT",
  venueName,
  venueAddress = "Club Park, Block E, Gurugram, Haryana",
  eventDate = "14 June 2026",
  eventTime = "6:00 PM Onwards",
  targetIsoDate,
  imageSrc = "/event.webp",
  maxSeats,
  bookedSeats,
  availableTickets,
  ctaHref = "/booking",
  ctaText = "Book Your Seat Now",
  className,
}: UpcomingEventSectionProps) {
  // Determine effective countdown target timestamp
  const countdownTarget =
    targetIsoDate ||
    (eventDate ? `${eventDate} 18:00:00` : new Date().toISOString());

  // Initialize timeLeft dynamically or fallback to zeros/defaults
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(countdownTarget),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(countdownTarget));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTarget]);

  // Dynamic capacity & seat calculations
  const total = maxSeats && maxSeats > 0 ? maxSeats : 500;
  const booked =
    typeof bookedSeats === "number" && bookedSeats >= 0
      ? bookedSeats
      : Math.round(total * 0.85);
  const remaining =
    typeof availableTickets === "number" && availableTickets >= 0
      ? availableTickets
      : Math.max(0, total - booked);

  const fillPercentage = Math.min(
    100,
    Math.max(0, Math.round((booked / total) * 100)),
  );

  const formattedDateTime = eventTime
    ? `${eventDate} | ${eventTime}`
    : eventDate;

  const displayVenue = venueName
    ? venueAddress && venueAddress !== venueName
      ? `${venueName}, ${venueAddress}`
      : venueName
    : venueAddress;

  return (
    <section
      aria-labelledby="upcoming-event-title"
      className={clsx(
        "relative overflow-hidden py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]",
        className,
      )}
    >
      {/* Ambient background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 sm:w-250 h-87.5 bg-[radial-gradient(ellipse_at_center,rgba(116,14,10,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Main Event Showcase Banner Card */}
        <div className="overflow-hidden rounded-3xl lg:rounded-[2.5rem] bg-[#3B1214] text-white shadow-[0_25px_60px_-15px_rgba(46,4,3,0.35)] border border-[#5A1C1E]/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-120">
            {/* Left Column: Visual Concert / Stage Image */}
            <div className="relative lg:col-span-6 min-h-75 sm:min-h-95 lg:min-h-130 w-full overflow-hidden bg-[#240607]">
              <Image
                src={imageSrc}
                alt={eventName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle gradient transitions into the right panel */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-[#3B1214]/80 via-transparent to-black/20 lg:bg-linear-to-r lg:from-transparent lg:via-[#3B1214]/10 lg:to-[#3B1214]"
              />
            </div>

            {/* Right Column: Event Details, Progress & Countdown */}
            <div className="relative lg:col-span-6 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between">
              <div>
                {/* Category Eyebrow */}
                <p
                  className={clsx(
                    poppins.className,
                    "text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-white/70 uppercase mb-3 sm:mb-4",
                  )}
                >
                  {categoryLabel}
                </p>

                {/* Event Name */}
                <h2
                  id="upcoming-event-title"
                  className={clsx(
                    playfair.className,
                    "text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.15] text-white mb-5 sm:mb-6",
                  )}
                >
                  {eventName}
                </h2>

                {/* Venue & Time Meta */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-white/85">
                  {displayVenue && (
                    <div className="flex items-start gap-2.5 sm:gap-3 text-[13px] sm:text-[15px] font-normal leading-snug">
                      <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gold shrink-0 mt-0.5" />
                      <span>{displayVenue}</span>
                    </div>
                  )}

                  {formattedDateTime && (
                    <div className="flex items-center gap-2.5 sm:gap-3 text-[13px] sm:text-[15px] font-normal">
                      <CalendarDays className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gold shrink-0" />
                      <span>{formattedDateTime}</span>
                    </div>
                  )}
                </div>

                {/* Seats Left & Progress Bar */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-medium mb-2.5">
                    <span className="text-white font-semibold">
                      Only {remaining} Seats Left
                    </span>
                    <span className="text-white/70">
                      {fillPercentage}% Filled
                    </span>
                  </div>

                  <div className="h-2 sm:h-2.5 w-full bg-white/20 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section: Countdown Timer + CTA Button */}
              <div>
                {/* 4 Box Countdown */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3.5 mb-6 sm:mb-8">
                  {[
                    {
                      label: "Days",
                      value: padZero(timeLeft.days),
                    },
                    {
                      label: "Hours",
                      value: padZero(timeLeft.hours),
                    },
                    {
                      label: "Mins",
                      value: padZero(timeLeft.minutes),
                    },
                    {
                      label: "Secs",
                      value: padZero(timeLeft.seconds),
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-1 sm:px-2 rounded-xl sm:rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 text-center shadow-inner"
                    >
                      <span
                        className={clsx(
                          poppins.className,
                          "text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight",
                        )}
                      >
                        {item.value}
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60 font-medium tracking-wide uppercase mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Interactive CTA Button */}
                <Link
                  href={ctaHref}
                  className="group relative flex items-center justify-center gap-2.5 w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-[#E86A17] hover:bg-[#D95D0D] active:scale-[0.98] text-white font-semibold text-[15px] sm:text-base shadow-[0_10px_25px_-5px_rgba(232,106,23,0.5)] transition-all duration-200 cursor-pointer"
                >
                  <Ticket className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span>{ctaText}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
