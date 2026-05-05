import { isPaginationRecord, isRecord } from "@/_utils/guards";
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
export function isEventBookingTypesListData(value: unknown): value is {
  data: EventBookingType[];
  pagination: {
    total: number;
    limit?: number;
    page?: number;
    totalPages?: number;
  };
} {
  if (!isRecord(value)) return false;
  if (!isPaginationRecord(value.pagination)) {
    return false;
  }
  return Array.isArray(value.data) && value.data.every(isEventBookingType);
}
