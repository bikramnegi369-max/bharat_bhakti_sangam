"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { poppins } from "@/_lib/fonts";

type BlogSearchAndPaginationProps = {
  currentPage: number;
  totalPages: number;
  total: number;
  searchQuery: string;
  variant?: "top-bar" | "pagination-only" | "search-only";
};

export default function BlogSearchAndPagination({
  currentPage,
  totalPages,
  total,
  searchQuery,
  variant = "top-bar",
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

  const renderPagination = (compact = false) => {
    if (totalPages <= 1) return null;

    return (
      <nav
        className="flex items-center justify-center gap-1.5 sm:gap-2 select-none"
        aria-label="Blog pagination"
      >
        <button
          type="button"
          onClick={() => navigate(currentPage - 1)}
          disabled={!hasPrevious || isPending}
          className="inline-flex h-9 sm:h-10 px-2.5 sm:px-3.5 items-center justify-center gap-1 rounded-xl border border-[#740E0A]/15 bg-white text-xs font-semibold text-[#5A100B] shadow-xs transition-all duration-200 hover:border-[#740E0A]/40 hover:bg-[#FFF7ED] hover:text-[#740E0A] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          aria-label="Previous blog page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          <span className={compact ? "hidden md:inline" : "hidden sm:inline"}>Prev</span>
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={isPending}
              className="inline-flex h-9 sm:h-10 min-w-9 sm:min-w-10 items-center justify-center rounded-xl border border-[#740E0A]/15 bg-white px-2.5 sm:px-3 text-xs font-semibold text-[#5A100B] shadow-xs transition-all duration-200 hover:border-[#740E0A]/40 hover:bg-[#FFF7ED] cursor-pointer"
            >
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span className="px-1 text-xs sm:text-sm font-semibold text-stone-400">
                ...
              </span>
            )}
          </>
        )}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => navigate(pageNumber)}
            disabled={isPending}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            className={[
              "inline-flex h-9 sm:h-10 min-w-9 sm:min-w-10 items-center justify-center rounded-xl px-3 sm:px-3.5 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer",
              pageNumber === currentPage
                ? "bg-[#740E0A] text-white shadow-sm ring-2 ring-[#740E0A]/20"
                : "border border-[#740E0A]/15 bg-white text-[#5A100B] hover:border-[#740E0A]/40 hover:bg-[#FFF7ED] hover:text-[#740E0A]",
            ].join(" ")}
          >
            {pageNumber}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-1 text-xs sm:text-sm font-semibold text-stone-400">
                ...
              </span>
            )}
            <button
              type="button"
              onClick={() => navigate(totalPages)}
              disabled={isPending}
              className="inline-flex h-9 sm:h-10 min-w-9 sm:min-w-10 items-center justify-center rounded-xl border border-[#740E0A]/15 bg-white px-2.5 sm:px-3 text-xs font-semibold text-[#5A100B] shadow-xs transition-all duration-200 hover:border-[#740E0A]/40 hover:bg-[#FFF7ED] cursor-pointer"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => navigate(currentPage + 1)}
          disabled={!hasNext || isPending}
          className="inline-flex h-9 sm:h-10 px-2.5 sm:px-3.5 items-center justify-center gap-1 rounded-xl border border-[#740E0A]/15 bg-white text-xs font-semibold text-[#5A100B] shadow-xs transition-all duration-200 hover:border-[#740E0A]/40 hover:bg-[#FFF7ED] hover:text-[#740E0A] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          aria-label="Next blog page"
        >
          <span className={compact ? "hidden md:inline" : "hidden sm:inline"}>Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </nav>
    );
  };

  if (variant === "pagination-only") {
    return (
      <div className={`${poppins.className} w-full flex items-center justify-center py-2`}>
        {renderPagination(false)}
      </div>
    );
  }

  return (
    <div className={`${poppins.className} space-y-6`}>
      {/* Search & Meta Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#740E0A]/15 bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] md:flex-row md:items-center md:justify-between">
        {/* Search Input Form */}
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
            placeholder="Search devotion, bhajans, kirtans, traditions..."
            className="h-11 sm:h-12 w-full rounded-xl border border-[#740E0A]/15 bg-[#FCFAF5] pl-11 pr-24 text-xs sm:text-sm text-[#2E0503] outline-none transition-colors placeholder:text-stone-400 focus:border-[#740E0A] focus:bg-white focus:ring-2 focus:ring-[#740E0A]/15"
          />
          <button
            type="submit"
            disabled={isPending}
            className="absolute right-1.5 top-1.5 inline-flex h-8 sm:h-9 items-center justify-center rounded-lg bg-[#740E0A] px-3.5 sm:px-4 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#8B140F] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-xs"
          >
            Search
          </button>
        </form>

        {/* Right side items: Article counter + Clear button */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="inline-flex items-center gap-2 rounded-xl bg-[#FFF7ED] px-3 py-2 border border-[#740E0A]/10">
            <span className="h-2 w-2 rounded-full bg-[#E5A93C]" />
            <p className="text-xs font-semibold text-[#5A100B]">
              {total} {total === 1 ? "article" : "articles"}
            </p>
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 text-xs font-semibold text-stone-600 transition-colors hover:border-[#740E0A]/30 hover:text-[#740E0A] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Top Pagination Row in its dedicated place below search bar */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-1">
          {renderPagination(false)}
        </div>
      )}
    </div>
  );
}



