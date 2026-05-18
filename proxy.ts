import { NextResponse, type NextRequest } from "next/server";
import {
  buildAdminLoginPath,
  isProtectedAdminPath,
  normalizePath,
} from "@/_features/admin-auth/authorization";
import {
  adminAuthCookieNames,
  adminDefaultRedirectPath,
  adminPublicPaths,
} from "@/_features/admin-auth/config";
import { decodeSignedJson } from "@/_features/admin-auth/crypto";
import type { StoredAdminSession } from "@/_features/admin-auth/types";

async function readAdminSession(
  request: NextRequest,
): Promise<StoredAdminSession | null> {
  const cookie = request.cookies.get(adminAuthCookieNames.session)?.value;
  const secret =
    process.env.ADMIN_AUTH_SESSION_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "development-only-admin-auth-session-secret"
      : "");

  if (!cookie || !secret) {
    return null;
  }

  const session = await decodeSignedJson<StoredAdminSession>(cookie, secret);

  if (!session || session.expiresAt <= Date.now()) {
    return null;
  }

  return session;
}

function hasBackendCredentials(request: NextRequest): boolean {
  return Boolean(
    request.cookies.get(adminAuthCookieNames.accessToken)?.value ||
      request.cookies.get(adminAuthCookieNames.refreshToken)?.value,
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const normalizedPath = normalizePath(pathname);
  const isPublic = adminPublicPaths.has(normalizedPath);
  const isProtected = isProtectedAdminPath(pathname);

  // 1. If it's not an admin path (neither public nor protected), allow the request
  if (!isPublic && !isProtected) {
    return NextResponse.next();
  }

  const session = await readAdminSession(request);
  const hasCredentials = hasBackendCredentials(request);

  // 2. Handle public admin paths (login, forgot-password, reset-password)
  if (isPublic) {
    // If already logged in and hitting login page, redirect to admin home
    if (normalizedPath === "/admin/login" && session && hasCredentials) {
      return NextResponse.redirect(
        new URL(adminDefaultRedirectPath, request.url),
      );
    }
    return NextResponse.next();
  }

  // 3. Handle protected admin paths
  if (isProtected && (!session || !hasCredentials)) {
    return NextResponse.redirect(
      new URL(buildAdminLoginPath(`${pathname}${search}`), request.url),
    );
  }

  // If a session exists and the path is not the login page,
  // allow the request to proceed. Token validity will be handled by authorizedAdminRequest.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
