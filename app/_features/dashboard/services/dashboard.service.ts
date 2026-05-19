"use server";

import {
  BookingRegistrationTrendData,
  EventsApiResponse,
  RawEventsApiResponse,
} from "@/_types/dashboard.type";
import {
  normalizeBookingRegistrationTrendData,
  normalizeEventsData,
} from "@/_utils/dashboard.utils";
import { APIResponse } from "@/_types/Api.types";
import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { getPayloadMessage, getResponsePayload } from "@/_utils/api";
import { isRecord } from "@/_utils/guards";
import { isBookingRegistrationTrendInput } from "./guards";

const MOCK_EVENTS: RawEventsApiResponse = [
  {
    id: "evt-001",
    title: "Bharat Bhakti Sangam 2026",
    date: "2026-06-14",
    venue: "Club Park",
    status: "current",
    stats: {
      totalBookings: 1090,
      attended: 980,
      attendanceRateDelta: 12,
    },
  },
  {
    id: "evt-002",
    title: "Bharat Bhakti Sangam 2.0",
    date: "",
    venue: "",
    status: "last",
    stats: {
      totalBookings: 0,
      attended: 0,
      attendanceRateDelta: 0,
    },
  },
  {
    id: "evt-003",
    title: "Bharat Bhakti Sangam 3.0",
    date: "",
    venue: "",
    status: "earlier",
    stats: {
      totalBookings: 0,
      attended: 0,
      attendanceRateDelta: 0,
    },
  },
];

export async function fetchEventStats(): Promise<
  APIResponse<EventsApiResponse>
> {
  try {
    return {
      success: true,
      data: normalizeEventsData(MOCK_EVENTS),
    };
  } catch (error) {
    console.error("Error fetching event stats:", error);
    return {
      success: false,
      error: "An error occurred while fetching event stats",
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
