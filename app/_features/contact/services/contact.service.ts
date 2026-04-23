"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { ContactFormData } from "@/_schemas/contact.schema";
import { APIResponse } from "@/_types/Api.types";

export async function submitContactForm(
  payload: ContactFormData,
): Promise<APIResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.contact}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit form");
    }

    return { success: true };
  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    return {
      success: false,
      error: "We couldn't send your message right now. Please try again later.",
    };
  }
}
