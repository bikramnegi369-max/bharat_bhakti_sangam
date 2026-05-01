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
