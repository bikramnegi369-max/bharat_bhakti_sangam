"use client";

import React from "react";
import CalendarMonthGrid from "./CalendarMonthGrid";
import CalendarDetailSidebar from "./CalendarDetailSidebar";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { UseCalendarReturn } from "@/_hooks/useCalendar";

interface InteractiveCalendarSectionProps {
  calendar: UseCalendarReturn;
}

export default function InteractiveCalendarSection({
  calendar,
}: InteractiveCalendarSectionProps) {
  return (
    <section className="relative w-full py-8 lg:py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Grid: Stacks on mobile/tablet, side-by-side on 1024px+ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Interactive Month Grid (lg:col-span-8) */}
          <div className="lg:col-span-8 w-full">
            <ScrollReveal animation="fade-up" delay={100}>
              <CalendarMonthGrid
                year={calendar.year}
                month={calendar.month}
                selectedDate={calendar.selectedDate}
                gridDays={calendar.gridDays}
                legend={calendar.yearConfig.legend}
                activeCategoryFilter={calendar.categoryFilter}
                onSelectDate={calendar.selectDate}
                onPrevMonth={calendar.prevMonth}
                onNextMonth={calendar.nextMonth}
                onSetMonth={calendar.setMonth}
                onSetYear={calendar.setYear}
                onJumpToToday={calendar.jumpToToday}
                onSetCategoryFilter={calendar.setCategoryFilter}
              />
            </ScrollReveal>
          </div>

          {/* Right: Selected Date Detail Pane (lg:col-span-4) */}
          <div className="lg:col-span-4 w-full sticky top-24">
            <ScrollReveal animation="fade-left" delay={200}>
              <CalendarDetailSidebar
                selectedDetail={calendar.selectedDetail}
                selectedDate={calendar.selectedDate}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
