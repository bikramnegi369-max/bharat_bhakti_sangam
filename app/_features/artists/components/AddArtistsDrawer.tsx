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
import DrawerHeader from "@/_components/common/DrawerHeader";
import AddArtistsForm from "./AddArtistsForm";
import { ArtistFormData } from "@/_schemas/Artists.schema";
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

  const handleFormSubmit = async (formData: ArtistFormData) => {
    try {
      await toast.promise(
        (async () => {
          const socialLinks: Record<string, string> = {};
          if (formData.socialLinks?.instagram?.trim()) {
            socialLinks.instagram = formData.socialLinks.instagram.trim();
          }
          if (formData.socialLinks?.youtube?.trim()) {
            socialLinks.youtube = formData.socialLinks.youtube.trim();
          }
          if (formData.socialLinks?.facebook?.trim()) {
            socialLinks.facebook = formData.socialLinks.facebook.trim();
          }

          const stageName =
            formData.artistName?.trim() ||
            `${formData.firstName?.trim() || ""} ${formData.lastName?.trim() || ""}`.trim() ||
            "Devotional Artist";

          const payload: Partial<Artist> = {
            artistName: stageName,
            firstName: formData.firstName?.trim() || undefined,
            lastName: formData.lastName?.trim() || undefined,
            role: formData.role.trim(),
            email: formData.email.trim(),
            contactNo: formData.contactNo.trim(),
            phone: formData.contactNo.trim(),
            aboutArtist: formData.aboutArtist.trim(),
            profileImage: formData.profileImage,
            gender: formData.gender,
            address: formData.address?.city || formData.address?.state || formData.address?.pincode
              ? {
                  city: formData.address.city?.trim() || "",
                  state: formData.address.state?.trim() || "",
                  pincode: formData.address.pincode?.trim() || "",
                }
              : undefined,
            socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
            instruments: formData.instruments,
            startTime: formData.startTime || undefined,
            endTime: formData.endTime || undefined,
            galleryImages: formData.galleryImages,
            status: formData.status || "approved",
          };

          const result =
            isEditMode && artistId
              ? await updateArtist(artistId, payload)
              : await addArtist(payload);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} artist.`);
          }

          return result;
        })(),
        {
          pending: isEditMode ? "Updating artist..." : "Adding new artist...",
          success: isEditMode
            ? "Artist updated successfully!"
            : "Artist added successfully!",
          error: isEditMode
            ? "Failed to update artist."
            : "Failed to add artist.",
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
      <DrawerHeader
        title={isEditMode ? "Edit Artist" : "Add New Artist"}
        subtitle="Artist Management"
        onClose={closeDrawer}
      />

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
