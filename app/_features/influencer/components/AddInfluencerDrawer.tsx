"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import {
  ALL_INFLUENCERS,
  INFLUENCER_BY_ID,
} from "@/_lib/constants/influencer.constants";
import {
  addInfluencerAdmin,
  getInfluencerById,
  updateInfluencer,
} from "../services/influencer.service";
import DrawerHeader from "@/_components/common/DrawerHeader";
import AddInfluencerForm from "./AddInfluencerForm";
import { InfluencerFormData } from "@/_schemas/influencer.schema";

interface AddInfluencerDrawerProps {
  mode?: "create" | "edit";
  influencerId?: string;
}

export default function AddInfluencerDrawer({
  mode = "create",
  influencerId,
}: AddInfluencerDrawerProps) {
  const queryClient = useQueryClient();
  const { closeDrawer } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [INFLUENCER_BY_ID, influencerId],
    queryFn: async () => {
      if (!influencerId) throw new Error("Influencer ID is required");
      const response = await getInfluencerById(influencerId);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to load influencer details.");
      }
      return response.data;
    },
    enabled: isEditMode && !!influencerId,
  });

  const handleFormSubmit = async (formData: InfluencerFormData) => {
    try {
      await toast.promise(
        (async () => {
          const socialLinks: Record<string, string> = {};
          if (formData.instagramProfile?.trim()) {
            socialLinks.instagram = formData.instagramProfile.trim();
          }
          if (formData.youtubeChannel?.trim()) {
            socialLinks.youtube = formData.youtubeChannel.trim();
          }
          if (formData.facebookProfile?.trim()) {
            socialLinks.facebook = formData.facebookProfile.trim();
          }

          const result =
            isEditMode && influencerId
              ? await updateInfluencer(influencerId, {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  phone: formData.phone,
                  email: formData.email,
                  gender: formData.gender,
                  address: formData.address,
                  profilePicture: formData.profilePicture,
                  ...(Object.keys(socialLinks).length > 0 ? { socialLinks } : {}),
                })
              : await addInfluencerAdmin(formData);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} influencer.`);
          }

          return result;
        })(),
        {
          pending: isEditMode
            ? "Updating influencer..."
            : "Adding new influencer...",
          success: isEditMode
            ? "Influencer updated successfully!"
            : "Influencer added successfully!",
          error: isEditMode
            ? "Failed to update influencer."
            : "Failed to add influencer.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_INFLUENCERS]),
      });

      closeDrawer();
    } catch (error) {
      console.error("Error submitting influencer form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden bg-white min-h-96">
      <DrawerHeader
        title={isEditMode ? "Edit Influencer" : "Add New Influencer"}
        subtitle="Influencer Management"
        onClose={closeDrawer}
      />

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode ? "Loading influencer details..." : "Initializing..."}
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
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-black cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <AddInfluencerForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
