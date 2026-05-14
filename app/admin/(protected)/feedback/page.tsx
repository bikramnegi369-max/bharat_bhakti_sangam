"use client";

import { EventFeedbackTable } from "@/_features/feedback/components/EventFeedbackTable";

export default function AdminFeedbackPage() {
  return (
    <div className="space-y-8">
      <EventFeedbackTable />
    </div>
  );
}
