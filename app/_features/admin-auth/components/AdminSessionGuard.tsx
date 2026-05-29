"use client";

import { useEffect } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useAdminAuthFailureHandler } from "../hooks/useAdminAuthFailureHandler";

const MAX_TIMEOUT_MS = 2_147_483_647;

export function AdminSessionGuard() {
  const { session, isSessionReady, sessionError } = useAdminAuth();
  const handleAdminAuthFailure = useAdminAuthFailureHandler();

  useEffect(() => {
    if (!isSessionReady) {
      return undefined;
    }

    if (!session && !sessionError) {
      handleAdminAuthFailure();
      return undefined;
    }

    if (!session) {
      return undefined;
    }

    const delay = Math.max(0, session.expiresAt - Date.now());

    if (delay === 0) {
      handleAdminAuthFailure();
      return undefined;
    }

    const timeout = window.setTimeout(
      handleAdminAuthFailure,
      Math.min(delay, MAX_TIMEOUT_MS),
    );

    return () => window.clearTimeout(timeout);
  }, [handleAdminAuthFailure, isSessionReady, session, sessionError]);

  return null;
}
