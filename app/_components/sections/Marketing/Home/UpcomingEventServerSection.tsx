import { Suspense } from "react";
import { getLatestEvent } from "@/_features/event/services/event.service";
import UpcomingEventSection from "./UpcomingEventSection";
import {
  getEventDisplayDate,
  getEventImage,
  getEventVenueAddress,
  getEventVenueName,
} from "@/_lib/helpers";
import Link from "next/link";
import { Sparkles, Bell } from "lucide-react";
import { playfair } from "@/_lib/fonts";

/**
 * Modern Sleek Shimmer Skeleton matching the exact dark crimson split-card theme
 */
function UpcomingEventSkeleton() {
  return (
    <section className="relative overflow-hidden py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] bg-[#FAF8F5]">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 sm:w-250 h-87.5 bg-[radial-gradient(ellipse_at_center,rgba(116,14,10,0.1)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Main Event Card Skeleton matching exact container */}
        <div className="overflow-hidden rounded-3xl lg:rounded-[2.5rem] bg-[#3B1214] border border-[#5A1C1E]/50 shadow-[0_25px_60px_-15px_rgba(46,4,3,0.35)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-120">
            {/* Left Column: Visual Concert Placeholder */}
            <div className="relative lg:col-span-6 min-h-75 sm:min-h-95 lg:min-h-130 w-full bg-[#240607]/80 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10" />
            </div>

            {/* Right Column: Content Skeleton */}
            <div className="relative lg:col-span-6 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Eyebrow */}
                <div className="h-3.5 w-28 bg-white/20 rounded-full animate-pulse" />

                {/* Title */}
                <div className="space-y-2">
                  <div className="h-7 sm:h-9 w-4/5 bg-white/30 rounded-xl animate-pulse" />
                  <div className="h-7 sm:h-9 w-2/3 bg-white/20 rounded-xl animate-pulse" />
                </div>

                {/* Meta Pins */}
                <div className="space-y-2.5 pt-2">
                  <div className="h-4 w-3/5 bg-white/15 rounded-lg animate-pulse" />
                  <div className="h-4 w-2/5 bg-white/15 rounded-lg animate-pulse" />
                </div>

                {/* Capacity Progress bar skeleton */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <div className="h-3.5 w-24 bg-white/20 rounded-sm animate-pulse" />
                    <div className="h-3.5 w-16 bg-white/20 rounded-sm animate-pulse" />
                  </div>
                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-white/30 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Bottom: Countdown Boxes & CTA Button */}
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-16 sm:h-20 rounded-xl sm:rounded-2xl bg-black/30 border border-white/10 flex flex-col items-center justify-center gap-1.5 animate-pulse"
                    >
                      <div className="h-6 w-8 bg-white/30 rounded-sm" />
                      <div className="h-2.5 w-6 bg-white/15 rounded-sm" />
                    </div>
                  ))}
                </div>

                {/* CTA Button Skeleton */}
                <div className="h-12 sm:h-14 w-full rounded-xl sm:rounded-2xl bg-[#EC5A05]/40 border border-[#EC5A05]/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import ScrollReveal from "@/_components/common/ScrollReveal";

/**
 * Premium Dark Crimson Announcement Banner matching the exact visual weight and aesthetic of UpcomingEventSection
 */
function NoActiveEventFallback() {
  return (
    <section className="relative overflow-hidden py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] bg-[#FAF8F5]">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 sm:w-250 h-87.5 bg-[radial-gradient(ellipse_at_center,rgba(116,14,10,0.1)_0%,transparent_70%)] blur-3xl animate-glow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="overflow-hidden rounded-3xl lg:rounded-[2.5rem] bg-[#3B1214] text-white shadow-[0_25px_60px_-15px_rgba(46,4,3,0.35)] border border-[#5A1C1E]/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-120 items-stretch">
            {/* Left Column: Atmospheric Temple / Stage Visual with Sacred Overlay */}
            <ScrollReveal
              animation="fade-right"
              duration={900}
              threshold={0.12}
              className="relative lg:col-span-5 min-h-64 sm:min-h-80 lg:min-h-full w-full overflow-hidden bg-[#240607]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: "url('/event.webp')" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#3B1214] via-[#3B1214]/60 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-[#3B1214]/40 lg:to-[#3B1214]" />

              {/* Floating Badge on Visual */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-amber-200 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#E86A17] animate-pulse" />
                  <span>Next Gathering in Preparation</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: High-Grade Editorial & VIP Access Notice */}
            <ScrollReveal
              animation="fade-left"
              delay={100}
              duration={900}
              threshold={0.12}
              className="relative lg:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between space-y-6"
            >
              <div>
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-white/70 uppercase mb-3">
                  BHARAT BHAKTI SANGAM • LIVE EXPERIENCE
                </p>

                <h2
                  className={`${playfair.className} text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white mb-4`}
                >
                  Stay Tuned for Our Next Sacred Gathering
                </h2>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl mb-6">
                  Our team is curating the next transcendental evening of
                  youth-led bhajans, collective kirtans, and divine ecstasy.
                  Join thousands of devotees in our sacred journey.
                </p>

                {/* Information Highlight Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 text-left">
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block mb-1">
                      ✦ First-Access Passes
                    </span>
                    <p className="text-xs text-white/70 leading-snug">
                      Subscribers receive early booking links 24 hours before
                      public drop.
                    </p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 text-left">
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block mb-1">
                      ✦ Vedic Almanac
                    </span>
                    <p className="text-xs text-white/70 leading-snug">
                      Explore ongoing festivals, auspicious tithis, and
                      muhurats.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#newsletter"
                  className="flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#EC5A05] hover:bg-[#D95D0D] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notify Me for Passes</span>
                </a>

                <Link
                  href="/calendar"
                  className="flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <span>Explore Spiritual Calendar</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Isolated Async Server Component: Fetches event data.
 * If no event is returned or if the API is offline, renders the graceful announcement card without mock data.
 */
async function UpcomingEventFetcher() {
  let event = null;

  try {
    const fetched = await getLatestEvent();
    if (fetched && fetched.isActive !== false) {
      event = fetched;
    }
  } catch (error) {
    console.warn(
      "[UpcomingEventServerSection] Event API unreachable or no active event. Rendering announcement banner.",
      error instanceof Error ? error.message : error,
    );
  }

  if (!event) {
    return <NoActiveEventFallback />;
  }

  return (
    <UpcomingEventSection
      eventName={event.eventName}
      venueName={getEventVenueName(event) || ""}
      venueAddress={getEventVenueAddress(event) || ""}
      eventDate={getEventDisplayDate(event) || ""}
      eventTime={event.time ? `${event.time} Onwards` : undefined}
      targetIsoDate={event.date}
      imageSrc={getEventImage(event)}
      maxSeats={event.maxSeats}
      bookedSeats={event.bookedSeats}
      availableTickets={event.availableTickets}
      ctaHref="/booking"
      ctaText="Book Your Seat Now"
    />
  );
}

/**
 * Production-grade Island Component with React Suspense Boundary
 */
export default function UpcomingEventServerSection() {
  return (
    <Suspense fallback={<UpcomingEventSkeleton />}>
      <UpcomingEventFetcher />
    </Suspense>
  );
}
