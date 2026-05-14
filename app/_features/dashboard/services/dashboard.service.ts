import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { EventsApiResponse } from "@/_types/dashboard.type";
import { getPayloadMessage, getResponsePayload } from "@/_utils/api";
import { isApiEnvelope } from "@/_utils/guards";
import { isEventStats } from "./guards";
import { APIResponse } from "@/_types/Api.types";

const MOCK_EVENTS: EventsApiResponse = [
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
    title: "National Youth Convention 2026",
    date: "2026-08-22",
    venue: "Pragati Maidan",
    status: "last",
    stats: {
      totalBookings: 2400,
      attended: 0,
      attendanceRateDelta: 0,
    },
  },
  {
    id: "evt-003",
    title: "Diwali Utsav 2025",
    date: "2025-10-20",
    venue: "Lodi Gardens",
    status: "earlier",
    stats: {
      totalBookings: 750,
      attended: 680,
      attendanceRateDelta: -3,
    },
  },
];

export async function fetchEventStats(): Promise<
  APIResponse<EventsApiResponse>
> {
  try {
    // const res = await authorizedAdminRequest(apiRoutes.dashboardEventStats);
    // const payload = await getResponsePayload(res);

    // if (!res.ok || !isApiEnvelope(payload, isEventStats)) {
    //   return {
    //     success: false,
    //     error: getPayloadMessage(payload) || "Failed to fetch event stats",
    //   };
    // }

    // if (!payload.status) {
    //   return {
    //     success: false,
    //     error: "No event stats available",
    //   };
    // }

    return {
      success: true,
      data: MOCK_EVENTS,
    };
  } catch (error) {
    console.error("Error fetching event stats:", error);
    return {
      success: false,
      error: "An error occurred while fetching event stats",
    };
  }
}
