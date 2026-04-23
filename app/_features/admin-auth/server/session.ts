import { cookies } from "next/headers";
import { encodeSignedJson, decodeSignedJson } from "../crypto";
import { adminAuthCookieNames } from "../config";
import type { PublicAdminSession, StoredAdminSession } from "../types";
import { getAdminSessionSecret } from "./env";

function isSessionExpired(session: StoredAdminSession): boolean {
  return session.expiresAt <= Date.now();
}

export async function createSignedAdminSession(
  session: StoredAdminSession,
): Promise<string> {
  return encodeSignedJson(session, getAdminSessionSecret());
}

export async function verifySignedAdminSession(
  value?: string | null,
): Promise<StoredAdminSession | null> {
  if (!value) {
    return null;
  }

  const session = await decodeSignedJson<StoredAdminSession>(
    value,
    getAdminSessionSecret(),
  );

  if (!session || isSessionExpired(session)) {
    return null;
  }

  return session;
}

export async function getStoredAdminSession(): Promise<StoredAdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(adminAuthCookieNames.session)?.value;
  return verifySignedAdminSession(sessionCookie);
}

export async function getAdminAuthStateFromCookies() {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(adminAuthCookieNames.accessToken)?.value ?? null,
    refreshToken:
      cookieStore.get(adminAuthCookieNames.refreshToken)?.value ?? null,
    session: await verifySignedAdminSession(
      cookieStore.get(adminAuthCookieNames.session)?.value,
    ),
  };
}

export function toPublicSession(
  session: StoredAdminSession | null,
): PublicAdminSession | null {
  if (!session) {
    return null;
  }

  return {
    user: session.user,
    issuedAt: session.issuedAt,
    expiresAt: session.expiresAt,
  };
}
