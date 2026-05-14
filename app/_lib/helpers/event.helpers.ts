import {
  EventCapacity,
} from "@/_features/event/services/constants";
import { ApiEnvelope, Event, LatestEvent } from "@/_features/event/types";

export function isLatestEventRecord(value: unknown): value is LatestEvent {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record._id === "string" &&
    typeof record.eventName === "string" &&
    typeof record.description === "string" &&
    (typeof record.venueName === "string" ||
      typeof record.venueName === "undefined" ||
      (typeof record.venueName === "object" && record.venueName !== null)) &&
    typeof record.date === "string" &&
    typeof record.time === "string" &&
    Array.isArray(record.tabs) &&
    Array.isArray(record.hashTags) &&
    (!("bookingType" in record) ||
      typeof record.bookingType === "string" ||
      (typeof record.bookingType === "object" &&
        record.bookingType !== null)) &&
    (!("sponsors" in record) || Array.isArray(record.sponsors)) &&
    Array.isArray(record.artists) &&
    (!("ticketPrice" in record) || typeof record.ticketPrice === "number") &&
    typeof record.bookedSeats === "number" &&
    (!("isActive" in record) || typeof record.isActive === "boolean")
  );
}

// Helper for venueName
function isVenueName(
  value: unknown,
): value is { venue: string; address: string } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.venue === "string" && typeof record.address === "string";
}

// Helper for bookingType
function isBookingType(
  value: unknown,
): value is { name: string; price: number } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.name === "string" && typeof record.price === "number";
}

// Helper for Artist
function isArtistRecord(
  value: unknown,
): value is { name: string; image: string; about: string } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string" &&
    typeof record.image === "string" &&
    typeof record.about === "string"
  );
}

export function isEventRecord(value: unknown): value is Event {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;

  return (
    typeof record._id === "string" &&
    typeof record.eventName === "string" &&
    typeof record.description === "string" &&
    (isVenueName(record.venueName) ||
      record.venueName === undefined ||
      record.venueName === null) &&
    typeof record.date === "string" &&
    typeof record.time === "string" &&
    Array.isArray(record.tabs) &&
    record.tabs.every((item: unknown) => typeof item === "string") &&
    Array.isArray(record.hashTags) &&
    record.hashTags.every((item: unknown) => typeof item === "string") &&
    (isBookingType(record.bookingType) ||
      record.bookingType === undefined ||
      record.bookingType === null) &&
    (typeof record.homeBanner === "string" ||
      record.homeBanner === undefined ||
      record.homeBanner === null) &&
    (typeof record.eventBanner === "string" ||
      record.eventBanner === undefined ||
      record.eventBanner === null) &&
    typeof record.maxSeats === "number" &&
    typeof record.bookedSeats === "number" &&
    typeof record.availableTickets === "number" &&
    (typeof record.ogImage === "string" ||
      record.ogImage === undefined ||
      record.ogImage === null) &&
    Array.isArray(record.artists) &&
    record.artists.every(isArtistRecord)
  );
}

export function isEventCapacityRecord(value: unknown): value is EventCapacity {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.eventId === "string" &&
    typeof record.maxSeats === "number" &&
    typeof record.bookedSeats === "number" &&
    typeof record.availableTickets === "number" &&
    typeof record.isSoldOut === "boolean"
  );
}

export function isApiEnvelope<T>(
  value: unknown,
  dataGuard: (input: unknown) => input is T,
): value is ApiEnvelope<T> {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.status === "boolean" &&
    typeof record.message === "string" &&
    "data" in record &&
    dataGuard(record.data)
  );
}
