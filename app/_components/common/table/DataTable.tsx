"use client";

import { useDataTable } from "@/_hooks/useDataTable";
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";
import { useTableController } from "@/_hooks/useTableController";
import { TableError, TableFetching, TableLoading } from "./TableStates";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableConfig } from "@/_types/table.types";

interface Props<T, TValue> {
  config: TableConfig<T, TValue>;
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

export function DataTable<T, TValue = unknown>({ config }: Props<T, TValue>) {
  const controller = useTableController(config);
  const table = useDataTable(controller, config.columns);

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
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <TableHeader table={table} hasActions={!!config.renderActions} />

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
        total={controller.data?.total || 0}
        onPageChange={controller.setPage}
      />

      {/* Fetching Indicator */}
      {controller.isFetching && <TableFetching />}
    </div>
  );
}
