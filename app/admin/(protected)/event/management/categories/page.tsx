"use client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ActionMenu from "@/_components/common/ActionMenu";
import AddEventCategoryModal from "@/_features/event-categories/components/AddEventCategoryModal";
import { EventsCategoriesTable } from "@/_features/event-categories/components/EventCategoriesTable";
import { updateCategoryStatus } from "@/_features/event-categories/services/eventCategories.service";
import { ALL_CATEGORIES } from "@/_lib/constants/eventCategories.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { Ban, Pencil } from "lucide-react";

export default function AdminEventCategoriesPage() {
  const queryClient = useQueryClient();
  const { openModal } = useUI();

  const handleAddEventCategory = () => {
    openModal(<AddEventCategoryModal />, {
      size: "full",
    });
  };

  const handleUpdateEventCategory = async (
    categoryId: string,
    disable: boolean,
  ) => {
    try {
      await toast.promise(
        (async () => {
          const result = await updateCategoryStatus(categoryId, disable);

          if (!result.success) {
            throw new Error(
              result.error || "Failed to update category status.",
            );
          }

          return result;
        })(),
        {
          pending: disable ? "Disabling category..." : "Enabling category...",
          success: disable
            ? "Category disabled successfully!"
            : "Category enabled successfully!",
          error: "Failed to update category status.",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: getTableQueryKeyPrefix([ALL_CATEGORIES]),
      });
    } catch (error) {
      console.error("Error updating category status:", error);
    }
  };

  return (
    <section className="space-y-8">
      <EventsCategoriesTable
        filterAction={
          <button
            className="rounded-md bg-primary px-8 py-2.5 text-sm font-medium text-black cursor-pointer"
            onClick={handleAddEventCategory}
          >
            Add Category
          </button>
        }
        renderActions={(category) => (
          <ActionMenu
            items={[
              {
                key: "edit",
                label: "Edit",
                icon: <Pencil size={16} />,
                onClick: () =>
                  openModal(
                    <AddEventCategoryModal
                      mode="edit"
                      categoryId={category._id}
                    />,
                    {
                      size: "full",
                    },
                  ),
              },
              {
                key: "Disable",
                label: "Disable",
                icon: <Ban size={16} />,
                onClick: () => handleUpdateEventCategory(category._id, true),
              },
              {
                key: "Enable",
                label: "Enable",
                icon: <Ban size={16} />,
                onClick: () => handleUpdateEventCategory(category._id, false),
              },
            ]}
          />
        )}
      />
    </section>
  );
}
