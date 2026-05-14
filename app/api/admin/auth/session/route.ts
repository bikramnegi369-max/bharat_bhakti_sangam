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

  // Trust the signed session cookie for session reads so transient backend
  // outages do not look like a forced logout in the admin UI.
  if (authState.session) {
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

  let result;
  try {
    result = await refreshAgainstBackend(authState);
  } catch (error) {
    const isTimeout =
      error instanceof Error &&
      (error.name === "AbortError" ||
        error.message.includes("timed out"));

    return NextResponse.json(
      {
        message: isTimeout
          ? "Admin session check timed out. Please try again."
          : "Unable to verify the admin session right now.",
      },
      { status: isTimeout ? 504 : 503 },
    );
  }

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
