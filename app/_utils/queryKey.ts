import { SortingState } from "@tanstack/react-table";

export const getTableQueryKeyPrefix = (prefix: readonly unknown[] = []) => [
  "table",
  ...prefix,
];

export const getTableQueryKey = ({
  prefix = [],
  page,
  filters,
  sorting,
}: {
  prefix?: readonly unknown[];
  page: number;
  filters: Record<string, string>;
  sorting: SortingState;
}) => [
  ...getTableQueryKeyPrefix(prefix),
  page,
  JSON.stringify(filters),
  JSON.stringify(sorting),
];
