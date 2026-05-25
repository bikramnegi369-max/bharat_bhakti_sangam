"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { buildAdminLoginPath } from "../authorization";
import { adminSessionQueryKey } from "./useAdminAuth";

export const ADMIN_AUTH_FAILURE_STATUS = 401;

export function isAdminAuthFailureStatus(status?: number): boolean {
  return status === ADMIN_AUTH_FAILURE_STATUS;
}

export function useAdminAuthFailureHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useCallback(() => {
    const search = searchParams.toString();
    const nextPath = `${pathname}${search ? `?${search}` : ""}`;

    queryClient.setQueryData(adminSessionQueryKey, null);

    router.replace(buildAdminLoginPath(nextPath));
    router.refresh();
  }, [pathname, queryClient, router, searchParams]);
}
