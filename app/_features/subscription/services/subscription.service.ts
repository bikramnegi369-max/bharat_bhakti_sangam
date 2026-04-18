"use server";

import { apiRoutes } from "@/_config/Routes.config";
import axios from "@/_lib/axios";
import { APIResponse } from "@/_types/Api.types";

export async function subscribeToNewsletter(
  email: string,
): Promise<APIResponse> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  try {
    await axios.post(apiRoutes.subscribe, { email });

    return { success: true };
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
