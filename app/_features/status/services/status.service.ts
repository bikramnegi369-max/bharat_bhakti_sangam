"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import {
  StatusItem,
  StatusListResponseData,
  StatusQueryParams,
} from "@/_types/Status.types";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { fetchWithTimeout } from "@/_utils/fetch";
import { isStatusItem, isStatusListData } from "@/_features/status/services/guards";

/**
 * Fetch paginated status videos list with search, tag filter, and sort options.
 * Public endpoint for gallery & admin dashboard.
 */
export async function getStatusList(
  params?: StatusQueryParams,
): Promise<APIResponse<StatusListResponseData>> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append("page", String(params.page));
  if (params?.limit) queryParams.append("limit", String(params.limit));
  if (params?.search) queryParams.append("search", params.search.trim());
  if (params?.tag && params.tag !== "all") queryParams.append("tag", params.tag.trim());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.order) queryParams.append("order", params.order);

  const url = `${backendBase}${apiRoutes.status}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  try {
    const res = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const payload = await getResponsePayload(res);

    // Standard backend envelope validation
    if (res.ok && isApiEnvelope(payload, isStatusListData)) {
      return {
        success: true,
        data: {
          items: payload.data.data,
          total: payload.data.pagination.total,
          limit: payload.data.pagination.limit,
          page: payload.data.pagination.page,
          totalPages: payload.data.pagination.totalPages,
        },
      };
    }

    // Flexible fallback for standard response formats ({ status: true, data: { items: [], ... } })
    if (res.ok && isRecord(payload) && payload.status && isRecord(payload.data)) {
      const data = payload.data as Record<string, unknown>;
      const pagination = isRecord(data.pagination) ? data.pagination : undefined;
      const items = Array.isArray(data.data)
        ? (data.data as StatusItem[])
        : Array.isArray(data.items)
        ? (data.items as StatusItem[])
        : [];

      return {
        success: true,
        data: {
          items,
          total:
            typeof pagination?.total === "number"
              ? pagination.total
              : typeof data.total === "number"
              ? data.total
              : items.length,
          limit:
            typeof pagination?.limit === "number"
              ? pagination.limit
              : typeof data.limit === "number"
              ? data.limit
              : 10,
          page:
            typeof pagination?.page === "number"
              ? pagination.page
              : typeof data.page === "number"
              ? data.page
              : 1,
          totalPages:
            typeof pagination?.totalPages === "number"
              ? pagination.totalPages
              : typeof data.totalPages === "number"
              ? data.totalPages
              : 1,
        },
      };
    }

    return {
      success: false,
      error: getPayloadMessage(payload) || "Failed to fetch status videos",
      status: res.status,
    };
  } catch (error) {
    console.error("Error fetching status list:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching status videos",
    };
  }
}

/**
 * Fetch single status video details by ID.
 */
export async function getStatusById(
  id: string,
): Promise<APIResponse<StatusItem>> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${backendBase}${apiRoutes.statusById(id)}`;

  try {
    const res = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const payload = await getResponsePayload(res);

    if (res.ok && isApiEnvelope(payload, isStatusItem)) {
      return { success: true, data: payload.data };
    }

    if (res.ok && isRecord(payload) && payload.status && isRecord(payload.data)) {
      return { success: true, data: payload.data as unknown as StatusItem };
    }

    return {
      success: false,
      error: getPayloadMessage(payload) || "Failed to fetch status details",
      status: res.status,
    };
  } catch (error) {
    console.error("Error fetching status by ID:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching status details",
    };
  }
}

/**
 * Admin: Add new status video.
 */
export async function addStatus(
  data: { videoUrl: string; tags: string[]; thumbnailUrl?: string },
): Promise<APIResponse<StatusItem>> {
  const cleanedTags = data.tags
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  try {
    const res = await authorizedAdminRequest(apiRoutes.status, {
      method: "POST",
      body: JSON.stringify({
        videoUrl: data.videoUrl,
        thumbnailUrl:
          data.thumbnailUrl || data.videoUrl.replace(/\.[^/.]+$/, ".jpg"),
        tags: cleanedTags,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to add status video",
        status: res.status,
      };
    }

    if (isRecord(payload) && !payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to add status video",
      };
    }

    const createdItem = isRecord(payload) && isRecord(payload.data)
      ? (payload.data as unknown as StatusItem)
      : undefined;

    return { success: true, data: createdItem };
  } catch (error) {
    console.error("Error adding status video:", error);
    return {
      success: false,
      error: "An unexpected error occurred while adding status video",
    };
  }
}

/**
 * Admin: Update status video & tags by ID.
 */
export async function updateStatus(
  id: string,
  data: { videoUrl?: string; tags?: string[]; thumbnailUrl?: string },
): Promise<APIResponse<StatusItem>> {
  const cleanedTags = data.tags
    ? data.tags.map((t) => t.trim().toLowerCase()).filter(Boolean)
    : undefined;

  // Fallback: If custom poster/thumbnail is empty or not provided, auto-generate poster from videoUrl (.jpg)
  const resolvedThumbnailUrl =
    data.thumbnailUrl && data.thumbnailUrl.trim() !== ""
      ? data.thumbnailUrl
      : data.videoUrl
        ? data.videoUrl.replace(/\.[^/.]+$/, ".jpg")
        : undefined;

  try {
    const res = await authorizedAdminRequest(apiRoutes.statusById(id), {
      method: "PUT",
      body: JSON.stringify({
        ...(data.videoUrl ? { videoUrl: data.videoUrl } : {}),
        ...(resolvedThumbnailUrl !== undefined ? { thumbnailUrl: resolvedThumbnailUrl } : {}),
        ...(cleanedTags ? { tags: cleanedTags } : {}),
      }),
      headers: { "Content-Type": "application/json" },
    });
    
    const payload = await getResponsePayload(res);
    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update status video",
        status: res.status,
      };
    }

    if (isRecord(payload) && !payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update status video",
      };
    }

    const updatedItem = isRecord(payload) && isRecord(payload.data)
      ? (payload.data as unknown as StatusItem)
      : undefined;

    return { success: true, data: updatedItem };
  } catch (error) {
    console.error("Error updating status video:", error);
    return {
      success: false,
      error: "An unexpected error occurred while updating status video",
    };
  }
}

/**
 * Admin: Delete status video by ID.
 */
export async function deleteStatus(id: string): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.statusById(id), {
      method: "DELETE",
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete status video",
        status: res.status,
      };
    }

    if (isRecord(payload) && !payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete status video",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting status video:", error);
    return {
      success: false,
      error: "An unexpected error occurred while deleting status video",
    };
  }
}

/**
 * Track status video download count.
 */
export async function incrementDownload(id: string): Promise<APIResponse> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${backendBase}${apiRoutes.statusDownload(id)}`;

  try {
    const res = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to record download",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error recording status download:", error);
    return { success: false, error: "Network error tracking download" };
  }
}
