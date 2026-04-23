import {
  adminDefaultRedirectPath,
  adminPublicPaths,
} from "./config";

function normalizePath(pathname: string): string {
  if (!pathname) {
    return adminDefaultRedirectPath;
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function isProtectedAdminPath(pathname: string): boolean {
  const normalizedPath = normalizePath(pathname);

  if (adminPublicPaths.has(normalizedPath)) {
    return false;
  }

  return (
    normalizedPath === "/admin" || normalizedPath.startsWith("/admin/")
  );
}

export function sanitizeAdminNextPath(nextPath?: string | null): string {
  if (!nextPath || !nextPath.startsWith("/admin")) {
    return adminDefaultRedirectPath;
  }

  return nextPath;
}

export function buildAdminLoginPath(nextPath: string): string {
  const safeNextPath = sanitizeAdminNextPath(nextPath);
  return `/admin/login?next=${encodeURIComponent(safeNextPath)}`;
}
