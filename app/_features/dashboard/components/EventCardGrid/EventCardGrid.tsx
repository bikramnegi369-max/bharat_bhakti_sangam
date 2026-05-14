import { fetchEventStats } from "@/_features/dashboard/services/dashboard.service";
import { EventCardError, EventCard } from "../EventCard";

export default async function EventCardGrid() {
  const result = await fetchEventStats();

  if (!result.success) {
    return (
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Event loading error"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <EventCardError key={i} message={result.error} />
        ))}
      </section>
    );
  }

  if (result?.data?.length === 0) {
    return (
      <p className="text-center text-sm text-[#8C7A5E] py-12">
        No events found.
      </p>
    );
  }

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="Event cards"
    >
      {result?.data?.slice(0, 3).map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
