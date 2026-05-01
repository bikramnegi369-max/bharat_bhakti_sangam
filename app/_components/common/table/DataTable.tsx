"use client";

import { WheelEvent, useRef } from "react";
import { useDataTable } from "@/_hooks/useDataTable";
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { useTableController } from "@/_hooks/useTableController";
import { TableError, TableFetching, TableLoading } from "./TableStates";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableConfig } from "@/_types/Table.types";
import { RowData } from "@tanstack/react-table";

interface Props<T extends RowData> {
  config: TableConfig<T>;
}

const getErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return undefined;
};

export function DataTable<T extends RowData>({ config }: Props<T>) {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const controller = useTableController(config);
  const tableData = controller.data?.data ?? { items: [], total: 0 };
  const tableController = { ...controller, data: tableData };
  const hasRows = tableData.items.length > 0;

  const table = useDataTable(tableController, config.columns);

  const handleTableWheel = (event: WheelEvent<HTMLDivElement>) => {
    const container = tableScrollRef.current;

    if (!container) {
      return;
    }

    const hasHorizontalOverflow = container.scrollWidth > container.clientWidth;

    if (!hasHorizontalOverflow) {
      return;
    }

    const delta =
      Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;

    if (delta === 0) {
      return;
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const nextScrollLeft = Math.max(
      0,
      Math.min(container.scrollLeft + delta, maxScrollLeft),
    );

    if (nextScrollLeft === container.scrollLeft) {
      return;
    }

    event.preventDefault();
    container.scrollLeft = nextScrollLeft;
  };

  if (controller.isLoading) return <TableLoading />;
  if (controller.error) {
    return <TableError message={getErrorMessage(controller.error)} />;
  }

  return (
    <div className="border border-black/10 rounded-xl bg-white">
      {/* Filters */}
      {config.filters && (
        <TableFilters
          filters={config.filters}
          values={controller.filters}
          onChange={controller.setFilters}
          action={config.filterAction}
        />
      )}

      {/* Table */}
      <div
        ref={tableScrollRef}
        onWheel={handleTableWheel}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
      >
        <table className="min-w-full text-sm">
          <TableHeader
            table={table}
            hasActions={!!config.renderActions}
            disableSorting={!hasRows}
          />

          <TableBody
            table={table}
            columnsLength={config.columns.length}
            renderActions={config.renderActions}
          />
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        page={controller.page}
        total={tableData?.total || 0}
        onPageChange={controller.setPage}
      />

      {/* Fetching Indicator */}
      {controller.isFetching && <TableFetching />}
    </div>
  );
}
