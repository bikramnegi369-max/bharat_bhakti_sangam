"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { getEventBookings } from "@/_features/bookings/all-bookings/services/eventBookings.service";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { getPayloadMessage, getResponsePayload } from "@/_utils/api";
import { isRecord } from "@/_utils/guards";
import {
  buildSendEmailFormData,
  extractSendEmailValues,
  getSuggestedRecipientsFromBookings,
} from "../helpers";
import { sendEmailFormSchema } from "../schema";
import { EmailRecipientOption, SendEmailSummary } from "../types";

type SuggestedRecipientsResponse = {
  items: EmailRecipientOption[];
};

function getSuggestedRecipientsErrorMessage(error?: string): string {
  if (!error) {
    return "Unable to load recent client emails right now.";
  }

  const normalizedError = error.toLowerCase();

  if (
    normalizedError.includes("authorization") ||
    normalizedError.includes("unauthorized") ||
    normalizedError.includes("token")
  ) {
    return "Your admin session needs to be refreshed before recent client emails can be loaded.";
  }

  return "Unable to load recent client emails right now.";
}

function extractSendEmailSummary(
  payload: unknown,
  fallback: SendEmailSummary,
): SendEmailSummary {
  if (!isRecord(payload) || !isRecord(payload.data)) {
    return fallback;
  }

  const recipientCount =
    typeof payload.data.recipientCount === "number"
      ? payload.data.recipientCount
      : fallback.recipientCount;
  const attachmentCount =
    typeof payload.data.attachmentCount === "number"
      ? payload.data.attachmentCount
      : fallback.attachmentCount;

  return {
    recipientCount,
    attachmentCount,
  };
}

export async function getSuggestedEmailRecipients(): Promise<
  APIResponse<SuggestedRecipientsResponse>
> {
  try {
    const result = await getEventBookings({
      page: 1,
      limit: 100,
    });

    if (!result.success || !result.data) {
      return {
        success: false,
        error: getSuggestedRecipientsErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: {
        items: getSuggestedRecipientsFromBookings(result.data.items),
      },
    };
  } catch (error) {
    console.error("Error fetching suggested email recipients:", error);
    return {
      success: false,
      error: "Unable to load recent client emails right now.",
    };
  }
}

export async function sendAdminEmail(
  rawFormData: FormData,
): Promise<APIResponse<SendEmailSummary>> {
  try {
    const extractedValues = extractSendEmailValues(rawFormData);
    const validation = sendEmailFormSchema.safeParse(extractedValues);

    if (!validation.success) {
      return {
        success: false,
        error:
          validation.error.issues[0]?.message ||
          "Please review the email form and try again.",
      };
    }

    const normalizedFormData = buildSendEmailFormData(validation.data);
    const res = await authorizedAdminRequest(apiRoutes.sendAdminEmail, {
      method: "POST",
      body: normalizedFormData,
    });
    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to send email.",
      };
    }

    if (
      isRecord(payload) &&
      typeof payload.status === "boolean" &&
      payload.status === false
    ) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to send email.",
      };
    }

    return {
      success: true,
      data: extractSendEmailSummary(payload, {
        recipientCount: validation.data.recipients.length,
        attachmentCount: validation.data.attachments?.length || 0,
      }),
    };
  } catch (error) {
    console.error("Error sending admin email:", error);
    return {
      success: false,
      error: "Unable to send the email right now. Please try again shortly.",
    };
  }
}
