"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Marketing Segment Error Boundary
 * This handles errors for all routes under the (marketing) group.
 * By placing it here, it renders INSIDE the MarketingLayout,
 * keeping the Navbar and Footer visible.
 */
export default function MarketingError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Marketing Route Error:", error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 text-center ">
      <div className="mb-6 flex items-center justify-center w-20 h-20 bg-primary rounded-full">
        <svg
          className="w-10 h-10"
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

      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
        We hit a snag
      </h2>
      <p className="mt-4 text-gray-600 max-w-md mx-auto leading-relaxed">
        The page you&apos;re looking for encountered an unexpected error. You
        can try refreshing this section or head back to our home page.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => unstable_retry()}
          className="px-8 py-3 text-sm font-bold bg-primary rounded-full hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-8 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
