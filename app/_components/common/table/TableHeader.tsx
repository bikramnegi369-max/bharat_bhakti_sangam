import { flexRender, Table } from "@tanstack/react-table";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { getColumnSizeStyle } from "./tableSizing";

interface TableHeaderProps<T> {
  table: Table<T>;
  hasActions: boolean;
  disableSorting?: boolean;
}

export const TableHeader = <T,>({
  table,
  hasActions,
  disableSorting = false,
}: TableHeaderProps<T>) => {
  return (
    <thead className="bg-[#F3E4C7] sticky top-0 z-10">
      {table.getHeaderGroups().map((hg) => (
        <tr key={hg.id}>
          {hg.headers.map((h) => {
            const canSort = !disableSorting && h.column.getCanSort();
            const columnSizeStyle = getColumnSizeStyle({
              size: h.column.columnDef.size,
              minSize: h.column.columnDef.minSize,
              width: h.column.columnDef.meta?.width,
              minWidth: h.column.columnDef.meta?.minWidth,
              maxWidth: h.column.columnDef.meta?.maxWidth,
            });
            const headerClassName = h.column.columnDef.meta?.headerClassName;

            return (
              <th
                key={h.id}
                onClick={
                  canSort ? h.column.getToggleSortingHandler() : undefined
                }
                style={columnSizeStyle}
                className={`align-top px-4 py-3 text-left ${
                  canSort ? "cursor-pointer" : "cursor-default"
                } select-none ${headerClassName ?? ""}`}
              >
                <div className="flex min-w-0 items-start gap-2">
                  <span className="min-w-0 whitespace-normal break-words leading-tight">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </span>
                  {canSort && (
                    <span className="shrink-0 pt-0.5">
                      {{
                        asc: <ChevronUp size={20} />,
                        desc: <ChevronDown size={20} />,
                      }[h.column.getIsSorted() as string] ?? (
                        <ChevronsUpDown size={20} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            );
          })}

          {hasActions && (
            <th className="sticky right-0 z-30 w-30 border-l border-black/10 bg-[#F3E4C7] px-4 py-3 text-center shadow-2xl before:absolute before:left-0 before:top-0 before:h-full before:w-3 before:-translate-x-full before:bg-linear-to-l before:from-black/15 before:to-transparent before:content-['']">
              Action
            </th>
          )}
        </tr>
      ))}
    </thead>
  );
};
