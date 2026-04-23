import { NextResponse } from "next/server";
import { adminAuthConfig, adminAuthCookieNames } from "../config";
import type { NormalizedAuthResult } from "../types";
import { cookies } from "next/headers";

function getMaxAgeInSeconds(expiresAt: number): number {
  return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
}

function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: adminAuthConfig.session.sameSite,
    secure: adminAuthConfig.session.secure,
  } as const;
}

export function setAdminAuthCookies(
  response: NextResponse,
  authResult: NormalizedAuthResult,
  signedSession: string,
): void {
  response.cookies.set(
    adminAuthCookieNames.accessToken,
    authResult.accessToken,
    getCookieOptions(getMaxAgeInSeconds(authResult.accessTokenExpiresAt)),
  );

  if (authResult.refreshToken) {
    response.cookies.set(
      adminAuthCookieNames.refreshToken,
      authResult.refreshToken,
      getCookieOptions(getMaxAgeInSeconds(authResult.refreshTokenExpiresAt)),
    );
  } else {
    response.cookies.set(
      adminAuthCookieNames.refreshToken,
      "",
      getCookieOptions(0),
    );
  }

  response.cookies.set(
    adminAuthCookieNames.session,
    signedSession,
    getCookieOptions(getMaxAgeInSeconds(authResult.session.expiresAt)),
  );
}

export function clearAdminAuthCookies(response: NextResponse): void {
  const expiredCookie = getCookieOptions(0);

  response.cookies.set(adminAuthCookieNames.accessToken, "", expiredCookie);
  response.cookies.set(adminAuthCookieNames.refreshToken, "", expiredCookie);
  response.cookies.set(adminAuthCookieNames.session, "", expiredCookie);
}

export async function setAdminAuthCookiesServerSide(
  auth: any,
  signedSession: string,
) {
  const cookieStore = await cookies();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    // Set maxAge based on your session requirements (e.g., 7 days)
    maxAge: 60 * 60 * 24 * 7,
  };

  // Ensure these cookie names match exactly what you use in getAdminAuthStateFromCookies
  if (auth.accessToken) {
    cookieStore.set("admin_access_token", auth.accessToken, options);
  }

  if (auth.refreshToken) {
    cookieStore.set("admin_refresh_token", auth.refreshToken, options);
  }

  if (signedSession) {
    cookieStore.set("admin_session", signedSession, options);
  }
}

/**
 * Clears admin authentication cookies from a server context.
 */
export async function clearAdminAuthCookiesServerSide() {
  const cookieStore = await cookies();
  const options = { path: "/" };

  cookieStore.delete("admin_access_token");
  cookieStore.delete("admin_refresh_token");
  cookieStore.delete("admin_session");
}
