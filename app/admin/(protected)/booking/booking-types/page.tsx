"use client";

import { useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ActionMenu from "@/_components/common/ActionMenu";
import EventBookingTypesModal from "@/_features/bookings/booking-types/components/EventBookingTypesModal";
import { EventBookingTypesTable } from "@/_features/bookings/booking-types/components/EventBookingTypesTable";
import { deleteBookingType } from "@/_features/bookings/booking-types/services/eventBookingTypes.service";
import { ALL_BOOKING_TYPES } from "@/_lib/constants/eventBookingTypes.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { Pencil, Trash2 } from "lucide-react";
import { EventBookingType } from "@/_types/EventBookingType.types";

export default function AdminBookingTypesPage() {
  const queryClient = useQueryClient();
  const { openModal } = useUI();

  const handleAddBookingType = useCallback(() => {
    openModal(<EventBookingTypesModal />, {
      size: "full",
    });
  }, [openModal]);

  const handleDeleteBookingType = useCallback(
    async (bookingTypeId: string) => {
      try {
        await toast.promise(
          (async () => {
            const result = await deleteBookingType(bookingTypeId);

            if (!result.success) {
              throw new Error(result.error || "Failed to delete booking type.");
            }

            return result;
          })(),
          {
            pending: "Deleting booking type...",
            success: "Booking type deleted successfully!",
            error: "Failed to delete booking type.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_BOOKING_TYPES]),
        });
      } catch (error) {
        console.error("Error deleting booking type:", error);
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
    (bookingType: EventBookingType) => (
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
          {
            key: "delete",
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: () => handleDeleteBookingType(bookingType._id),
          },
        ]}
      />
    ),
    [openModal, handleDeleteBookingType],
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Booking Types</h1>
        <p className="text-gray-600">Manage booking types</p>
      </div>
      <EventBookingTypesTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </div>
  );
}
