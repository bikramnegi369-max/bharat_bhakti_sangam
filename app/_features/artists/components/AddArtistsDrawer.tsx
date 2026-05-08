"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { ALL_ARTISTS, ARTIST_BY_ID } from "@/_lib/constants/artists.constants";
import {
  addArtist,
  getArtistById,
  updateArtist,
} from "../services/artists.service";
import AddArtistsForm from "./AddArtistsForm";
import { Artist } from "@/_types/Artists.types";

interface AddArtistsDrawerProps {
  mode?: "create" | "edit";
  artistId?: string;
}

export default function AddArtistsDrawer({
  mode = "create",
  artistId,
}: AddArtistsDrawerProps) {
  const queryClient = useQueryClient();
  const { closeDrawer } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [ARTIST_BY_ID, artistId],
    queryFn: async () => {
      if (!artistId) throw new Error("Artist ID is required");
      const response = await getArtistById(artistId);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to load artist details.");
      }
      return response.data;
    },
    enabled: isEditMode && !!artistId,
  });

  const handleFormSubmit = async (data: Partial<Artist>) => {
    try {
      await toast.promise(
        (async () => {
          const result =
            isEditMode && artistId
              ? await updateArtist(artistId, data)
              : await addArtist(data);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} artist.`);
          }

          return result;
        })(),
        {
          pending: isEditMode ? "Updating artist..." : "Creating new artist...",
          success: isEditMode
            ? "Artist updated successfully!"
            : "Artist created successfully!",
          error: isEditMode
            ? "Failed to update artist."
            : "Failed to create artist.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_ARTISTS]),
      });

      closeDrawer();
    } catch (error) {
      console.error("Error submitting artist form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden bg-white min-h-96">
      <h2 className="h-12 bg-black text-primary text-2xl font-semibold flex items-center p-8">
        {isEditMode ? "Edit Artist" : "Add New Artist"}
      </h2>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode ? "Loading artist details..." : "Initializing..."}
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
          <AddArtistsForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
