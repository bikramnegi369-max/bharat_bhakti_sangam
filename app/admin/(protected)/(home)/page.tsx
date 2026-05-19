import { Suspense } from "react";
import { EventCardSkeleton } from "@/_features/dashboard/components/EventCard";
import EventCardGrid from "@/_features/dashboard/components/EventCardGrid/EventCardGrid";
import BookingRegistrationTrendChart from "@/_features/dashboard/components/BookingRegistrationTrendChart/BookingRegistrationTrendChart";
import TotalBookingTrendChart from "@/_features/dashboard/components/TotalBookingTrendChart/TotalBookingTrendChart";

function GridSkeleton() {
  return (
    <section className="grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </section>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<GridSkeleton />}>
        <EventCardGrid />
      </Suspense>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <TotalBookingTrendChart />
        <BookingRegistrationTrendChart />
      </div>
    </div>
  );
}
