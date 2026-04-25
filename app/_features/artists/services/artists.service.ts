"use server";

import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { Artist } from "@/_types/Artists.types";

export async function getArtists(): Promise<APIResponse<Artist[]>> {
  try {
    const res = await authorizedAdminRequest("/artist/all");
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data: data.data.data };
  } catch (error) {
    return { success: false, error: "Failed to fetch artists" };
  }
}
