import React, { Suspense } from "react";
import type { Metadata } from "next";
import CalendarPageClient from "@/_features/calendar/components/CalendarPageClient";
import { createPageMetadataFromConfig, jsonLdScript } from "@/_lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = createPageMetadataFromConfig("calendar");

export default function CalendarPage() {
  const calendarJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sanatan Spiritual Calendar 2026",
    description:
      "Explore Hindu festivals, sacred tithis, vrat dates, auspicious muhurats, and spiritual wisdom with Bharat Bhakti Sangam.",
    url: "https://www.bharatbhaktisangam.com/calendar",
    mainEntity: {
      "@type": "EventSeries",
      name: "Sanatan Festivals & Cultural Observances 2026",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Pan-India Sacred Observances",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(calendarJsonLd)}
      />

      {/* Skip link for screen-reader accessibility */}
      <a
        href="#interactive-calendar"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50 shadow-md font-medium"
      >
        Skip to interactive calendar
      </a>

      {/* Suspense boundary for useSearchParams in client component */}
      <Suspense
        fallback={
          <div className="w-full min-h-screen flex items-center justify-center bg-[#FAF8F5]">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 border-3 border-[#740E0A] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-[#740E0A] uppercase tracking-widest">
                Loading Spiritual Calendar...
              </p>
            </div>
          </div>
        }
      >
        <CalendarPageClient />
      </Suspense>
    </>
  );
}
