import type { Metadata } from "next";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import BookingSection from "@/_components/sections/Marketing/Home/BookingSection";
import ExperienceSection from "@/_components/sections/Marketing/Home/ExperienceSection";
import GallerySection from "@/_components/sections/Marketing/Home/GallerySection";
import Hero from "@/_components/sections/Marketing/Hero";
import WelcomeSection from "@/_components/sections/Marketing/Home/WelcomeSection";
import { getSeoKeywords, getSeoPageConfig } from "@/_config/Seo.config";
import { siteConfig } from "@/_config/Site.config";
import {
  getEventDescription,
  getEventDisplayDate,
  getEventImage,
  getEventVenueAddress,
  getEventVenueName,
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
    const seoPage = getSeoPageConfig("home");

    return createPageMetadata({
      title: `${event.eventName} | ${seoPage.title}`,
      description: getEventDescription(event),
      path: "/",
      image: getEventImage(event),
      keywords: getSeoKeywords("home", [event.eventName.toLowerCase()]),
    });
  } catch {
    return createPageMetadataFromConfig("home");
  }
}

const IMAGES = [
  { src: "/gallery/gallery_1.png" },
  { src: "/gallery/gallery_2.png" },
  { src: "/gallery/gallery_3.png" },
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
      {/* Preload the hero image */}
      <link
        rel="preload"
        as="image"
        href={getEventImage(event)}
        fetchPriority="high"
      />
      <Hero
        title={event.eventName}
        location={getEventVenueName(event)}
        address={getEventVenueAddress(event)}
        date={getEventDisplayDate(event)}
        backgroundImage={getEventImage(event)}
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
      <BookingSection />
      <GallerySection images={IMAGES} />
    </>
  );
}
