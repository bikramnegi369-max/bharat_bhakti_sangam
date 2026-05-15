export default function BookingFormSkeleton() {
  return (
    <div
      className="w-full overflow-hidden rounded-3xl border-2 border-primary bg-white shadow-sm animate-pulse
        px-[clamp(1.375rem,calc(1.054rem+1.607vw),2.5rem)]
        py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)]"
      aria-busy="true"
      aria-label="Loading booking form"
    >
      <div className="space-y-8 lg:space-y-16">
        <div className="flex flex-col items-center gap-3">
          <div className="h-3 w-24 rounded-full bg-primary/10" />
          <div className="h-8 w-56 max-w-[70%] rounded-full bg-primary/20" />
        </div>

        <div className="space-y-6 lg:space-y-8">
          {["w-28", "w-24", "w-32"].map((labelWidth, index) => (
            <div key={`${labelWidth}-${index}`} className="space-y-3">
              <div className={`h-4 rounded-full bg-primary/10 ${labelWidth}`} />
              <div className="h-14 rounded-2xl border border-primary/10 bg-[#FBF5E8]" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="h-4 w-44 rounded-full bg-primary/10" />
          <div className="flex items-center justify-between rounded-2xl border border-primary/10 bg-[#FBF5E8] px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-white shadow-sm" />
            <div className="h-7 w-12 rounded-full bg-primary/15" />
            <div className="h-10 w-10 rounded-full bg-white shadow-sm" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] w-full rounded-2xl bg-primary/85" />
          <div className="mx-auto h-3 w-2/3 rounded-full bg-primary/10" />
        </div>
      </div>
    </div>
  );
}
