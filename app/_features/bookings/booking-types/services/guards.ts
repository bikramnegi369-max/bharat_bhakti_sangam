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
    typeof value.price === "number" &&
    (value.subtitle === undefined || typeof value.subtitle === "string") &&
    (value.isPopular === undefined || typeof value.isPopular === "boolean") &&
    (value.isDelete === undefined || typeof value.isDelete === "boolean") &&
    (value.isActive === undefined || typeof value.isActive === "boolean") &&
    (value.features === undefined ||
      (Array.isArray(value.features) &&
        value.features.every((f) => typeof f === "string")))
  );
}

/**
 * Guard to validate the envelope for the booking types list.
 */
export function isEventBookingTypesListData(value: unknown): value is {
  data: EventBookingType[];
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
  return Array.isArray(value.data) && value.data.every(isEventBookingType);
}
