import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { Venue } from "@/_types/Venue.types";

/**
 * Guard to validate a single Venue record.
 */
export function isVenue(value: unknown): value is Venue {
  if (!isRecord(value)) return false;
  return (
    typeof value._id === "string" &&
    typeof value.venue === "string" &&
    typeof value.address === "string" &&
    typeof value.image === "string" &&
    (typeof value.city === "string" ||
      value.city === undefined ||
      value.city === null) &&
    (typeof value.isActive === "boolean" ||
      value.isActive === undefined ||
      value.isActive === null) &&
    typeof value.events === "number"
  );
}

/**
 * Guard to validate the envelope for the venues list.
 */
export function isVenuesListData(value: unknown): value is {
  data: Venue[];
  pagination: {
    page: number;
    total: number;
    limit: number;
    totalPages: number;
  };
} {
  if (!isRecord(value)) return false;
  if (!isPaginationRecord(value.pagination)) {
    return false;
  }
  return Array.isArray(value.data) && value.data.every(isVenue);
}
