"use client";

import { useCallback, useMemo } from "react";
import { Pencil, Plus } from "lucide-react";
import ActionMenu from "@/_components/common/ActionMenu";
import { EventArtistsTable } from "@/_features/artists/components/EventArtistsTable";
import AddArtistsDrawer from "@/_features/artists/components/AddArtistsDrawer";
import { useUI } from "@/providers/UIProvider";
import { Artist } from "@/_types/Artists.types";
import useIsMobile from "@/_hooks/useIsMobile";
export default function AdminArtistsPage() {
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();

  const handleAddArtist = useCallback(() => {
    openDrawer(<AddArtistsDrawer />, { size: isMobileView ? "xl" : "full" });
  }, [openDrawer, isMobileView]);

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#740E0A] via-[#85130E] to-[#630B08] px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 transition-all duration-200 active:scale-[0.98] cursor-pointer border border-[#8a1914]"
        onClick={handleAddArtist}
      >
        <Plus size={16} />
        <span>Add Artist</span>
      </button>
    ),
    [handleAddArtist],
  );

  const renderActions = useCallback(
    (artist: Artist) => (
      <ActionMenu
        items={[
          {
            key: "edit",
            label: "Edit",
            icon: <Pencil size={16} />,
            onClick: () =>
              openDrawer(
                <AddArtistsDrawer mode="edit" artistId={artist._id} />,
                { size: isMobileView ? "xl" : "full" },
              ),
          },
        ]}
      />
    ),
    [openDrawer, isMobileView],
  );

  return (
    <section className="space-y-8">
      <EventArtistsTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </section>
  );
}
