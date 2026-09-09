"use client";

import ActionMenu from "@/_components/common/ActionMenu";
import AddEventDrawer from "@/_features/event/components/AddEventDrawer";
import EventActionDrawer from "@/_features/event/components/EventActionDrawer";
import { EventsTable } from "@/_features/event/components/EventsTable";
import { Event } from "@/_features/event/types";
import useIsMobile from "@/_hooks/useIsMobile";
import { Pencil, Eye, Plus } from "lucide-react";
import { useUI } from "@/providers/UIProvider";
import { useCallback } from "react";
import AddManualAttendanceModal from "@/_features/event/components/AddManualAttendanceModal";

export default function AdminEventPage() {
  const { openDrawer, openModal } = useUI();
  const isMobileView = useIsMobile();

  const handleAddEvent = () => {
    openDrawer(<AddEventDrawer />, {
      size: isMobileView ? "xl" : "full",
    });
  };

  const handleOpenEventDrawer = (mode: "view" | "edit", event: Event) => {
    openDrawer(<EventActionDrawer event={event} mode={mode} />, {
      size: isMobileView ? "xl" : "full",
    });
  };

  const handleAddManualAttendanceModal = useCallback(
    (eventId: string) => {
      openModal(<AddManualAttendanceModal eventId={eventId} />, {
        size: "full",
      });
    },
    [openModal],
  );

  return (
    <section className="space-y-8">
      <EventsTable
        filterAction={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#740E0A] via-[#85130E] to-[#630B08] px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 transition-all duration-200 active:scale-[0.98] cursor-pointer border border-[#8a1914]"
            onClick={handleAddEvent}
          >
            <Plus size={16} />
            <span>Add Event</span>
          </button>
        }
        renderActions={(event) => (
          <ActionMenu
            items={[
              {
                key: "view",
                label: "View",
                icon: <Eye size={16} />,
                onClick: () => handleOpenEventDrawer("view", event),
              },
              {
                key: "edit",
                label: "Edit",
                icon: <Pencil size={16} />,
                onClick: () =>
                  openDrawer(
                    <AddEventDrawer mode="edit" eventId={event._id} />,
                    {
                      size: isMobileView ? "xl" : "full",
                    },
                  ),
              },
              {
                key: "Add Manual Attendance",
                label: "Add Manual Attendance",
                icon: <Plus size={16} />,
                onClick: () => handleAddManualAttendanceModal(event._id),
              },
            ]}
          />
        )}
      />
    </section>
  );
}
