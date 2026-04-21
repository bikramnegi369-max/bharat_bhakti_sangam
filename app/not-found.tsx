import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-dvh p-8 text-center animate-in fade-in zoom-in duration-500">
      {/* Visual Indicator */}
      <div className="mb-8 flex items-center justify-center w-28 h-28 bg-primary/10 rounded-full">
        <span className="text-5xl font-bold text-primary">404</span>
      </div>

      {/* Content */}
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg leading-7 text-gray-600 max-w-lg mx-auto">
        Sorry, we couldn’t find the page you’re looking for. It might have been
        moved, or the URL might be incorrect.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <Link
          href="/"
          className="w-full sm:w-auto px-10 py-4 text-sm font-bold text-black bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center"
        >
          Back to Home
        </Link>
        <Link
          href="/events"
          className="w-full sm:w-auto px-10 py-4 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center"
        >
          View Events
        </Link>
      </div>

      {/* Help Link */}
      <p className="mt-12 text-sm text-gray-400">
        Need help?{" "}
        <Link
          href="/contact"
          className="underline hover:text-primary transition-colors"
        >
          Contact Support
        </Link>
      </p>
    </main>
  );
}
