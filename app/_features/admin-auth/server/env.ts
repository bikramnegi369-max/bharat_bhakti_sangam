export function getAdminApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_URL for admin authentication.");
  }

  return baseUrl;
}

export function getAdminSessionSecret(): string {
  const secret = process.env.ADMIN_AUTH_SESSION_SECRET;

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV !== "production") {
    return "development-only-admin-auth-session-secret";
  }

  throw new Error("Missing ADMIN_AUTH_SESSION_SECRET for admin authentication.");
}

export function buildAdminBackendUrl(
  pathname: string,
  search = "",
): URL {
  const url = new URL(getAdminApiBaseUrl());
  const basePath = url.pathname.replace(/\/$/, "");
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  url.pathname = `${basePath}${normalizedPath}`;
  url.search = search.startsWith("?") ? search.slice(1) : search;

  return url;
}
