"use client";

import { useState, useTransition } from "react";
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Video,
} from "lucide-react";
import {
  StatusItem,
  StatusListResponseData,
  StatusSortOption,
} from "@/_types/Status.types";
import { STATUS_PRESET_TAGS } from "@/_lib/constants/status.constants";
import StatusCard from "./StatusCard";
import StatusDownloadModal from "./StatusDownloadModal";
import { getStatusList } from "@/_features/status/services/status.service";
import clsx from "clsx";

interface StatusGalleryProps {
  initialData: StatusListResponseData;
}

export default function StatusGallery({ initialData }: StatusGalleryProps) {
  const [data, setData] = useState<StatusListResponseData>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [sortBy, setSortBy] = useState<StatusSortOption>("latest");
  const [selectedStatus, setSelectedStatus] = useState<StatusItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchUpdatedList = (
    nextPage: number,
    tag: string,
    search: string,
    sort: StatusSortOption,
  ) => {
    startTransition(async () => {
      const res = await getStatusList({
        page: nextPage,
        limit: data.limit || 10,
        tag: tag === "all" ? undefined : tag,
        search: search.trim() || undefined,
        sortBy: sort,
      });

      if (res.success && res.data) {
        setData(res.data);
      }
    });
  };

  const handleTagChange = (tagId: string) => {
    setActiveTag(tagId);
    fetchUpdatedList(1, tagId, searchQuery, sortBy);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUpdatedList(1, activeTag, searchQuery, sortBy);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSort = e.target.value as StatusSortOption;
    setSortBy(nextSort);
    fetchUpdatedList(1, activeTag, searchQuery, nextSort);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveTag("all");
    setSortBy("latest");
    fetchUpdatedList(1, "all", "", "latest");
  };

  const handlePageChange = (newPage: number) => {
    fetchUpdatedList(newPage, activeTag, searchQuery, sortBy);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  return (
    <div className="w-full space-y-8">
      {/* Search & Sort Controls: Production-grade responsive layout (Stacked on mobile with full width, Row on md+) */}
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <div className="relative flex items-center w-full h-12 sm:h-13">
            <Search
              size={18}
              className="absolute left-4 sm:left-5 text-stone-400 pointer-events-none shrink-0"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bhakti status (e.g. shiva, krishna, aarti)..."
              className="w-full h-full pl-11 sm:pl-13 pr-24 sm:pr-28 bg-white rounded-full border border-stone-200 text-stone-800 text-xs sm:text-sm md:text-[15px] placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-xs transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 sm:right-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-linear-to-r from-[#740E0A] to-[#9A3412] text-white hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              Search
            </button>
          </div>
        </form>

        {/* Sort & Reset Actions (Full width on mobile or inline with search) */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
          <div className="relative flex-1 sm:flex-initial flex items-center h-12 sm:h-13 bg-white rounded-full border border-stone-200 px-4 sm:px-5 shadow-xs">
            <SlidersHorizontal
              size={15}
              className="text-stone-400 mr-2 shrink-0"
            />
            <label
              htmlFor="sort-select"
              className="text-xs sm:text-sm text-stone-500 mr-2 font-medium whitespace-nowrap"
            >
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className="text-xs sm:text-sm font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer pr-1 w-full sm:w-auto"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="downloads">Most Downloaded</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {(searchQuery || activeTag !== "all" || sortBy !== "latest") && (
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset all filters"
              className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tag Filter Chips Bar — Perfectly centered, cleanly wrapping onto next lines without horizontal scrollbars */}
      <div className="w-full max-w-4xl mx-auto flex justify-center px-1">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full">
          {STATUS_PRESET_TAGS.map((tag) => {
            const isSelected = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagChange(tag.id)}
                className={clsx(
                  "inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none",
                  isSelected
                    ? "bg-linear-to-r from-[#9A3412] via-[#C2410C] to-[#740E0A] text-white shadow-md shadow-amber-900/25 scale-102 border border-amber-400/40 ring-2 ring-amber-500/20"
                    : "bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-900 border border-stone-200 hover:border-amber-300 shadow-xs",
                )}
              >
                {tag.icon && (
                  <span className="text-xs sm:text-sm leading-none">
                    {tag.icon}
                  </span>
                )}
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Grid (Responsive 2 to 5 columns of 9:16 vertical cards) */}
      <div className="relative min-h-96">
        {isPending && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-20 flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-2 text-amber-800">
              <Sparkles size={28} className="animate-spin" />
              <span className="text-xs font-semibold">
                Updating Statuses...
              </span>
            </div>
          </div>
        )}

        {data.items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {data.items.map((item, index) => (
              <StatusCard
                key={item._id}
                status={item}
                onOpenModal={setSelectedStatus}
                priority={index < 4}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl bg-white border border-stone-200 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 mb-4 border border-amber-200">
              <Video size={28} />
            </div>
            <h3 className="text-lg font-bold text-stone-800 mb-1">
              No Bhakti Status Found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mb-5">
              No status videos matched your search or selected tag &ldquo;
              {activeTag}&rdquo;. Try another search term or reset filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-primary hover:brightness-110 transition-all cursor-pointer shadow-sm"
            >
              Show All Statuses
            </button>
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {data.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200">
          <p className="text-xs text-stone-500">
            Showing page{" "}
            <span className="font-semibold text-stone-800">{data.page}</span> of{" "}
            <span className="font-semibold text-stone-800">
              {data.totalPages}
            </span>{" "}
            ({data.total} total status videos)
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handlePageChange(data.page - 1)}
              disabled={data.page <= 1}
              className="p-2 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={clsx(
                    "min-w-9 h-9 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                    pageNum === data.page
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50",
                  )}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => handlePageChange(data.page + 1)}
              disabled={data.page >= data.totalPages}
              className="p-2 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Download / Video Modal */}
      <StatusDownloadModal
        status={selectedStatus}
        onClose={() => setSelectedStatus(null)}
        onSelectTag={(tag) => {
          setActiveTag(tag);
          fetchUpdatedList(1, tag, searchQuery, sortBy);
        }}
      />
    </div>
  );
}
