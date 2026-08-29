"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CalendarDays } from "lucide-react";
import { playfair } from "@/_lib/fonts";
import { CalendarDayDetail } from "@/_types/calendar.types";

interface CalendarDetailSidebarProps {
  selectedDetail: CalendarDayDetail | null;
  selectedDate: string;
}

export default function CalendarDetailSidebar({
  selectedDetail,
  selectedDate,
}: CalendarDetailSidebarProps) {
  // If no detailed event on selected day, render an elegant spiritual summary
  if (!selectedDetail) {
    const parts = selectedDate.split("-");
    const formatted = `${parts[2] || "14"} July, ${parts[0] || "2026"}`;

    return (
      <div className="w-full h-full flex flex-col justify-between p-6 bg-white rounded-2xl border border-amber-200/80 shadow-lg text-left">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#740E0A]">
              {formatted}
            </span>
            <span className="text-xs text-[#71717A] flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              Regular Day
            </span>
          </div>

          <div className="my-6 text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-50 flex items-center justify-center text-[#740E0A]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3
              className={`${playfair.className} text-xl font-bold text-[#370504]`}
            >
              Auspicious Vedic Day
            </h3>
            <p className="text-xs text-[#5c5c5c] mt-2 max-w-xs mx-auto leading-relaxed">
              Every sunrise brings sacred energies for meditation, mantra japa,
              and righteous contemplation.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-amber-200/60 text-xs text-[#5c5c5c]">
          <p className="font-semibold text-[#370504] mb-1">
            Daily Recommendation:
          </p>
          <p>
            Perform morning Surya Arghya and chant the Gayatri Mantra 108 times
            for spiritual peace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-white rounded-2xl border border-amber-200/80 shadow-lg overflow-hidden transition-all duration-300">
      {/* ── Top Header ── */}
      <div className="p-4 sm:p-5 border-b border-amber-100 bg-[#FAF8F5]/80">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
            {selectedDetail.dateFormatted}
          </span>
          <span className="text-xs font-semibold text-[#740E0A] bg-red-50 px-2 py-0.5 rounded-full border border-red-200/50">
            • {selectedDetail.categoryTag}
          </span>
        </div>

        <h3
          className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#370504] mt-1 tracking-tight`}
        >
          {selectedDetail.festivalName}
        </h3>
      </div>

      <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col justify-between">
        {/* ── Sacred Media Banner ── */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-xs border border-amber-100 group">
          <Image
            src={selectedDetail.image}
            alt={selectedDetail.imageAlt || selectedDetail.festivalName}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* ── Summary Description ── */}
        <p className="text-xs text-[#5c5c5c] leading-relaxed">
          {selectedDetail.summary}
        </p>

        {/* ── Rituals & Pooja Schedule ── */}
        {selectedDetail.schedule && selectedDetail.schedule.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-amber-100/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#740E0A] flex items-center gap-1.5">
              <span>Sacred Timings & Rituals</span>
            </h4>

            <div className="space-y-1.5">
              {selectedDetail.schedule.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#FCFAF5] border border-amber-100/80 text-xs hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm shrink-0">
                      {item.icon || "🕉️"}
                    </span>
                    <div>
                      <span className="font-semibold text-[#370504] block leading-tight">
                        {item.title}
                      </span>
                      {item.note && (
                        <span className="text-[10px] text-[#71717A] block">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-[#740E0A] text-[11px] bg-white px-2 py-0.5 rounded border border-amber-200/60 shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Fasting / Vrat Rules Card (Matching Mockup bottom box) ── */}
        {selectedDetail.fastingInfo && (
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#740E0A]">
                {selectedDetail.fastingInfo.title}
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-700">
                Guidelines
              </span>
            </div>
            <p className="text-[11px] text-[#4B5563] leading-relaxed">
              {selectedDetail.fastingInfo.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
