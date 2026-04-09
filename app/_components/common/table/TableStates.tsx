export const TableLoading = () => (
  <div className="p-6">
    <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
        <span>Loading table</span>
        <span>Please wait</span>
      </div>

      <div className="table-progress mb-5 h-1.5 rounded-full bg-black/10" />

      <div className="space-y-3">
        <div className="table-shimmer h-10 rounded-lg bg-black/5" />
        <div className="table-shimmer h-10 rounded-lg bg-black/5" />
        <div className="table-shimmer h-10 rounded-lg bg-black/5" />
        <div className="table-shimmer h-10 rounded-lg bg-black/5" />
      </div>
    </div>
  </div>
);

export const TableError = ({ message }: { message?: string }) => (
  <div className="p-6">
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-5 text-red-900">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="space-y-1">
          <p className="text-sm font-semibold">Unable to load table data</p>
          <p className="text-sm text-red-700">
            {message ||
              "Something went wrong while fetching the latest records. Try again in a moment or refresh the page."}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const TableFetching = () => (
  <div className="px-4 pb-3">
    <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
      <span>Updating table</span>
      <span>Syncing</span>
    </div>
    <div className="table-progress h-1.5 rounded-full bg-black/10" />
  </div>
);
