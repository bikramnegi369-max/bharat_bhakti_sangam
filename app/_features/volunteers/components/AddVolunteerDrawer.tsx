"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import {
  ALL_VOLUNTEERS,
  VOLUNTEER_BY_ID,
} from "@/_lib/constants/volunteers.constants";
import {
  addVolunteer,
  getVolunteerById,
  updateVolunteer,
} from "../services/volunteers.service";
import AddVolunteerForm from "./AddVolunteerForm";
import { Volunteer } from "@/_types/Volunteer.types";

interface AddVolunteerDrawerProps {
  mode?: "create" | "edit";
  volunteerId?: string;
}

export default function AddVolunteerDrawer({
  mode = "create",
  volunteerId,
}: AddVolunteerDrawerProps) {
  const queryClient = useQueryClient();
  const { closeDrawer } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [VOLUNTEER_BY_ID, volunteerId],
    queryFn: async () => {
      if (!volunteerId) throw new Error("Volunteer ID is required");
      const response = await getVolunteerById(volunteerId);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to load volunteer details.");
      }
      return response.data;
    },
    enabled: isEditMode && !!volunteerId,
  });

  const handleFormSubmit = async (data: Partial<Volunteer>) => {
    try {
      await toast.promise(
        (async () => {
          const result =
            isEditMode && volunteerId
              ? await updateVolunteer(volunteerId, data)
              : await addVolunteer(data);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} volunteer.`);
          }

          return result;
        })(),
        {
          pending: isEditMode
            ? "Updating volunteer..."
            : "Creating new volunteer...",
          success: isEditMode
            ? "Volunteer updated successfully!"
            : "Volunteer created successfully!",
          error: isEditMode
            ? "Failed to update volunteer."
            : "Failed to create volunteer.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_VOLUNTEERS]),
      });

      closeDrawer();
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden bg-white min-h-96">
      <h2 className="h-12 bg-black text-primary text-2xl font-semibold flex items-center p-8">
        {isEditMode ? "Edit Volunteer" : "Add New Volunteer"}
      </h2>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode ? "Loading volunteer details..." : "Initializing..."}
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="text-base font-medium text-red-600">
            {(error as Error).message}
          </p>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-black"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <AddVolunteerForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
