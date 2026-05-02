import { isRecord } from "@/_utils/guards";
import { EventBookingType } from "@/_types/EventBookingType.types";

/**
 * Guard to validate a single EventBookingType record.
 */
export function isEventBookingType(value: unknown): value is EventBookingType {
  if (!isRecord(value)) return false;
  return (
    typeof value._id === "string" &&
    typeof value.bookingType === "string" &&
    typeof value.price === "number"
  );
}

/**
 * Guard to validate the envelope for the booking types list.
 */
export function isEventBookingTypesListData(
  value: unknown,
): value is { bookingTypes: EventBookingType[]; total: number } {
  if (!isRecord(value)) return false;
  return (
    Array.isArray(value.bookingTypes) &&
    value.bookingTypes.every(isEventBookingType) &&
    (typeof value.total === "number" || typeof value.total === "undefined")
  );
}
