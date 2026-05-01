"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { ALL_CATEGORIES, EVENT_CATEGORY_BY_ID } from "@/_lib/constants/eventCategories.constants";
import {
  addCategory,
  getCategoryById,
  updateCategory,
} from "../services/eventCategories.service";
import AddEventCategoryForm from "./AddEventCategoryForm";
import { EventCategory } from "@/_types/EventCategories.types";

interface AddEventCategoryModalProps {
  mode?: "create" | "edit";
  categoryId?: string;
}

export default function AddEventCategoryModal({
  mode = "create",
  categoryId,
}: AddEventCategoryModalProps) {
  const queryClient = useQueryClient();
  const { closeModal } = useUI();
  const isEditMode = mode === "edit";

  const {
    data: initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [EVENT_CATEGORY_BY_ID, categoryId],
    queryFn: async () => {
      if (!categoryId) throw new Error("Category ID is required");
      const response = await getCategoryById(categoryId);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to load category details.");
      }
      return response.data;
    },
    enabled: isEditMode && !!categoryId,
  });

  const handleFormSubmit = async (data: Partial<EventCategory>) => {
    try {
      await toast.promise(
        (async () => {
          const result =
            isEditMode && categoryId
              ? await updateCategory(categoryId, data)
              : await addCategory(data);

          if (!result.success) {
            throw new Error(result.error || `Failed to ${mode} category.`);
          }

          return result;
        })(),
        {
          pending: isEditMode
            ? "Updating category..."
            : "Creating new category...",
          success: isEditMode
            ? "Category updated successfully!"
            : "Category created successfully!",
          error: isEditMode
            ? "Failed to update category."
            : "Failed to create category.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_CATEGORIES]),
      });

      closeModal();
    } catch (error) {
      console.error("Error submitting category form:", error);
    }
  };

  return (
    <div className="relative h-full w-full pointer-events-auto flex flex-col overflow-hidden bg-white rounded-xl min-h-96">
      <h2 className="h-12 bg-black text-primary text-xl flex items-center p-8">
        {isEditMode ? "Edit Category" : "Add New Category"}
      </h2>
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm text-slate-500 font-medium animate-pulse">
            {isEditMode ? "Loading category details..." : "Initializing..."}
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
          <AddEventCategoryForm
            handleSubmit={handleFormSubmit}
            initialData={initialData}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
