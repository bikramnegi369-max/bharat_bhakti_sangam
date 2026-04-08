import { FilterConfig } from "@/_features/event/types";

export function TableFilters({
  filters,
  onChange,
}: {
  filters: FilterConfig[];
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="p-4 bg-[#E6D3B3] flex flex-wrap gap-3 items-center rounded-t-xl">
      {filters.map((f) => {
        if (f.type === "search") {
          return (
            <input
              key={f.key}
              placeholder={f.placeholder}
              onChange={(e) => onChange(f.key, e.target.value)}
              className="px-3 py-2 border rounded-md w-60 text-sm"
            />
          );
        }

        if (f.type === "date") {
          return (
            <input
              key={f.key}
              onChange={(e) => onChange(f.key, e.target.value)}
              className="px-3 py-2 border rounded-md w-60 text-sm"
            />
          );
        }
        if (f.type === "time") {
          return (
            <input
              key={f.key}
              onChange={(e) => onChange(f.key, e.target.value)}
              className="px-3 py-2 border rounded-md w-60 text-sm"
            />
          );
        }
      })}
    </div>
  );
}
