import { SortingState } from "@tanstack/react-table";

export const getTableQueryKey = ({
  page,
  filters,
  sorting,
}: {
  page: number;
  filters: Record<string, string>;
  sorting: SortingState;
}) => ["table", page, JSON.stringify(filters), JSON.stringify(sorting)];
