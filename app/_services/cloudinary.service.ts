"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { getPayloadMessage, getResponsePayload } from "@/_utils/api";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { APIResponse } from "@/_types/Api.types";
import { isRawCloudinarySignatureData } from "./cloudinary.guards";

export interface CloudinarySignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder?: string;
  returnDeleteToken?: boolean;
}

export async function getCloudinarySignature(): Promise<
  APIResponse<CloudinarySignature>
> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.preSignedUrl);
    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRawCloudinarySignatureData)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to get upload signature",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to get upload signature",
      };
    }

    const data = payload.data;

    return {
      success: true,
      data: {
        signature: data.signature,
        timestamp: data.timestamp || data.timestamps!, // Use non-null assertion as guard ensures one is present
        apiKey: data.apiKey,
        cloudName: data.cloudName,
        folder: data.folder,
        returnDeleteToken: data.returnDeleteToken,
      },
    };
  } catch (error) {
    console.error("Error fetching Cloudinary signature:", error);
    return {
      success: false,
      error: "An unexpected error occurred while preparing upload",
    };
  }
}

export async function deleteImageByPublicId(
  publicId: string,
): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(
      `${apiRoutes.preSignedUrl}/delete`,
      {
        method: "POST",
        body: JSON.stringify({ public_id: publicId }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const payload = await getResponsePayload(res);

    if (!res.ok || !isApiEnvelope(payload, isRecord)) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete image",
      };
    }

    if (!payload.status) {
      return {
        success: false,
        error: payload.message || "Failed to delete image",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while deleting",
    };
  }
}
