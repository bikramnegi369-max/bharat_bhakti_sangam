import { adminDefaultRedirectPath } from "./config";
import { sanitizeAdminNextPath } from "./authorization";
import type { AdminLoginFormValues, PublicAdminSession } from "./types";
import { fetchWithTimeout } from "@/_utils/fetch";

type SessionResponse = {
  session: PublicAdminSession | null;
};

type ErrorResponse = {
  message?: string;
};

export class AdminAuthError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AdminAuthError";
  }
}

async function readResponseMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = (await response
      .json()
      .catch(() => null)) as ErrorResponse | null;

    if (payload?.message) {
      return payload.message;
    }
  }

  const text = await response.text().catch(() => "");
  return text || "Something went wrong while contacting the admin service.";
}

export async function fetchAdminSession(): Promise<PublicAdminSession | null> {
  const response = await fetch("/api/admin/auth/session", {
    cache: "no-store",
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new AdminAuthError(
      response.status,
      await readResponseMessage(response),
    );
  }

  const payload = (await response.json()) as SessionResponse;
  return payload.session;
}

export async function loginAdmin(
  credentials: AdminLoginFormValues,
): Promise<PublicAdminSession> {
  const response = await fetchWithTimeout("/api/admin/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new AdminAuthError(
      response.status,
      await readResponseMessage(response),
    );
  }

  const payload = (await response.json()) as SessionResponse;

  if (!payload.session) {
    throw new AdminAuthError(
      500,
      "Admin session was not returned after login.",
    );
  }

  return payload.session;
}

export async function logoutAdmin(): Promise<void> {
  const response = await fetchWithTimeout("/api/admin/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new AdminAuthError(
      response.status,
      await readResponseMessage(response),
    );
  }
}

export class AdminApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

export async function adminApiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetchWithTimeout(
    `/api/admin/backend${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...init,
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!response.ok && response.status !== 204) {
    throw new AdminApiError(
      response.status,
      await readResponseMessage(response),
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return (await response.text()) as T;
  }

  return (await response.json()) as T;
}

export function resolvePostLoginPath(nextPath?: string | null): string {
  return sanitizeAdminNextPath(nextPath) || adminDefaultRedirectPath;
}
