import type { Metadata } from "next";
import { EventUnavailable } from "@/_components/common/EventUnavailable";
import { getSeoKeywords } from "@/_config/Seo.config";
import {
  getEventDisplayDate,
  getEventImage,
  getEventVenueAddress,
  getEventVenueName,
} from "@/_lib/helpers";
import { createPageMetadata, createPageMetadataFromConfig } from "@/_lib/seo";
import { FeedbackPageClient } from "./FeedbackPageClient";
import { getLatestEvent } from "@/_features/event/services/event.service";
import { EventApiError } from "@/_features/event/class/EventApiError";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const event = await getLatestEvent();

    return createPageMetadata({
      title: `${event.eventName} Feedback`,
      description: `Share your feedback for ${event.eventName} so we can improve future devotional events.`,
      path: "/feedback",
      image: getEventImage(event) ?? "/feedback.webp",
      keywords: getSeoKeywords("feedback", [event.eventName.toLowerCase()]),
      noIndex: true,
    });
  } catch {
    return createPageMetadataFromConfig("feedback");
  }
}

export default async function FeedbackPage() {
  let event;
  let message: string | null = null;

  try {
    event = await getLatestEvent();
  } catch (error) {
    message =
      error instanceof EventApiError
        ? error.message
        : "Feedback is temporarily unavailable because the latest event could not be loaded.";
  }

  if (!event) {
    return (
      <EventUnavailable
        title="Feedback Unavailable"
        message={message ?? "Feedback is temporarily unavailable."}
      />
    );
  }

  return (
    <FeedbackPageClient
      eventTitle={event.eventName}
      eventDate={getEventDisplayDate(event)}
      eventLocation={getEventVenueName(event)}
      eventAddress={getEventVenueAddress(event)}
      heroImage={"/feedback_hero.webp"}
    />
  );
}
