"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { EventCategory } from "@/_types/EventCategories.types";
import { TableQueryParams } from "@/_types/Table.types";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isEventCategory, isEventCategoriesListData } from "./guards";

export async function getEventCategories(
  params?: Partial<TableQueryParams>,
): Promise<APIResponse<{ items: EventCategory[]; total: number }>> {
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

    const res = await authorizedAdminRequest(apiRoutes.getAllCategories, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isEventCategoriesListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch categories",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch categories",
      };
    }

    return {
      success: true,
      data: {
        items: payload.data.categories,
        total: payload.data.total ?? payload.data.categories.length,
      },
    };
  } catch (error) {
    console.error("Error fetching event categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function addCategory(
  data: Partial<EventCategory>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.addCategory, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to add category",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to add category",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, error: "Failed to add category" };
  }
}

export async function getCategoryById(
  id: string,
): Promise<APIResponse<EventCategory>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.categoryById(id));
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isEventCategory)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch category",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to fetch category",
      };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("Error fetching category by id:", error);
    return { success: false, error: "Failed to fetch category" };
  }
}

export async function updateCategory(
  id: string,
  data: Partial<EventCategory>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.categoryById(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update category",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update category",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function updateCategoryStatus(
  id: string,
  disable: boolean,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.categoryById(id), {
      method: "DELETE",
      body: JSON.stringify({ disable }),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update category status",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update category status",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating category status:", error);
    return { success: false, error: "Failed to update category status" };
  }
}
