"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Critical Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen bg-secondary px-4">
        <div className="text-center">
          <h1 className="text-7xl font-black text-primary/20">500</h1>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Application Error
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto leading-relaxed">
            The application encountered a critical error. Please try refreshing
            the page or clicking the button below to recover.
          </p>
          <button
            onClick={() => unstable_retry()}
            className="mt-8 px-10 py-4 text-sm font-bold text-black bg-primary rounded-full hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95"
          >
            Attempt Recovery
          </button>
        </div>
      </body>
    </html>
  );
}
