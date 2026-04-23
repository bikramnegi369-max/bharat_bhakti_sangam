import { NextResponse } from "next/server";
import { clearAdminAuthCookies, setAdminAuthCookies } from "@/_features/admin-auth/server/cookies";
import { refreshAgainstBackend } from "@/_features/admin-auth/server/backend";
import {
  createSignedAdminSession,
  getAdminAuthStateFromCookies,
  toPublicSession,
} from "@/_features/admin-auth/server/session";

export async function POST() {
  const authState = await getAdminAuthStateFromCookies();

  if (!authState.refreshToken) {
    const response = NextResponse.json(
      {
        message: "Admin refresh token is missing.",
      },
      { status: 401 },
    );

    clearAdminAuthCookies(response);
    return response;
  }

  const result = await refreshAgainstBackend(authState);

  if (!result.ok) {
    const response = NextResponse.json(
      {
        message: result.message,
      },
      { status: result.status },
    );

    clearAdminAuthCookies(response);
    return response;
  }

  const signedSession = await createSignedAdminSession(result.auth.session);
  const response = NextResponse.json(
    {
      session: toPublicSession(result.auth.session),
    },
    { status: result.status },
  );

  setAdminAuthCookies(response, result.auth, signedSession);
  return response;
}
