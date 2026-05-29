"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { RowData, SortingState, TableOptions } from "@tanstack/react-table";
import { toast } from "react-toastify";
import {
  TableExportConfig,
  TableQueryParams,
  TableService,
} from "@/_types/Table.types";
import {
  createExcelFileName,
  downloadExcelWorksheet,
  getDefaultExportColumns,
} from "./tableExport";
import {
  isAdminAuthFailureStatus,
  useAdminAuthFailureHandler,
} from "@/_features/admin-auth/hooks/useAdminAuthFailureHandler";
import { fetchAdminSession } from "@/_features/admin-auth/client";

const DEFAULT_EXPORT_PAGE_SIZE = 1000;
const MAX_EXPORT_PAGES = 1000;

const normalizeFilters = (filters: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value.trim() !== ""),
  );

const getExportBaseName = (
  queryKeyPrefix?: readonly unknown[],
  fileName?: string,
) => {
  if (fileName) {
    return fileName;
  }

  const lastKey = queryKeyPrefix?.at(-1);

  return typeof lastKey === "string" && lastKey.trim()
    ? lastKey
    : "table-export";
};

class TableExportError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "TableExportError";
  }
}

async function fetchAllRows<T extends RowData>({
  service,
  params,
  pageSize,
}: {
  service: TableService<T>;
  params: Omit<TableQueryParams, "page" | "limit">;
  pageSize: number;
}) {
  const firstResult = await service.getAll({
    ...params,
    page: 1,
    limit: pageSize,
  });

  if (!firstResult.success || !firstResult.data) {
    throw new TableExportError(
      firstResult.error || "Failed to export table data.",
      firstResult.status,
    );
  }

  const firstPage = firstResult.data;
  const rows = [...firstPage.items];
  const totalPages =
    firstPage.totalPages ?? Math.ceil(firstPage.total / firstPage.limit || 1);
  const safeTotalPages = Math.min(totalPages, MAX_EXPORT_PAGES);

  for (let page = 2; page <= safeTotalPages; page += 1) {
    const result = await service.getAll({
      ...params,
      page,
      limit: pageSize,
    });

    if (!result.success || !result.data) {
      throw new TableExportError(
        result.error || "Failed to export table data.",
        result.status,
      );
    }

    rows.push(...result.data.items);
  }

  return rows;
}

export function TableExportButton<T extends RowData>({
  columns,
  service,
  filters,
  sorting,
  queryKeyPrefix,
  exportOptions,
  disabled,
}: {
  columns: TableOptions<T>["columns"];
  service: TableService<T>;
  filters: Record<string, string>;
  sorting: SortingState;
  queryKeyPrefix?: readonly unknown[];
  exportOptions?: TableExportConfig<T>;
  disabled?: boolean;
}) {
  const [isExporting, setIsExporting] = useState(false);
  const handleAdminAuthFailure = useAdminAuthFailureHandler();
  const exportColumns = useMemo(
    () =>
      exportOptions?.columns?.length
        ? exportOptions.columns
        : getDefaultExportColumns(columns),
    [columns, exportOptions?.columns],
  );

  const handleExport = async () => {
    if (isExporting || exportColumns.length === 0) {
      return;
    }

    setIsExporting(true);

    try {
      const session = await fetchAdminSession();

      if (!session) {
        throw new TableExportError(
          "Admin session has expired. Please sign in again.",
          401,
        );
      }

      const baseName = getExportBaseName(
        queryKeyPrefix,
        exportOptions?.fileName,
      );
      const params = {
        ...normalizeFilters(filters),
        sortBy: sorting[0]?.id,
        order: sorting[0] ? (sorting[0].desc ? "desc" : "asc") : undefined,
      };
      const rows = await fetchAllRows({
        service,
        params,
        pageSize: exportOptions?.pageSize ?? DEFAULT_EXPORT_PAGE_SIZE,
      });

      if (rows.length === 0) {
        toast.info("No rows found to export.");
        return;
      }

      downloadExcelWorksheet({
        rows,
        columns: exportColumns,
        fileName: createExcelFileName(baseName),
        sheetName: exportOptions?.sheetName || baseName,
      });

      toast.success(
        `Exported ${rows.length} row${rows.length === 1 ? "" : "s"}.`,
      );
    } catch (error) {
      if (
        isAdminAuthFailureStatus(
          error instanceof TableExportError ? error.status : undefined,
        )
      ) {
        toast.info("Your admin session has expired. Please sign in again.");
        handleAdminAuthFailure();
        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to export table data right now.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={disabled || isExporting || exportColumns.length === 0}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/75 shadow-sm transition hover:border-primary/60 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer hover:scale-110"
    >
      <Download size={16} />
      {isExporting ? "Exporting..." : "Export"}
    </button>
  );
}
