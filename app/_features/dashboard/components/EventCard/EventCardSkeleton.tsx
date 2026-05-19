function SkeletonBlock({ className }: { className: string }) {
  return <div className={`rounded bg-[#E8D9B5] ${className}`} />;
}

export function EventCardSkeleton() {
  return (
    <div
      className="relative flex min-h-[26rem] w-full flex-col overflow-hidden rounded-xl border border-[#E8D9B5] bg-[#FBF5E8] p-5 shadow-[0_4px_24px_rgba(200,134,10,0.10)]"
      aria-busy="true"
      aria-label="Loading event card"
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[table-shimmer_1.8s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <SkeletonBlock className="h-5 w-3/4 max-w-64" />
          <SkeletonBlock className="h-4 w-1/2 max-w-44" />
        </div>
        <SkeletonBlock className="h-7 w-20 shrink-0 rounded-full" />
      </div>

      <div className="relative mt-5 space-y-2 rounded-lg bg-white/40 p-3">
        <SkeletonBlock className="h-4 w-36" />
        <SkeletonBlock className="h-4 w-52 max-w-full" />
      </div>

      <div className="relative mt-5 space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-lg bg-white/40 px-3 py-3"
          >
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-9 w-9 rounded-md" />
              <div className="space-y-2">
                <SkeletonBlock className="h-3 w-24" />
                <SkeletonBlock className="h-3 w-14" />
              </div>
            </div>
            <SkeletonBlock className="h-6 w-16" />
          </div>
        ))}
      </div>

      <div className="relative mt-auto flex items-center gap-4 rounded-xl bg-white/45 p-3">
        <SkeletonBlock className="h-16 w-16 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <SkeletonBlock className="h-3 w-28" />
          <SkeletonBlock className="h-5 w-36 max-w-full" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
