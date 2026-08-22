import { isPaginationRecord } from "@/_utils/guards";
import { Event, EventDetail, LatestEvent } from "../types";
import { EventCapacity } from "./constants";

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
): value is { _id?: string; name: string; price: number } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    (typeof record._id === "string" || record._id === undefined) &&
    typeof record.name === "string" &&
    typeof record.price === "number"
  );
}

function isBookingTypeList(
  value: unknown,
): value is { _id?: string; name: string; price: number }[] {
  return Array.isArray(value) && value.every(isBookingType);
}

// Helper for Artist
function isArtistRecord(
  value: unknown,
): value is { name?: string; image?: string; about?: string } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    (typeof record.name === "string" || record.name === undefined) &&
    (typeof record.image === "string" || record.image === undefined) &&
    (typeof record.about === "string" || record.about === undefined)
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
    (typeof record.time === "string" ||
      record.time === undefined ||
      record.time === null) &&
    (typeof record.startTime === "string" ||
      record.startTime === undefined ||
      record.startTime === null) &&
    (typeof record.endTime === "string" ||
      record.endTime === undefined ||
      record.endTime === null) &&
    Array.isArray(record.tabs) &&
    record.tabs.every((item: unknown) => typeof item === "string") &&
    Array.isArray(record.hashTags) &&
    record.hashTags.every((item: unknown) => typeof item === "string") &&
    (isBookingType(record.bookingType) ||
      isBookingTypeList(record.bookingType) ||
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

export function isEventDetailRecord(value: unknown): value is EventDetail {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record._id === "string" &&
    (typeof record.eventName === "string" ||
      typeof record.description === "string" ||
      typeof record.eventDescription === "string" ||
      typeof record.date === "string" ||
      typeof record.eventDate === "string")
  );
}

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
    (typeof record.time === "string" ||
      record.time === undefined ||
      record.time === null) &&
    (typeof record.startTime === "string" ||
      record.startTime === undefined ||
      record.startTime === null) &&
    (typeof record.endTime === "string" ||
      record.endTime === undefined ||
      record.endTime === null) &&
    Array.isArray(record.tabs) &&
    Array.isArray(record.hashTags) &&
    Array.isArray(record.artists) &&
    typeof record.bookedSeats === "number"
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

export function isAllEventsData(value: unknown): value is {
  events: Event[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;

  if (!Array.isArray(record.events) || !record.events.every(isEventRecord)) {
    return false;
  }
  if (!isPaginationRecord(record.pagination)) {
    return false;
  }
  return true;
}
