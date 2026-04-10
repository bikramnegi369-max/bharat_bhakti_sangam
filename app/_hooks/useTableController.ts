"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/_hooks/useDebounce";
import { useTableState } from "@/_hooks/useTableState";
import { TableConfig } from "@/_types/table.types";
import { getTableQueryKey } from "@/_utils/queryKey";

const normalizeFilters = (filters: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

const getFilterSignature = (filters: Record<string, string>) =>
  JSON.stringify(
    Object.entries(filters).sort(([leftKey], [rightKey]) =>
      leftKey.localeCompare(rightKey),
    ),
  );

const areFilterValuesEqual = (
  a: Record<string, string>,
  b: Record<string, string>,
) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key) => a[key] === b[key]);
};

export const useTableController = <T, TValue = unknown>(
  config: TableConfig<T, TValue>,
) => {
  const filterKeys = useMemo(
    () => config.filters?.map((filter) => filter.key) ?? [],
    [config.filters],
  );
  const { state, setState, setStates } = useTableState(filterKeys);
  const appliedFilters = useMemo(
    () => normalizeFilters(state.filters),
    [state.filters],
  );
  const appliedFiltersSignature = useMemo(
    () => getFilterSignature(appliedFilters),
    [appliedFilters],
  );
  const [draftFilters, setDraftFilters] = useState<Record<string, string>>(
    appliedFilters,
  );
  const debouncedFilters = useDebounce(
    draftFilters,
    config.filterDebounceMs ?? 700,
  );
  const normalizedDebouncedFilters = useMemo(
    () => normalizeFilters(debouncedFilters),
    [debouncedFilters],
  );
  const normalizedDebouncedSignature = useMemo(
    () => getFilterSignature(normalizedDebouncedFilters),
    [normalizedDebouncedFilters],
  );
  const clearedFilterUpdates = useMemo(
    () => Object.fromEntries(filterKeys.map((key) => [key, ""])),
    [filterKeys],
  );
  const lastAppliedFiltersSignature = useRef(appliedFiltersSignature);
  const isSyncingExternalFilters = useRef(false);

  const queryKey = useMemo(
    () =>
      getTableQueryKey({
        page: state.page,
        filters: appliedFilters,
        sorting: state.sorting,
      }),
    [appliedFilters, state.page, state.sorting],
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey,
    queryFn: () =>
      config.service.getAll({
        page: state.page,
        ...appliedFilters,
        sortBy: state.sorting?.[0]?.id,
        order: state.sorting?.[0]?.desc ? "desc" : "asc",
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    if (appliedFiltersSignature === lastAppliedFiltersSignature.current) {
      return;
    }

    lastAppliedFiltersSignature.current = appliedFiltersSignature;
    isSyncingExternalFilters.current = true;
    // This syncs the input draft when filters change from an external URL update,
    // such as navigation or a programmatic state change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraftFilters(appliedFilters);
  }, [appliedFilters, appliedFiltersSignature]);

  useEffect(() => {
    if (isSyncingExternalFilters.current) {
      if (normalizedDebouncedSignature === appliedFiltersSignature) {
        isSyncingExternalFilters.current = false;
      }
      return;
    }

    if (normalizedDebouncedSignature === appliedFiltersSignature) {
      return;
    }

    lastAppliedFiltersSignature.current = normalizedDebouncedSignature;
    setStates({
      page: 1,
      ...clearedFilterUpdates,
      ...normalizedDebouncedFilters,
    });
  }, [
    appliedFiltersSignature,
    clearedFilterUpdates,
    normalizedDebouncedFilters,
    normalizedDebouncedSignature,
    setStates,
  ]);

  const setPage = useCallback(
    (page: number) => {
      setState("page", page);
    },
    [setState],
  );

  const setSorting = useCallback(
    (next: Array<{ id: string; desc?: boolean }>) => {
      if (next[0]) {
        setStates({
          sortBy: next[0].id,
          order: next[0].desc ? "desc" : "asc",
        });
      } else {
        setStates({
          sortBy: "",
          order: "",
        });
      }
    },
    [setStates],
  );

  const setFilters = useCallback(
    (nextFilters: Record<string, string>) => {
      const normalizedNextFilters = normalizeFilters(nextFilters);

      setDraftFilters((currentFilters) =>
        areFilterValuesEqual(currentFilters, normalizedNextFilters)
          ? currentFilters
          : normalizedNextFilters,
      );
    },
    [],
  );

  return {
    data,
    isLoading,
    isFetching,
    error,

    page: state.page,
    setPage,

    sorting: state.sorting || [],
    setSorting,

    filters: draftFilters,
    setFilters,
  };
};
