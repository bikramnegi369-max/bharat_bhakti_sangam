"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { Artist } from "@/_types/Artists.types";
import { TableQueryParams } from "@/_types/Table.types";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isArtist, isArtistsListData } from "./guards";

export async function getArtists(
  params?: Partial<TableQueryParams>,
): Promise<APIResponse<{ items: Artist[]; total: number }>> {
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

    const res = await authorizedAdminRequest(apiRoutes.getAllArtists, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isArtistsListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch artists",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch artists",
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
    console.error("Error fetching artists:", error);
    return { success: false, error: "Failed to fetch artists" };
  }
}

export async function addArtist(data: Partial<Artist>): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.addArtist, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to add artist",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to add artist",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding artist:", error);
    return { success: false, error: "Failed to add artist" };
  }
}

export async function getArtistById(id: string): Promise<APIResponse<Artist>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.artistById(id));
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isArtist)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch artist",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to fetch artist",
      };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("Error fetching artist by id:", error);
    return { success: false, error: "Failed to fetch artist" };
  }
}

export async function updateArtist(
  id: string,
  data: Partial<Artist>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.artistById(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update artist",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update artist",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating artist:", error);
    return { success: false, error: "Failed to update artist" };
  }
}

export async function updateArtistStatus(
  id: string,
  disable: boolean,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.artistById(id), {
      method: "DELETE",
      body: JSON.stringify({ disable }),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update artist status",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update artist status",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating artist status:", error);
    return { success: false, error: "Failed to update artist status" };
  }
}
