"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { EventCategory } from "@/_types/EventCategories.types";

export async function getEventCategories(): Promise<
  APIResponse<EventCategory[]>
> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.getAllEventCategories);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data: data.data.categories };
  } catch (error) {
    return { success: false, error: "Failed to fetch categories" };
  }
}
