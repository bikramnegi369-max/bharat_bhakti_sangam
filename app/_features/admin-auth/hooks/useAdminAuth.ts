"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { adminDefaultRedirectPath } from "../config";
import {
  fetchAdminSession,
  loginAdmin,
  logoutAdmin,
  requestAdminPasswordReset,
  resetAdminPassword,
  resolvePostLoginPath,
} from "../client";
import type { AdminLoginFormValues } from "../types";

export const adminSessionQueryKey = ["admin", "auth", "session"] as const;

export function useAdminAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const sessionQuery = useQuery({
    queryKey: adminSessionQueryKey,
    queryFn: fetchAdminSession,
    retry: false,
    staleTime: 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      values,
      nextPath,
    }: {
      values: AdminLoginFormValues;
      nextPath?: string | null;
    }) => {
      const session = await loginAdmin(values);

      return {
        session,
        nextPath: resolvePostLoginPath(nextPath),
      };
    },
    onSuccess: ({ session, nextPath }) => {
      queryClient.setQueryData(adminSessionQueryKey, session);

      startTransition(() => {
        router.replace(nextPath || adminDefaultRedirectPath);
        router.refresh();
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutAdmin,
    onSuccess: () => {
      queryClient.setQueryData(adminSessionQueryKey, null);

      startTransition(() => {
        router.replace("/admin/login");
        router.refresh();
      });
    },
  });

  const requestPasswordResetMutation = useMutation({
    mutationFn: (email: string) => requestAdminPasswordReset(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetAdminPassword(token, password),
  });

  return {
    session: sessionQuery.data ?? null,
    isLoadingSession: sessionQuery.isLoading,
    isSessionReady: sessionQuery.isFetched,
    sessionError: sessionQuery.error,
    login: (values: AdminLoginFormValues, nextPath?: string | null) =>
      loginMutation.mutateAsync({ values, nextPath }),
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: () => logoutMutation.mutateAsync(),
    isLoggingOut: logoutMutation.isPending,
    logoutError: logoutMutation.error,
    requestPasswordReset: (email: string) =>
      requestPasswordResetMutation.mutateAsync(email),
    isRequestingReset: requestPasswordResetMutation.isPending,
    resetPassword: (token: string, password: string) =>
      resetPasswordMutation.mutateAsync({ token, password }),
    isResettingPassword: resetPasswordMutation.isPending,
  };
}
