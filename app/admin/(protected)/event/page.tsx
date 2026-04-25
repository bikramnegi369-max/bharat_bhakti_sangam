"use client";

import AddEventDrawer from "@/_features/event/components/AddEventDrawer";
import { EventsTable } from "@/_features/event/components/EventsTable";
import useIsMobile from "@/_hooks/useIsMobile";
import { useUI } from "@/providers/UIProvider";

export default function AdminEventPage() {
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();

  const handleAddEvent = () => {
    openDrawer(<AddEventDrawer />, {
      size: isMobileView ? "xl" : "full",
    });
  };

  return (
    <section className="space-y-8">
      <EventsTable
        filterAction={
          <button
            className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black cursor-pointer"
            onClick={handleAddEvent}
          >
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
