"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDataTable } from "@/_hooks/useDataTable";
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { useTableController } from "@/_hooks/useTableController";
import { TableError, TableFetching, TableLoading } from "./TableStates";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableConfig } from "@/_types/Table.types";
import { RowData } from "@tanstack/react-table";
import { getColumnSizeStyle, hasColumnSizing } from "./tableSizing";

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

const DEFAULT_TABLE_DATA = {
  items: [],
  total: 0,
  limit: 10,
  page: 1,
  totalPages: 1,
};

export function DataTable<T extends RowData>({ config }: Props<T>) {
  const [tableScrollContainer, setTableScrollContainer] =
    useState<HTMLDivElement | null>(null);
  const controller = useTableController(config);

  const tableData = useMemo(
    () => controller.data?.data ?? DEFAULT_TABLE_DATA,
    [controller.data?.data],
  );

  const tableController = useMemo(
    () => ({ ...controller, data: tableData }),
    [controller, tableData],
  );

  const hasRows = tableData.items.length > 0;

  const table = useDataTable(tableController, config.columns);
  const hasFixedWidthColumns = table
    .getVisibleLeafColumns()
    .some((column) =>
      hasColumnSizing({
        size: column.columnDef.size,
        minSize: column.columnDef.minSize,
        meta: column.columnDef.meta,
      }),
    );

  const handleTableScrollRef = useCallback((node: HTMLDivElement | null) => {
    setTableScrollContainer(node);
  }, []);

  useEffect(() => {
    const container = tableScrollContainer;
    const scrollTolerance = 1;

    if (!container) {
      return undefined;
    }

    const getVerticalScrollParent = (): HTMLElement | null => {
      let currentElement = container.parentElement;

      while (currentElement) {
        const { overflowY, overflow } = window.getComputedStyle(currentElement);
        const canScrollVertically =
          /(auto|scroll|overlay)/.test(overflowY) ||
          /(auto|scroll|overlay)/.test(overflow);

        if (
          canScrollVertically &&
          currentElement.scrollHeight >
            currentElement.clientHeight + scrollTolerance
        ) {
          return currentElement;
        }

        currentElement = currentElement.parentElement;
      }

      return document.scrollingElement instanceof HTMLElement
        ? document.scrollingElement
        : document.documentElement;
    };

    const scrollPageBy = (delta: number) => {
      const verticalScrollParent = getVerticalScrollParent();

      if (verticalScrollParent) {
        verticalScrollParent.scrollTop += delta;
        return;
      }

      window.scrollTo({
        top: window.scrollY + delta,
      });
    };

    const handleTableWheel = (event: WheelEvent) => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const hasHorizontalOverflow = maxScrollLeft > scrollTolerance;

      if (!hasHorizontalOverflow) {
        return;
      }

      const horizontalDelta = event.deltaY !== 0 ? event.deltaY : event.deltaX;

      if (horizontalDelta === 0) {
        return;
      }

      const currentScrollLeft = container.scrollLeft;
      const nextScrollLeft = Math.max(
        0,
        Math.min(currentScrollLeft + horizontalDelta, maxScrollLeft),
      );
      const consumedDelta = nextScrollLeft - currentScrollLeft;
      const remainingDelta = horizontalDelta - consumedDelta;
      const movedTable = Math.abs(consumedDelta) > scrollTolerance;
      const shouldScrollPage = Math.abs(remainingDelta) > scrollTolerance;

      if (!movedTable && !shouldScrollPage) {
        return;
      }

      event.preventDefault();

      if (movedTable) {
        container.scrollLeft = nextScrollLeft;
      }

      if (shouldScrollPage) {
        scrollPageBy(remainingDelta);
      }
    };

    container.addEventListener("wheel", handleTableWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleTableWheel);
    };
  }, [tableScrollContainer]);

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
        ref={handleTableScrollRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
      >
        <table
          className="min-w-full text-sm"
          style={hasFixedWidthColumns ? { tableLayout: "fixed" } : undefined}
        >
          <colgroup>
            {table.getVisibleLeafColumns().map((column) => (
              <col
                key={column.id}
                style={getColumnSizeStyle({
                  size: column.columnDef.size,
                  minSize: column.columnDef.minSize,
                  width: column.columnDef.meta?.width,
                  minWidth: column.columnDef.meta?.minWidth,
                  maxWidth: column.columnDef.meta?.maxWidth,
                })}
              />
            ))}
          </colgroup>

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
        limit={tableData?.limit || 10}
        totalPages={tableData?.totalPages}
        onPageChange={controller.setPage}
      />

      {/* Fetching Indicator */}
      {controller.isFetching && <TableFetching />}
    </div>
  );
}
