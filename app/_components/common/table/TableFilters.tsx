import { FilterConfig } from "@/_features/event/types";
import { ReactNode } from "react";

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
        {secondaryFilters.map((filter) => (
          <input
            key={filter.key}
            type={filter.type}
            value={values[filter.key] ?? ""}
            onChange={(e) =>
              onChange({
                ...values,
                [filter.key]: e.target.value,
              })
            }
            className="px-3 py-2 border rounded-md text-sm"
          />
        ))}
        {action}
      </div>
    </div>
  );
}
