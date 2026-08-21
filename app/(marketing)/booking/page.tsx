import type { Metadata } from "next";
import { Suspense } from "react";
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
  getLatestEvent,
} from "@/_features/event/services/event.service";
import { EventApiError } from "@/_features/event/class/EventApiError";

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

type BookingPageProps = {
  searchParams?: Promise<{ pass?: string }>;
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  let event;
  let message: string | null = null;

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedPass = resolvedSearchParams?.pass;

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

  const ticketTypes = (
    Array.isArray(event.bookingType) ? event.bookingType : [event.bookingType]
  )
    .filter((t) => !!t)
    .map((t) => ({
      name: t?.name || "Pass",
      price: t?.price || 0,
    }));

  const matchedPass = requestedPass
    ? ticketTypes.find(
        (t) => t.name.toLowerCase().trim() === requestedPass.toLowerCase().trim(),
      )?.name
    : undefined;

  return (
    <Suspense>
      <BookingPageClient
        eventId={event._id}
        eventTitle={event.eventName}
        eventDate={getEventDisplayDate(event)}
        eventLocation={getEventVenueName(event)}
        eventAddress={getEventVenueAddress(event)}
        heroImage={getEventImage(event)}
        ticketTypes={ticketTypes}
        initialTicketType={matchedPass || ticketTypes[0]?.name}
      />
    </Suspense>
  );
}
