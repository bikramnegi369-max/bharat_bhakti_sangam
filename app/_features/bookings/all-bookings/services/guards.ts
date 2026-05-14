import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { EventBooking } from "@/_types/EventBooking.types";

/**
 * Guard to validate a single EventBooking record.
 */
export function isEventBooking(value: unknown): value is EventBooking {
  if (!isRecord(value)) return false;
  return (
    typeof value._id === "string" &&
    typeof value.name === "string" &&
    typeof value.eventName === "string" &&
    typeof value.email === "string" &&
    typeof value.contact === "number" &&
    typeof value.tickets === "number" &&
    typeof value.ticketId === "string"
  );
}

/**
 * Guard to validate the envelope for the bookings list.
 */
export function isEventBookingsListData(value: unknown): value is {
  data: EventBooking[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
} {
  if (!isRecord(value)) return false;
  if (!isPaginationRecord(value.pagination)) {
    return false;
  }
  return Array.isArray(value.data) && value.data.every(isEventBooking);
}
