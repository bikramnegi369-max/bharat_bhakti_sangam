"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import {
  VideoReviewItem,
  VideoReviewItemInput,
  VideoReviewListResponseData,
} from "../types";
import { DEFAULT_VIDEO_REVIEWS } from "../constants";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { fetchWithTimeout } from "@/_utils/fetch";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { isVideoReviewsListData } from "./guards";
import { revalidatePath, revalidateTag } from "next/cache";
import { derivePosterFromVideoUrl } from "../utils";

/**
 * Normalizes raw review record from API or local into standard VideoReviewItem format.
 */
function normalizeVideoReviewItem(raw: Record<string, unknown>, index: number): VideoReviewItem {
  const id =
    (typeof raw._id === "string" && raw._id) ||
    (typeof raw.id === "string" && raw.id) ||
    (typeof raw.id === "number" && String(raw.id)) ||
    `video-review-${index + 1}`;

  const title = (typeof raw.title === "string" && raw.title) || "Divine Experience";
  const reviewerName = typeof raw.reviewerName === "string" ? raw.reviewerName : "";
  const location = typeof raw.location === "string" ? raw.location : "";
  const rating = typeof raw.rating === "number" ? raw.rating : 5;

  const videoSrc =
    (typeof raw.videoSrc === "string" && raw.videoSrc) ||
    (typeof raw.videoUrl === "string" && raw.videoUrl) ||
    "/home/insta_highlight/insta_highlight_1.mp4";

  const highlightVideoSrc =
    (typeof raw.highlightVideoSrc === "string" && raw.highlightVideoSrc) ||
    (typeof raw.highlightUrl === "string" && raw.highlightUrl) ||
    videoSrc;

  const posterSrc =
    (typeof raw.posterSrc === "string" && raw.posterSrc) ||
    (typeof raw.thumbnailUrl === "string" && raw.thumbnailUrl) ||
    derivePosterFromVideoUrl(highlightVideoSrc || videoSrc);

  return {
    id,
    _id: typeof raw._id === "string" ? raw._id : String(id),
    title,
    reviewerName,
    location,
    rating,
    highlightVideoSrc,
    posterSrc,
    videoSrc,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : undefined,
  };
}

/**
 * Public function to fetch video reviews for the homepage.
 * Revalidates every 60s via Next ISR tag.
 */
export async function getPublicVideoReviews(limit?: number): Promise<VideoReviewItem[]> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const searchParams = new URLSearchParams();
  if (typeof limit === "number" && limit > 0) {
    searchParams.set("limit", String(limit));
  }
  const queryString = searchParams.toString();
  const url = `${backendBase}${apiRoutes.videoReviews}${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetchWithTimeout(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: {
        revalidate: 60,
        tags: ["video-reviews"],
      },
    });

    const payload = await getResponsePayload(res);

    if (res.ok && isRecord(payload)) {
      let rawList: unknown[] = [];

      if (Array.isArray(payload.data)) {
        rawList = payload.data;
      } else if (isRecord(payload.data) && Array.isArray(payload.data.items)) {
        rawList = payload.data.items;
      } else if (isRecord(payload.data) && Array.isArray(payload.data.data)) {
        rawList = payload.data.data;
      } else if (Array.isArray(payload.items)) {
        rawList = payload.items;
      }

      if (rawList.length > 0) {
        const normalized = rawList
          .filter(isRecord)
          .map((item, idx) => normalizeVideoReviewItem(item, idx));

        return typeof limit === "number" ? normalized.slice(0, limit) : normalized;
      }
    }

    return typeof limit === "number"
      ? DEFAULT_VIDEO_REVIEWS.slice(0, limit)
      : DEFAULT_VIDEO_REVIEWS;
  } catch (error) {
    console.warn("Public video reviews fetch fallback:", error);
    return typeof limit === "number"
      ? DEFAULT_VIDEO_REVIEWS.slice(0, limit)
      : DEFAULT_VIDEO_REVIEWS;
  }
}

/**
 * Admin function to fetch all video reviews with pagination.
 */
export async function getAdminVideoReviews(params?: {
  page?: number;
  limit?: number;
}): Promise<APIResponse<VideoReviewListResponseData>> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));

    const res = await authorizedAdminRequest(apiRoutes.videoReviews, {
      method: "GET",
      search: searchParams.toString(),
      headers: { Accept: "application/json" },
    });

    const payload = await getResponsePayload(res);

    // Standard envelope check
    if (res.ok && isApiEnvelope(payload, isVideoReviewsListData)) {
      const items = payload.data.data.map((item, idx) =>
        normalizeVideoReviewItem(item, idx),
      );

      return {
        success: true,
        data: {
          items,
          total: payload.data.pagination.total ?? items.length,
          limit: payload.data.pagination.limit,
          page: payload.data.pagination.page,
          totalPages: payload.data.pagination.totalPages,
        },
      };
    }

    // Flexible fallback envelope check
    if (res.ok && isRecord(payload)) {
      let rawList: unknown[] = [];
      let total: number | undefined;
      let page: number | undefined;
      let limit: number | undefined;
      let totalPages: number | undefined;

      if (isRecord(payload.data) && isRecord(payload.data.pagination)) {
        const pag = payload.data.pagination;
        total = typeof pag.total === "number" ? pag.total : undefined;
        page = typeof pag.page === "number" ? pag.page : undefined;
        limit = typeof pag.limit === "number" ? pag.limit : undefined;
        totalPages = typeof pag.totalPages === "number" ? pag.totalPages : undefined;
      }

      if (isRecord(payload.data) && Array.isArray(payload.data.data)) {
        rawList = payload.data.data;
      } else if (isRecord(payload.data) && Array.isArray(payload.data.items)) {
        rawList = payload.data.items;
      } else if (Array.isArray(payload.data)) {
        rawList = payload.data;
      } else if (Array.isArray(payload.items)) {
        rawList = payload.items;
      }

      const items = rawList
        .filter(isRecord)
        .map((item, idx) => normalizeVideoReviewItem(item, idx));

      return {
        success: true,
        data: {
          items,
          total: total ?? items.length,
          limit,
          page,
          totalPages,
        },
      };
    }

    return {
      success: false,
      error: "Failed to fetch video reviews from server",
      data: {
        items: [],
        total: 0,
      },
    };
  } catch (error) {
    console.error("Admin video reviews fetch error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch video reviews",
      data: {
        items: [],
        total: 0,
      },
    };
  }
}

/**
 * Admin function to create a new video review.
 * Automatically resolves posterSrc from highlight video if left blank (via Cloudinary .jpg conversion).
 */
export async function createVideoReview(
  data: VideoReviewItemInput,
): Promise<APIResponse<VideoReviewItem>> {
  try {
    const finalPosterSrc =
      data.posterSrc && data.posterSrc.trim() !== ""
        ? data.posterSrc
        : derivePosterFromVideoUrl(data.highlightVideoSrc || data.videoSrc);

    const res = await authorizedAdminRequest(apiRoutes.videoReviews, {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        reviewerName: data.reviewerName || "",
        location: data.location || "",
        rating: data.rating ?? 5,
        highlightVideoSrc: data.highlightVideoSrc,
        videoSrc: data.videoSrc,
        posterSrc: finalPosterSrc,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to create video review",
        status: res.status,
      };
    }

    if (isRecord(payload) && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to create video review",
      };
    }

    revalidatePath("/");
    revalidatePath("/admin/home/video-reviews");
    revalidateTag("video-reviews", "default");

    const created = isRecord(payload) && isRecord(payload.data)
      ? normalizeVideoReviewItem(payload.data, 0)
      : {
          id: Date.now().toString(),
          title: data.title,
          reviewerName: data.reviewerName,
          location: data.location,
          rating: data.rating ?? 5,
          highlightVideoSrc: data.highlightVideoSrc,
          videoSrc: data.videoSrc,
          posterSrc: finalPosterSrc,
        };

    return { success: true, data: created };
  } catch (error) {
    console.error("Error creating video review:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Admin function to update an existing video review.
 */
export async function updateVideoReview(
  id: string,
  data: Partial<VideoReviewItemInput>,
): Promise<APIResponse<VideoReviewItem>> {
  try {
    const resolvedPosterSrc =
      data.posterSrc !== undefined && data.posterSrc.trim() !== ""
        ? data.posterSrc
        : data.highlightVideoSrc
          ? derivePosterFromVideoUrl(data.highlightVideoSrc)
          : data.videoSrc
            ? derivePosterFromVideoUrl(data.videoSrc)
            : undefined;

    const res = await authorizedAdminRequest(apiRoutes.videoReviewsById(id), {
      method: "PUT",
      body: JSON.stringify({
        ...(data.title ? { title: data.title } : {}),
        ...(typeof data.reviewerName !== "undefined" ? { reviewerName: data.reviewerName } : {}),
        ...(typeof data.location !== "undefined" ? { location: data.location } : {}),
        ...(typeof data.rating === "number" ? { rating: data.rating } : {}),
        ...(data.highlightVideoSrc ? { highlightVideoSrc: data.highlightVideoSrc } : {}),
        ...(data.videoSrc ? { videoSrc: data.videoSrc } : {}),
        ...(resolvedPosterSrc !== undefined ? { posterSrc: resolvedPosterSrc } : {}),
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update video review",
        status: res.status,
      };
    }

    if (isRecord(payload) && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update video review",
      };
    }

    revalidatePath("/");
    revalidatePath("/admin/home/video-reviews");
    revalidateTag("video-reviews", "default");

    const updated = isRecord(payload) && isRecord(payload.data)
      ? normalizeVideoReviewItem(payload.data, 0)
      : undefined;

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating video review:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Admin function to delete a video review.
 */
export async function deleteVideoReview(id: string): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.videoReviewsById(id), {
      method: "DELETE",
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete video review",
        status: res.status,
      };
    }

    if (isRecord(payload) && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete video review",
      };
    }

    revalidatePath("/");
    revalidatePath("/admin/home/video-reviews");
    revalidateTag("video-reviews", "default");

    return { success: true };
  } catch (error) {
    console.error("Error deleting video review:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
