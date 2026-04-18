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
    <section className="relative w-full min-h-screen overflow-hidden">
      <Hero
        title={eventTitle}
        location={eventLocation}
        address={eventAddress}
        date={eventDate}
        backgroundImage={heroImage}
      />

      <div className="relative lg:-mt-40 z-10 flex items-center justify-center py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="w-full max-w-7xl">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
