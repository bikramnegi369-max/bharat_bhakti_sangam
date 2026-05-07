import type { SanatanCalenderApiItem } from "../types";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isSanatanCalenderItem(
  value: unknown,
): value is SanatanCalenderApiItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    isNonEmptyString(record.festival) &&
    isNonEmptyString(record.month) &&
    isNonEmptyString(record.date) &&
    isNonEmptyString(record.image)
  );
}

export function isSanatanCalenderItems(
  value: unknown,
): value is SanatanCalenderApiItem[] {
  return Array.isArray(value) && value.every(isSanatanCalenderItem);
}

export function isSanatanCalenderApiEnvelope(
  value: unknown,
): value is {
  status: boolean;
  message?: string;
  data: SanatanCalenderApiItem[];
} {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.status === "boolean" &&
    (typeof record.message === "undefined" ||
      typeof record.message === "string") &&
    isSanatanCalenderItems(record.data)
  );
}
