"use client";

import { useCallback, useMemo } from "react";
import { Eye, Pencil } from "lucide-react";
import ActionMenu from "@/_components/common/ActionMenu";
import useIsMobile from "@/_hooks/useIsMobile";
import { CalenderEntryTable } from "@/_features/calender/components/CalenderEntryTable";
import CreateCalenderEnrtyDrawer from "@/_features/calender/components/CreateCalenderEntryDrawer";
import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { useUI } from "@/providers/UIProvider";

export default function AdminCalenderPage() {
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();

  const handleOpenDrawer = useCallback(
    (mode: "create" | "edit" | "view", calenderEntryId?: string) => {
      openDrawer(
        <CreateCalenderEnrtyDrawer
          mode={mode}
          calenderEntryId={calenderEntryId}
        />,
        { size: isMobileView ? "xl" : "full" },
      );
    },
    [isMobileView, openDrawer],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black cursor-pointer"
        onClick={() => handleOpenDrawer("create")}
      >
        Create Calender Entry
      </button>
    ),
    [handleOpenDrawer],
  );

  const renderActions = useCallback(
    (entry: CalenderEntry) => (
      <ActionMenu
        items={[
          {
            key: "view",
            label: "View",
            icon: <Eye size={16} />,
            onClick: () => handleOpenDrawer("view", entry._id),
          },
          {
            key: "edit",
            label: "Edit",
            icon: <Pencil size={16} />,
            onClick: () => handleOpenDrawer("edit", entry._id),
          },
        ]}
      />
    ),
    [handleOpenDrawer],
  );

  return (
    <section className="space-y-8">
      <CalenderEntryTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </section>
  );
}
