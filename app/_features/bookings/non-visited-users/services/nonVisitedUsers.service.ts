"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { NonVisitedUser } from "@/_types/NonVisitedUser.types";
import { APIResponse } from "@/_types/Api.types";
import { TableQueryParams } from "@/_types/Table.types";
import { getPayloadMessage, getResponsePayload } from "@/_utils/api";
import { isApiEnvelope } from "@/_utils/guards";
import { isNonVisitedUsersListData } from "./guards";

export async function getNonVisitedUsers(
  params?: Partial<TableQueryParams>,
): Promise<
  APIResponse<{
    items: NonVisitedUser[];
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

    const res = await authorizedAdminRequest(apiRoutes.getNonVisitedUsers, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isNonVisitedUsersListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch non visited users",
        status: res.status,
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch non visited users",
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
    console.error("Error fetching non visited users:", error);
    return { success: false, error: "Failed to fetch non visited users" };
  }
}
