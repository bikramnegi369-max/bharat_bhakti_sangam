import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
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

// Above-the-fold Critical UI (Static imports for instant FCP / LCP)
import VideoHero from "@/_components/sections/Marketing/VideoHero";
import WelcomeSection from "@/_components/sections/Marketing/Home/WelcomeSection";
import ScrollProgressBar from "@/_components/common/ScrollProgressBar";
import ScrollReveal from "@/_components/common/ScrollReveal";

// Below-the-fold Components (Dynamic imports for chunk splitting & reduced initial JS bundle)
const FounderSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/FounderSection"),
  { loading: () => null },
);
const OurStorySection = dynamic(
  () => import("@/_components/sections/Marketing/Home/OurStorySection"),
  { loading: () => null },
);
const WhyJoinUsSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/WhyJoinUsSection"),
  { loading: () => null },
);
const UpcomingEventSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/UpcomingEventSection"),
  { loading: () => null },
);
const ExploreSpiritualIndiaSection = dynamic(
  () =>
    import("@/_components/sections/Marketing/Home/ExploreSpiritualIndiaSection"),
  { loading: () => null },
);
const GallerySection = dynamic(
  () => import("@/_components/sections/Marketing/Home/GallerySection"),
  { loading: () => null },
);
const InstaHighlightsSection = dynamic(
  () => import("@/_components/sections/Marketing/Home/InstaHighlightsSection"),
  { loading: () => null },
);
const DivineVideoReviewsSection = dynamic(
  () =>
    import("@/_components/sections/Marketing/Home/DivineVideoReviewsSection"),
  { loading: () => null },
);
const FAQ = dynamic(() => import("@/_components/sections/Marketing/Home/FAQ"), {
  loading: () => null,
});
const StayConnectedNewsletter = dynamic(
  () => import("@/_components/sections/Marketing/StayConnectedNewsletter"),
  { loading: () => null },
);
const LocationMapSection = dynamic(
  () => import("@/_components/sections/Marketing/LocationMapSection"),
  { loading: () => null },
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

      {/* Top subtle golden scroll progress bar */}
      <ScrollProgressBar />

      {/* 1. Hero Section: Rendered directly without scroll delay to guarantee instant LCP */}
      <VideoHero src="/hero-video.mp4" overlay="medium" />

      {/* 2. Welcome Section: Internal staggered entrance (Text left + 3D photo right) */}
      <WelcomeSection />

      {/* 3. Insta Highlights Carousel: Smooth horizontal Slide from Right */}
      <ScrollReveal animation="fade-right" duration={850} delay={50} threshold={0.1}>
        <InstaHighlightsSection />
      </ScrollReveal>

      {/* 4. Founder Section: Internal two-sided entrance (Arch portrait + floating quote card) */}
      <FounderSection />

      {/* 5. Our Story Section: Internal 3-column entrance (Story text + Central Video + Staggered features) */}
      <OurStorySection
        videoSrc="/hero-video.mp4"
        posterSrc="/your_custom_dance_poster.webp"
      />

      {/* 6. Why Join Us Section: Internal cascading 4-card scale-up */}
      <WhyJoinUsSection />

      {/* 7. Upcoming Event Showcase Banner: Split stage visual + countdown timer */}
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

      {/* 8. Explore Spiritual India: Internal 4-card 3D flip staggered cascade */}
      <ExploreSpiritualIndiaSection />

      {/* 9. Gallery Section: Internal asymmetric 6-photo de-blurring cascade */}
      <GallerySection />

      {/* 10. Divine Video Reviews Section: Dynamic Slide from Left */}
      <ScrollReveal animation="fade-left" duration={900} threshold={0.12}>
        <DivineVideoReviewsSection />
      </ScrollReveal>

      {/* 11. FAQ Accordion: Internal staggered question expansion + sticky help card glow */}
      <FAQ />

      {/* 12. Stay Connected Newsletter: Internal split content + glowing pill input */}
      <StayConnectedNewsletter />

      {/* 13. Location Map Section: Internal split address + maps embed */}
      <LocationMapSection />

    </>
  );
}
