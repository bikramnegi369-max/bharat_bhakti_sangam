import { NextResponse } from "next/server";
import { clearAdminAuthCookies } from "@/_features/admin-auth/server/cookies";
import { logoutAgainstBackend } from "@/_features/admin-auth/server/backend";
import { getAdminAuthStateFromCookies } from "@/_features/admin-auth/server/session";

export async function POST() {
  const authState = await getAdminAuthStateFromCookies();

  await logoutAgainstBackend(authState);

  const response = NextResponse.json({
    success: true,
  });

  clearAdminAuthCookies(response);

  return response;
}
