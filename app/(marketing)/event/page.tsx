import dynamic from "next/dynamic";
import type { Metadata } from "next";
import AboutEventSection from "@/_components/sections/Marketing/Event/AboutEventSection";
import PassTiersSection, {
  mapEventBookingTypesToPasses,
} from "@/_components/sections/Marketing/Event/PassTiersSection";
import EventLocationSection from "@/_components/sections/Marketing/Event/EventLocationSection";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import EventHeroSection from "@/_components/sections/Marketing/Event/EventHeroSection";
import EventQuickInfoBar from "@/_components/sections/Marketing/Event/EventQuickInfoBar";
import ScrollReveal from "@/_components/common/ScrollReveal";
// Below-the-fold interactive client carousels/modals (dynamically split to reduce initial JS)
const AboutArtistsSliderSection = dynamic(
  () =>
    import(
      "@/_components/sections/Marketing/Event/AboutArtistsSliderSection"
    ),
  { loading: () => null },
);
const EventGallerySliderSection = dynamic(
  () =>
    import(
      "@/_components/sections/Marketing/Event/EventGallerySliderSection"
    ),
  { loading: () => null },
);
const PreviousEventHighlightsSection = dynamic(
  () =>
    import(
      "@/_components/sections/Marketing/Event/PreviousEventHighlightsSection"
    ),
  { loading: () => null },
);

import { getSeoKeywords, getSeoPageConfig } from "@/_config/Seo.config";
import {
  calculateEventDuration,
  formatEventTimeDisplay,
  getEventDescription,
  getEventDisplayDate,
  getEventImage,
  getEventVenueAddress,
  getEventVenueName,
  getOgImageUrl,
} from "@/_lib/helpers";
import {
  createPageMetadata,
  createPageMetadataFromConfig,
  jsonLdScript,
} from "@/_lib/seo";
import { getLatestEvent } from "@/_features/event/services/event.service";
import { DEFAULT_FALLBACK_EVENT } from "@/_config/Event.config";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const event = await getLatestEvent();
    const description = getEventDescription(event);
    const seoPage = getSeoPageConfig("event");

    return createPageMetadata({
      title: `${event.eventName} | Bharat Bhakti Sangam`,
      description,
      path: "/event",
      image: getOgImageUrl(event),
      ogKey: `${event._id}-${event.updatedAt ?? ""}`,
      keywords: getSeoKeywords("event", [
        event.eventName.toLowerCase(),
        ...(event.hashTags || []).map((t) => t.replace("#", "")),
      ]),
    });
  } catch {
    return createPageMetadataFromConfig("event");
  }
}

export default async function EventPage() {
  let event = null;

  try {
    const fetchedEvent = await getLatestEvent();
    if (fetchedEvent && fetchedEvent.isActive !== false) {
      event = fetchedEvent;
    }
  } catch (error) {
    console.warn(
      "[EventPage] Backend event API unreachable or no active event scheduled.",
      error instanceof Error ? error.message : error,
    );
  }

  if (!event) {
    return (
      <EventUnavailable
        title="Next Event in Preparation"
        message="We are currently organizing our next Bhajan Clubbing and Kirtan gathering. Please check back soon or explore our spiritual calendar."
      />
    );
  }

  const description = getEventDescription(event);
  const eventDate = getEventDisplayDate(event);
  const image = getEventImage(event);

  // Format date parts for Quick Info Bar
  const parsedEventDate = new Date(event.date);
  const hasValidDate = !Number.isNaN(parsedEventDate.getTime());
  const datePrimary = hasValidDate
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(parsedEventDate)
    : (eventDate ?? "Upcoming");
  const dateSub = hasValidDate
    ? new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        timeZone: "Asia/Kolkata",
      }).format(parsedEventDate)
    : undefined;

  const venuePrimary = getEventVenueName(event);
  const venueSub = getEventVenueAddress(event);

  // Calculate dynamic start + end time display (e.g., "5:00 PM - 10:00 PM")
  const timeDisplay = formatEventTimeDisplay(event);

  // Calculate dynamic duration from event details
  const duration = calculateEventDuration(event);
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Bharat Bhakti Sangam Spiritual Satsang & Bhajan Event",

    startDate: "2026-06-10T06:00:00+05:30",
    endDate: "2026-06-10T09:00:00+05:30",

    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",

    url: "https://www.bharatbhaktisangam.com/",

    image: [event.ogImage],

    description:
      "Join Bharat Bhakti Sangam for a divine spiritual satsang, bhajan, kirtan and भक्तिमय कार्यक्रम open for all devotees. Experience devotional music, spiritual discourse and collective bhakti.",

    location: {
      "@type": "Place",
      name: "Bharat Bhakti Sangam",
      address: {
        "@type":
          "Club Park | E Block Club Park, Vatika India Next Sec-82, Gurugram - 122012",
        streetAddress: "Club Park | E Block",
        addressLocality: "Gurugram",
        addressRegion: "Haryana",
        postalCode: "122012",
        addressCountry: "IN",
      },
    },

    organizer: {
      "@type": "Organization",
      name: "Bharat Bhakti Sangam",
      url: "https://www.bharatbhaktisangam.com",
    },

    offers: {
      "@type": "Offer",
      url: "https://www.bharatbhaktisangam.com/",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-05-18T00:00:00+05:30",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(eventJsonLd)}
      />

      {/* 1. Hero Section: Critical above-the-fold component rendered directly for optimal LCP */}
      <EventHeroSection
        title={event.eventName}
        ctaLabel="Book Your Pass Now"
        ctaHref="/booking"
        backgroundImage={image ?? "/event.webp"}
      />

      {/* 2. Floating Quick Info Bar: Subtle fade-up elevation effect with threshold */}
      <div className="-mt-6 sm:-mt-10 lg:mt-0 lg:-translate-y-1/2 relative z-20">
        <ScrollReveal animation="fade-up" duration={700} delay={100} threshold={0.1}>
          <EventQuickInfoBar
            date={{
              primaryText: datePrimary,
              subText: dateSub,
            }}
            time={timeDisplay}
            venue={{
              primaryText: venuePrimary.endsWith(",")
                ? venuePrimary
                : `${venuePrimary},`,
              subText: venueSub,
            }}
            duration={duration}
          />
        </ScrollReveal>
      </div>

      {/* 3. About Event: Internal 2-column layout-matched animations (text fade-right + image scale-up) */}
      <AboutEventSection description={description} />

      {/* 4. Pass Tiers: Header fade-down + individual cards staggered scale-up with index-based delays */}
      <PassTiersSection passes={mapEventBookingTypesToPasses(event.bookingType)} />

      {/* 5. About Artists Slider: Header fade-down + carousel viewport smooth fade-left */}
      <AboutArtistsSliderSection artists={event.artists} />

      {/* 6. Event Location Map: Two-sided entrance (details fade-right + interactive map scale-up) */}
      <EventLocationSection venue={event.venueName} />

      {/* 7. Event Gallery Slider: Header fade-down + gallery carousel smooth fade-right */}
      <EventGallerySliderSection />

      {/* 8. Previous Event Highlights: Header fade-right + video cards carousel smooth fade-up */}
      <PreviousEventHighlightsSection />
    </div>
  );
}
