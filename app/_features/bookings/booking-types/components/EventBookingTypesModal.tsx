"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import {
  ALL_BOOKING_TYPES,
  EVENT_BOOKING_TYPE_BY_ID,
} from "@/_lib/constants/eventBookingTypes.constants";
import {
  addBookingType,
  getBookingTypeById,
  updateBookingType,
} from "../services/eventBookingTypes.service";
import EventBookingTypesForm from "./EventBookingTypesForm";
import { EventBookingType } from "@/_types/EventBookingType.types";

interface EventBookingTypesModalProps {
  mode?: "create" | "edit";
  bookingTypeId?: string;
}

export default function EventBookingTypesModal({
  mode = "create",
  bookingTypeId,
}: EventBookingTypesModalProps) {
  const queryClient = useQueryClient();
  const { closeModal } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [EVENT_BOOKING_TYPE_BY_ID, bookingTypeId],
    queryFn: async () => {
      if (!bookingTypeId) throw new Error("Booking Type ID is required");
      const response = await getBookingTypeById(bookingTypeId);

      if (!response.success || !response.data) {
        throw new Error(
          response.error || "Failed to load booking type details.",
        );
      }
      return response.data;
    },
    enabled: isEditMode && !!bookingTypeId,
  });

  const handleFormSubmit = async (data: Partial<EventBookingType>) => {
    try {
      await toast.promise(
        (async () => {
          const result =
            isEditMode && bookingTypeId
              ? await updateBookingType(bookingTypeId, data)
              : await addBookingType(data);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} booking type.`);
          }

          return result;
        })(),
        {
          pending: isEditMode
            ? "Updating booking type..."
            : "Creating new booking type...",
          success: isEditMode
            ? "Booking type updated successfully!"
            : "Booking type created successfully!",
          error: isEditMode
            ? "Failed to update booking type."
            : "Failed to create booking type.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_BOOKING_TYPES]),
      });

      closeModal();
    } catch (error) {
      console.error("Error submitting booking type form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden bg-white rounded-xl min-h-96">
      <h2 className="h-12 bg-black text-primary text-xl flex items-center p-8">
        {isEditMode ? "Edit Booking Type" : "Add New Booking Type"}
      </h2>
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode ? "Loading booking type details..." : "Initializing..."}
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-red-500 font-medium">
            {error.message || "Failed to load data"}
          </p>
        </div>
      ) : (
        <EventBookingTypesForm
          initialData={initialData}
          handleSubmit={handleFormSubmit}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}
