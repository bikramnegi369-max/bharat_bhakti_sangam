import { Suspense } from "react";
import { EventCardSkeleton } from "@/_features/dashboard/components/EventCard";
import EventCardGrid from "@/_features/dashboard/components/EventCardGrid/EventCardGrid";
import BookingRegistrationTrendChart from "@/_features/dashboard/components/BookingRegistrationTrendChart/BookingRegistrationTrendChart";

function GridSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <BookingRegistrationTrendChart />
    </div>
  );
}
