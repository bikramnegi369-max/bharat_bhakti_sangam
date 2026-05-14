"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { ALL_VENUES, VENUE_BY_ID } from "@/_lib/constants/eventVenue.constants";
import {
  addVenue,
  getVenueById,
  updateVenue,
} from "../services/eventVenue.service";
import AddVenueForm from "./AddVenueForm";
import { Venue } from "@/_types/Venue.types";

interface AddVenueModalProps {
  mode?: "create" | "edit";
  venueId?: string;
}

export default function AddVenueModal({
  mode = "create",
  venueId,
}: AddVenueModalProps) {
  const queryClient = useQueryClient();
  const { closeModal } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [VENUE_BY_ID, venueId],
    queryFn: async () => {
      if (!venueId) throw new Error("Venue ID is required");
      const response = await getVenueById(venueId);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to load venue details.");
      }
      return response.data;
    },
    enabled: isEditMode && !!venueId,
  });

  const handleFormSubmit = async (data: Partial<Venue>) => {
    try {
      await toast.promise(
        (async () => {
          const result =
            isEditMode && venueId
              ? await updateVenue(venueId, data)
              : await addVenue(data);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} venue.`);
          }

          return result;
        })(),
        {
          pending: isEditMode ? "Updating venue..." : "Creating new venue...",
          success: isEditMode
            ? "Venue updated successfully!"
            : "Venue created successfully!",
          error: isEditMode
            ? "Failed to update venue."
            : "Failed to create venue.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_VENUES]),
      });

      closeModal();
    } catch (error) {
      console.error("Error submitting venue form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden bg-white rounded-xl min-h-96">
      <h2 className="h-12 bg-black text-primary text-2xl font-semibold flex items-center p-8">
        {isEditMode ? "Edit Venue" : "Add New Venue"}
      </h2>

      {isEditMode && isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode ? "Loading venue details..." : "Initializing..."}
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="text-base font-medium text-red-600">
            {(error as Error).message}
          </p>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-black"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <AddVenueForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
