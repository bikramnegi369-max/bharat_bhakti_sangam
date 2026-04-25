"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { dummyEvents } from "@/_lib/DummyData/EventData";
import { Event, LatestEvent } from "../types";
import { TableQueryParams } from "@/_types/Table.types";
import {
  API_URL,
  LATEST_EVENT_REVALIDATE_SECONDS,
  LATEST_EVENT_TAG,
  EVENT_CAPACITY_TAG,
  CAPACITY_TIMEOUT_MS,
  EventCapacity,
} from "./constants";
import { EventApiError } from "../class/EventApiError";
import {
  isApiEnvelope,
  isLatestEventRecord,
  isEventCapacityRecord,
} from "./guards";
import { DEFAULT_TIMEOUT_MS, fetchWithTimeout } from "../../../_utils/fetch";
import { APIResponse } from "@/_types/Api.types";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";

export async function getEvents() {
  const response = await authorizedAdminRequest(apiRoutes.event);

  if (!response.ok) throw new Error("Failed to fetch events");
  return (await response.json()) as Event[];
}

export async function getEvent() {
  return getEvents();
}

/**
 * PUBLIC CALL: Fetches the latest event without authentication.
 */
export const getLatestEvent = async (): Promise<LatestEvent> => {
  if (!API_URL) {
    throw new EventApiError(
      "Latest event API URL is not configured.",
      "MISSING_API_URL",
    );
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(
      `${API_URL}${apiRoutes.latestEvent}`,
      {
        next: {
          revalidate: LATEST_EVENT_REVALIDATE_SECONDS,
          tags: [LATEST_EVENT_TAG],
        },
      },
      DEFAULT_TIMEOUT_MS,
    );
  } catch (error) {
    throw new EventApiError(
      error instanceof Error && error.name === "AbortError"
        ? "Latest event API request timed out."
        : error instanceof Error
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
      payload.message || "Latest event API returned unsuccessful response.",
      "INVALID_RESPONSE",
    );
  }

  const event = payload.data;

  if (event.isActive === false) {
    throw new EventApiError("Latest event is inactive.", "INACTIVE_EVENT");
  }

  return event;
};

export const getLatestEventCapacity = async (): Promise<EventCapacity> => {
  if (!API_URL) {
    throw new EventApiError(
      "Capacity API URL is not configured.",
      "MISSING_API_URL",
    );
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(
      `${API_URL}${apiRoutes.latestCapacity}`,
      {
        cache: "no-store",
        next: {
          tags: [EVENT_CAPACITY_TAG],
        },
      },
      CAPACITY_TIMEOUT_MS,
    );
  } catch (error) {
    throw new EventApiError(
      error instanceof Error && error.name === "AbortError"
        ? "Capacity API request timed out."
        : error instanceof Error
          ? `Unable to reach capacity API: ${error.message}`
          : "Unable to reach capacity API.",
      "NETWORK_ERROR",
    );
  }

  if (!response.ok) {
    throw new EventApiError(
      `Capacity API responded with status ${response.status}.`,
      "BAD_STATUS",
      response.status,
    );
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new EventApiError(
      "Capacity API returned invalid JSON.",
      "INVALID_RESPONSE",
    );
  }

  if (!isApiEnvelope(payload, isEventCapacityRecord)) {
    throw new EventApiError(
      "Capacity API returned invalid payload shape.",
      "INVALID_RESPONSE",
    );
  }

  if (!payload.status) {
    throw new EventApiError(
      payload.message || "Capacity API returned unsuccessful response.",
      "INVALID_RESPONSE",
    );
  }

  return payload.data;
};

export async function getAllEvents(
  params: TableQueryParams,
): Promise<APIResponse<{ items: Event[]; total: number }>> {
  const search =
    typeof params.search === "string" ? params.search.trim().toLowerCase() : "";

  const date = typeof params.date === "string" ? params.date : "";
  const time = typeof params.time === "string" ? params.time : "";
  const sortBy = typeof params.sortBy === "string" ? params.sortBy : "";
  const order = params.order === "desc" ? "desc" : "asc";
  const limit = params.limit ?? 5;

  let items = [...dummyEvents];

  if (search) {
    items = items.filter((event) => {
      const haystack = `${event.eventName} ${event.description}`.toLowerCase();
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
      const a = String(left[sortBy as keyof Event]);
      const b = String(right[sortBy as keyof Event]);
      return order === "desc" ? b.localeCompare(a) : a.localeCompare(b);
    });
  }

  const total = items.length;
  const start = (params.page - 1) * limit;
  const end = start + limit;

  try {
    return {
      success: true,
      data: {
        items: items.slice(start, end),
        total,
      },
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch events." };
  }
}

/**
 * ADMIN CALL: Uses BFF logic to get a specific event.
 */
export async function getEventById(id: string): Promise<APIResponse<Event>> {
  try {
    const res = await authorizedAdminRequest(`${apiRoutes.event}/${id}`);

    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching event:", error);
    return { success: false, error: "Could not retrieve the event details." };
  }
}

/**
 * ADMIN CALL: Uses BFF logic to delete an event.
 */
export async function deleteEvent(id: string): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(`${apiRoutes.event}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error();

    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      error: "Failed to delete the event. Please try again.",
    };
  }
}

export async function addEvent({
  event,
}: {
  event: Event;
}): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(`${apiRoutes.event}`, {
      method: "POST",
      body: JSON.stringify(event),
    });

    if (!res.ok) throw new Error();

    return { success: true };
  } catch (error) {
    console.error("Error Adding event:", error);
    return {
      success: false,
      error: "Failed to Add the event. Please try again.",
    };
  }
}
