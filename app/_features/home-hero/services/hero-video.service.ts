"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import {
  HeroVideoConfig,
  HeroVideoUpdateRequest,
} from "@/_types/HeroVideo.types";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { fetchWithTimeout } from "@/_utils/fetch";
import { isRecord } from "@/_utils/guards";
import { revalidatePath, revalidateTag } from "next/cache";

const DEFAULT_VIDEO_URL = "/hero-video.mp4";

/**
 * Fetch the active Home Hero Video from the backend API.
 * Returns { videoUrl: string }.
 */
export async function getHeroVideo(): Promise<APIResponse<HeroVideoConfig>> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${backendBase}${apiRoutes.heroVideo}`;

  try {
    const res = await fetchWithTimeout(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["home-hero-video"],
      },
    });

    const payload = await getResponsePayload(res);

    if (res.ok && isRecord(payload)) {
      if (payload.status !== false) {
        const data =
          "data" in payload && isRecord(payload.data)
            ? payload.data
            : payload;

        const videoUrl =
          typeof data.videoUrl === "string" && data.videoUrl.trim() !== ""
            ? data.videoUrl
            : typeof data.url === "string" && data.url.trim() !== ""
            ? data.url
            : DEFAULT_VIDEO_URL;
        return {
          success: true,
          data: { videoUrl },
        };
      }
    }

    return {
      success: true,
      data: { videoUrl: DEFAULT_VIDEO_URL },
    };
  } catch (error) {
    console.warn("Backend hero video fetch fallback:", error);
    return {
      success: true,
      data: { videoUrl: DEFAULT_VIDEO_URL },
    };
  }
}

/**
 * Update the Home Hero Video via the authorized backend admin API.
 * Sends POST request with { videoUrl }.
 */
export async function updateHeroVideo(
  payload: HeroVideoUpdateRequest,
): Promise<APIResponse<HeroVideoConfig>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.heroVideo, {
      method: "POST",
      body: JSON.stringify({
        videoUrl: payload.videoUrl,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const resPayload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error:
          getPayloadMessage(resPayload) || "Failed to update home hero video.",
        status: res.status,
      };
    }

    if (isRecord(resPayload) && resPayload.status === false) {
      return {
        success: false,
        error:
          getPayloadMessage(resPayload) || "Failed to update home hero video.",
      };
    }

    revalidatePath("/");
    revalidatePath("/admin/home/hero-video");
    revalidateTag("home-hero-video", "default");

    return {
      success: true,
      data: { videoUrl: payload.videoUrl },
    };
  } catch (error) {
    console.error("Error setting hero video in backend:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while updating hero video.",
    };
  }
}
