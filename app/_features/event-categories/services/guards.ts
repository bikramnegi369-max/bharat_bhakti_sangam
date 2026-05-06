import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { EventCategory } from "@/_types/EventCategories.types";

/**
 * Guard to validate a single EventCategory record.
 */
export function isEventCategory(value: unknown): value is EventCategory {
  if (!isRecord(value)) return false;
  return (
    typeof value._id === "string" &&
    typeof value.categoryName === "string" &&
    typeof value.picture === "string" &&
    typeof value.isActive === "boolean" &&
    typeof value.totalEvents === "number"
  );
}

/**
 * Guard to validate the envelope for the categories list.
 */
export function isEventCategoriesListData(value: unknown): value is {
  categories: EventCategory[];
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
  return (
    Array.isArray(value.categories) && value.categories.every(isEventCategory)
  );
}
