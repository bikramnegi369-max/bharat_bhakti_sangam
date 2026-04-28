import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import Hero from "@/_components/sections/Marketing/Hero";
import WelcomeSection from "@/_components/sections/Marketing/Home/WelcomeSection";
import { getSeoKeywords } from "@/_config/Seo.config";
import { siteConfig } from "@/_config/Site.config";
import {
  getEventDisplayDate,
  getEventVenueAddress,
  getEventVenueName,
  getHomeImage,
  getOgImageUrl,
} from "@/_lib/helpers";
import {
  createPageMetadata,
  createPageMetadataFromConfig,
  jsonLdScript,
} from "@/_lib/seo";
import { getLatestEvent } from "@/_features/event/services/event.service";
import { EventApiError } from "@/_features/event/class/EventApiError";

const ExperienceSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/ExperienceSection"),
  {
    loading: () => null,
  },
);
const BookingSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/BookingSection"),
  {
    loading: () => null,
  },
);
const GallerySection = dynamic(
  () => import("@/_components/sections/Marketing/Home/GallerySection"),
  {
    loading: () => null,
  },
);

export async function generateMetadata(): Promise<Metadata> {
  try {
    const event = await getLatestEvent();

    return createPageMetadata({
      title: "Bharat Bhakti Sangam | Bhajan Clubbing, Bhakti & Kirtan Events",
      description:
        "Experience Bhajan Clubbing with Bharat Bhakti. Join immersive bhakti and kirtan events, and celebrate devotion through music and community.",
      path: "/",
      image: getOgImageUrl(event),
      ogKey: `${event._id}-${event.updatedAt ?? ""}`,
      keywords: getSeoKeywords("home", [event.eventName.toLowerCase()]),
    });
  } catch {
    return createPageMetadataFromConfig("home");
  }
}

const IMAGES = [
  { src: "/gallery/gallery_1.webp" },
  { src: "/gallery/gallery_2.webp" },
  { src: "/gallery/gallery_3.webp" },
];

export default async function HomePage() {
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

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd)}
      />
      <Hero
        title={event.eventName}
        location={getEventVenueName(event)}
        address={getEventVenueAddress(event)}
        date={getEventDisplayDate(event)}
        backgroundImage={getHomeImage(event)}
        primaryCta={{
          label: "Book Now",
          href: "/booking",
        }}
        secondaryCta={{
          label: "Know More",
          href: "/event",
        }}
      />
      <WelcomeSection />
      <ExperienceSection />
      <BookingSection
        eventDate={getEventDisplayDate(event) || ""}
        eventTime={`${event.time} Onwards`}
        eventDay={new Date(event.date).toLocaleDateString("en-US", {
          weekday: "long",
        })}
        venueName={getEventVenueName(event) || ""}
        venueAddress={getEventVenueAddress(event) || ""}
        ticketTypes={(Array.isArray(event.bookingType)
          ? event.bookingType
          : [event.bookingType]
        )
          .filter((t) => !!t)
          .map((t) => ({
            name: t?.name || "Pass",
            price: t?.price || 0,
          }))}
      />
      <GallerySection images={IMAGES} />
    </>
  );
}
