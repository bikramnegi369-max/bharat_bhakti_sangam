"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/_hooks/useDebounce";
import { useTableState } from "@/_hooks/useTableState";
import { TableConfig } from "@/_types/Table.types";
import { getTableQueryKey } from "@/_utils/queryKey";
import { RowData } from "@tanstack/react-table";
import {
  isAdminAuthFailureStatus,
  useAdminAuthFailureHandler,
} from "@/_features/admin-auth/hooks/useAdminAuthFailureHandler";
import { fetchAdminSession } from "@/_features/admin-auth/client";

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

class TableServiceError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "TableServiceError";
  }
}

export const useTableController = <T extends RowData>(
  config: TableConfig<T>,
) => {
  const handleAdminAuthFailure = useAdminAuthFailureHandler();
  const filterKeys = useMemo(
    () => config.filters?.map((filter) => filter.key) ?? [],
    [config.filters],
  );
  const { state, setState, setStates } = useTableState({
    filterKeys,
    defaultLimit: config.defaultLimit ?? 10,
  });
  const appliedFilters = useMemo(
    () => normalizeFilters(state.filters),
    [state.filters],
  );
  const appliedFiltersSignature = useMemo(
    () => getFilterSignature(appliedFilters),
    [appliedFilters],
  );
  const [draftFilters, setDraftFilters] =
    useState<Record<string, string>>(appliedFilters);
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
        prefix: config.queryKeyPrefix,
        page: state.page,
        limit: state.limit,
        filters: appliedFilters,
        sorting: state.sorting,
      }),
    [
      appliedFilters,
      config.queryKeyPrefix,
      state.limit,
      state.page,
      state.sorting,
    ],
  );

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const session = await fetchAdminSession();

      if (!session) {
        throw new TableServiceError(
          "Admin session has expired. Please sign in again.",
          401,
        );
      }

      const result = await config.service.getAll({
        page: state.page,
        limit: state.limit,
        ...appliedFilters,
        sortBy: state.sorting?.[0]?.id,
        order: state.sorting?.[0]?.desc ? "desc" : "asc",
      });

      if (!result.success) {
        throw new TableServiceError(
          result.error || "Failed to load table data.",
          result.status,
        );
      }

      return result;
    },
    placeholderData: (previousData) => previousData,
    staleTime: config.staleTime ?? 1000 * 10, // Default to 10 seconds
  });

  useEffect(() => {
    const status =
      error instanceof TableServiceError ? error.status : undefined;

    if (isAdminAuthFailureStatus(status)) {
      handleAdminAuthFailure();
    }
  }, [error, handleAdminAuthFailure]);

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

  const setLimit = useCallback(
    (limit: number) => {
      setStates({
        page: 1,
        limit,
      });
    },
    [setStates],
  );

  const setFilters = useCallback((nextFilters: Record<string, string>) => {
    const normalizedNextFilters = normalizeFilters(nextFilters);

    setDraftFilters((currentFilters) =>
      areFilterValuesEqual(currentFilters, normalizedNextFilters)
        ? currentFilters
        : normalizedNextFilters,
    );
  }, []);

  return {
    data,
    isLoading,
    isFetching,
    error,

    page: state.page,
    setPage,
    limit: state.limit,
    setLimit,

    sorting: state.sorting || [],
    setSorting,

    filters: draftFilters,
    setFilters,
  };
};
