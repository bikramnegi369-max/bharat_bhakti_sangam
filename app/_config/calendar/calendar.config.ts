import {
  CalendarCategory,
  CalendarDay,
  CalendarDayDetail,
  CalendarEventItem,
  MonthConfig,
  YearCalendarConfig,
} from "@/_types/calendar.types";
import { CALENDAR_2026_CONFIG } from "./calendar-2026.config";

/**
 * Annual Calendar Configuration Registry.
 * Easily extensible: add `2027: CALENDAR_2027_CONFIG`, `2028: CALENDAR_2028_CONFIG`, etc.
 */
export const ANNUAL_CALENDAR_REGISTRY: Record<number, YearCalendarConfig> = {
  2026: CALENDAR_2026_CONFIG,
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Retrieves the year configuration or builds a smart default fallback.
 */
export function getYearCalendarConfig(year: number): YearCalendarConfig {
  if (ANNUAL_CALENDAR_REGISTRY[year]) {
    return ANNUAL_CALENDAR_REGISTRY[year];
  }

  // Graceful fallback for unconfigured future/past years to keep UI rock-solid
  return {
    ...CALENDAR_2026_CONFIG,
    year,
    hero: {
      ...CALENDAR_2026_CONFIG.hero,
      tagline: `✦ SPIRITUAL CALENDAR ${year} ✦`,
    },
    months: {},
  };
}

/**
 * Retrieves specific month configuration with fallback.
 */
export function getMonthConfig(year: number, month: number): MonthConfig {
  const yearConfig = getYearCalendarConfig(year);
  if (yearConfig.months[month]) {
    return yearConfig.months[month];
  }

  return {
    monthIndex: month,
    monthName: MONTH_NAMES[month - 1] || `Month ${month}`,
    year,
    days: {},
    monthEvents: [],
  };
}

/**
 * Generates the full 35 or 42 grid cells for the month view with leading and trailing pad days.
 */
export function generateMonthGridDays(
  year: number,
  month: number, // 1-12
  activeCategoryFilter?: CalendarCategory | "all",
): CalendarDay[] {
  const monthConfig = getMonthConfig(year, month);
  const totalDaysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const prevMonthTotalDays = new Date(year, month - 1, 0).getDate();

  const days: CalendarDay[] = [];

  // 1. Leading days from previous month
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    const dateString = `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    days.push({
      dateString,
      dayNumber: dayNum,
      monthNumber: prevMonth,
      yearNumber: prevYear,
      isCurrentMonth: false,
      isToday: false,
      events: [],
    });
  }

  // 2. Current month days
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateString = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayConfig = monthConfig.days[dateString];
    let events: CalendarEventItem[] = dayConfig?.events || [];

    if (activeCategoryFilter && activeCategoryFilter !== "all") {
      events = events.filter((e) => e.category === activeCategoryFilter);
    }

    const panchang = calculatePanchangForDate(year, month, d);
    const hasEventMatching = (pattern: RegExp) =>
      events.some((e) => pattern.test(e.title) || pattern.test(e.badgeLabel || ""));

    const isPurnima =
      panchang.tithiNumber === 15 ||
      panchang.tithiName.toLowerCase().includes("purnima") ||
      hasEventMatching(/purnima/i);

    const isAmavasya =
      panchang.tithiNumber === 30 ||
      panchang.tithiName.toLowerCase().includes("amavasya") ||
      hasEventMatching(/amavasya/i);

    const isEkadashi =
      panchang.tithiNumber === 11 ||
      panchang.tithiNumber === 26 ||
      panchang.tithiName.toLowerCase().includes("ekadashi") ||
      hasEventMatching(/ekadashi/i);

    days.push({
      dateString,
      dayNumber: d,
      monthNumber: month,
      yearNumber: year,
      isCurrentMonth: true,
      isToday: dateString === todayString,
      tithiName: panchang.tithiName.replace("Shukla ", "").replace("Krishna ", ""),
      isPurnima,
      isAmavasya,
      isEkadashi,
      primaryEvent: events[0],
      events,
      detail: dayConfig?.detail,
    });
  }

  // 3. Trailing days from next month to complete a full 5 or 6 week grid (multiple of 7)
  const remainingSlots = (7 - (days.length % 7)) % 7;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  for (let d = 1; d <= remainingSlots; d++) {
    const dateString = `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({
      dateString,
      dayNumber: d,
      monthNumber: nextMonth,
      yearNumber: nextYear,
      isCurrentMonth: false,
      isToday: false,
      events: [],
    });
  }

  return days;
}

import { calculatePanchangForDate } from "@/_lib/panchang";

/**
 * Finds day detail by date string or dynamically calculates real Vedic Panchang data.
 */
export function getDayDetail(year: number, dateString: string): CalendarDayDetail | null {
  const parts = dateString.split("-");
  if (parts.length !== 3) return null;

  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (isNaN(month) || isNaN(day)) return null;

  const monthConfig = getMonthConfig(year, month);
  const dayData = monthConfig.days[dateString];

  // 1. Return manually configured detailed festival if present
  if (dayData?.detail) {
    return dayData.detail;
  }

  // 2. Return primary event with calculated Vedic panchang schedule
  const panchang = calculatePanchangForDate(year, month, day);

  if (dayData?.events && dayData.events.length > 0) {
    const primary = dayData.events[0];
    return {
      dateFormatted: `${day} ${MONTH_NAMES[month - 1]}, ${year}`,
      festivalName: primary.title,
      categoryTag: primary.badgeLabel || primary.category,
      categoryType: primary.category,
      image: primary.image || "/festivals/slider/image-1.webp",
      imageAlt: primary.title,
      summary:
        primary.description ||
        `${primary.title} observed on ${panchang.tithiName} (${panchang.paksha}) under ${panchang.nakshatra} Nakshatra.`,
      schedule: [
        {
          id: "sch-p1",
          title: "Brahma Muhurat",
          time: panchang.brahmaMuhurat,
          icon: "🕉️",
          note: "Sacred meditation & mantra japa",
        },
        {
          id: "sch-p2",
          title: "Abhijit Muhurat",
          time: panchang.abhijitMuhurat,
          icon: "🌟",
          note: "Most auspicious midday window",
        },
        {
          id: "sch-p3",
          title: "Surya & Chandra Timings",
          time: `${panchang.sunrise} / ${panchang.sunset}`,
          icon: "☀️",
          note: `Nakshatra: ${panchang.nakshatra}`,
        },
        {
          id: "sch-p4",
          title: "Rahu Kaal (Inauspicious)",
          time: panchang.rahuKaal,
          icon: "⚠️",
          note: "Avoid commencing new ventures",
        },
      ],
      exploreHref: "/festivals",
      exploreText: "Explore More",
      fastingInfo: {
        title: `Vedic Tithi: ${panchang.tithiName}`,
        description: `Moon Phase: ${panchang.moonPhase} (${panchang.moonPhasePercent}% illuminated). Dedicated to contemplation, prayers, and satvik living.`,
      },
    };
  }

  // 3. For any standard non-festival day: compute 100% authentic daily Panchang
  return {
    dateFormatted: `${day} ${MONTH_NAMES[month - 1]}, ${year}`,
    festivalName: `${panchang.tithiName}`,
    categoryTag: "Daily Panchang",
    categoryType: "tithi-muhurat",
    image: "/calendar_hero.jpg",
    imageAlt: `Vedic Panchang for ${panchang.formattedDate}`,
    summary: `Daily Vedic Panchang for ${panchang.formattedDate} (${panchang.samvat}). Observed under ${panchang.nakshatra} Nakshatra during ${panchang.paksha}.`,
    schedule: [
      {
        id: "gen-1",
        title: "Brahma Muhurat",
        time: panchang.brahmaMuhurat,
        icon: "🕉️",
        note: "Ideal for Dhyana & Gayatri Mantra",
      },
      {
        id: "gen-2",
        title: "Abhijit Muhurat",
        time: panchang.abhijitMuhurat,
        icon: "🌟",
        note: "Auspicious window for all actions",
      },
      {
        id: "gen-3",
        title: "Sunrise & Sunset",
        time: `${panchang.sunrise} - ${panchang.sunset}`,
        icon: "☀️",
        note: `Nakshatra: ${panchang.nakshatra}`,
      },
      {
        id: "gen-4",
        title: "Rahu Kaal",
        time: panchang.rahuKaal,
        icon: "⚠️",
        note: "Inauspicious time of the day",
      },
    ],
    exploreHref: "/calendar",
    exploreText: "Explore Full Calendar",
    fastingInfo: {
      title: `${panchang.paksha} • ${panchang.moonPhase}`,
      description: `Lunar illumination: ${panchang.moonPhasePercent}%. Ideal day for daily sadhana, charity, and honoring the Ishta Devata.`,
    },
  };
}

/**
 * Retrieves the next N upcoming major festivals strictly on or after a given date.
 * Never pulls past dates.
 */
export function getUpcomingFestivalsFromDate(
  year: number,
  fromDateIsoString: string,
  count = 5,
): CalendarEventItem[] {
  const currentYearConfig = getYearCalendarConfig(year);
  const nextYearConfig = getYearCalendarConfig(year + 1);

  const rawEvents: CalendarEventItem[] = [];

  const extractFromConfig = (cfg: YearCalendarConfig, targetYear: number) => {
    Object.entries(cfg.months).forEach(([monthKey, m]) => {
      const monthNum = parseInt(monthKey, 10);
      const monthPadded = String(monthNum).padStart(2, "0");

      // 1. Check days
      Object.entries(m.days).forEach(([dateStr, d]) => {
        if (d.events && d.events.length > 0) {
          d.events.forEach((evt) => {
            const parts = dateStr.split("-");
            const dayNum = parseInt(parts[2], 10) || evt.dayNumber;
            const dayPadded = String(dayNum).padStart(2, "0");
            const normalizedDate = `${targetYear}-${monthPadded}-${dayPadded}`;

            rawEvents.push({
              ...evt,
              id: `${normalizedDate}-${evt.title}`,
              date: normalizedDate,
              yearNumber: targetYear,
              monthNumber: monthNum,
              dayNumber: dayNum,
              image: evt.image || "/festivals/slider/image-1.webp",
              deepLink: `/calendar?year=${targetYear}&month=${monthNum}&date=${normalizedDate}`,
            });
          });
        }
      });

      // 2. Check monthEvents
      if (m.monthEvents) {
        m.monthEvents.forEach((evt) => {
          const parts = evt.date.split("-");
          const dayNum = parseInt(parts[2], 10) || evt.dayNumber;
          const dayPadded = String(dayNum).padStart(2, "0");
          const normalizedDate = `${targetYear}-${monthPadded}-${dayPadded}`;

          rawEvents.push({
            ...evt,
            id: `${normalizedDate}-${evt.title}`,
            date: normalizedDate,
            yearNumber: targetYear,
            monthNumber: monthNum,
            dayNumber: dayNum,
            image: evt.image || "/festivals/slider/image-1.webp",
            deepLink: `/calendar?year=${targetYear}&month=${monthNum}&date=${normalizedDate}`,
          });
        });
      }
    });
  };

  // Extract from current year
  extractFromConfig(currentYearConfig, year);
  // Also extract from next year so we can seamlessly cross into the new year
  extractFromConfig(nextYearConfig, year + 1);

  // De-duplicate by normalized date + title
  const uniqueMap = new Map<string, CalendarEventItem>();
  rawEvents.forEach((evt) => {
    const simplifiedTitle = evt.title.split("(")[0].trim().toLowerCase();
    const key = `${evt.date}_${simplifiedTitle}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, evt);
    }
  });

  // Strictly filter only events ON OR AFTER fromDateIsoString
  const futureEvents = Array.from(uniqueMap.values())
    .filter((evt) => evt.date >= fromDateIsoString)
    .sort((a, b) => a.date.localeCompare(b.date));

  return futureEvents.slice(0, count);
}

