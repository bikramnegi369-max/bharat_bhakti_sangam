import { adminAuthConfig } from "../config";
import type { AdminUser, NormalizedAuthResult } from "../types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getNestedRecord(
  source: Record<string, unknown>,
  key: string,
): Record<string, unknown> | null {
  const value = source[key];
  return isRecord(value) ? value : null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function decodeBase64UrlSegment(segment: string): string | null {
  try {
    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      Math.ceil(normalized.length / 4) * 4,
      "=",
    );

    return atob(padded);
  } catch {
    return null;
  }
}

function extractJwtExpiryTimestamp(token: string): number | null {
  const [, payload] = token.split(".");

  if (!payload) {
    return null;
  }

  const decodedPayload = decodeBase64UrlSegment(payload);

  if (!decodedPayload) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(decodedPayload) as { exp?: number };

    if (typeof parsedPayload.exp === "number") {
      return parsedPayload.exp * 1000;
    }
  } catch {
    return null;
  }

  return null;
}

function resolveExpiresAt(
  token: string | null,
  expiresInSeconds: number | null,
  fallbackMaxAgeSeconds: number,
): number {
  const now = Date.now();

  if (expiresInSeconds && expiresInSeconds > 0) {
    return now + expiresInSeconds * 1000;
  }

  const jwtExpiresAt = token ? extractJwtExpiryTimestamp(token) : null;

  if (jwtExpiresAt) {
    return jwtExpiresAt;
  }

  return now + fallbackMaxAgeSeconds * 1000;
}

function extractJwtPayload(token: string): Record<string, unknown> | null {
  const [, payload] = token.split(".");

  if (!payload) {
    return null;
  }

  const decodedPayload = decodeBase64UrlSegment(payload);

  if (!decodedPayload) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(decodedPayload);
    return isRecord(parsedPayload) ? parsedPayload : null;
  } catch {
    return null;
  }
}

function normalizeAdminUser(
  accessToken: string,
  fallbackUser?: AdminUser | null,
) {
  const jwtPayload = extractJwtPayload(accessToken);
  const id =
    readString(jwtPayload?.id) ??
    readString(jwtPayload?._id) ??
    fallbackUser?.id ??
    readString(jwtPayload?.email) ??
    "admin-user";
  const email = readString(jwtPayload?.email) ?? fallbackUser?.email ?? null;
  const name =
    readString(jwtPayload?.name) ??
    fallbackUser?.name ??
    null;

  return { id, email, name };
}

type NormalizeOptions = {
  fallbackUser?: AdminUser | null;
  fallbackRefreshToken?: string | null;
};

export function normalizeBackendAuthResponse(
  payload: unknown,
  options: NormalizeOptions = {},
): NormalizedAuthResult | null {
  if (!isRecord(payload)) {
    return null;
  }

  const data = getNestedRecord(payload, "data");
  const accessToken =
    readString(data?.access_token) ?? readString(payload.access_token);

  if (!accessToken) {
    return null;
  }

  const refreshToken =
    readString(data?.refresh_token) ??
    readString(payload.refresh_token) ??
    options.fallbackRefreshToken ??
    null;
  const user = normalizeAdminUser(accessToken, options.fallbackUser);

  const accessTokenExpiresAt = resolveExpiresAt(
    accessToken,
    null,
    adminAuthConfig.session.accessTokenMaxAgeSeconds,
  );
  const refreshTokenExpiresAt = resolveExpiresAt(
    refreshToken,
    null,
    adminAuthConfig.session.refreshTokenMaxAgeSeconds,
  );
  const sessionExpiresAt = refreshToken
    ? refreshTokenExpiresAt
    : accessTokenExpiresAt;

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
    session: {
      user,
      issuedAt: Date.now(),
      expiresAt: sessionExpiresAt,
    },
  };
}

export function getResponseMessage(
  payload: unknown,
  fallbackMessage: string,
): string {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (!isRecord(payload)) {
    return fallbackMessage;
  }

  return readString(payload.message) ?? fallbackMessage;
}

export function isJsonLikeResponse(headers: Headers): boolean {
  const contentType = headers.get("content-type") ?? "";
  return contentType.includes("application/json");
}
