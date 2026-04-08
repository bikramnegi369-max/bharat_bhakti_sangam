import { EventsTable } from "@/_features/event/components/EventsTable";

const adminSections = [
  {
    title: "Artists",
    description: "Manage artist profiles, schedules, and featured appearances.",
  },
  {
    title: "Sponsors",
    description: "Track sponsor details, visibility slots, and commitments.",
  },
  {
    title: "Bookings",
    description: "Review booking activity and keep event planning organized.",
  },
];

export default function AdminPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-heading">Home</h1>
      </div>

      <EventsTable />
    </section>
  );
}
