"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import {
  SponsorEnquiryFormData,
  sponsorEnquirySchema,
} from "../schemas/sponsorEnquiry.schema";
import { SponsorEnquiryBackendPayload } from "../types/sponsors.types";

export async function submitSponsorEnquiry(
  formData: SponsorEnquiryFormData,
): Promise<APIResponse<{ message?: string }>> {
  // 1. Server-side validation with Zod
  const validation = sponsorEnquirySchema.safeParse(formData);
  if (!validation.success) {
    const errorMsg =
      validation.error.issues[0]?.message || "Invalid form submission data";
    return { success: false, error: errorMsg };
  }

  const validData = validation.data;

  // 2. Structured dedicated Sponsorship backend payload
  const payload: SponsorEnquiryBackendPayload = {
    fullName: validData.fullName,
    companyName: validData.companyName,
    email: validData.email,
    phone: validData.phone.replace(/[^0-9]/g, ""),
    sponsorshipInterest: validData.sponsorshipInterest,
    ...(validData.designation?.trim()
      ? { designation: validData.designation.trim() }
      : {}),
    ...(validData.websiteOrInstagram?.trim()
      ? { websiteOrInstagram: validData.websiteOrInstagram.trim() }
      : {}),
    ...(validData.estimatedBudgetRange?.trim()
      ? { estimatedBudgetRange: validData.estimatedBudgetRange.trim() }
      : {}),
    ...(validData.productServiceContribution?.trim()
      ? { productServiceContribution: validData.productServiceContribution.trim() }
      : {}),
    ...(validData.additionalMessage?.trim()
      ? { additionalMessage: validData.additionalMessage.trim() }
      : {}),
  };

  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const endpoint = apiRoutes.sponsorEnquiry;
  const url = `${backendBase}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await getResponsePayload(response);
      const message =
        getPayloadMessage(errorData) ||
        "Failed to submit your sponsorship enquiry. Please try again.";
      throw new Error(message);
    }

    const resData = await getResponsePayload(response);
    const successMessage =
      getPayloadMessage(resData) ||
      "Thank you for reaching out! Our sponsorship team will contact you shortly.";

    return {
      success: true,
      data: {
        message: successMessage,
      },
    };
  } catch (error) {
    console.error("Sponsor Enquiry Submission Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't submit your enquiry right now. Please try again later or reach out directly at contact@bharatbhaktisangam.com",
    };
  }
}
