interface EventCardErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function EventCardError({
  message = "Failed to load event data.",
  onRetry,
}: EventCardErrorProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[#FBF5E8] border border-red-200 shadow-lg w-full max-w-sm flex flex-col items-center justify-center gap-4 p-8 text-center min-h-65"
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#1A1208]">
          Something went wrong
        </p>
        <p className="text-xs text-[#8C7A5E] mt-1">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-[#C8860A] text-white text-xs font-semibold hover:bg-[#A86D08] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8860A] focus-visible:ring-offset-2"
        >
          Try again
        </button>
      )}
    </div>
  );
}
