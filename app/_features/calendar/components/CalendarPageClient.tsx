"use client";

import React from "react";
import CalendarHero from "./CalendarHero";
import InteractiveCalendarSection from "./InteractiveCalendarSection";
import MonthlyEventsList from "./MonthlyEventsList";
import SpiritualHighlightsSection from "./SpiritualHighlightsSection";
import UpcomingFestivalsCarousel from "./UpcomingFestivalsCarousel";
import StayConnectedNewsletter from "@/_components/sections/Marketing/StayConnectedNewsletter";
import { useCalendar } from "@/_hooks/useCalendar";

import { CalendarCategory } from "@/_types/calendar.types";

export default function CalendarPageClient() {
  const calendar = useCalendar();

  const handleHeroFilterClick = (category: CalendarCategory | "all") => {
    calendar.setCategoryFilter(category);
    // Smooth scroll down to interactive calendar section
    const calendarEl = document.getElementById("interactive-calendar");
    if (calendarEl) {
      calendarEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectDateAndScroll = (dateString: string) => {
    calendar.selectDate(dateString);
    const calendarEl = document.getElementById("interactive-calendar");
    if (calendarEl) {
      calendarEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5]">
      {/* ── 01. Hero Section ── */}
      <CalendarHero
        heroConfig={calendar.yearConfig.hero}
        onFilterClick={handleHeroFilterClick}
      />

      {/* ── 02. Interactive Calendar & Detail Sidebar ── */}
      <div id="interactive-calendar">
        <InteractiveCalendarSection calendar={calendar} />
      </div>

      {/* ── 03. Month Events List (e.g. July 2026 Events) ── */}
      <MonthlyEventsList
        monthName={calendar.monthConfig.monthName}
        year={calendar.year}
        events={calendar.monthConfig.monthEvents}
        onSelectEventDate={handleSelectDateAndScroll}
      />

      {/* ── 04. Today's Spiritual Highlights & Moon Status Bar ── */}
      <SpiritualHighlightsSection
        highlights={calendar.activeHighlights}
        moonStatus={calendar.activeMoonStatus}
      />

      {/* ── 05. Upcoming Major Festivals ── */}
      <UpcomingFestivalsCarousel
        festivals={calendar.upcomingFestivals}
        onSelectFestivalDate={handleSelectDateAndScroll}
      />

      {/* ── 06. Stay Connected Newsletter CTA ── */}
      <StayConnectedNewsletter />
    </div>
  );
}
