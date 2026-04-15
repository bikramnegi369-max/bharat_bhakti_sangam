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
import { BookingPageClient } from "./BookingPageClient";
import {
  EventApiError,
  getLatestEvent,
} from "@/_features/event/services/event.api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const event = await getLatestEvent();

    return createPageMetadata({
      title: `Book Tickets for ${event.eventName}`,
      description: `Reserve your seat for ${event.eventName} at ${getEventVenueName(event)}.`,
      path: "/booking",
      image: getEventImage(event),
      keywords: getSeoKeywords("booking", [
        `book ${event.eventName.toLowerCase()} tickets`,
      ]),
    });
  } catch {
    return createPageMetadataFromConfig("booking");
  }
}

export default async function BookingPage() {
  let event;
  let message: string | null = null;

  try {
    event = await getLatestEvent();
  } catch (error) {
    message =
      error instanceof EventApiError
        ? error.message
        : "Booking is temporarily unavailable because the latest event could not be loaded.";
  }

  if (!event) {
    return (
      <EventUnavailable
        title="Booking Unavailable"
        message={message ?? "Booking is temporarily unavailable."}
      />
    );
  }

  return (
    <BookingPageClient
      eventTitle={event.eventName}
      eventDate={getEventDisplayDate(event)}
      eventLocation={getEventVenueName(event)}
      eventAddress={getEventVenueAddress(event)}
      heroImage={getEventImage(event)}
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
  );
}
