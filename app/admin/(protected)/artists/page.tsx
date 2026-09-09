"use client";

import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CheckCircle2, XCircle, Pencil, Plus, Trash2 } from "lucide-react";
import ActionMenu, { ActionMenuItem } from "@/_components/common/ActionMenu";
import { EventArtistsTable } from "@/_features/artists/components/EventArtistsTable";
import AddArtistsDrawer from "@/_features/artists/components/AddArtistsDrawer";
import {
  updateArtistStatus,
  deleteArtist,
} from "@/_features/artists/services/artists.service";
import { ALL_ARTISTS } from "@/_lib/constants/artists.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { Artist } from "@/_types/Artists.types";
import useIsMobile from "@/_hooks/useIsMobile";

export default function AdminArtistsPage() {
  const queryClient = useQueryClient();
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();

  const handleAddArtist = useCallback(() => {
    openDrawer(<AddArtistsDrawer mode="create" />, {
      size: isMobileView ? "xl" : "full",
    });
  }, [openDrawer, isMobileView]);

  const handleUpdateStatus = useCallback(
    async (artistId: string, status: "approved" | "rejected") => {
      try {
        await toast.promise(
          (async () => {
            const result = await updateArtistStatus(artistId, status);

            if (!result.success) {
              throw new Error(
                result.error || `Failed to update status to ${status}.`,
              );
            }

            return result;
          })(),
          {
            pending:
              status === "approved"
                ? "Approving artist..."
                : "Rejecting artist...",
            success:
              status === "approved"
                ? "Artist approved successfully!"
                : "Artist rejected successfully!",
            error: `Failed to ${status} artist.`,
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_ARTISTS]),
        });
      } catch (error) {
        console.error(`Error updating artist status to ${status}:`, error);
      }
    },
    [queryClient],
  );

  const handleDeleteArtist = useCallback(
    async (artistId: string) => {
      try {
        await toast.promise(
          (async () => {
            const result = await deleteArtist(artistId);

            if (!result.success) {
              throw new Error(result.error || "Failed to delete artist.");
            }

            return result;
          })(),
          {
            pending: "Deleting artist...",
            success: "Artist deleted successfully!",
            error: "Failed to delete artist.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_ARTISTS]),
        });
      } catch (error) {
        console.error("Error deleting artist:", error);
      }
    },
    [queryClient],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 transition-all duration-200 active:scale-[0.98] cursor-pointer border border-[#8a1914]"
        onClick={handleAddArtist}
      >
        <Plus size={16} />
        <span>Add Artist</span>
      </button>
    ),
    [handleAddArtist],
  );

  const renderActions = useCallback(
    (artist: Artist) => {
      const status = (artist.status || "approved").toLowerCase();
      const isApproved = status === "approved" || status === "active";
      const isRejected = status === "rejected";

      const items: ActionMenuItem[] = [
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
      ];

      if (isApproved) {
        items.push({
          key: "reject",
          label: "Reject",
          icon: <XCircle size={16} className="text-rose-600" />,
          onClick: () => handleUpdateStatus(artist._id, "rejected"),
        });
      } else if (isRejected) {
        items.push({
          key: "approve",
          label: "Approve",
          icon: <CheckCircle2 size={16} className="text-emerald-600" />,
          onClick: () => handleUpdateStatus(artist._id, "approved"),
        });
      } else {
        items.push(
          {
            key: "approve",
            label: "Approve",
            icon: <CheckCircle2 size={16} className="text-emerald-600" />,
            onClick: () => handleUpdateStatus(artist._id, "approved"),
          },
          {
            key: "reject",
            label: "Reject",
            icon: <XCircle size={16} className="text-rose-600" />,
            onClick: () => handleUpdateStatus(artist._id, "rejected"),
          },
        );
      }

      items.push({
        key: "delete",
        label: "Delete",
        icon: <Trash2 size={16} className="text-rose-600" />,
        onClick: () => handleDeleteArtist(artist._id),
        variant: "danger",
      });

      return <ActionMenu items={items} />;
    },
    [openDrawer, handleUpdateStatus, handleDeleteArtist, isMobileView],
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
