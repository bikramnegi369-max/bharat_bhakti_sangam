"use client";

import { EventsTable } from "@/_features/event/components/EventsTable";

export default function AdminEventPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-heading">Home</h1>
      </div>

      <EventsTable
        filterAction={
          <button className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black">
            Add Event
          </button>
        }
        renderActions={() => (
          <div className="flex gap-2">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )}
      />
    </section>
  );
}
