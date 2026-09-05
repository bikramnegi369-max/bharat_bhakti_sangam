"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";

export async function subscribeToNewsletter(
  email: string,
): Promise<APIResponse> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.subscribe}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Subscription failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    let userMessage = "Something went wrong. Please try again in a moment.";

    if (error instanceof Error) {
      if (
        error.name === "AbortError" ||
        error.message.toLowerCase().includes("timed out")
      ) {
        userMessage =
          "We couldn't reach the server just now. Please tap 'Notify Me' once more!";
      } else if (error.message.toLowerCase().includes("failed to fetch")) {
        userMessage =
          "Unable to connect right now. Please check your internet and try again.";
      } else {
        userMessage = error.message;
      }
    }

    return {
      success: false,
      error: userMessage,
    };
  }
}
