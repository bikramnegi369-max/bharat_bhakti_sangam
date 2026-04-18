"use server";

import { apiRoutes } from "@/_config/Routes.config";
import axiosInstance from "@/_lib/axios";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import { APIResponse } from "@/_types/Api.types";

export async function submitFeedbackForm(
  data: FeedbackFormData,
): Promise<APIResponse> {
  const { feedback, ratings, ...rest } = data;

  try {
    await axiosInstance.post(apiRoutes.feedback, {
      ...rest,
      message: feedback,
      rating: ratings,
    });

    return { success: true };
  } catch (error) {
    console.error("Feedback Submission Error:", error);
    return {
      success: false,
      error:
        "We couldn't submit your feedback right now. Please try again later.",
    };
  }
}
