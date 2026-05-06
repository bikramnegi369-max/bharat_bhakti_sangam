"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { Volunteer } from "@/_types/Volunteer.types";
import { TableQueryParams } from "@/_types/Table.types";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isVolunteer, isVolunteersListData } from "./guards";

export async function getVolunteers(
  params?: Partial<TableQueryParams>,
): Promise<
  APIResponse<{
    items: Volunteer[];
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

    const res = await authorizedAdminRequest(apiRoutes.getAllVolunteers, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isVolunteersListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch volunteers",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch volunteers",
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
    console.error("Error fetching volunteers:", error);
    return { success: false, error: "Failed to fetch volunteers" };
  }
}

export async function addVolunteer(
  data: Partial<Volunteer>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.addVolunteer, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to add volunteer",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to add volunteer",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding volunteer:", error);
    return { success: false, error: "Failed to add volunteer" };
  }
}

export async function getVolunteerById(
  id: string,
): Promise<APIResponse<Volunteer>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.volunteerById(id));
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isVolunteer)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch volunteer",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to fetch volunteer",
      };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("Error fetching volunteer by id:", error);
    return { success: false, error: "Failed to fetch volunteer" };
  }
}

export async function updateVolunteer(
  id: string,
  data: Partial<Volunteer>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.volunteerById(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update volunteer",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update volunteer",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating volunteer:", error);
    return { success: false, error: "Failed to update volunteer" };
  }
}

export async function updateVolunteerStatus(
  id: string,
  disable: boolean,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.volunteerById(id), {
      method: "DELETE",
      body: JSON.stringify({ disable }),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to update volunteer status",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update volunteer status",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating volunteer status:", error);
    return { success: false, error: "Failed to update volunteer status" };
  }
}
