"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import {
  InfluencerFormData,
  InfluencerBackendPayload,
} from "@/_schemas/influencer.schema";
import { APIResponse } from "@/_types/Api.types";
import { InfluencerRequest } from "@/_types/Influencer.types";
import { TableQueryParams } from "@/_types/Table.types";
import { fetchWithTimeout } from "@/_utils/fetch";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isInfluencerRequest, isInfluencerListData } from "./guards";

export async function submitInfluencerForm(
  formData: InfluencerFormData,
): Promise<APIResponse> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const routes = apiRoutes as unknown as Record<string, string>;
  const endpoint = routes.influencer || "/influencer";
  const url = `${backendBase}${endpoint}`;

  const socialLinks: Record<string, string> = {};
  if (formData.instagramProfile?.trim()) {
    socialLinks.instagram = formData.instagramProfile.trim();
  }
  if (formData.youtubeChannel?.trim()) {
    socialLinks.youtube = formData.youtubeChannel.trim();
  }
  if (formData.facebookProfile?.trim()) {
    socialLinks.facebook = formData.facebookProfile.trim();
  }

  // Form data formatted to send to the backend
  const payload: InfluencerBackendPayload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    gender: formData.gender,
    address: {
      city: formData.address.city,
      state: formData.address.state,
      pincode: formData.address.pincode,
    },
    profilePicture: formData.profilePicture,
    ...(Object.keys(socialLinks).length > 0 ? { socialLinks } : {}),
  };

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit influencer request");
    }

    return { success: true };
  } catch (error) {
    console.error("Influencer Form Submission Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't submit your influencer request right now. Please try again later.",
    };
  }
}

export async function getInfluencers(
  params?: Partial<TableQueryParams>,
): Promise<
  APIResponse<{
    items: InfluencerRequest[];
    total: number;
    limit: number;
    page: number;
    totalPages?: number;
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

    const res = await authorizedAdminRequest(apiRoutes.getAllInfluencers, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch influencer requests",
        status: res.status,
      };
    }

    // Support both enveloped { status: true, data: { data: [], pagination: {} } } and direct format
    if (isApiEnvelope(payload, isInfluencerListData)) {
      return {
        success: true,
        data: {
          items: payload.data.data,
          total: payload.data.pagination.total ?? payload.data.data.length,
          limit: payload.data.pagination.limit ?? 10,
          page: payload.data.pagination.page ?? 1,
          totalPages: payload.data.pagination.totalPages,
        },
      };
    }

    if (isRecord(payload) && Array.isArray(payload.data)) {
      const items = (payload.data as unknown[]).filter(isInfluencerRequest);
      const pagination = isRecord(payload.pagination) ? payload.pagination : {};
      return {
        success: true,
        data: {
          items,
          total: typeof pagination.total === "number" ? pagination.total : items.length,
          limit: typeof pagination.limit === "number" ? pagination.limit : 10,
          page: typeof pagination.page === "number" ? pagination.page : 1,
          totalPages: typeof pagination.totalPages === "number" ? pagination.totalPages : 1,
        },
      };
    }

    return {
      success: true,
      data: {
        items: [],
        total: 0,
        limit: 10,
        page: 1,
        totalPages: 1,
      },
    };
  } catch (error) {
    console.error("Error fetching influencer requests:", error);
    return { success: false, error: "Failed to fetch influencer requests" };
  }
}

export async function addInfluencerAdmin(
  formData: InfluencerFormData,
): Promise<APIResponse> {
  try {
    const socialLinks: Record<string, string> = {};
    if (formData.instagramProfile?.trim()) {
      socialLinks.instagram = formData.instagramProfile.trim();
    }
    if (formData.youtubeChannel?.trim()) {
      socialLinks.youtube = formData.youtubeChannel.trim();
    }
    if (formData.facebookProfile?.trim()) {
      socialLinks.facebook = formData.facebookProfile.trim();
    }

    const payload: InfluencerBackendPayload & { status: string } = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      address: {
        city: formData.address.city,
        state: formData.address.state,
        pincode: formData.address.pincode,
      },
      profilePicture: formData.profilePicture,
      ...(Object.keys(socialLinks).length > 0 ? { socialLinks } : {}),
      status: "approved",
    };

    const res = await authorizedAdminRequest(apiRoutes.influencer, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const resPayload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(resPayload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(resPayload) || "Failed to add influencer",
        status: res.status,
      };
    }

    if (!resPayload.status) {
      return {
        success: false,
        error: resPayload.message || "Failed to add influencer",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding influencer:", error);
    return { success: false, error: "Failed to add influencer" };
  }
}

export async function getInfluencerById(
  id: string,
): Promise<APIResponse<InfluencerRequest>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.influencerById(id));
    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch influencer details",
      };
    }

    if (isApiEnvelope(payload, isInfluencerRequest)) {
      return { success: true, data: payload.data };
    }

    if (isRecord(payload) && isRecord(payload.data)) {
      return { success: true, data: payload.data as unknown as InfluencerRequest };
    }

    return {
      success: false,
      error: "Unexpected response format when fetching influencer details.",
    };
  } catch (error) {
    console.error("Error fetching influencer by id:", error);
    return { success: false, error: "Failed to fetch influencer details" };
  }
}

export async function updateInfluencer(
  id: string,
  data: Partial<InfluencerRequest>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.influencerById(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update influencer",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating influencer:", error);
    return { success: false, error: "Failed to update influencer" };
  }
}

export async function updateInfluencerRequestStatus(
  id: string,
  status: "approved" | "rejected" | string,
): Promise<APIResponse> {
  try {
    const queryParams = new URLSearchParams({
      id: id.trim(),
      status: status.trim(),
    });

    const res = await authorizedAdminRequest(apiRoutes.updateInfluencerStatus, {
      method: "PATCH",
      search: queryParams.toString(),
      headers: { "Content-Type": "application/json" },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || `Failed to ${status} influencer request`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error(`Error updating influencer status to ${status}:`, error);
    return {
      success: false,
      error: `Failed to ${status} influencer request`,
    };
  }
}

export async function deleteInfluencer(id: string): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.influencerById(id), {
      method: "DELETE",
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete influencer",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting influencer:", error);
    return {
      success: false,
      error: "Failed to delete influencer",
    };
  }
}

