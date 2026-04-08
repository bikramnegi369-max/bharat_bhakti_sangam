export const getTableQueryKey = ({
  page,
  filters,
  sorting,
}: {
  page: number;
  filters: Record<string, string>;
  sorting: unknown;
}) => ["table", page, JSON.stringify(filters), JSON.stringify(sorting)];
