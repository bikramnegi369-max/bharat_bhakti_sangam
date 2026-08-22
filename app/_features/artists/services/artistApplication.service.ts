"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import {
  ArtistApplicationFormData,
  ArtistApplicationBackendPayload,
} from "@/_schemas/artistApplication.schema";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";

export async function submitArtistApplication(
  formData: ArtistApplicationFormData,
): Promise<APIResponse> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const routes = apiRoutes as unknown as Record<string, string>;
  const endpoint = routes.artistJoin || routes.addArtist || "/artist";
  const url = `${backendBase}${endpoint}`;

  const payload: ArtistApplicationBackendPayload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    gender: formData.gender,
    address: {
      city: formData.address.city,
      state: formData.address.state,
      pincode: formData.address.pincode,
    },
    profilePicture: formData.profilePicture,
    ...(formData.instagramProfile ? { instagramProfile: formData.instagramProfile } : {}),
    ...(formData.facebookProfile ? { facebookProfile: formData.facebookProfile } : {}),
    ...(formData.youtubeChannel ? { youtubeChannel: formData.youtubeChannel } : {}),
  };

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit artist request");
    }

    return { success: true };
  } catch (error) {
    console.error("Artist Application Submission Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "We couldn't submit your artist request right now. Please try again later.",
    };
  }
}
