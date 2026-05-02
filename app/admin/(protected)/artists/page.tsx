"use client";

import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BadgeCheck, Ban, Pencil } from "lucide-react";
import ActionMenu from "@/_components/common/ActionMenu";
import { EventArtistsTable } from "@/_features/artists/components/EventArtistsTable";
import AddArtistsDrawer from "@/_features/artists/components/AddArtistsDrawer";
import { updateArtistStatus } from "@/_features/artists/services/artists.service";
import { ALL_ARTISTS } from "@/_lib/constants/artists.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { Artist } from "@/_types/Artists.types";

export default function AdminArtistsPage() {
  const queryClient = useQueryClient();
  const { openDrawer } = useUI();

  const handleAddArtist = useCallback(() => {
    openDrawer(<AddArtistsDrawer />, { size: "full" });
  }, [openDrawer]);

  const handleUpdateArtist = useCallback(
    async (artistId: string, disable: boolean) => {
      try {
        await toast.promise(
          (async () => {
            const result = await updateArtistStatus(artistId, disable);

            if (!result.success) {
              throw new Error(
                result.error || "Failed to update artist status.",
              );
            }

            return result;
          })(),
          {
            pending: disable ? "Disabling artist..." : "Enabling artist...",
            success: disable
              ? "Artist disabled successfully!"
              : "Artist enabled successfully!",
            error: "Failed to update artist status.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_ARTISTS]),
        });
      } catch (error) {
        console.error("Error updating artist status:", error);
      }
    },
    [queryClient],
  );

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
          {
            key: "Disable",
            label: "Disable",
            icon: <Ban size={16} />,
            onClick: () => handleUpdateArtist(artist._id, true),
          },
          {
            key: "Enable",
            label: "Enable",
            icon: <BadgeCheck size={16} />,
            onClick: () => handleUpdateArtist(artist._id, false),
          },
        ]}
      />
    ),
    [openDrawer, handleUpdateArtist],
  );

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Artists</h1>
      </div>

      <EventArtistsTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </section>
  );
}
