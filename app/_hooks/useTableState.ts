// shared/table/hooks/useTableState.ts

"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const RESERVED_QUERY_KEYS = new Set(["page", "sortBy", "order"]);

export const useTableState = (filterKeys: string[] = []) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentQuery = params.toString();
  const filterKeysSignature = useMemo(
    () => filterKeys.join("|"),
    [filterKeys],
  );
  const allowedFilterKeys = useMemo(
    () => new Set(filterKeysSignature ? filterKeysSignature.split("|") : []),
    [filterKeysSignature],
  );

  const replaceUrl = useCallback(
    (query: string) => {
      window.history.replaceState(
        null,
        "",
        query ? `${pathname}?${query}` : pathname,
      );
    },
    [pathname],
  );

  const pageParam = Number(params.get("page") || 1);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const sortBy = params.get("sortBy");
  const order = params.get("order");
  const filters = Object.fromEntries(
    Array.from(params.entries()).filter(
      ([key]) =>
        !RESERVED_QUERY_KEYS.has(key) &&
        (allowedFilterKeys.size === 0 || allowedFilterKeys.has(key)),
    ),
  );

  const sorting = sortBy ? [{ id: sortBy, desc: order === "desc" }] : [];

  const setStates = useCallback(
    (updates: Record<string, string | number | undefined | null>) => {
      const newParams = new URLSearchParams(currentQuery);

      Object.entries(updates).forEach(([key, value]) => {
        if (
          !RESERVED_QUERY_KEYS.has(key) &&
          allowedFilterKeys.size > 0 &&
          !allowedFilterKeys.has(key)
        ) {
          return;
        }

        const normalizedValue =
          key === "page" && Number(value) <= 1 ? "" : value;

        if (
          normalizedValue === undefined ||
          normalizedValue === null ||
          normalizedValue === ""
        ) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(normalizedValue));
        }
      });

      const query = newParams.toString();

      if (query === currentQuery) {
        return;
      }

      replaceUrl(query);
    },
    [allowedFilterKeys, currentQuery, replaceUrl],
  );

  const setState = useCallback(
    (key: string,
    value: string | number | undefined | null) => {
      setStates({ [key]: value });
    },
    [setStates],
  );

  return {
    state: {
      page,
      sorting,
      filters,
    },
    setState,
    setStates,
  };
};
