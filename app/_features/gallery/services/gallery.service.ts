"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import {
  GalleryItem,
  GalleryItemInput,
  GalleryListResponseData,
} from "../types";
import { DEFAULT_GALLERY_ITEMS } from "../constants";
import { getResponsePayload, getPayloadMessage } from "@/_utils/api";
import { fetchWithTimeout } from "@/_utils/fetch";
import { isApiEnvelope, isRecord } from "@/_utils/guards";
import { isGalleryListData } from "./guards";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Normalizes raw data from backend or local structures into clean GalleryItem format.
 */
function normalizeGalleryItem(raw: Record<string, unknown>, index: number): GalleryItem {
  const id =
    (typeof raw._id === "string" && raw._id) ||
    (typeof raw.id === "string" && raw.id) ||
    (typeof raw.id === "number" && String(raw.id)) ||
    `gallery-item-${index + 1}`;

  const imageSrc =
    (typeof raw.imageUrl === "string" && raw.imageUrl) ||
    (typeof raw.src === "string" && raw.src) ||
    (typeof raw.url === "string" && raw.url) ||
    "/gallery/gallery_1.webp";

  const artistName =
    (typeof raw.artistName === "string" && raw.artistName) ||
    (typeof raw.artist === "string" && raw.artist) ||
    "Sacred Artist";

  return {
    id,
    _id: typeof raw._id === "string" ? raw._id : String(id),
    src: imageSrc,
    imageUrl: imageSrc,
    alt: (typeof raw.alt === "string" && raw.alt) || (typeof raw.title === "string" && raw.title) || "Gallery Moment",
    title: (typeof raw.title === "string" && raw.title) || "Sacred Memory",
    artistName,
    category: (typeof raw.category === "string" && raw.category) || undefined,
    location: (typeof raw.location === "string" && raw.location) || undefined,
    date: (typeof raw.date === "string" && raw.date) || undefined,
    likes: typeof raw.likes === "number" ? raw.likes : undefined,
    commentsCount: typeof raw.commentsCount === "number" ? raw.commentsCount : undefined,
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : undefined,
  };
}

/**
 * Public function to get gallery items for Home and Event pages.
 * If limit is provided, limits returned items (e.g. 6 for Home page).
 * If limit is undefined, returns all available images (for Event page).
 * Revalidates every 60s via Next ISR tag.
 */
export async function getPublicGalleryItems(limit?: number): Promise<GalleryItem[]> {
  const backendBase = process.env.NEXT_PUBLIC_API_URL || "";
  const searchParams = new URLSearchParams();
  if (typeof limit === "number" && limit > 0) {
    searchParams.set("limit", String(limit));
  }
  const queryString = searchParams.toString();
  const url = `${backendBase}${apiRoutes.gallery}${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetchWithTimeout(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: {
        revalidate: 60,
        tags: ["gallery-items"],
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
          .map((item, idx) => normalizeGalleryItem(item, idx));

        // Return up to `limit` items if defined, else return all normalized items
        return typeof limit === "number" ? normalized.slice(0, limit) : normalized;
      }
    }

    return typeof limit === "number"
      ? DEFAULT_GALLERY_ITEMS.slice(0, limit)
      : DEFAULT_GALLERY_ITEMS;
  } catch (error) {
    console.warn("Public gallery items fetch fallback:", error);
    return typeof limit === "number"
      ? DEFAULT_GALLERY_ITEMS.slice(0, limit)
      : DEFAULT_GALLERY_ITEMS;
  }
}

/**
 * Admin function to fetch all gallery items with pagination/details.
 * Communicates with backend using authorizedAdminRequest so the backend recognizes admin session.
 * Adheres strictly to the project's isApiEnvelope and pagination guard architecture.
 */
export async function getAdminGalleryItems(params?: {
  page?: number;
  limit?: number;
}): Promise<APIResponse<GalleryListResponseData>> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));

    const res = await authorizedAdminRequest(apiRoutes.gallery, {
      method: "GET",
      search: searchParams.toString(),
      headers: { Accept: "application/json" },
    });

    const payload = await getResponsePayload(res);

    // Standard Envelope Pattern check: { status: true, data: { data: [...], pagination: { page, limit, total, totalPages } } }
    if (res.ok && isApiEnvelope(payload, isGalleryListData)) {
      const items = payload.data.data.map((item, idx) =>
        normalizeGalleryItem(item, idx),
      );

      return {
        success: true,
        data: {
          items: items.length > 0 ? items : DEFAULT_GALLERY_ITEMS,
          total: payload.data.pagination.total ?? (items.length > 0 ? items.length : DEFAULT_GALLERY_ITEMS.length),
          limit: payload.data.pagination.limit,
          page: payload.data.pagination.page,
          totalPages: payload.data.pagination.totalPages,
        },
      };
    }

    // Secondary/flexible fallback for envelope variations: { status: true, data: [...] } or { items: [...] }
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

      if (isRecord(payload.pagination)) {
        const pag = payload.pagination;
        total = typeof pag.total === "number" ? pag.total : total;
        page = typeof pag.page === "number" ? pag.page : page;
        limit = typeof pag.limit === "number" ? pag.limit : limit;
        totalPages = typeof pag.totalPages === "number" ? pag.totalPages : totalPages;
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
        .map((item, idx) => normalizeGalleryItem(item, idx));

      return {
        success: true,
        data: {
          items: items.length > 0 ? items : DEFAULT_GALLERY_ITEMS,
          total: total ?? (items.length > 0 ? items.length : DEFAULT_GALLERY_ITEMS.length),
          limit,
          page,
          totalPages,
        },
      };
    }

    return {
      success: true,
      data: {
        items: DEFAULT_GALLERY_ITEMS,
        total: DEFAULT_GALLERY_ITEMS.length,
      },
    };
  } catch (error) {
    console.warn("Admin gallery items fetch fallback:", error);
    return {
      success: true,
      data: {
        items: DEFAULT_GALLERY_ITEMS,
        total: DEFAULT_GALLERY_ITEMS.length,
      },
    };
  }
}

/**
 * Admin function to create a new gallery item.
 */
export async function createGalleryItem(
  data: GalleryItemInput,
): Promise<APIResponse<GalleryItem>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.gallery, {
      method: "POST",
      body: JSON.stringify({
        imageUrl: data.imageUrl,
        src: data.imageUrl,
        title: data.title,
        artistName: data.artistName,
        category: data.category || "",
        location: data.location || "",
        date: data.date || "",
        likes: data.likes,
        commentsCount: data.commentsCount,
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
        error: getPayloadMessage(payload) || "Failed to create gallery item",
        status: res.status,
      };
    }

    if (isRecord(payload) && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to create gallery item",
      };
    }

    revalidatePath("/");
    revalidatePath("/event");
    revalidatePath("/admin/gallery");
    revalidateTag("gallery-items", "default");

    const created = isRecord(payload) && isRecord(payload.data)
      ? normalizeGalleryItem(payload.data, 0)
      : {
          id: Date.now().toString(),
          src: data.imageUrl,
          imageUrl: data.imageUrl,
          title: data.title,
          artistName: data.artistName,
          category: data.category,
          location: data.location,
          date: data.date,
          likes: data.likes,
          commentsCount: data.commentsCount,
        };

    return { success: true, data: created };
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Admin function to update an existing gallery item.
 */
export async function updateGalleryItem(
  id: string,
  data: Partial<GalleryItemInput>,
): Promise<APIResponse<GalleryItem>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.galleryById(id), {
      method: "PUT",
      body: JSON.stringify({
        ...(data.imageUrl ? { imageUrl: data.imageUrl, src: data.imageUrl } : {}),
        ...(data.title ? { title: data.title } : {}),
        ...(data.artistName ? { artistName: data.artistName } : {}),
        ...(typeof data.category !== "undefined" ? { category: data.category } : {}),
        ...(typeof data.location !== "undefined" ? { location: data.location } : {}),
        ...(typeof data.date !== "undefined" ? { date: data.date } : {}),
        ...(typeof data.likes === "number" ? { likes: data.likes } : {}),
        ...(typeof data.commentsCount === "number" ? { commentsCount: data.commentsCount } : {}),
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
        error: getPayloadMessage(payload) || "Failed to update gallery item",
        status: res.status,
      };
    }

    if (isRecord(payload) && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to update gallery item",
      };
    }

    revalidatePath("/");
    revalidatePath("/event");
    revalidatePath("/admin/gallery");
    revalidateTag("gallery-items", "default");

    const updated = isRecord(payload) && isRecord(payload.data)
      ? normalizeGalleryItem(payload.data, 0)
      : undefined;

    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Admin function to delete a gallery item.
 */
export async function deleteGalleryItem(id: string): Promise<APIResponse> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.galleryById(id), {
      method: "DELETE",
    });

    const payload = await getResponsePayload(res);

    if (!res.ok) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete gallery item",
        status: res.status,
      };
    }

    if (isRecord(payload) && payload.status === false) {
      return {
        success: false,
        error: getPayloadMessage(payload) || "Failed to delete gallery item",
      };
    }

    revalidatePath("/");
    revalidatePath("/event");
    revalidatePath("/admin/gallery");
    revalidateTag("gallery-items", "default");

    return { success: true };
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
