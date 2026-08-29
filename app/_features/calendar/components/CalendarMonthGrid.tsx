"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { playfair } from "@/_lib/fonts";
import {
  CalendarCategory,
  CalendarDay,
  CategoryLegendItem,
} from "@/_types/calendar.types";
import { MONTH_NAMES, DAYS_OF_WEEK } from "@/_config/calendar/calendar.config";

interface CalendarMonthGridProps {
  year: number;
  month: number;
  selectedDate: string;
  gridDays: CalendarDay[];
  legend: CategoryLegendItem[];
  activeCategoryFilter: CalendarCategory | "all";
  onSelectDate: (dateString: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSetMonth: (monthNum: number) => void;
  onSetYear: (yearNum: number) => void;
  onJumpToToday: () => void;
  onSetCategoryFilter: (cat: CalendarCategory | "all") => void;
}

export default function CalendarMonthGrid({
  year,
  month,
  selectedDate,
  gridDays,
  legend,
  activeCategoryFilter,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onSetMonth,
  onSetYear,
  onJumpToToday,
  onSetCategoryFilter,
}: CalendarMonthGridProps) {
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const monthSelectRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!showMonthSelect) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        monthSelectRef.current &&
        !monthSelectRef.current.contains(event.target as Node)
      ) {
        setShowMonthSelect(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMonthSelect(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMonthSelect]);

  return (
    <div className="w-full flex flex-col bg-white rounded-2xl border border-amber-200/80 shadow-lg overflow-hidden">
      {/* ── Top Header & Navigation Toolbar ── */}
      <div className="p-4 sm:p-5 border-b border-amber-100 flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5]/80">
        {/* Left: Quick View / Month Selector Button */}
        <div className="relative" ref={monthSelectRef}>
          <button
            onClick={() => setShowMonthSelect(!showMonthSelect)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-xs font-semibold text-[#740E0A] hover:bg-amber-50 hover:border-amber-300 shadow-2xs transition-colors cursor-pointer"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">
              {MONTH_NAMES[month - 1]} {year} ▾
            </span>
          </button>

          {/* Dropdown Popover */}
          {showMonthSelect && (
            <div className="absolute left-0 top-full mt-2 w-72 p-3.5 bg-white rounded-2xl shadow-2xl border border-amber-200 z-50 animate-fade-in-down">
              {/* Year Navigation with Stepper */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-amber-100">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSetYear(year - 1)}
                    className="w-6 h-6 rounded-md flex items-center justify-center bg-gray-100 hover:bg-amber-100 text-[#370504] transition-colors cursor-pointer text-xs"
                    title="Previous Year"
                  >
                    ‹
                  </button>
                  <span className="text-xs font-bold text-[#370504]">
                    {year}
                  </span>
                  <button
                    onClick={() => onSetYear(year + 1)}
                    className="w-6 h-6 rounded-md flex items-center justify-center bg-gray-100 hover:bg-amber-100 text-[#370504] transition-colors cursor-pointer text-xs"
                    title="Next Year"
                  >
                    ›
                  </button>
                </div>

                {/* Dynamic Rolling Year Quick Pills (Current Year - 1 to +3) */}
                <div className="flex gap-1">
                  {[-1, 0, 1, 2].map((offset) => {
                    const y = new Date().getFullYear() + offset;
                    return (
                      <button
                        key={y}
                        onClick={() => onSetYear(y)}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer ${
                          y === year
                            ? "bg-[#740E0A] text-white shadow-2xs"
                            : "bg-gray-100 text-[#5c5c5c] hover:bg-amber-100 hover:text-[#370504]"
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 12 Months Grid Quick Select */}
              <div className="grid grid-cols-3 gap-1.5">
                {MONTH_NAMES.map((name, idx) => {
                  const isCurrentSelected = idx + 1 === month;
                  return (
                    <button
                      key={name}
                      onClick={() => {
                        onSetMonth(idx + 1);
                        setShowMonthSelect(false);
                      }}
                      className={`text-xs py-2 px-2.5 rounded-xl font-medium transition-all cursor-pointer text-center ${
                        isCurrentSelected
                          ? "bg-[#740E0A] text-white font-bold shadow-xs"
                          : "hover:bg-amber-50 text-[#370504] hover:text-[#740E0A]"
                      }`}
                    >
                      {name.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Center: Month & Year Title with Navigation Arrows */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onPrevMonth}
            aria-label="Previous Month"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-amber-200 hover:border-[#740E0A] text-[#740E0A] hover:bg-amber-50 shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h2
            className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#370504] tracking-tight min-w-32.5 sm:min-w-37.5 text-center`}
          >
            {MONTH_NAMES[month - 1]} {year}
          </h2>

          <button
            onClick={onNextMonth}
            aria-label="Next Month"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-amber-200 hover:border-[#740E0A] text-[#740E0A] hover:bg-amber-50 shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: "Today" Jump Button */}
        <div>
          <button
            onClick={onJumpToToday}
            className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-xs font-semibold text-[#740E0A] transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      {/* ── Days of Week Header ── */}
      <div className="grid grid-cols-7 border-b border-amber-100 bg-[#FCFAF5] text-center">
        {DAYS_OF_WEEK.map((day, index) => {
          const isWeekend = index === 0 || index === 6;
          return (
            <div
              key={day}
              className={`py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
                isWeekend ? "text-[#740E0A]" : "text-[#71717A]"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* ── Calendar Days Matrix ── */}
      <div className="p-2 sm:p-3 bg-[#FAF8F5]/60">
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {gridDays.map((day) => {
            const isSelected = day.dateString === selectedDate;
            const hasEvent = day.events && day.events.length > 0;
            const primaryEvent = day.events?.[0];

            // Determine event category colors & styling
            let categoryColor = "#B91C1C";
            let badgeBg = "bg-red-50 text-[#991B1B] border-red-200/60";

            if (primaryEvent?.category === "vrat") {
              categoryColor = "#16A34A";
              badgeBg = "bg-green-50 text-[#166534] border-green-200/60";
            } else if (primaryEvent?.category === "tithi-muhurat") {
              categoryColor = "#7C3AED";
              badgeBg = "bg-purple-50 text-[#6D28D9] border-purple-200/60";
            } else if (primaryEvent?.category === "jayanti-shraadh") {
              categoryColor = "#0284C7";
              badgeBg = "bg-sky-50 text-[#0369A1] border-sky-200/60";
            } else if (primaryEvent?.category === "special-puja") {
              categoryColor = "#EA580C";
              badgeBg = "bg-orange-50 text-[#C2410C] border-orange-200/60";
            }

            return (
              <button
                key={day.dateString}
                onClick={() => onSelectDate(day.dateString)}
                className={`relative min-h-18 sm:min-h-21.5 lg:min-h-24 p-1.5 sm:p-2.5 flex flex-col justify-between items-start text-left transition-all duration-200 cursor-pointer rounded-xl group ${
                  !day.isCurrentMonth
                    ? "bg-stone-50/60 text-stone-300 border border-stone-100 pointer-events-auto"
                    : isSelected
                      ? "bg-linear-to-br from-[#740E0A] via-[#5D0A07] to-[#400604] text-white shadow-lg ring-2 ring-inset ring-amber-400 z-10"
                      : "bg-white hover:bg-[#FFFDF9] text-[#370504] border border-amber-100/80 hover:border-amber-300 hover:shadow-xs"
                }`}
              >
                {/* Top Row: Date Number & Lunar Indicator */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs sm:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-amber-400 text-[#370504] font-bold shadow-xs"
                        : day.isToday
                          ? "bg-[#740E0A] text-white font-bold ring-2 ring-amber-300"
                          : day.isCurrentMonth
                            ? "text-[#302D2D] group-hover:text-[#740E0A] group-hover:font-bold"
                            : "text-stone-300"
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {/* Right Top Indicator: Lunar Icon / Event Category Dot */}
                  <div className="flex items-center gap-1">
                    {day.isCurrentMonth && !isSelected && (
                      <>
                        {day.isPurnima && (
                          <span
                            className="text-[10px] sm:text-xs"
                            title="Purnima (Full Moon)"
                          >
                            🌕
                          </span>
                        )}
                        {day.isAmavasya && (
                          <span
                            className="text-[10px] sm:text-xs"
                            title="Amavasya (New Moon)"
                          >
                            🌑
                          </span>
                        )}
                        {day.isEkadashi &&
                          !day.isPurnima &&
                          !day.isAmavasya && (
                            <span
                              className="text-[10px]"
                              title="Ekadashi Holy Fast"
                            >
                              🌿
                            </span>
                          )}
                      </>
                    )}

                    {hasEvent && !isSelected && (
                      <span
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-2xs transition-transform group-hover:scale-125"
                        style={{ backgroundColor: categoryColor }}
                        title={primaryEvent?.title}
                      />
                    )}
                  </div>
                </div>

                {/* Middle/Bottom: Event Badge OR Subtitle Tithi Name */}
                <div className="w-full mt-1">
                  {hasEvent ? (
                    <div
                      className={`text-[9px] sm:text-[10px] font-semibold leading-tight line-clamp-2 px-1.5 py-0.5 rounded-md border transition-colors ${
                        isSelected
                          ? "bg-white/20 text-amber-200 border-amber-300/40"
                          : `${badgeBg} group-hover:border-[#740E0A]/40`
                      }`}
                    >
                      {primaryEvent?.badgeLabel || primaryEvent?.title}
                    </div>
                  ) : day.isCurrentMonth && day.tithiName ? (
                    <div
                      className={`text-[8px] sm:text-[9px] font-medium tracking-tight truncate px-0.5 ${
                        isSelected
                          ? "text-amber-200/90 font-semibold"
                          : "text-[#8C827A] group-hover:text-[#740E0A]"
                      }`}
                    >
                      {day.tithiName}
                    </div>
                  ) : (
                    <div className="h-3" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Category Legend with Interactive Filter Toggles ── */}
      <div className="p-3.5 sm:p-4 border-t border-amber-100 bg-[#FAF8F5] flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs">
        <button
          onClick={() => onSetCategoryFilter("all")}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all cursor-pointer font-medium ${
            activeCategoryFilter === "all"
              ? "bg-[#740E0A] text-white font-semibold"
              : "text-[#5c5c5c] hover:text-[#740E0A]"
          }`}
        >
          <span>ALL</span>
        </button>

        {legend.map((item) => {
          const isActive = activeCategoryFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSetCategoryFilter(isActive ? "all" : item.id)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all cursor-pointer font-medium ${
                isActive
                  ? "ring-1 ring-offset-1 font-semibold"
                  : "text-[#5c5c5c] hover:text-[#370504]"
              }`}
              style={{
                borderColor: item.dotColor,
                backgroundColor: isActive ? item.bgColor : "transparent",
                color: isActive ? item.textColor : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.dotColor }}
              />
              <span className="uppercase text-[10px] sm:text-[11px] tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
