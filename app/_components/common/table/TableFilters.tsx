import { FilterConfig } from "@/_features/event/types";
import { ReactNode } from "react";

const updateFilterValue = (
  values: Record<string, string>,
  key: string,
  value: string,
) => ({
  ...values,
  [key]: value,
});

export function TableFilters({
  filters,
  values,
  onChange,
  action,
}: {
  filters: FilterConfig[];
  values: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  action?: ReactNode;
}) {
  const searchFilters = filters.filter((filter) => filter.type === "search");
  const secondaryFilters = filters.filter((filter) => filter.type !== "search");

  return (
    <div className="p-4 bg-primary_light flex flex-wrap items-center justify-between gap-3 rounded-t-xl shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        {searchFilters.map((filter) => (
          <input
            key={filter.key}
            placeholder={filter.placeholder}
            value={values[filter.key] ?? ""}
            onChange={(e) =>
              onChange({
                ...values,
                [filter.key]: e.target.value,
              })
            }
            className="px-3 py-2 border rounded-md w-60 text-sm"
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {secondaryFilters.map((filter) => {
          const value = values[filter.key] ?? "";

          return (
            <div key={filter.key} className="flex items-center gap-2">
              <input
                type={filter.type}
                value={value}
                onChange={(e) =>
                  onChange(updateFilterValue(values, filter.key, e.target.value))
                }
                className="px-3 py-2 border rounded-md text-sm"
              />
              {value && (
                <button
                  type="button"
                  onClick={() =>
                    onChange(updateFilterValue(values, filter.key, ""))
                  }
                  className="rounded-md border border-black/10 bg-white px-2 py-1 text-xs font-medium text-black/70 transition-colors hover:bg-black/5"
                >
                  Clear
                </button>
              )}
            </div>
          );
        })}
        {action}
      </div>
    </div>
  );
}
