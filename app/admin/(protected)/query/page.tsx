"use client";

import { EventQueryTable } from "@/_features/event-queries/components/EventQueryTable";

export default function AdminQueryPage() {
  return (
    <section className="space-y-8">
      <EventQueryTable />
    </section>
  );
}
