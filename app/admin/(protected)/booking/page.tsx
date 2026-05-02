"use client";

import { EventBookingTable } from "@/_features/bookings/all-bookings/components/EventBookingTable";

export default function AdminAllBookingsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
        <p className="text-gray-600">Manage all event bookings</p>
      </div>
      <EventBookingTable />
    </div>
  );
}
