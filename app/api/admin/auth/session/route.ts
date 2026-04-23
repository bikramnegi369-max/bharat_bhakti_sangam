import { NextResponse } from "next/server";
import { clearAdminAuthCookies, setAdminAuthCookies } from "@/_features/admin-auth/server/cookies";
import { refreshAgainstBackend } from "@/_features/admin-auth/server/backend";
import {
  createSignedAdminSession,
  getAdminAuthStateFromCookies,
  toPublicSession,
} from "@/_features/admin-auth/server/session";

export async function GET() {
  const authState = await getAdminAuthStateFromCookies();

  if (authState.session && authState.accessToken) {
    return NextResponse.json({
      session: toPublicSession(authState.session),
    });
  }

  if (!authState.refreshToken) {
    const response = NextResponse.json(
      {
        message: "Admin session has expired.",
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
  const response = NextResponse.json({
    session: toPublicSession(result.auth.session),
  });

  setAdminAuthCookies(response, result.auth, signedSession);
  return response;
}
