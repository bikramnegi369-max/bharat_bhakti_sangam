"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

type BlogSearchAndPaginationProps = {
  currentPage: number;
  totalPages: number;
  total: number;
  searchQuery: string;
};

export default function BlogSearchAndPagination({
  currentPage,
  totalPages,
  total,
  searchQuery,
}: BlogSearchAndPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchQuery);
  const [isPending, startTransition] = useTransition();

  const hasPrevious = currentPage > 1;
  const hasNext = totalPages > 0 && currentPage < totalPages;

  const pageNumbers = useMemo(() => {
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  function buildHref(nextPage: number, nextQuery = query) {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedQuery = nextQuery.trim();

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    } else {
      params.delete("q");
    }

    if (nextPage > 1) {
      params.set("page", String(nextPage));
    } else {
      params.delete("page");
    }

    const search = params.toString();
    return search ? `${pathname}?${search}` : pathname;
  }

  function navigate(nextPage: number, nextQuery = query) {
    startTransition(() => {
      router.push(buildHref(nextPage, nextQuery), { scroll: false });
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(1);
  }

  function handleClear() {
    setQuery("");
    navigate(1, "");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={handleSubmit}
          className="relative flex-1"
          role="search"
          aria-label="Search blog articles"
        >
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
            aria-hidden
          />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            className="h-12 w-full rounded-xl border border-amber-200 bg-white pl-11 pr-24 text-sm text-stone-700 outline-none transition-colors placeholder:text-stone-400 focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className="absolute right-1.5 top-1.5 inline-flex h-9 items-center justify-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Search
          </button>
        </form>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className="text-sm font-medium text-stone-600">
            {total} {total === 1 ? "article" : "articles"}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 text-sm font-semibold text-stone-600 transition-colors hover:border-amber-400 hover:text-amber-700"
            >
              <X className="h-4 w-4" aria-hidden />
              Clear
            </button>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-2"
          aria-label="Blog pagination"
        >
          <button
            type="button"
            onClick={() => navigate(currentPage - 1)}
            disabled={!hasPrevious || isPending}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-white text-stone-600 transition-colors hover:border-amber-400 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous blog page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>

          {pageNumbers[0] > 1 && (
            <span className="px-2 text-sm font-semibold text-stone-400">
              ...
            </span>
          )}

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => navigate(pageNumber)}
              disabled={isPending}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              className={[
                "inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors",
                pageNumber === currentPage
                  ? "bg-amber-500 text-white"
                  : "border border-amber-200 bg-white text-stone-600 hover:border-amber-400 hover:text-amber-700",
              ].join(" ")}
            >
              {pageNumber}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <span className="px-2 text-sm font-semibold text-stone-400">
              ...
            </span>
          )}

          <button
            type="button"
            onClick={() => navigate(currentPage + 1)}
            disabled={!hasNext || isPending}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-white text-stone-600 transition-colors hover:border-amber-400 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next blog page"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </nav>
      )}
    </div>
  );
}

