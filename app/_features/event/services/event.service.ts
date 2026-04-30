"use server";

import { Event, EventDetail, LatestEvent } from "../types";
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
  isAllEventsData,
  isEventDetailRecord,
} from "./guards";
import { DEFAULT_TIMEOUT_MS, fetchWithTimeout } from "../../../_utils/fetch";
import { APIResponse } from "@/_types/Api.types";
import { apiRoutes } from "@/_config/APIRoutes.config";
import { EventFormData } from "@/_schemas/Event.schemas";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function getResponsePayload(response: Response) {
  return response.json().catch(() => null);
}

function getPayloadMessage(payload: unknown) {
  if (!isRecord(payload)) {
    return undefined;
  }

  return typeof payload.message === "string" ? payload.message : undefined;
}

function extractEventDetailFromPayload(payload: unknown): unknown {
  if (!isRecord(payload) || !("data" in payload)) {
    return undefined;
  }

  const data = payload.data;

  if (!isRecord(data)) {
    return data;
  }

  if ("event" in data) {
    return data.event;
  }

  if ("data" in data) {
    return data.data;
  }

  return data;
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
  if (!API_URL) {
    return { success: false, error: "API URL is not configured." };
  }

  const queryParams = new URLSearchParams();

  if (params.search) {
    queryParams.append("search", String(params.search).trim());
  }
  if (params.date) {
    queryParams.append("date", String(params.date));
  }
  if (params.time) {
    queryParams.append("time", String(params.time));
  }
  if (params.sortBy) {
    queryParams.append("sortBy", String(params.sortBy));
  }
  if (params.order) {
    queryParams.append("order", String(params.order));
  }
  if (params.limit) {
    queryParams.append("limit", String(params.limit));
  }
  if (params.page) {
    queryParams.append("page", String(params.page));
  }

  try {
    const response = await authorizedAdminRequest(apiRoutes.getAllEvent, {
      method: "GET",
      search: queryParams.toString(),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      return {
        success: false,
        error:
          errorData.message || `Failed to fetch events: ${response.status}`,
      };
    }

    const payload: unknown = await response.json();

    if (!isApiEnvelope(payload, isAllEventsData)) {
      return {
        success: false,
        error: "Invalid API response format for all events.",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to fetch events from API.",
      };
    }

    return {
      success: true,
      data: {
        items: payload.data.events,
        total: payload.data.pagination.total,
      },
    };
  } catch (error) {
    console.error("Error fetching all events:", error);
    return { success: false, error: "Failed to fetch events." };
  }
}

export async function addEvent(event: EventFormData): Promise<APIResponse> {
  try {
    const payload = JSON.stringify(event);

    const res = await authorizedAdminRequest(apiRoutes.event, {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { success: false, error: "Failed to add event." };
    }

    return {
      success: true,
    };
  } catch {
    return { success: false, error: "Failed to add event." };
  }
}

export async function getEventById(
  id: string,
): Promise<APIResponse<EventDetail>> {
  if (!id.trim()) {
    return { success: false, error: "Event id is required." };
  }

  try {
    const res = await authorizedAdminRequest(apiRoutes.eventById(id), {
      method: "GET",
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch event.",
      };
    }

    if (isRecord(payload) && "status" in payload && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch event.",
      };
    }

    const eventData = extractEventDetailFromPayload(payload);

    if (!isEventDetailRecord(eventData)) {
      return {
        success: false,
        error: "Invalid event detail response format.",
      };
    }

    return {
      success: true,
      data: eventData,
    };
  } catch (error) {
    console.error("Error fetching event by id:", error);
    return { success: false, error: "Failed to fetch event." };
  }
}

export async function updateEvent(
  id: string,
  event: EventFormData,
): Promise<APIResponse> {
  if (!id.trim()) {
    return { success: false, error: "Event id is required." };
  }

  try {
    const res = await authorizedAdminRequest(apiRoutes.eventById(id), {
      method: "PUT",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update event.",
      };
    }

    if (isRecord(payload) && "status" in payload && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update event.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: "Failed to update event." };
  }
}
