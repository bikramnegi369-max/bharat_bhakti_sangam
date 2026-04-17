import type { Metadata } from "next";
import AboutArtistsDetailedSection from "@/_components/sections/Marketing/Event/AboutArtistsDetailedSection";
import AboutArtistSection from "@/_components/sections/Marketing/Event/AboutArtistSection";
import AboutEventSection from "@/_components/sections/Marketing/Event/AboutEventSection";
import EventInfoSection from "@/_components/sections/Marketing/Event/EventInfoSection";
import FAQSection from "@/_components/sections/Marketing/Event/FAQSection";
import { SponsorSection } from "@/_components/sections/Marketing/Event/SponsorSection";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import Hero from "@/_components/sections/Marketing/Hero";
import { getSeoKeywords } from "@/_config/Seo.config";
import {
  getAbsoluteEventImageUrl,
  getEventArtistNames,
  getEventArtistSummaries,
  getEventBookingCategories,
  getEventDescription,
  getEventDisplayDate,
  getEventImage,
  getEventUrl,
  getEventVenueAddress,
  getEventVenueName,
  getOgImageUrl,
} from "@/_lib/helpers";
import {
  createPageMetadata,
  createPageMetadataFromConfig,
  jsonLdScript,
} from "@/_lib/seo";
import {
  EventApiError,
  getLatestEvent,
} from "@/_features/event/services/event.api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const event = await getLatestEvent();
    const description = getEventDescription(event);

    return createPageMetadata({
      title: `${event.eventName} Event in Mumbai`,
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
  const absoluteImage = getAbsoluteEventImageUrl(event);
  const bookingCategories = getEventBookingCategories(event);
  const artistNames = getEventArtistNames(event);
  const artistSummaries = getEventArtistSummaries(event);
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.eventName,
    description,
    image: [absoluteImage],
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: event.date,
    url: getEventUrl(),
    location: {
      "@type": "Place",
      name: getEventVenueName(event),
      address: getEventVenueAddress(event),
    },
    offers: bookingCategories.map((cat) => ({
      "@type": "Offer",
      name: cat.name,
      price: cat.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: getEventUrl(),
    })),
    organizer: {
      "@type": "Organization",
      name: "Bharat Bhakti Sangam",
      url: "https://bharatbhaktisangam.com",
    },
    performers: artistNames.map((name) => ({
      "@type": "Person",
      name,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(eventJsonLd)}
      />
      <Hero
        title={event.eventName}
        location={getEventVenueName(event)}
        address={getEventVenueAddress(event)}
        date={eventDate}
        backgroundImage={image ?? "/event.webp"}
      />
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="flex flex-col gap-6 h-full lg:col-span-2">
            <AboutEventSection
              description={description}
              instruments={event.tabs}
              hashtags={event.hashTags.map((tag) =>
                tag.startsWith("#") ? tag : `#${tag}`,
              )}
            />
            <AboutArtistSection
              artists={artistSummaries.map((artist) => ({
                name: artist.name,
                role: artist.role,
              }))}
            />
          </div>

          {/* RIGHT */}
          <div className="w-full h-full flex justify-center">
            <EventInfoSection
              date={eventDate}
              time={event.time}
              venue={{
                name: getEventVenueName(event),
                address: getEventVenueAddress(event),
              }}
              capacity={{
                current: event.bookedSeats,
                total: (event.maxSeats ?? 0) || 1,
              }}
              booking={bookingCategories}
            />
          </div>
        </div>
      </div>
      {/* <SponsorSection /> */}
      <FAQSection />
      <AboutArtistsDetailedSection
        artists={artistSummaries.map((artist) => ({
          name: artist.name,
          description: artist.description,
          images: artist.images,
        }))}
      />
    </div>
  );
}
