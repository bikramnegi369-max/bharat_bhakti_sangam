"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { APIResponse } from "@/_types/Api.types";

export async function subscribeToNewsletter(
  email: string,
): Promise<APIResponse> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.subscribe}`;

  try {
    const response = await fetch(url, {
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
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
    };
  }
}
