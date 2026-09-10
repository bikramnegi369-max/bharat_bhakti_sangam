"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { ALL_STATUSES, STATUS_BY_ID } from "@/_lib/constants/status.constants";
import {
  addStatus,
  getStatusById,
  updateStatus,
} from "@/_features/status/services/status.service";
import DrawerHeader from "@/_components/common/DrawerHeader";
import AddStatusForm from "./AddStatusForm";
import { StatusFormData } from "@/_schemas/Status.schema";
import { extractPublicIdFromUrl } from "@/_lib/helpers";
import { deleteAssetByPublicId } from "@/_services/cloudinary.service";

interface AddStatusDrawerProps {
  mode?: "create" | "edit";
  statusId?: string;
}

export default function AddStatusDrawer({
  mode = "create",
  statusId,
}: AddStatusDrawerProps) {
  const queryClient = useQueryClient();
  const { closeDrawer } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [STATUS_BY_ID, statusId],
    queryFn: async () => {
      if (!statusId) throw new Error("Status ID is required");
      const response = await getStatusById(statusId);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to load status details.");
      }
      return response.data;
    },
    enabled: isEditMode && !!statusId,
  });

  const handleFormSubmit = async (formData: StatusFormData) => {
    try {
      await toast.promise(
        (async () => {
          const result =
            isEditMode && statusId
              ? await updateStatus(statusId, formData)
              : await addStatus(formData);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} status.`);
          }

          // Transaction succeeded: Now safe to clean up replaced/removed assets on Cloudinary
          if (isEditMode && initialData) {
            // 1. If video was changed or removed, clean up old video
            if (
              initialData.videoUrl &&
              formData.videoUrl !== initialData.videoUrl
            ) {
              const oldVideoPublicId = extractPublicIdFromUrl(initialData.videoUrl);
              if (oldVideoPublicId) {
                deleteAssetByPublicId(oldVideoPublicId, "video").catch(console.error);
              }
            }

            // 2. If thumbnail was changed or removed, clean up old thumbnail
            if (
              initialData.thumbnailUrl &&
              formData.thumbnailUrl !== initialData.thumbnailUrl
            ) {
              const oldThumbPublicId = extractPublicIdFromUrl(initialData.thumbnailUrl);
              if (oldThumbPublicId) {
                deleteAssetByPublicId(oldThumbPublicId, "image").catch(console.error);
              }
            }
          }

          return result;
        })(),
        {
          pending: isEditMode
            ? "Updating status..."
            : "Publishing status video...",
          success: isEditMode
            ? "Status updated successfully!"
            : "Status created successfully!",
          error: isEditMode
            ? "Failed to update status."
            : "Failed to create status.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_STATUSES]),
      });

      closeDrawer();
    } catch (error) {
      console.error("Error submitting status form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col bg-white overflow-hidden">
      <DrawerHeader
        title={isEditMode ? "Edit Bhakti Status" : "Add New Bhakti Status"}
        subtitle="Upload vertical reel video & assign tags"
        onClose={closeDrawer}
      />

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode ? "Loading status details..." : "Initializing..."}
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
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="flex-1 min-h-0 relative">
          <AddStatusForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
