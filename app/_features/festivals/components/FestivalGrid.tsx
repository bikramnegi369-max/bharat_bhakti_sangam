"use client";

import { useMemo, useState } from "react";
import FestivalCard from "./FestivalCard";
import { festivalListingCards } from "@/_lib/constants/festivals.constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

const ITEMS_PER_PAGE = 5;

export default function FestivalGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(festivalListingCards.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return festivalListingCards.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of list
    const el = document.getElementById("festival-catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="festival-catalog" className="w-full py-12 md:py-16 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <h2
              className={`${playfair.className} text-2xl sm:text-3xl font-bold text-heading`}
            >
              All Sacred Festivals
            </h2>
            <p className={`${poppins.className} text-xs sm:text-sm text-stone-500 mt-1`}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, festivalListingCards.length)} of{" "}
              {festivalListingCards.length} festivals
            </p>
          </div>

          {/* Quick Page Indicator */}
          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100/70 text-amber-800 self-start sm:self-auto">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* List of Festival Cards */}
        <div className="space-y-6 sm:space-y-8">
          {currentItems.map((festival, index) => (
            <FestivalCard
              key={festival.slug}
              festival={festival}
              priority={currentPage === 1 && index < 2}
            />
          ))}
        </div>

        {/* ── Pagination Controls ── */}
        {totalPages > 1 && (
          <nav
            aria-label="Festivals pagination"
            className="flex items-center justify-center gap-2 pt-6 sm:pt-8"
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-amber-400 hover:text-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={[
                  "inline-flex h-10 min-w-10 px-3.5 items-center justify-center rounded-xl text-sm font-semibold transition-all shadow-2xs",
                  page === currentPage
                    ? "bg-primary text-white shadow-xs"
                    : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-amber-400 hover:text-amber-700",
                ].join(" ")}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-amber-400 hover:text-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
