import type { AdminLoginFormValues } from "./types";

export const adminAuthCookieNames = {
  accessToken: "admin_access_token",
  refreshToken: "admin_refresh_token",
  session: "admin_session",
} as const;

export const adminPublicPaths = new Set(["/admin/login"]);
export const adminDefaultRedirectPath = "/admin";

export const adminAuthConfig = {
  backend: {
    loginPath: "/admin/login",
    refreshPath: "/admin/refresh",
    logoutPath: "/admin/logout",
    buildLoginPayload: (values: AdminLoginFormValues) => ({
      email: values.email.trim(),
      password: values.password,
    }),
  },
  session: {
    accessTokenMaxAgeSeconds: 15 * 60,
    refreshTokenMaxAgeSeconds: 7 * 24 * 60 * 60,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
  },
};
