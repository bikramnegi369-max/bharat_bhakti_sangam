"use server";

import {
  BookingRegistrationTrendData,
  EventsApiResponse,
  TotalBookingTrendData,
} from "@/_types/dashboard.type";
import {
  normalizeBookingRegistrationTrendData,
  normalizeEventsData,
  normalizeTotalBookingTrendData,
} from "@/_utils/dashboard.utils";
import { APIResponse } from "@/_types/Api.types";
import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { getPayloadMessage, getResponsePayload } from "@/_utils/api";
import { isRecord } from "@/_utils/guards";
import {
  isBookingRegistrationTrendInput,
  isEventStats,
  isTotalBookingTrendInput,
} from "./guards";

function extractEventStatsPayload(payload: unknown): unknown {
  if (!isRecord(payload)) {
    return payload;
  }

  const data = "data" in payload ? payload.data : payload;

  if (Array.isArray(data)) {
    return data;
  }

  if (!isRecord(data)) {
    return data;
  }

  if ("events" in data) {
    return data.events;
  }

  if ("analytics" in data) {
    return data.analytics;
  }

  if ("data" in data) {
    return data.data;
  }

  return data;
}

export async function fetchEventStats(): Promise<
  APIResponse<EventsApiResponse>
> {
  try {
    const response = await authorizedAdminRequest(
      apiRoutes.dashboardAnalytics,
      {
        method: "GET",
      },
    );

    const payload = await getResponsePayload(response);

    if (!response.ok) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to fetch dashboard analytics.",
        status: response.status,
      };
    }

    if (isRecord(payload) && "status" in payload && payload.status === false) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to fetch dashboard analytics.",
      };
    }

    const eventsPayload = extractEventStatsPayload(payload);

    if (!isEventStats(eventsPayload)) {
      return {
        success: false,
        error: "Invalid dashboard analytics response format.",
      };
    }

    return {
      success: true,
      data: normalizeEventsData(eventsPayload),
    };
  } catch (error) {
    console.error("Error fetching event stats:", error);
    return {
      success: false,
      error: "An error occurred while fetching event stats.",
    };
  }
}

function extractTrendPayload(payload: unknown): unknown {
  if (!isRecord(payload)) {
    return payload;
  }

  const data = "data" in payload ? payload.data : payload;

  if (!isRecord(data)) {
    return data;
  }

  if ("items" in data) {
    return data.items;
  }

  if ("events" in data) {
    return data.events;
  }

  if ("trend" in data) {
    return data.trend;
  }

  if ("data" in data) {
    return data.data;
  }

  return data;
}

export async function fetchBookingRegistrationTrend(
  date: string,
): Promise<APIResponse<BookingRegistrationTrendData>> {
  if (!date.trim()) {
    return { success: false, error: "Date is required." };
  }

  const queryParams = new URLSearchParams({ date });

  try {
    const response = await authorizedAdminRequest(
      apiRoutes.dashboardBookingRegistrationTrend,
      {
        method: "GET",
        search: queryParams.toString(),
      },
    );

    const payload = await getResponsePayload(response);

    if (!response.ok) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) ||
          "Failed to fetch booking registration trend.",
        status: response.status,
      };
    }

    if (isRecord(payload) && "status" in payload && payload.status === false) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) ||
          "Failed to fetch booking registration trend.",
      };
    }

    const trendPayload = extractTrendPayload(payload);
    const trendItem = Array.isArray(trendPayload)
      ? trendPayload[0]
      : trendPayload;

    if (!isBookingRegistrationTrendInput(trendItem)) {
      return {
        success: false,
        error: "Invalid booking registration trend response format.",
      };
    }

    return {
      success: true,
      data: normalizeBookingRegistrationTrendData(trendItem, date),
    };
  } catch (error) {
    console.error("Error fetching booking registration trend:", error);
    return {
      success: false,
      error: "An error occurred while fetching booking registration trend.",
    };
  }
}

export async function fetchTotalBookingTrend(): Promise<
  APIResponse<TotalBookingTrendData[]>
> {
  try {
    const response = await authorizedAdminRequest(
      apiRoutes.dashboardTotalBookingTrend,
      {
        method: "GET",
      },
    );

    const payload = await getResponsePayload(response);

    if (!response.ok) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to fetch total booking trend.",
        status: response.status,
      };
    }

    if (isRecord(payload) && "status" in payload && payload.status === false) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to fetch total booking trend.",
      };
    }

    const trendPayload = extractTrendPayload(payload);

    if (!isTotalBookingTrendInput(trendPayload)) {
      return {
        success: false,
        error: "Invalid total booking trend response format.",
      };
    }

    return {
      success: true,
      data: normalizeTotalBookingTrendData(trendPayload),
    };
  } catch (error) {
    console.error("Error fetching total booking trend:", error);
    return {
      success: false,
      error: "An error occurred while fetching total booking trend.",
    };
  }
}
