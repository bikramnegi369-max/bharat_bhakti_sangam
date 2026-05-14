import { NextResponse, type NextRequest } from "next/server";
import {
  buildAdminLoginPath,
  isProtectedAdminPath,
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

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedAdminPath(pathname) && !adminPublicPaths.has(pathname)) {
    return NextResponse.next();
  }

  const session = await readAdminSession(request);

  if (pathname === "/admin/login") {
    if (session) {
      return NextResponse.redirect(
        new URL(adminDefaultRedirectPath, request.url),
      );
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(
      new URL(buildAdminLoginPath(`${pathname}${search}`), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
