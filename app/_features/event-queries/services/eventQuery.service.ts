"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { EventQuery } from "@/_types/EventQuery.types";
import { TableQueryParams } from "@/_types/Table.types";
import { isApiEnvelope } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isEventQueriesListData } from "./guards";

export async function getEventQueries(
  params?: Partial<TableQueryParams>,
): Promise<APIResponse<{ items: EventQuery[]; total: number }>> {
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

    const res = await authorizedAdminRequest(apiRoutes.getAllEventQueries, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isEventQueriesListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch event queries",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch event queries",
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
    console.error("Error fetching event queries:", error);
    return { success: false, error: "Failed to fetch event queries" };
  }
}
