"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import {
  Sponsor,
  SponsorEnquiryRecord,
  SponsorEnquiryStatus,
} from "@/_types/Sponsors.types";
import { TableQueryParams } from "@/_types/Table.types";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { isSponsorEnquiryListData, isSponsorEnquiryRecord } from "./guards";

export async function getSponsors(): Promise<APIResponse<Sponsor[]>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.getAllSponsors);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: "Failed to fetch sponsors" };
  }
}

export async function getSponsorEnquiries(
  params?: Partial<TableQueryParams>,
): Promise<
  APIResponse<{
    items: SponsorEnquiryRecord[];
    total: number;
    page: number;
    limit: number;
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

    const res = await authorizedAdminRequest(apiRoutes.getAllSponsorEnquiries, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch sponsor enquiries",
        status: res.status,
      };
    }

    // Support both enveloped format and direct array/fallback
    if (isApiEnvelope(payload, isSponsorEnquiryListData)) {
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
      const items = (payload.data as unknown[]).filter(isSponsorEnquiryRecord);
      return {
        success: true,
        data: {
          items,
          total: items.length,
          limit: params?.limit ?? 10,
          page: params?.page ?? 1,
          totalPages: 1,
        },
      };
    }

    return {
      success: true,
      data: {
        items: [],
        total: 0,
        limit: params?.limit ?? 10,
        page: params?.page ?? 1,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error("Failed to fetch sponsor enquiries:", error);
    return {
      success: false,
      error: "Failed to fetch sponsor enquiries",
    };
  }
}

export async function updateSponsorEnquiryStatus(
  id: string,
  status: SponsorEnquiryStatus,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(
      `${apiRoutes.sponsorEnquiry}/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const payload = await getResponsePayload(res);
    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || `Failed to update status to ${status}`,
        status: res.status,
      };
    }

    return {
      success: true,
      data: isRecord(payload) ? payload : {},
    };
  } catch (error) {
    console.error("Failed to update sponsor enquiry status:", error);
    return {
      success: false,
      error: `Failed to update status to ${status}`,
    };
  }
}

export async function deleteSponsorEnquiry(id: string): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(
      `${apiRoutes.sponsorEnquiry}/${id}`,
      {
        method: "DELETE",
      },
    );

    const payload = await getResponsePayload(res);
    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete sponsor enquiry",
        status: res.status,
      };
    }

    return {
      success: true,
      data: isRecord(payload) ? payload : {},
    };
  } catch (error) {
    console.error("Failed to delete sponsor enquiry:", error);
    return {
      success: false,
      error: "Failed to delete sponsor enquiry",
    };
  }
}
