// shared/table/columns/types.ts

import { FilterConfig } from "@/_features/event/types";
import { ColumnDef } from "@tanstack/react-table";
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

export type TableConfig<T, TValue = unknown> = {
  data: T[];
  columns: ColumnDef<T, TValue>[];
  service: TableService<T>;
  filters?: FilterConfig[];
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
