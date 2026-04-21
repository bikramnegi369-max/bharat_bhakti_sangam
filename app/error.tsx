"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Segment-level Error Boundary
 * This component catches uncaught exceptions within this route segment and its children.
 * It allows the rest of the application (like the root layout) to remain interactive.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Route Error Boundary:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <main
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center min-h-dvh p-8 text-center bg-white rounded-4xl border border-gray-100 shadow-xl shadow-gray-200/50 animate-in fade-in zoom-in duration-300"
    >
      <div className="mb-6 flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
        <svg
          className="w-10 h-10 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-3 text-gray-600 max-w-sm mx-auto leading-relaxed">
        An unexpected error occurred. We have been notified and are working to
        fix it. In the meantime, you can try refreshing the section.
      </p>

      {error.digest && (
        <div className="mt-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">
            Error Digest
          </span>
          <code className="px-3 py-1 bg-gray-50 text-[11px] text-gray-500 rounded-md border border-gray-100">
            {error.digest}
          </code>
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <button
          onClick={() => unstable_retry()}
          className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-black bg-primary rounded-full hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
        >
          Try again
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
