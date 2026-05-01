import { isRecord } from "@/_utils/guards";
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
export function isEventCategoriesListData(
  value: unknown,
): value is { categories: EventCategory[]; total: number } {
  if (!isRecord(value)) return false;
  return (
    Array.isArray(value.categories) &&
    value.categories.every(isEventCategory) &&
    (typeof value.total === "number" || typeof value.total === "undefined")
  );
}
