import type { Metadata } from "next";
import AboutEventSection from "@/_components/sections/Marketing/Event/AboutEventSection";
import PassTiersSection, {
  mapEventBookingTypesToPasses,
} from "@/_components/sections/Marketing/Event/PassTiersSection";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import EventHeroSection from "@/_components/sections/Marketing/Event/EventHeroSection";
import EventQuickInfoBar from "@/_components/sections/Marketing/Event/EventQuickInfoBar";
import { getSeoKeywords, getSeoPageConfig } from "@/_config/Seo.config";
import {
  calculateEventDuration,
  formatEventTimeDisplay,
  getEventArtistSummaries,
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
import { EventApiError } from "@/_features/event/class/EventApiError";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const event = await getLatestEvent();
    const description = getEventDescription(event);
    const seoPage = getSeoPageConfig("event");

    return createPageMetadata({
      title: `${event.eventName} Event | ${seoPage.title}`,
      description,
      path: "/event",
      image: getOgImageUrl(event),
      ogKey: `${event._id}-${event.updatedAt ?? ""}`,
      keywords: getSeoKeywords("event", [event.eventName.toLowerCase()]),
    });
  } catch {
    return createPageMetadataFromConfig("event");
  }
}

export default async function EventPage() {
  let event;

  try {
    event = await getLatestEvent();
  } catch (error) {
    const message =
      error instanceof EventApiError
        ? error.message
        : "We could not load the latest event right now. Please try again shortly.";

    return (
      <EventUnavailable title="Latest Event Unavailable" message={message} />
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
      <EventHeroSection
        title={event.eventName}
        ctaLabel="Book Your Pass Now"
        ctaHref="/booking"
        backgroundImage={image ?? "/event.webp"}
      />
      {/* Overlapping Event Quick Info Highlights - subtle overlap on mobile/tablet, 50% seam centered on desktop (1024px+) */}
      <div className="-mt-6 sm:-mt-10 lg:mt-0 lg:-translate-y-1/2 relative z-20">
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
      </div>
      <AboutEventSection description={description} />
      <PassTiersSection passes={mapEventBookingTypesToPasses(event.bookingType)} />
    </div>
  );
}
