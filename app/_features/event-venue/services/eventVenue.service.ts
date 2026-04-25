"use server";

import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { Venue } from "@/_types/Venue.types";


export async function getVenues(): Promise<APIResponse<Venue[]>> {
  try {
    const res = await authorizedAdminRequest("/venue/all");
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to fetch venues" };
  }
}
