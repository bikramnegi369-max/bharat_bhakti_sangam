export function EventCardSkeleton() {
  return (
    <div
      className="relative h-full w-full animate-pulse overflow-hidden rounded-2xl border border-[#E8D9B5] bg-[#FBF5E8] shadow-lg"
      aria-busy="true"
      aria-label="Loading event data…"
    >
      {/* Badge placeholder */}
      <div className="flex justify-center pt-4 pb-2">
        <div className="h-6 w-32 rounded-full bg-[#E8D9B5]" />
      </div>

      <div className="flex h-full flex-col gap-4 p-5">
        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="h-5 w-3/4 rounded bg-[#E8D9B5]" />
            <div className="h-6 w-16 shrink-0 rounded-full bg-[#E8D9B5]" />
          </div>
          <div className="space-y-2 rounded-lg bg-white/35 px-3 py-2.5">
            <div className="h-4 w-1/2 rounded bg-[#E8D9B5]" />
            <div className="h-4 w-2/3 rounded bg-[#E8D9B5]" />
          </div>
        </div>

        {/* Stats row */}
        <div className="overflow-hidden rounded-xl border border-[#E8D9B5] bg-white/35">
          <div className="divide-y divide-[#E8D9B5]">
            <div className="flex items-center justify-between gap-4 px-3 py-3">
              <div className="h-9 w-9 rounded-md bg-[#E8D9B5]" />
              <div className="h-6 w-16 rounded bg-[#E8D9B5]" />
            </div>
            <div className="flex items-center justify-between gap-4 px-3 py-3">
              <div className="h-9 w-9 rounded-md bg-[#E8D9B5]" />
              <div className="h-6 w-16 rounded bg-[#E8D9B5]" />
            </div>
            <div className="flex items-center justify-between gap-4 px-3 py-3">
              <div className="h-9 w-9 rounded-md bg-[#E8D9B5]" />
              <div className="h-6 w-16 rounded bg-[#E8D9B5]" />
            </div>
          </div>
        </div>

        {/* Attendance section */}
        <div className="mt-auto grid gap-4 rounded-xl bg-white/50 p-3 min-[360px]:grid-cols-[auto_1fr] min-[360px]:items-center">
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
