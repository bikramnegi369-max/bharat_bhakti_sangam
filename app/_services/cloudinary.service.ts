"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";

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
    if (!res.ok) throw new Error();

    const payload = await res.json();
    // Map 'timestamps' (plural) from backend to 'timestamp' (singular) for Cloudinary
    const data = payload.data;

    return {
      success: true,
      data: {
        ...data,
        timestamp: data.timestamp || data.timestamps,
      },
    };
  } catch (error) {
    return { success: false, error: "Failed to get upload signature" };
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
      },
    );
    return { success: res.ok };
  } catch (error) {
    return { success: false, error: "Failed to delete image" };
  }
}
