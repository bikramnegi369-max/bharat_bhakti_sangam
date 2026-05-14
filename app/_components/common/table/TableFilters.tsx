import { FilterConfig } from "@/_types/Table.types";
import { ReactNode } from "react";

const updateFilterValue = (
  values: Record<string, string>,
  key: string,
  value: string,
) => ({
  ...values,
  [key]: value,
});

const getFilterLabel = (filter: FilterConfig) =>
  filter.label ??
  `${filter.type.charAt(0).toUpperCase()}${filter.type.slice(1)}`;

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
    <div className="p-4 bg-primary_light flex flex-wrap items-end justify-between gap-3 rounded-t-xl shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        {searchFilters.map((filter) => (
          <input
            key={filter.key}
            aria-label={getFilterLabel(filter)}
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

      <div className="flex flex-wrap items-end gap-3">
        {secondaryFilters.map((filter) => {
          const value = values[filter.key] ?? "";
          const label = getFilterLabel(filter);
          const inputId = `table-filter-${filter.key}`;

          return (
            <div key={filter.key} className="flex flex-col gap-1">
              <label
                htmlFor={inputId}
                className="text-xs font-medium uppercase tracking-wide text-black/60"
              >
                {label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={inputId}
                  aria-label={label}
                  type={filter.type}
                  value={value}
                  onChange={(e) =>
                    onChange(
                      updateFilterValue(values, filter.key, e.target.value),
                    )
                  }
                  className="min-h-10 rounded-md border bg-white px-3 py-2 text-sm"
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
            </div>
          );
        })}
        {action}
      </div>
    </div>
  );
}
