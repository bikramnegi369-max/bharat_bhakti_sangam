"use client";

import { useCallback, useMemo } from "react";
import { Eye, Pencil, Plus } from "lucide-react";
import ActionMenu from "@/_components/common/ActionMenu";
import useIsMobile from "@/_hooks/useIsMobile";
import { CalenderEntryTable } from "@/_features/calender/components/CalenderEntryTable";
import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { useUI } from "@/providers/UIProvider";
import CreateCalenderEntryDrawer from "@/_features/calender/components/CreateCalenderEntryDrawer";

export default function AdminCalenderPage() {
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();

  const handleOpenDrawer = useCallback(
    (mode: "create" | "edit" | "view", calenderEntryId?: string) => {
      openDrawer(
        <CreateCalenderEntryDrawer
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
        className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 transition-all duration-200 active:scale-[0.98] cursor-pointer border border-[#8a1914]"
        onClick={() => handleOpenDrawer("create")}
      >
        <Plus size={16} />
        <span>Create Calender Entry</span>
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
