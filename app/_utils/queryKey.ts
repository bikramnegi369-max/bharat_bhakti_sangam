import { SortingState } from "@tanstack/react-table";

export const getTableQueryKeyPrefix = (prefix: readonly unknown[] = []) => [
  "table",
  ...prefix,
];

export const getTableQueryKey = ({
  prefix = [],
  page,
  limit,
  filters,
  sorting,
}: {
  prefix?: readonly unknown[];
  page: number;
  limit: number;
  filters: Record<string, string>;
  sorting: SortingState;
}) => [
  ...getTableQueryKeyPrefix(prefix),
  page,
  limit,
  JSON.stringify(filters),
  JSON.stringify(sorting),
];
