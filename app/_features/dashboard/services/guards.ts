import { EventsApiResponse } from "@/_types/dashboard.type";

export function isEventStats(data: unknown): data is EventsApiResponse {
  if (!Array.isArray(data)) return false;

  return data.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const { id, title, venue, date, status } = item as Record<string, unknown>;
    return (
      typeof id === "string" &&
      typeof title === "string" &&
      typeof venue === "string" &&
      typeof status === "string" &&
      typeof date === "string"
    );
  });
}
