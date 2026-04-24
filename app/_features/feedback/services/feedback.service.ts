"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";

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
