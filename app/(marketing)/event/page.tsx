import type { Metadata } from "next";
import AboutArtistSection from "@/_components/sections/Marketing/Event/AboutArtistSection";
import AboutEventSection from "@/_components/sections/Marketing/Event/AboutEventSection";
import AboutArtistsDetailedSection from "@/_components/sections/Marketing/Event/AboutArtistsDetailedSection";
import EventInfoSection from "@/_components/sections/Marketing/Event/EventInfoSection";
import LocationMapSection from "@/_components/sections/Marketing/LocationMapSection";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import EventHeroSection from "@/_components/sections/Marketing/Event/EventHeroSection";
import { getSeoKeywords, getSeoPageConfig } from "@/_config/Seo.config";
import {
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
import { DEFAULT_FAQS } from "@/_lib/constants/event.constants";
import FAQSection from "@/_components/sections/Marketing/FAQSection";

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
  const artistSummaries = getEventArtistSummaries(event);
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
            />
          </div>
        </div>
      </div>
      {/* <SponsorSection /> */}
      <FAQSection
        items={DEFAULT_FAQS}
        title="Event Guide"
        highlightWord="Event"
      />
      <AboutArtistsDetailedSection artists={artistSummaries} />
      <LocationMapSection />
    </div>
  );
}
