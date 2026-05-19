import {
  EventsApiResponse,
  RawEventsApiResponse,
} from "@/_types/dashboard.type";
import { normalizeEventsData } from "@/_utils/dashboard.utils";
import { APIResponse } from "@/_types/Api.types";

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
