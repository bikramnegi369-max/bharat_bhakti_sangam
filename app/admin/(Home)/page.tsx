import { EventsTable } from "@/_features/event/components/EventsTable";

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
