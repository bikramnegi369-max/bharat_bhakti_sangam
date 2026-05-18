import type { ChangeEvent } from "react";
import { PaginationProps } from "@/_types/Table.types";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const buildPageItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages]);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  const sortedPages = Array.from(pages).sort((left, right) => left - right);
  const items: Array<number | string> = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];

    if (previousPage && page - previousPage > 1) {
      items.push(`ellipsis-${previousPage}-${page}`);
    }

    items.push(page);
  });

  return items;
};

export function TablePagination({
  page,
  total,
  limit = 10,
  totalPages,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const currentLimit = limit > 0 ? limit : DEFAULT_PAGE_SIZE_OPTIONS[0];
  const totalPage = Math.max(1, totalPages ?? Math.ceil(total / currentLimit));
  const currentPage = clamp(page || 1, 1, totalPage);
  const normalizedPageSizeOptions = Array.from(
    new Set([currentLimit, ...pageSizeOptions]),
  )
    .filter((option) => Number.isInteger(option) && option > 0)
    .sort((left, right) => left - right);
  const visiblePageItems = buildPageItems(currentPage, totalPage);
  const rangeStart = total === 0 ? 0 : (currentPage - 1) * currentLimit + 1;
  const rangeEnd = total === 0 ? 0 : Math.min(currentPage * currentLimit, total);

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLimit = Number(event.target.value);

    if (!Number.isFinite(nextLimit) || nextLimit <= 0) {
      return;
    }

    onLimitChange?.(nextLimit);
  };

  return (
    <div className="border-t border-black/10 px-4 py-4">
      <div className="flex flex-col gap-3 text-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {onLimitChange && normalizedPageSizeOptions.length > 1 ? (
            <label className="flex items-center gap-2 text-black/70">
              <span>Rows per page</span>
              <select
                value={currentLimit}
                onChange={handleLimitChange}
                aria-label="Rows per page"
                className="rounded-lg border border-black/10 bg-white px-3 py-2 text-black outline-none transition-colors focus:border-black/30"
              >
                {normalizedPageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <p className="text-black/70">
            {total === 0
              ? "No results found"
              : `Showing ${rangeStart}-${rangeEnd} of ${total}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
          <button
            onClick={() => {
              onPageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className="rounded-lg border border-black/10 px-3 py-2 text-black transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {visiblePageItems.map((item) =>
              typeof item === "number" ? (
                <button
                  key={item}
                  onClick={() => {
                    onPageChange(item);
                  }}
                  aria-label={`Go to page ${item}`}
                  aria-current={item === currentPage ? "page" : undefined}
                  className={`min-w-10 rounded-lg border px-3 py-2 transition-colors ${
                    item === currentPage
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ) : (
                <span key={item} className="px-1 text-black/50">
                  ...
                </span>
              ),
            )}
          </div>

          <button
            onClick={() => {
              onPageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPage}
            aria-label="Go to next page"
            className="rounded-lg border border-black/10 px-3 py-2 text-black transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
