import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import WelcomeSection from "@/_components/sections/Marketing/Home/WelcomeSection";
import LocationMapSection from "@/_components/sections/Marketing/LocationMapSection";
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
import FAQSection from "@/_components/sections/Marketing/FAQSection";
import { homeFAQS } from "@/_lib/constants/home.constants";
import VideoHero from "@/_components/sections/Marketing/VideoHero";
import FounderSection from "@/_components/sections/Marketing/Home/FounderSection";
import OurStorySection from "@/_components/sections/Marketing/Home/OurStorySection";
import WhyJoinUsSection from "@/_components/sections/Marketing/Home/WhyJoinUsSection";
import ExploreSpiritualIndiaSection from "@/_components/sections/Marketing/Home/ExploreSpiritualIndiaSection";

const ExperienceSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/ExperienceSection"),
  {
    loading: () => null,
  },
);
const UpcomingEventSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/UpcomingEventSection"),
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
const DivineVideoReviewsSection = dynamic(
  () =>
    import("@/_components/sections/Marketing/Home/DivineVideoReviewsSection"),
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
        "Experience Bhajan Clubbing with Bharat Bhakti Sangam. Join immersive bhakti and kirtan events, and celebrate devotion through music and community.",
      path: "/",
      image: getOgImageUrl(event),
      ogKey: `${event._id}-${event.updatedAt ?? ""}`,
      keywords: getSeoKeywords("home", [event.eventName.toLowerCase()]),
    });
  } catch {
    return createPageMetadataFromConfig("home");
  }
}

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
      {/* <Hero
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
      /> */}
      <VideoHero src="/hero-video.mp4" overlay="medium" />
      <WelcomeSection />
      <ExperienceSection />
      <FounderSection />
      <OurStorySection
        videoSrc="/hero-video.mp4"
        posterSrc="/your_custom_dance_poster.webp"
      />
      <WhyJoinUsSection />
      <UpcomingEventSection
        eventName={event.eventName}
        venueName={getEventVenueName(event) || ""}
        venueAddress={getEventVenueAddress(event) || ""}
        eventDate={getEventDisplayDate(event) || ""}
        eventTime={event.time ? `${event.time} Onwards` : undefined}
        targetIsoDate={event.date}
        imageSrc={getHomeImage(event)}
        maxSeats={event.maxSeats}
        bookedSeats={event.bookedSeats}
        availableTickets={event.availableTickets}
        ctaHref="/booking"
        ctaText="Book Your Seat Now"
      />
      <ExploreSpiritualIndiaSection />
      <GallerySection />
      <DivineVideoReviewsSection />
      <FAQSection
        items={homeFAQS}
        title="Frequently Asked Questions"
        groupName="home-faqs"
      />
      <LocationMapSection />
    </>
  );
}
