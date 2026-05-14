export function EventCardSkeleton() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-[#FBF5E8] border border-[#E8D9B5] shadow-lg w-full max-w-sm animate-pulse"
      aria-busy="true"
      aria-label="Loading event data…"
    >
      {/* Badge placeholder */}
      <div className="flex justify-center pt-4 pb-2">
        <div className="h-6 w-32 rounded-full bg-[#E8D9B5]" />
      </div>

      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded bg-[#E8D9B5]" />
          <div className="h-4 w-1/2 rounded bg-[#E8D9B5]" />
          <div className="h-4 w-2/5 rounded bg-[#E8D9B5]" />
        </div>

        {/* Stats row */}
        <div className="flex gap-8 pt-2">
          <div className="space-y-2 flex-1">
            <div className="h-3 w-20 rounded bg-[#E8D9B5]" />
            <div className="h-7 w-16 rounded bg-[#E8D9B5]" />
            <div className="h-3 w-12 rounded bg-[#E8D9B5]" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="h-3 w-20 rounded bg-[#E8D9B5]" />
            <div className="h-7 w-16 rounded bg-[#E8D9B5]" />
            <div className="h-3 w-12 rounded bg-[#E8D9B5]" />
          </div>
        </div>

        {/* Attendance section */}
        <div className="flex items-center gap-4 bg-white/50 rounded-xl p-3">
          <div className="w-16 h-16 rounded-full bg-[#E8D9B5]" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-24 rounded bg-[#E8D9B5]" />
            <div className="h-5 w-32 rounded bg-[#E8D9B5]" />
            <div className="h-3 w-20 rounded bg-[#E8D9B5]" />
          </div>
        </div>
      </div>
    </div>
  );
}
