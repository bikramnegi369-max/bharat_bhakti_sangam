import { ApiEnvelope } from "@/_features/event/types";

/**
 * Validates if a value is a non-null object.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Generic guard to validate the standard API envelope.
 */
export function isApiEnvelope<T>(
  value: unknown,
  dataGuard: (input: unknown) => input is T,
): value is ApiEnvelope<T> {
  if (!isRecord(value)) return false;

  return (
    typeof value.status === "boolean" &&
    typeof value.message === "string" &&
    "data" in value &&
    dataGuard(value.data)
  );
}

export function isPaginationRecord(
  value: unknown,
): value is { total: number; page: number; limit: number; totalPages: number } {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.total === "number" &&
    typeof record.page === "number" &&
    typeof record.limit === "number" &&
    typeof record.totalPages === "number"
  );
}
