"use client";

import { useCallback, useMemo } from "react";
import { Pencil } from "lucide-react";
import ActionMenu from "@/_components/common/ActionMenu";
import { EventArtistsTable } from "@/_features/artists/components/EventArtistsTable";
import AddArtistsDrawer from "@/_features/artists/components/AddArtistsDrawer";
import { useUI } from "@/providers/UIProvider";
import { Artist } from "@/_types/Artists.types";
export default function AdminArtistsPage() {
  const { openDrawer } = useUI();

  const handleAddArtist = useCallback(() => {
    openDrawer(<AddArtistsDrawer />, { size: "full" });
  }, [openDrawer]);

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black cursor-pointer"
        onClick={handleAddArtist}
      >
        Add Artist
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
                { size: "full" },
              ),
          },
        ]}
      />
    ),
    [openDrawer],
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
