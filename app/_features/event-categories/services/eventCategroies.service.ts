"use server";

import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";

export interface EventCategory {
  _id: string;
  name: string;
}

export async function getEventCategories(): Promise<
  APIResponse<EventCategory[]>
> {
  try {
    const res = await authorizedAdminRequest("/categories");
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to fetch categories" };
  }
}
