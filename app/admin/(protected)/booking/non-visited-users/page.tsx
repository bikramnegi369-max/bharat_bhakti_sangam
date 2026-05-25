"use client";

import { NonVisitedUsersTable } from "@/_features/bookings/non-visited-users/components/NonVisitedUsersTable";

export default function AdminNonVisitedUsersPage() {
  return (
    <div className="space-y-8">
      <NonVisitedUsersTable />
    </div>
  );
}
