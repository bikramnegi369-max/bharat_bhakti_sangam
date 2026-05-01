"use client";

import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BadgeCheck, Ban, Pencil } from "lucide-react";
import ActionMenu from "@/_components/common/ActionMenu";
import AddVenueModal from "@/_features/event-venue/components/AddVenueModal";
import { EventVenuesTable } from "@/_features/event-venue/components/EventVenuesTable";
import { updateVenueStatus } from "@/_features/event-venue/services/eventVenue.service";
import { ALL_VENUES } from "@/_lib/constants/eventVenue.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { Venue } from "@/_types/Venue.types";

export default function AdminEventVenuesPage() {
  const queryClient = useQueryClient();
  const { openModal } = useUI();

  const handleAddVenue = useCallback(() => {
    openModal(<AddVenueModal />, { size: "full" });
  }, [openModal]);

  const handleUpdateVenue = useCallback(
    async (venueId: string, disable: boolean) => {
      try {
        await toast.promise(
          (async () => {
            const result = await updateVenueStatus(venueId, disable);
            if (!result.success) {
              throw new Error(result.error || "Failed to update venue status.");
            }
            return result;
          })(),
          {
            pending: disable ? "Disabling venue..." : "Enabling venue...",
            success: disable
              ? "Venue disabled successfully!"
              : "Venue enabled successfully!",
            error: "Failed to update venue status.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_VENUES]),
        });
      } catch (error) {
        console.error("Error updating venue status:", error);
      }
    },
    [queryClient],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black cursor-pointer"
        onClick={handleAddVenue}
      >
        Add Venue
      </button>
    ),
    [handleAddVenue],
  );

  const renderActions = useCallback(
    (venue: Venue) => (
      <ActionMenu
        items={[
          {
            key: "edit",
            label: "Edit",
            icon: <Pencil size={16} />,
            onClick: () =>
              openModal(<AddVenueModal mode="edit" venueId={venue._id} />, {
                size: "full",
              }),
          },
          {
            key: "Disable",
            label: "Disable",
            icon: <Ban size={16} />,
            onClick: () => handleUpdateVenue(venue._id, true),
          },
          {
            key: "Enable",
            label: "Enable",
            icon: <BadgeCheck size={16} />,
            onClick: () => handleUpdateVenue(venue._id, false),
          },
        ]}
      />
    ),
    [openModal, handleUpdateVenue],
  );

  return (
    <section className="space-y-8">
      <EventVenuesTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </section>
  );
}
