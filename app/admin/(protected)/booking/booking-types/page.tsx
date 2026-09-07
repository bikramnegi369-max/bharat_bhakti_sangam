"use client";

import { useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ActionMenu from "@/_components/common/ActionMenu";
import EventBookingTypesModal from "@/_features/bookings/booking-types/components/EventBookingTypesModal";
import { EventBookingTypesTable } from "@/_features/bookings/booking-types/components/EventBookingTypesTable";
import { updateBookingTypeStatus } from "@/_features/bookings/booking-types/services/eventBookingTypes.service";
import { ALL_BOOKING_TYPES } from "@/_lib/constants/eventBookingTypes.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { BadgeCheck, Ban, Pencil } from "lucide-react";
import { EventBookingType } from "@/_types/EventBookingType.types";

export default function AdminBookingTypesPage() {
  const queryClient = useQueryClient();
  const { openModal } = useUI();

  const handleAddBookingType = useCallback(() => {
    openModal(<EventBookingTypesModal />, {
      size: "full",
    });
  }, [openModal]);

  const handleUpdateBookingTypeStatus = useCallback(
    async (bookingTypeId: string, disable: boolean) => {
      try {
        await toast.promise(
          (async () => {
            const result = await updateBookingTypeStatus(
              bookingTypeId,
              disable,
            );

            if (!result.success) {
              throw new Error(
                result.error || "Failed to update booking type status.",
              );
            }

            return result;
          })(),
          {
            pending: disable
              ? "Deactivating booking type..."
              : "Activating booking type...",
            success: disable
              ? "Booking type deactivated successfully!"
              : "Booking type activated successfully!",
            error: "Failed to update booking type status.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_BOOKING_TYPES]),
        });
      } catch (error) {
        console.error("Error updating booking type status:", error);
      }
    },
    [queryClient],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black cursor-pointer"
        onClick={handleAddBookingType}
      >
        Add Booking Type
      </button>
    ),
    [handleAddBookingType],
  );

  const renderActions = useCallback(
    (bookingType: EventBookingType) => {
      const isDeleted = Boolean(bookingType.isDelete);

      return (
        <ActionMenu
          items={[
            {
              key: "edit",
              label: "Edit",
              icon: <Pencil size={16} />,
              onClick: () =>
                openModal(
                  <EventBookingTypesModal
                    mode="edit"
                    bookingTypeId={bookingType._id}
                  />,
                  {
                    size: "full",
                  },
                ),
            },
            isDeleted
              ? {
                  key: "enable",
                  label: "Enable",
                  icon: <BadgeCheck size={16} />,
                  onClick: () =>
                    handleUpdateBookingTypeStatus(bookingType._id, false),
                }
              : {
                  key: "disable",
                  label: "Disable",
                  icon: <Ban size={16} />,
                  onClick: () =>
                    handleUpdateBookingTypeStatus(bookingType._id, true),
                },
          ]}
        />
      );
    },
    [openModal, handleUpdateBookingTypeStatus],
  );

  return (
    <div className="space-y-8">
      <EventBookingTypesTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </div>
  );
}
