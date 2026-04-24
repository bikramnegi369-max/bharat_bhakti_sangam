import { EventCapacity } from "@/_features/event/services/constants";
import { ApiEnvelope, LatestEvent } from "@/_features/event/types";


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
