"use client";

import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BadgeCheck, Ban, Pencil } from "lucide-react";
import ActionMenu from "@/_components/common/ActionMenu";
import { EventVolunteersTable } from "@/_features/volunteers/components/EventVolunteersTable";
import AddVolunteerDrawer from "@/_features/volunteers/components/AddVolunteerDrawer";
import { updateVolunteerStatus } from "@/_features/volunteers/services/volunteers.service";
import { ALL_VOLUNTEERS } from "@/_lib/constants/volunteers.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { Volunteer } from "@/_types/Volunteer.types";
import useIsMobile from "@/_hooks/useIsMobile";

export default function AdminVolunteersPage() {
  const queryClient = useQueryClient();
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();

  const handleAddVolunteer = useCallback(() => {
    openDrawer(<AddVolunteerDrawer />, { size: isMobileView ? "xl" : "full" });
  }, [openDrawer, isMobileView]);

  const handleUpdateVolunteerStatus = useCallback(
    async (volunteerId: string, disable: boolean) => {
      try {
        await toast.promise(
          (async () => {
            const result = await updateVolunteerStatus(volunteerId, disable);

            if (!result.success) {
              throw new Error(
                result.error || "Failed to update volunteer status.",
              );
            }

            return result;
          })(),
          {
            pending: disable
              ? "Disabling volunteer..."
              : "Enabling volunteer...",
            success: disable
              ? "Volunteer disabled successfully!"
              : "Volunteer enabled successfully!",
            error: "Failed to update volunteer status.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_VOLUNTEERS]),
        });
      } catch (error) {
        console.error("Error updating volunteer status:", error);
      }
    },
    [queryClient],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black cursor-pointer"
        onClick={handleAddVolunteer}
      >
        Add Volunteer
      </button>
    ),
    [handleAddVolunteer],
  );

  const renderActions = useCallback(
    (volunteer: Volunteer) => (
      <ActionMenu
        items={[
          {
            key: "edit",
            label: "Edit",
            icon: <Pencil size={16} />,
            onClick: () =>
              openDrawer(
                <AddVolunteerDrawer mode="edit" volunteerId={volunteer._id} />,
                { size: isMobileView ? "xl" : "full" },
              ),
          },
          {
            key: "disable",
            label: "Disable",
            icon: <Ban size={16} />,
            onClick: () => handleUpdateVolunteerStatus(volunteer._id, true),
          },
          {
            key: "enable",
            label: "Enable",
            icon: <BadgeCheck size={16} />,
            onClick: () => handleUpdateVolunteerStatus(volunteer._id, false),
          },
        ]}
      />
    ),
    [openDrawer, handleUpdateVolunteerStatus, isMobileView],
  );

  return (
    <section className="space-y-8">
      <EventVolunteersTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </section>
  );
}
