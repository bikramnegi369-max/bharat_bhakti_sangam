"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { Venue } from "@/_types/Venue.types";
import { TableQueryParams } from "@/_types/Table.types";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isVenue, isVenuesListData } from "./guards";

export async function getVenues(
  params?: Partial<TableQueryParams>,
): Promise<APIResponse<{ items: Venue[]; total: number }>> {
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

    const res = await authorizedAdminRequest(apiRoutes.getAllVenues, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    console.log("getVenues response:", payload);

    if (!res.ok || !isApiEnvelope(payload, isVenuesListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch venues",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch venues",
      };
    }

    return {
      success: true,
      data: {
        items: payload.data.data,
        total: payload.data.data.length,
      },
    };
  } catch (error) {
    console.error("Error fetching venues:", error);
    return { success: false, error: "Failed to fetch venues" };
  }
}

export async function addVenue(data: Partial<Venue>): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.addVenue, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to add venue",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to add venue",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding venue:", error);
    return { success: false, error: "Failed to add venue" };
  }
}

export async function getVenueById(id: string): Promise<APIResponse<Venue>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.venueById(id));
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isVenue)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch venue",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to fetch venue",
      };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("Error fetching venue by id:", error);
    return { success: false, error: "Failed to fetch venue" };
  }
}

export async function updateVenue(
  id: string,
  data: Partial<Venue>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.venueById(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update venue",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update venue",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating venue:", error);
    return { success: false, error: "Failed to update venue" };
  }
}

export async function updateVenueStatus(
  id: string,
  disable: boolean,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.updateVenueStatus(id), {
      method: "DELETE",
      body: JSON.stringify({ disable }),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update venue status",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update venue status",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating venue status:", error);
    return { success: false, error: "Failed to update venue status" };
  }
}
