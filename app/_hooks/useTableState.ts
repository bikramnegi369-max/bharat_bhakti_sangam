// shared/table/hooks/useTableState.ts

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useTableState = () => {
  const router = useRouter();
  const params = useSearchParams();

  const page = Number(params.get("page") || 1);
  const sortBy = params.get("sortBy");
  const order = params.get("order");

  const sorting = sortBy ? [{ id: sortBy, desc: order === "desc" }] : [];

  const setState = (key: string, value: string | number | undefined | null) => {
    const newParams = new URLSearchParams(params.toString());

    if (value === undefined || value === null || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }

    router.replace(`?${newParams.toString()}`);
  };

  return {
    state: {
      page,
      sorting,
    },
    setState,
  };
};
