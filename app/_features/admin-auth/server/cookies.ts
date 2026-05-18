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

function isReadonlyCookiesError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.message.includes(
      "Cookies can only be modified in a Server Action or Route Handler",
    ) ||
      error.message.includes("ReadonlyRequestCookies cannot be modified"))
  );
}

async function tryMutateCookies(
  mutate: (cookieStore: Awaited<ReturnType<typeof cookies>>) => void,
): Promise<boolean> {
  const cookieStore = await cookies();

  try {
    mutate(cookieStore);
    return true;
  } catch (error) {
    if (isReadonlyCookiesError(error)) {
      return false;
    }

    throw error;
  }
}

export async function setAdminAuthCookiesServerSide(
  auth: NormalizedAuthResult,
  signedSession: string,
) {
  return tryMutateCookies((cookieStore) => {
    cookieStore.set(
      adminAuthCookieNames.accessToken,
      auth.accessToken,
      getCookieOptions(getMaxAgeInSeconds(auth.accessTokenExpiresAt)),
    );

    if (auth.refreshToken) {
      cookieStore.set(
        adminAuthCookieNames.refreshToken,
        auth.refreshToken,
        getCookieOptions(getMaxAgeInSeconds(auth.refreshTokenExpiresAt)),
      );
    } else {
      cookieStore.set(
        adminAuthCookieNames.refreshToken,
        "",
        getCookieOptions(0),
      );
    }

    cookieStore.set(
      adminAuthCookieNames.session,
      signedSession,
      getCookieOptions(getMaxAgeInSeconds(auth.session.expiresAt)),
    );
  });
}

/**
 * Clears admin authentication cookies from a server context.
 */
export async function clearAdminAuthCookiesServerSide() {
  return tryMutateCookies((cookieStore) => {
    cookieStore.delete(adminAuthCookieNames.accessToken);
    cookieStore.delete(adminAuthCookieNames.refreshToken);
    cookieStore.delete(adminAuthCookieNames.session);
  });
}
