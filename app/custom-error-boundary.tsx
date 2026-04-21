"use client";

import { unstable_catchError as catchError, type ErrorInfo } from "next/error";

/**
 * Component-level Error Boundary
 * Best for wrapping specific widgets or features rather than whole pages.
 */
function ErrorFallback(
  props: { title?: string },
  { error, unstable_retry }: ErrorInfo,
) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900">
        {props.title || "Component Error"}
      </h3>
      <p className="text-xs text-gray-500 mt-1">{error.message}</p>
      <button
        onClick={() => unstable_retry()}
        className="mt-2 text-xs font-bold text-primary hover:opacity-80 transition-opacity"
      >
        Retry Component
      </button>
    </div>
  );
}

export default catchError(ErrorFallback);
