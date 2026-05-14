import { Suspense } from "react";
import { EventCardSkeleton } from "@/_features/dashboard/components/EventCard";
import EventCardGrid from "@/_features/dashboard/components/EventCardGrid/EventCardGrid";

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
    <div>
      <Suspense fallback={<GridSkeleton />}>
        <EventCardGrid />
      </Suspense>
    </div>
  );
}
