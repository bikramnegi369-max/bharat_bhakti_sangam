import {
  ColumnDef,
  RowData,
  SortingState,
  TableOptions,
} from "@tanstack/react-table";
import { CSSProperties, ReactNode } from "react";
import { APIResponse } from "./Api.types";

export type AccessorFn<T> = (row: T) => unknown;

export type CellRenderer<T> = (value: unknown, row: T) => ReactNode;

export type CreateColumnOptions<T> = {
  header: string;
  accessorFn: AccessorFn<T>;
  cell?: CellRenderer<T>;
  enableSorting?: boolean;
  size?: number;
  minSize?: number;
  width?: CSSProperties["width"];
  minWidth?: CSSProperties["minWidth"];
  maxWidth?: CSSProperties["maxWidth"];
  headerClassName?: string;
  cellClassName?: string;
};

export type CreateColumnReturn<T, TValue = unknown> = ColumnDef<T, TValue>;

type BaseFilterConfig = {
  key: string;
  label?: string;
};

export type FilterConfig =
  | (BaseFilterConfig & {
      type: "search";
      placeholder?: string;
    })
  | (BaseFilterConfig & {
      type: "date";
    })
  | (BaseFilterConfig & {
      type: "time";
    });

export type PaginationProps = {
  page: number;
  total: number;
  limit?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};

export type TableConfig<T extends RowData> = {
  columns: TableOptions<T>["columns"];
  service: TableService<T>;
  queryKeyPrefix?: readonly unknown[];
  filters?: FilterConfig[];
  filterDebounceMs?: number;
  staleTime?: number;
  filterAction?: React.ReactNode;
  renderActions?: (row: T) => React.ReactNode;
};

export type TableQueryParams = {
  page: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | undefined;
};

export type TableService<T> = {
  getAll: (params: TableQueryParams) => Promise<
    APIResponse<{
      items: T[];
      total: number;
      limit: number;
      page: number;
      totalPages?: number;
    }>
  >;
  getOne?: (id: string) => Promise<APIResponse>;
  delete?: (id: string) => Promise<APIResponse>;
};

export interface TableController<T> {
  data?: {
    items: T[];
    total: number;
    limit: number;
    page: number;
    totalPages?: number;
  };
  sorting: SortingState;
  setSorting: (s: SortingState) => void;
  page: number;
  setPage: (p: number) => void;
  filters: Record<string, string>;
  setFilters: (next: Record<string, string>) => void;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
}
