"use client";

import { Loader2, LogOut, Shield } from "lucide-react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export function AdminSessionPanel() {
  const { session, isLoadingSession, logout, isLoggingOut } = useAdminAuth();

  if (isLoadingSession) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        Checking session
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="hidden rounded-full bg-slate-100 p-2 text-slate-700 sm:inline-flex">
        <Shield size={16} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">
          {session.user.name || session.user.email || "Admin user"}
        </p>
        <p className="truncate text-xs uppercase tracking-[0.18em] text-slate-500">
          Secure session
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          void logout();
        }}
        disabled={isLoggingOut}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoggingOut ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}
