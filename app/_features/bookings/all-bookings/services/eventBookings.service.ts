"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { EventBooking } from "@/_types/EventBooking.types";
import { TableQueryParams } from "@/_types/Table.types";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isEventBooking, isEventBookingsListData } from "./guards";

export async function getEventBookings(
  params?: Partial<TableQueryParams>,
): Promise<APIResponse<{ items: EventBooking[]; total: number }>> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.search) {
      queryParams.append("search", String(params.search).trim());
    }
    if (params?.sortBy) {
      queryParams.append("sortBy", String(params.sortBy));
    }
    if (params?.order) {
      queryParams.append("order", String(params.order));
    }
    if (params?.limit) {
      queryParams.append("limit", String(params.limit));
    }
    if (params?.page) {
      queryParams.append("page", String(params.page));
    }

    const res = await authorizedAdminRequest(apiRoutes.getAllBookings, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isEventBookingsListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch bookings",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch bookings",
      };
    }

    return {
      success: true,
      data: {
        items: payload.data.bookings,
        total: payload.data.total ?? payload.data.bookings.length,
      },
    };
  } catch (error) {
    console.error("Error fetching event bookings:", error);
    return { success: false, error: "Failed to fetch bookings" };
  }
}
