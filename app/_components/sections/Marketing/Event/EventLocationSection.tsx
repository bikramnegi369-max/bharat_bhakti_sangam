import React from "react";
import clsx from "clsx";
import { Navigation, Compass, MapPin } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

export interface EventVenueData {
  _id?: string;
  venue?: string;
  address?: string;
}

export interface EventLocationSectionProps {
  /** Eyebrow text above the main title */
  eyebrow?: string;
  /** Section heading title */
  title?: string;
  /** Description below subtitle */
  description?: string;
  /** Venue data object from event API */
  venue?: EventVenueData | string;
  /** Arrival guidance note */
  arrivalNote?: string;
  /** Custom Google Maps URL for direct navigation */
  directionsUrl?: string;
  /** Custom Google Maps Embed URL (if custom iframe src is desired) */
  embedUrl?: string;
  /** Optional container class name */
  className?: string;
}

/**
 * Helper to extract clean venue title
 */
function extractVenueName(venue?: EventVenueData | string): string {
  if (!venue) return "Bharat Bhakti Sangam Venue";
  if (typeof venue === "string") return venue.trim() || "Bharat Bhakti Sangam Venue";
  return venue.venue?.trim() || "Bharat Bhakti Sangam Venue";
}

/**
 * Helper to extract clean venue address
 */
function extractVenueAddress(venue?: EventVenueData | string): string | undefined {
  if (!venue || typeof venue === "string") return undefined;
  return venue.address?.trim() || undefined;
}

/**
 * Constructs a production-ready Google Maps navigation search link
 */
function buildGoogleMapsUrl(
  venueName: string,
  venueAddress?: string,
  explicitUrl?: string,
): string {
  if (explicitUrl && explicitUrl.trim()) {
    return explicitUrl.trim();
  }
  const query = [venueName, venueAddress].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query || "Bharat Bhakti Sangam")}`;
}

/**
 * Constructs a secure, free-tier embed URL for Google Maps iframe without requiring an API key
 */
function buildGoogleMapsEmbedUrl(
  venueName: string,
  venueAddress?: string,
  explicitEmbedUrl?: string,
): string {
  if (explicitEmbedUrl && explicitEmbedUrl.trim()) {
    return explicitEmbedUrl.trim();
  }
  const query = [venueName, venueAddress].filter(Boolean).join(", ");
  return `https://maps.google.com/maps?q=${encodeURIComponent(query || "Bharat Bhakti Sangam")}&t=m&z=15&output=embed&iwloc=near`;
}

export default function EventLocationSection({
  eyebrow = "FIND US ON GOOGLE MAPS",
  title = "EVENT LOCATION",
  description = "A clear pinned location for smooth arrival, parking, handoff, and quick turn-by-turn directions to the gathering.",
  venue,
  arrivalNote = "Open the map before you leave for the most accurate route.",
  directionsUrl,
  embedUrl,
  className,
}: EventLocationSectionProps) {
  const venueName = extractVenueName(venue);
  const venueAddress = extractVenueAddress(venue);
  const mapHref = buildGoogleMapsUrl(venueName, venueAddress, directionsUrl);
  const mapEmbedSrc = buildGoogleMapsEmbedUrl(venueName, venueAddress, embedUrl);

  return (
    <section
      aria-labelledby="event-location-heading"
      className={clsx(
        "relative w-full overflow-hidden bg-[#FEF7E9] border-y border-[#D48D281A] py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Location Details & CTA */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Header: Pin Icon + Title */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
              <span
                className="inline-flex items-center justify-center text-primary"
                aria-hidden="true"
              >
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
              </span>
              <h2
                id="event-location-heading"
                className={clsx(
                  playfair.className,
                  "text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold tracking-wider text-heading uppercase leading-tight",
                )}
              >
                {title}
              </h2>
            </div>

            {/* Subtitle / Eyebrow */}
            <p
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm font-semibold tracking-widest text-[#852317] uppercase mb-4",
              )}
            >
              {eyebrow}
            </p>

            {/* Explanatory Description */}
            <p
              className={clsx(
                poppins.className,
                "text-para-secondary text-sm sm:text-base leading-relaxed max-w-xl mb-8",
              )}
            >
              {description}
            </p>

            {/* Venue & Arrival Info Cards */}
            <div className="space-y-6 mb-8 max-w-xl">
              {/* Venue Item */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span
                  className="mt-0.5 inline-flex items-center justify-center text-primary shrink-0"
                  aria-hidden="true"
                >
                  <MapPin className="w-5 h-5 stroke-[1.8]" />
                </span>
                <div className="flex flex-col">
                  <span
                    className={clsx(
                      poppins.className,
                      "text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#6B2117]",
                    )}
                  >
                    VENUE
                  </span>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-heading font-bold text-sm sm:text-base leading-snug mt-0.5",
                    )}
                  >
                    {venueName}
                  </p>
                  {venueAddress && (
                    <p
                      className={clsx(
                        poppins.className,
                        "text-para-secondary text-xs sm:text-sm mt-1 leading-relaxed",
                      )}
                    >
                      {venueAddress}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrival / Route Item */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <span
                  className="mt-0.5 inline-flex items-center justify-center text-primary shrink-0"
                  aria-hidden="true"
                >
                  <Compass className="w-5 h-5 stroke-[1.8]" />
                </span>
                <div className="flex flex-col">
                  <span
                    className={clsx(
                      poppins.className,
                      "text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#6B2117]",
                    )}
                  >
                    ARRIVAL
                  </span>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-para-secondary text-xs sm:text-sm leading-relaxed mt-0.5",
                    )}
                  >
                    {arrivalNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div>
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${venueName} on Google Maps`}
                className={clsx(
                  poppins.className,
                  "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl",
                  "bg-[#6B1410] hover:bg-[#520e0b] text-white font-medium text-sm sm:text-base",
                  "shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                )}
              >
                <Navigation className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Actual Live Google Map Embed */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-xl border border-[#D48D281A] bg-white">
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full">
                <iframe
                  title={`Google Maps Location for ${venueName}`}
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
