"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { SidebarLogo } from "@/_components/layout/Sidebar/SidebarLogo";

/**
 * Production-grade Error component for the Admin segment.
 * Handles runtime crashes gracefully and provides recovery options.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external service (Sentry, LogRocket, etc.)
    console.error("Admin Crash:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-50/50">
      <div className="mb-6 opacity-80">
        <SidebarLogo />
      </div>

      <div className="max-w-md w-full bg-white rounded-xl shadow-xl border border-gray-100 p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-6">
          <AlertTriangle size={40} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed text-sm">
          The admin panel encountered an unexpected error. Don&apos;t worry,
          your data is safe, but we need to restart this page.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/20 text-sm"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all active:scale-95 text-sm"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>

        {error.digest && (
          <div className="mt-8 pt-6 border-t border-gray-50">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Reference ID:{" "}
              <span className="font-mono text-gray-500 select-all">
                {error.digest}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
