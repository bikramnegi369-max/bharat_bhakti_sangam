"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { TableConfig } from "@/_types/table.types";
import { useTableController } from "@/_hooks/useTableController";

export function DataTable<T, TValue = unknown>({
  config,
}: {
  config: TableConfig<T, TValue>;
}) {
  const controller = useTableController(config);

  const table = useReactTable(
    useMemo(
      () => ({
        data: controller.data?.items || [],
        columns: config.columns,
        state: { sorting: controller.sorting },
        onSortingChange: (updaterOrValue) => {
          const newSorting =
            typeof updaterOrValue === "function"
              ? updaterOrValue(controller.sorting)
              : updaterOrValue;
          controller.setSorting(newSorting);
        },
        getCoreRowModel: getCoreRowModel(),
      }),
      [config.columns, controller],
    ),
  );

  if (controller.isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (controller.error) {
    return <div className="p-6 text-red-500">Error loading data</div>;
  }

  return (
    <div className="border border-black/10 rounded-xl overflow-hidden bg-white">
      {/* Filters */}
      {config.filters && (
        <TableFilters
          filters={config.filters}
          onChange={(k, v) =>
            controller.setFilters((prev) => ({ ...prev, [k]: v }))
          }
        />
      )}

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#F3E4C7] sticky top-0 z-10">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    onClick={h.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {{ asc: "↑", desc: "↓" }[
                        h.column.getIsSorted() as string
                      ] ?? null}
                    </div>
                  </th>
                ))}

                {/* Action Column */}
                {config.renderActions && (
                  <th className="px-4 py-3 sticky right-0 bg-[#F3E4C7] w-30">
                    Action
                  </th>
                )}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    config.columns.length + (config.renderActions ? 1 : 0)
                  }
                  className="text-center py-6"
                >
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}

                  {/* Action Column */}
                  {config.renderActions && (
                    <td className="px-4 py-3 sticky right-0 bg-white shadow-sm">
                      {config.renderActions(row.original)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        page={controller.page}
        total={controller.data?.total || 0}
        onPageChange={controller.setPage}
      />

      {/* Fetch indicator */}
      {controller.isFetching && (
        <div className="text-center text-xs text-gray-500 pb-2">
          Updating...
        </div>
      )}
    </div>
  );
}
