"use client";

import { useState, useMemo } from "react";
import { Search, X, Sparkles, Filter, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import FestivalCard from "./FestivalCard";
import { festivalListingCards } from "@/_lib/constants/festivals.constants";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

const CATEGORIES = [
  { id: "all", label: "All Festivals" },
  { id: "major", label: "Major Celebrations" },
  { id: "harvest", label: "Harvest & Solar" },
  { id: "krishna", label: "Vaishnava & Krishna" },
  { id: "devi", label: "Devi & Shakti" },
  { id: "family", label: "Sibling & Family" },
];

const ITEMS_PER_PAGE = 6;

export default function FestivalGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "title" | "season">("featured");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered & Sorted Festivals
  const filteredFestivals = useMemo(() => {
    return festivalListingCards
      .filter((fest) => {
        // Search match across title, description, region, season, significance
        const matchesSearch =
          searchQuery.trim() === "" ||
          fest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fest.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fest.season.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fest.significance.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Category match
        if (activeCategory === "all") return true;
        if (activeCategory === "major") {
          return (
            fest.slug === "diwali" ||
            fest.slug === "holi" ||
            fest.slug === "navratri" ||
            fest.slug === "ganesh-chaturthi" ||
            fest.slug === "dusshera" ||
            fest.slug === "janmashtami"
          );
        }
        if (activeCategory === "harvest") {
          return (
            fest.slug === "makar-sankranti" ||
            fest.slug === "pongal" ||
            fest.slug === "onam" ||
            fest.slug === "chhath-puja" ||
            fest.significance.toLowerCase().includes("harvest") ||
            fest.significance.toLowerCase().includes("solar")
          );
        }
        if (activeCategory === "krishna") {
          return (
            fest.slug === "janmashtami" ||
            fest.slug === "radha-ashtami" ||
            fest.slug === "govardhan-puja" ||
            fest.slug === "rath-yatra" ||
            fest.slug === "holi" ||
            fest.region.toLowerCase().includes("braj") ||
            fest.shortDescription.toLowerCase().includes("krishna")
          );
        }
        if (activeCategory === "devi") {
          return (
            fest.slug === "navratri" ||
            fest.slug === "radha-ashtami" ||
            fest.significance.toLowerCase().includes("shakti") ||
            fest.shortDescription.toLowerCase().includes("goddess") ||
            fest.shortDescription.toLowerCase().includes("durga") ||
            fest.shortDescription.toLowerCase().includes("lakshmi")
          );
        }
        if (activeCategory === "family") {
          return (
            fest.slug === "raksha-bandhan" ||
            fest.slug === "bhai-dooj" ||
            fest.slug === "dhanteras" ||
            fest.significance.toLowerCase().includes("sibling") ||
            fest.shortDescription.toLowerCase().includes("sister") ||
            fest.shortDescription.toLowerCase().includes("brother")
          );
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "season") {
          return a.season.localeCompare(b.season);
        }
        return 0; // "featured" maintains original canonical order
      });
  }, [searchQuery, activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredFestivals.length / ITEMS_PER_PAGE) || 1;

  // Items for current page
  const paginatedFestivals = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFestivals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFestivals, currentPage]);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogEl = document.getElementById("festival-catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="festival-catalog" className="w-full py-12 md:py-18 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ── Section Header & Live Counters ── */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-amber-200/70 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Sacred Celebrations Directory</span>
              </div>

              <h2
                className={`${playfair.className} text-3xl sm:text-4xl font-bold text-heading tracking-tight`}
              >
                All Sacred <span className="text-primary">Festivals</span>
              </h2>

              <p className={`${poppins.className} text-xs sm:text-sm text-stone-600 mt-1`}>
                Showing{" "}
                <span className="font-semibold text-heading">
                  {filteredFestivals.length > 0
                    ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1} - ${Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredFestivals.length,
                      )}`
                    : 0}
                </span>{" "}
                of <span className="font-semibold text-heading">{festivalListingCards.length}</span> auspicious celebrations
              </p>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-medium text-stone-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "title" | "season")}
                className="text-xs font-semibold bg-white border border-amber-200 text-stone-700 rounded-xl px-3 py-2 shadow-2xs focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="title">Festival Name (A-Z)</option>
                <option value="season">Month &amp; Season</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Search & Filter Toolbar ── */}
        <ScrollReveal animation="fade-up" duration={750} delay={100}>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#F3E7D7] shadow-sm space-y-4">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600/80" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by festival name, deity, rituals, or region (e.g. Diwali, Holi, Krishna, Pongal, Braj)..."
                className={`${poppins.className} w-full pl-11 pr-10 py-3 rounded-xl border border-stone-200 bg-[#FCFAF5] text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search input"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <span className="text-xs font-semibold text-stone-500 uppercase shrink-0 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                <span>Filters:</span>
              </span>

              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={[
                      "shrink-0 text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-primary text-white shadow-xs font-semibold"
                        : "bg-[#FCFAF5] text-stone-700 hover:bg-amber-100/60 border border-stone-200",
                    ].join(" ")}
                  >
                    {cat.label}
                  </button>
                );
              })}

              {(searchQuery || activeCategory !== "all" || sortBy !== "featured") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="shrink-0 text-xs font-semibold text-primary hover:text-[#5C0A07] px-3 py-2 inline-flex items-center gap-1 underline underline-offset-4 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Empty State Fallback ── */}
        {filteredFestivals.length === 0 ? (
          <ScrollReveal animation="fade-up" duration={600} className="text-center py-16 px-4 bg-white rounded-3xl border border-amber-200/80 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100/80 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
              <Search className="w-8 h-8 stroke-[1.75]" />
            </div>

            <h3 className={`${playfair.className} text-2xl font-bold text-heading`}>
              No Sacred Festivals Found
            </h3>

            <p className={`${poppins.className} text-stone-600 text-sm max-w-md mx-auto`}>
              We couldn&apos;t find any festivals matching &ldquo;{searchQuery || activeCategory}&rdquo;. Try adjusting your search keywords or clearing active filters.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-[#5C0A07] text-white font-medium text-sm transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </ScrollReveal>
        ) : (
          /* ── List of Festival Cards with Staggered Cascades ── */
          <div className="space-y-6 sm:space-y-8">
            {paginatedFestivals.map((festival, index) => (
              <ScrollReveal
                key={festival.slug}
                animation="fade-up"
                duration={700}
                delay={index * 80}
              >
                <FestivalCard
                  festival={festival}
                  priority={currentPage === 1 && index < 2}
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* ── Pagination Controls ── */}
        {totalPages > 1 && (
          <ScrollReveal animation="fade-up" duration={600} delay={100}>
            <nav
              aria-label="Festivals pagination"
              className="flex items-center justify-center gap-2 pt-6 sm:pt-8"
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-amber-400 hover:text-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
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
                    "inline-flex h-10 min-w-10 px-3.5 items-center justify-center rounded-xl text-sm font-semibold transition-all shadow-2xs cursor-pointer",
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-amber-400 hover:text-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
