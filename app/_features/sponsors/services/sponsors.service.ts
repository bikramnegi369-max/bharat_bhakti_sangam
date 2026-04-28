"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { APIResponse } from "@/_types/Api.types";
import { Sponsor } from "@/_types/Sponsors.types";

export async function getSponsors(): Promise<APIResponse<Sponsor[]>> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.getAllSponsors);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: "Failed to fetch sponsors" };
  }
}
