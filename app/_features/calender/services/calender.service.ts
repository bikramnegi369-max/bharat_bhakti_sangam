"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { TableQueryParams } from "@/_types/Table.types";
import { getPayloadMessage, getResponsePayload } from "@/_utils/api";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { isCalenderEntriesListData, isCalenderEntry } from "./guards";

type CalenderEntriesResponse = APIResponse<{
  items: CalenderEntry[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
}>;

function buildTableQueryParams(params?: Partial<TableQueryParams>) {
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

  return queryParams.toString();
}

export async function getCalenderEntries(
  params?: Partial<TableQueryParams>,
): Promise<CalenderEntriesResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.getAllCalenderEntries, {
      method: "GET",
      search: buildTableQueryParams(params),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isCalenderEntriesListData)) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to fetch calender entries",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to fetch calender entries",
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
    console.error("Error fetching calender entries:", error);
    return {
      success: false,
      error: "Failed to fetch calender entries",
    };
  }
}

export async function addCalenderEntry(
  data: Partial<CalenderEntry>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.addCalenderEntry, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to create calender entry",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to create calender entry",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating calender entry:", error);
    return {
      success: false,
      error: "Failed to create calender entry",
    };
  }
}

export async function getCalenderEntryById(
  id: string,
): Promise<APIResponse<CalenderEntry>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.calenderEntryById(id));
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isCalenderEntry)) {
      return {
        success: false,
        error:
          getPayloadMessage(payload) || "Failed to fetch calender entry",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to fetch calender entry",
      };
    }

    return { success: true, data: payload.data };
  } catch (error) {
    console.error("Error fetching calender entry by id:", error);
    return {
      success: false,
      error: "Failed to fetch calender entry",
    };
  }
}

export async function updateCalenderEntry(
  id: string,
  data: Partial<CalenderEntry>,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.calenderEntryById(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update calender entry",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to update calender entry",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating calender entry:", error);
    return {
      success: false,
      error: "Failed to update calender entry",
    };
  }
}
