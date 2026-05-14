"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { EventBookingType } from "@/_types/EventBookingType.types";
import { TableQueryParams } from "@/_types/Table.types";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isEventBookingType, isEventBookingTypesListData } from "./guards";

export async function getEventBookingTypes(
  params?: Partial<TableQueryParams>,
): Promise<
  APIResponse<{
    items: EventBookingType[];
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  }>
> {
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

    const res = await authorizedAdminRequest(apiRoutes.getAllBookingTypes, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isEventBookingTypesListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch booking types",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch booking types",
      };
    }

    return {
      success: true,
      data: {
        items: payload.data.data,
        total: payload.data.pagination.total ?? payload.data.data.length,
        limit: payload.data.pagination.limit,
        page: payload.data.pagination.page,
        totalPages: payload.data.pagination.totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching event booking types:", error);
    return { success: false, error: "Failed to fetch booking types" };
  }
}

export async function addBookingType(
  data: Partial<EventBookingType>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.addBookingType, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to add booking type",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to add booking type",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding booking type:", error);
    return { success: false, error: "Failed to add booking type" };
  }
}

export async function getBookingTypeById(
  id: string,
): Promise<APIResponse<EventBookingType>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.bookingTypeById(id));
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isEventBookingType)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch booking type",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to fetch booking type",
      };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("Error fetching booking type by id:", error);
    return { success: false, error: "Failed to fetch booking type" };
  }
}

export async function updateBookingType(
  id: string,
  data: Partial<EventBookingType>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.bookingTypeById(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update booking type",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update booking type",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating booking type:", error);
    return { success: false, error: "Failed to update booking type" };
  }
}

export async function deleteBookingType(id: string): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.bookingTypeById(id), {
      method: "DELETE",
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete booking type",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to delete booking type",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting booking type:", error);
    return { success: false, error: "Failed to delete booking type" };
  }
}
