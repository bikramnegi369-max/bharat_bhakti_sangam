import { isRecord } from "@/_utils/guards";
import { EventFeedback } from "@/_types/feedback.types";

export function isEventFeedback(value: unknown): value is EventFeedback {
  if (!isRecord(value)) return false;

  return (
    typeof value._id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.rating === "number" &&
    typeof value.feedback === "string"
  );
}

export function isEventFeedbacksListData(
  value: unknown,
): value is {
  data: EventFeedback[];
  pagination: { page: number; pages: number | null };
} {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.data)) return false;
  if (!isRecord(value.pagination)) return false;

  return (
    value.data.every(isEventFeedback) &&
    typeof value.pagination.page === "number" &&
    (typeof value.pagination.pages === "number" ||
      value.pagination.pages === null)
  );
}
