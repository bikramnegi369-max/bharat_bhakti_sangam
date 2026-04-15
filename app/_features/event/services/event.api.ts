import { cache } from "react";
import { apiRoutes } from "@/_config/Routes.config";
import axios from "@/_lib/axios";
import { dummyEvents } from "@/_lib/DummyData/EventData";
import { TableService } from "@/_types/Table.types";
import { ApiEnvelope, Event, LatestEvent } from "../types";

export const getEvents = () => axios.get<Event[]>(apiRoutes.event);
export const getEvent = getEvents;

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const LATEST_EVENT_REVALIDATE_SECONDS = 300;
const LATEST_EVENT_TAG = "latest-event";

export class EventApiError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "MISSING_API_URL"
      | "NETWORK_ERROR"
      | "BAD_STATUS"
      | "INVALID_RESPONSE"
      | "INACTIVE_EVENT",
    public readonly status?: number,
  ) {
    super(message);
    this.name = "EventApiError";
  }
}

function isLatestEventRecord(value: unknown): value is LatestEvent {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record._id === "string" &&
    typeof record.eventName === "string" &&
    typeof record.description === "string" &&
    (typeof record.venueName === "string" ||
      typeof record.venueName === "undefined" ||
      (typeof record.venueName === "object" && record.venueName !== null)) &&
    typeof record.date === "string" &&
    typeof record.time === "string" &&
    Array.isArray(record.tabs) &&
    Array.isArray(record.hashTags) &&
    (!("bookingType" in record) ||
      typeof record.bookingType === "string" ||
      (typeof record.bookingType === "object" &&
        record.bookingType !== null)) &&
    (!("sponsors" in record) || Array.isArray(record.sponsors)) &&
    Array.isArray(record.artists) &&
    (!("ticketPrice" in record) || typeof record.ticketPrice === "number") &&
    typeof record.bookedSeats === "number" &&
    (!("isActive" in record) || typeof record.isActive === "boolean")
  );
}

function isApiEnvelope<T>(
  value: unknown,
  dataGuard: (input: unknown) => input is T,
): value is ApiEnvelope<T> {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.status === "boolean" &&
    typeof record.message === "string" &&
    "data" in record &&
    dataGuard(record.data)
  );
}

export const getLatestEvent = cache(async (): Promise<LatestEvent> => {
  if (!API_URL) {
    throw new EventApiError(
      "Latest event API URL is not configured.",
      "MISSING_API_URL",
    );
  }

  let response: Response;

  try {
    // Use Next's native fetch cache for SEO-critical server data.
    // This lets pages, metadata, and sitemap share the same cached response
    // and supports time-based or tag-based revalidation in production.
    response = await fetch(`${API_URL}${apiRoutes.latestEvent}`, {
      next: {
        revalidate: LATEST_EVENT_REVALIDATE_SECONDS,
        tags: [LATEST_EVENT_TAG],
      },
    });
  } catch (error) {
    throw new EventApiError(
      error instanceof Error
        ? `Unable to reach latest event API: ${error.message}`
        : "Unable to reach latest event API.",
      "NETWORK_ERROR",
    );
  }

  if (!response.ok) {
    throw new EventApiError(
      `Latest event API responded with status ${response.status}.`,
      "BAD_STATUS",
      response.status,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
    console.log(payload);
  } catch {
    throw new EventApiError(
      "Latest event API returned invalid JSON.",
      "INVALID_RESPONSE",
    );
  }

  if (!isApiEnvelope(payload, isLatestEventRecord)) {
    throw new EventApiError(
      "Latest event API returned an invalid payload shape.",
      "INVALID_RESPONSE",
    );
  }

  if (!payload.status) {
    throw new EventApiError(
      payload.message || "Latest event API returned an unsuccessful response.",
      "INVALID_RESPONSE",
    );
  }

  const event = payload.data;

  if (event.isActive === false) {
    throw new EventApiError("Latest event is inactive.", "INACTIVE_EVENT");
  }

  return event;
});

export const eventService: TableService<Event> = {
  getAll: async (params) => {
    const search =
      typeof params.search === "string"
        ? params.search.trim().toLowerCase()
        : "";
    const date = typeof params.date === "string" ? params.date : "";
    const time = typeof params.time === "string" ? params.time : "";
    const sortBy = typeof params.sortBy === "string" ? params.sortBy : "";
    const order = params.order === "desc" ? "desc" : "asc";
    const limit = params.limit ?? 5;
    let items = [...dummyEvents];

    if (search) {
      items = items.filter((event) => {
        const haystack = `${event.title} ${event.description}`.toLowerCase();
        return haystack.includes(search);
      });
    }

    if (date) {
      items = items.filter((event) => event.date.slice(0, 10) === date);
    }

    if (time) {
      items = items.filter((event) => event.date.slice(11, 16) === time);
    }

    if (sortBy === "title" || sortBy === "description" || sortBy === "date") {
      items.sort((left, right) => {
        const a = String(left[sortBy]);
        const b = String(right[sortBy]);
        return order === "desc" ? b.localeCompare(a) : a.localeCompare(b);
      });
    }

    const total = items.length;
    const start = (params.page - 1) * limit;
    const end = start + limit;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: items.slice(start, end),
          total,
        });
      }, 2000);
    });
  },
  getOne: async (id) => {
    const res = await axios.get<Event>(`${apiRoutes.event}/${id}`);
    return res.data;
  },
  delete: async (id) => {
    await axios.delete(`${apiRoutes.event}/${id}`);
  },
};
