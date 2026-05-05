"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import { APIResponse } from "@/_types/Api.types";
import { EventFeedback } from "@/_types/feedback.types";
import { TableQueryParams } from "@/_types/Table.types";
import { fetchWithTimeout } from "@/_utils/fetch";
import { isApiEnvelope } from "@/_utils/guards";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { isEventFeedbacksListData } from "./guards";

export async function getEventFeedbacks(
  params?: Partial<TableQueryParams>,
): Promise<
  APIResponse<{
    items: EventFeedback[];
    total: number;
    limit?: number;
    page?: number;
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

    const res = await authorizedAdminRequest(apiRoutes.getAllFeedbacks, {
      method: "GET",
      search: queryParams.toString(),
    });
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isEventFeedbacksListData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch feedback",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to fetch feedback",
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
    console.error("Error fetching event feedback:", error);
    return { success: false, error: "Failed to fetch feedback" };
  }
}

export async function submitFeedbackForm(
  data: FeedbackFormData,
): Promise<APIResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.feedback}`;
  const { feedback, ratings, ...rest } = data;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rest,
        message: feedback,
        rating: ratings,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit feedback");
    }

    return { success: true };
  } catch (error) {
    console.error("Feedback Submission Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't submit your feedback right now. Please try again later.",
    };
  }
}
