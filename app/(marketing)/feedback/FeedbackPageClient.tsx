"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import dynamic from "next/dynamic";

const FeedbackForm = dynamic(
  () => import("@/_features/feedback/components/FeedbackForm"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full animate-pulse bg-gray-100 rounded-3xl" />
    ),
  },
);

type FeedbackPageClientProps = {
  eventTitle: string;
  eventDate?: string;
  eventLocation: string;
  eventAddress?: string;
  heroImage: string;
};

export function FeedbackPageClient({
  eventTitle,
  eventDate,
  eventLocation,
  eventAddress,
  heroImage,
}: FeedbackPageClientProps) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#FCFAF5]">
      {/* Background ambient spiritual warmth glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-125 bg-linear-to-b from-[#FFF0D4]/60 via-[#FDF3E7]/40 to-transparent blur-3xl opacity-70"
      />

      <Hero
        title={eventTitle}
        location={eventLocation}
        address={eventAddress}
        date={eventDate}
        backgroundImage={heroImage}
      />

      <div className="relative -mt-16 sm:-mt-24 lg:-mt-32 z-10 flex items-center justify-center pb-16 sm:pb-20 lg:pb-24 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
