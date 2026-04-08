"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTableState } from "@/_hooks/useTableState";
import { useDebounce } from "@/_hooks/useDebounce";
import { TableConfig } from "@/_types/table.types";

export const useTableController = <T, TValue = unknown>(
  config: TableConfig<T, TValue>,
) => {
  const { state, setState } = useTableState();

  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});
  const debouncedFilters = useDebounce(localFilters);

  const queryKey = useMemo(
    () => [
      "table",
      state.page,
      JSON.stringify(debouncedFilters),
      JSON.stringify(state.sorting),
    ],
    [state.page, debouncedFilters, state.sorting],
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey,
    queryFn: () =>
      config.service.getAll({
        page: state.page,
        ...debouncedFilters,
        sortBy: state.sorting?.[0]?.id,
        order: state.sorting?.[0]?.desc ? "desc" : "asc",
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30,
  });

  return {
    data,
    isLoading,
    isFetching,
    error,

    page: state.page,
    setPage: (p: number) => setState("page", p),

    sorting: state.sorting || [],
    setSorting: (next: Array<{ id: string; desc?: boolean }>) => {
      if (next[0]) {
        setState("sortBy", next[0].id);
        setState("order", next[0].desc ? "desc" : "asc");
      } else {
        setState("sortBy", "");
        setState("order", "");
      }
    },

    filters: localFilters,
    setFilters: setLocalFilters,
  };
};
