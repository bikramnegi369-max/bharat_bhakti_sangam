"use client";

import { EventBookingTable } from "@/_features/bookings/all-bookings/components/EventBookingTable";

export default function AdminAllBookingsPage() {
  return (
    <div className="space-y-8">
      <EventBookingTable />
    </div>
  );
}
