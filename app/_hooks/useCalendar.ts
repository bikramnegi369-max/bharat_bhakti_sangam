"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  CalendarCategory,
  CalendarDay,
  CalendarDayDetail,
  CalendarEventItem,
  MoonStatusData,
  HighlightCardData,
  YearCalendarConfig,
  MonthConfig,
} from "@/_types/calendar.types";
import {
  getYearCalendarConfig,
  getMonthConfig,
  generateMonthGridDays,
  getDayDetail,
  getUpcomingFestivalsFromDate,
} from "@/_config/calendar/calendar.config";
import { calculatePanchangForDate } from "@/_lib/panchang";
import { getDailyHighlightsForDate } from "@/_lib/dailyWisdom";

export interface UseCalendarReturn {
  year: number;
  month: number;
  selectedDate: string;
  categoryFilter: CalendarCategory | "all";
  yearConfig: YearCalendarConfig;
  monthConfig: MonthConfig;
  gridDays: CalendarDay[];
  selectedDetail: CalendarDayDetail | null;
  activeMoonStatus: MoonStatusData;
  activeHighlights: HighlightCardData[];
  upcomingFestivals: CalendarEventItem[];
  selectDate: (dateString: string) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  setMonth: (monthNum: number) => void;
  setYear: (yearNum: number) => void;
  jumpToToday: () => void;
  setCategoryFilter: (cat: CalendarCategory | "all") => void;
}

export function useCalendar(): UseCalendarReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL search params or default to real-time today's date
  const today = useMemo(() => new Date(), []);

  const year = useMemo(() => {
    const yParam = searchParams.get("year");
    if (yParam) {
      const parsed = parseInt(yParam, 10);
      if (!isNaN(parsed)) return parsed;
    }
    return today.getFullYear();
  }, [searchParams, today]);

  const month = useMemo(() => {
    const mParam = searchParams.get("month");
    if (mParam) {
      const parsed = parseInt(mParam, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) return parsed;
    }
    return today.getMonth() + 1;
  }, [searchParams, today]);

  const selectedDate = useMemo(() => {
    const dParam = searchParams.get("date");
    if (dParam && /^\d{4}-\d{2}-\d{2}$/.test(dParam)) {
      return dParam;
    }
    const defaultDay =
      year === today.getFullYear() && month === today.getMonth() + 1
        ? today.getDate()
        : 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(defaultDay).padStart(2, "0")}`;
  }, [searchParams, year, month, today]);

  const categoryFilter = useMemo(() => {
    const cat = searchParams.get("category");
    if (
      cat === "major-festival" ||
      cat === "vrat" ||
      cat === "tithi-muhurat" ||
      cat === "jayanti-shraadh" ||
      cat === "special-puja"
    ) {
      return cat;
    }
    return "all";
  }, [searchParams]);

  const updateQueryParams = useCallback(
    (params: Record<string, string | number | null>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "all") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });
      const query = current.toString();
      const newUrl = query ? `${pathname}?${query}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const selectDate = useCallback(
    (dateString: string) => {
      const parts = dateString.split("-");
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        updateQueryParams({ year: y, month: m, date: dateString });
      }
    },
    [updateQueryParams],
  );

  const nextMonth = useCallback(() => {
    if (month === 12) {
      const nextY = year + 1;
      const nextM = 1;
      updateQueryParams({
        year: nextY,
        month: nextM,
        date: `${nextY}-01-01`,
      });
    } else {
      const nextM = month + 1;
      updateQueryParams({
        month: nextM,
        date: `${year}-${String(nextM).padStart(2, "0")}-01`,
      });
    }
  }, [year, month, updateQueryParams]);

  const prevMonth = useCallback(() => {
    if (month === 1) {
      const prevY = year - 1;
      const prevM = 12;
      updateQueryParams({
        year: prevY,
        month: prevM,
        date: `${prevY}-12-01`,
      });
    } else {
      const prevM = month - 1;
      updateQueryParams({
        month: prevM,
        date: `${year}-${String(prevM).padStart(2, "0")}-01`,
      });
    }
  }, [year, month, updateQueryParams]);

  const setMonth = useCallback(
    (monthNum: number) => {
      if (monthNum >= 1 && monthNum <= 12) {
        updateQueryParams({
          month: monthNum,
          date: `${year}-${String(monthNum).padStart(2, "0")}-01`,
        });
      }
    },
    [year, updateQueryParams],
  );

  const setYear = useCallback(
    (yearNum: number) => {
      updateQueryParams({
        year: yearNum,
        date: `${yearNum}-${String(month).padStart(2, "0")}-01`,
      });
    },
    [month, updateQueryParams],
  );

  const jumpToToday = useCallback(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = `${y}-${String(m).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    updateQueryParams({ year: y, month: m, date: d });
  }, [updateQueryParams]);

  const setCategoryFilter = useCallback(
    (cat: CalendarCategory | "all") => {
      updateQueryParams({ category: cat });
    },
    [updateQueryParams],
  );

  const yearConfig = useMemo(() => getYearCalendarConfig(year), [year]);
  const monthConfig = useMemo(() => getMonthConfig(year, month), [year, month]);

  const gridDays = useMemo(() => {
    return generateMonthGridDays(year, month, categoryFilter);
  }, [year, month, categoryFilter]);

  const selectedDetail = useMemo(() => {
    return getDayDetail(year, selectedDate);
  }, [year, selectedDate]);

  const activeMoonStatus = useMemo<MoonStatusData>(() => {
    const parts = selectedDate.split("-");
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        const panchang = calculatePanchangForDate(y, m, d);
        const dayConfigOverride = monthConfig.days[selectedDate]?.moonStatus;

        return {
          tithiName: dayConfigOverride?.tithiName || `${panchang.tithiName} (${panchang.paksha})`,
          paksha: dayConfigOverride?.paksha || panchang.paksha,
          sunrise: dayConfigOverride?.sunrise || panchang.sunrise,
          sunset: dayConfigOverride?.sunset || panchang.sunset,
          moonrise: dayConfigOverride?.moonrise || panchang.brahmaMuhurat,
          moonPhase: dayConfigOverride?.moonPhase || panchang.moonPhase,
          nakshatra: dayConfigOverride?.nakshatra || panchang.nakshatra,
          image: dayConfigOverride?.image || "/mandala_2.webp",
          viewDetailsHref: dayConfigOverride?.viewDetailsHref || "/calendar",
        };
      }
    }
    const fallbackPanchang = calculatePanchangForDate(year, month, 14);
    return {
      tithiName: `${fallbackPanchang.tithiName} (${fallbackPanchang.paksha})`,
      paksha: fallbackPanchang.paksha,
      sunrise: fallbackPanchang.sunrise,
      sunset: fallbackPanchang.sunset,
      moonrise: fallbackPanchang.brahmaMuhurat,
      moonPhase: fallbackPanchang.moonPhase,
      nakshatra: fallbackPanchang.nakshatra,
      image: "/mandala_2.webp",
      viewDetailsHref: "/calendar",
    };
  }, [selectedDate, monthConfig, year, month]);

  const activeHighlights = useMemo(() => {
    const parts = selectedDate.split("-");
    const y = parseInt(parts[0], 10) || year;
    const m = parseInt(parts[1], 10) || month;
    const d = parseInt(parts[2], 10) || 14;
    return getDailyHighlightsForDate(y, m, d);
  }, [selectedDate, year, month]);

  const upcomingFestivals = useMemo(() => {
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const fromDate = selectedDate >= todayStr ? selectedDate : todayStr;
    return getUpcomingFestivalsFromDate(year, fromDate, 5);
  }, [year, selectedDate, today]);

  return {
    year,
    month,
    selectedDate,
    categoryFilter,
    yearConfig,
    monthConfig,
    gridDays,
    selectedDetail,
    activeMoonStatus,
    activeHighlights,
    upcomingFestivals,
    selectDate,
    nextMonth,
    prevMonth,
    setMonth,
    setYear,
    jumpToToday,
    setCategoryFilter,
  };
}
