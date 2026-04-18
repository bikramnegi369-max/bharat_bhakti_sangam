"use server";

import { apiRoutes } from "@/_config/Routes.config";
import axiosInstance from "@/_lib/axios";
import { ContactFormData } from "@/_schemas/contact.schema";
import { APIResponse } from "@/_types/Api.types";

export async function submitContactForm(
  payload: ContactFormData,
): Promise<APIResponse> {
  try {
    await axiosInstance.post(apiRoutes.contact, payload);
    return { success: true };
  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    return {
      success: false,
      error: "We couldn't send your message right now. Please try again later.",
    };
  }
}
