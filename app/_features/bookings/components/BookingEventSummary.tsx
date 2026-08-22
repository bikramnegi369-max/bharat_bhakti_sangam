import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { BookingStepBadge } from "./BookingStepBadge";
import { poppins } from "@/_lib/fonts";
import clsx from "clsx";

interface BookingEventSummaryProps {
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation: string;
  eventAddress?: string;
  heroImage: string;
  eventSlugOrUrl?: string;
}

export function BookingEventSummary({
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventAddress,
  heroImage,
  eventSlugOrUrl = "/event",
}: BookingEventSummaryProps) {
  const fullAddress = [eventLocation, eventAddress].filter(Boolean).join(", ");

  return (
    <section aria-labelledby="step-event-summary" className="w-full space-y-4">
      <BookingStepBadge step="01" title="EVENT SUMMARY" />

      <div className="w-full bg-[#FCFAF5] border border-[#F3E5CA] rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          {/* Event Thumbnail */}
          <div className="md:col-span-5 relative w-full h-48 sm:h-52 md:h-44 lg:h-48 rounded-xl overflow-hidden shadow-inner bg-stone-100">
            <Image
              src={heroImage || "/event.webp"}
              alt={eventTitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>

          {/* Event Metadata Info */}
          <div
            className={clsx(
              poppins.className,
              "md:col-span-7 flex flex-col justify-between space-y-3.5",
            )}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#3F0605] leading-snug">
              {eventTitle}
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-[#4B5563]">
              {eventDate && (
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#740E0A] shrink-0" />
                  <span>{eventDate}</span>
                </div>
              )}

              {eventTime && (
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#740E0A] shrink-0" />
                  <span>{eventTime}</span>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#740E0A] shrink-0 mt-0.5" />
                <span className="leading-snug">{fullAddress || "Bharat Mandapam, New Delhi"}</span>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href={eventSlugOrUrl}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#E86A17] hover:text-[#C2410C] transition-colors group"
              >
                <span>View Event Details</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
