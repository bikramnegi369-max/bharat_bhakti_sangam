import { ColumnDef, SortingState } from "@tanstack/react-table";
import { ReactNode } from "react";

export type AccessorFn<T> = (row: T) => unknown;

export type CellRenderer<T> = (value: unknown, row: T) => ReactNode;

export type CreateColumnOptions<T> = {
  header: string;
  accessorFn: AccessorFn<T>;
  cell?: CellRenderer<T>;
  enableSorting?: boolean;
  size?: number;
  minSize?: number;
};

export type CreateColumnReturn<T, TValue = unknown> = ColumnDef<T, TValue>;

export type FilterConfig =
  | { type: "search"; key: string; placeholder?: string }
  | { type: "date"; key: string }
  | { type: "time"; key: string };

export type PaginationProps = {
  page: number;
  total: number;
  limit?: number;
  onPageChange: (page: number) => void;
};

export type TableConfig<T, TValue = unknown> = {
  columns: ColumnDef<T, TValue>[];
  service: TableService<T>;
  filters?: FilterConfig[];
  filterDebounceMs?: number;
  filterAction?: React.ReactNode;
  renderActions?: (row: T) => React.ReactNode;
};

export type TableQueryParams = {
  page: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | undefined;
};

export type TableResponse<T> = {
  items: T[];
  total: number;
};

export type TableService<T> = {
  getAll: (params: TableQueryParams) => Promise<TableResponse<T>>;
  getOne: (id: string) => Promise<T>;
  delete?: (id: string) => Promise<void>;
};

export interface TableController<T> {
  data?: {
    items: T[];
    total: number;
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
