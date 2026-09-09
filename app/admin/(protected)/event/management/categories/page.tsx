"use client";
import { useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ActionMenu from "@/_components/common/ActionMenu";
import AddEventCategoryModal from "@/_features/event-categories/components/AddEventCategoryModal";
import { EventsCategoriesTable } from "@/_features/event-categories/components/EventCategoriesTable";
import { updateCategoryStatus } from "@/_features/event-categories/services/eventCategories.service";
import { ALL_CATEGORIES } from "@/_lib/constants/eventCategories.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { BadgeCheck, Ban, Pencil, Plus } from "lucide-react";
import { EventCategory } from "@/_types/EventCategories.types";

export default function AdminEventCategoriesPage() {
  const queryClient = useQueryClient();
  const { openModal } = useUI();

  const handleAddEventCategory = useCallback(() => {
    openModal(<AddEventCategoryModal mode="create" />, {
      size: "full",
    });
  }, [openModal]);

  const handleUpdateEventCategory = useCallback(
    async (categoryId: string, status: boolean) => {
      try {
        await toast.promise(updateCategoryStatus(categoryId, status), {
          pending: status ? "Disabling category..." : "Enabling category...",
          success: status
            ? "Category disabled successfully!"
            : "Category enabled successfully!",
          error: "Failed to update category status.",
        });

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_CATEGORIES]),
        });
      } catch (error) {
        console.error("Error updating category status:", error);
      }
    },
    [queryClient],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 transition-all duration-200 active:scale-[0.98] cursor-pointer border border-[#8a1914]"
        onClick={handleAddEventCategory}
      >
        <Plus size={16} />
        <span>Add Category</span>
      </button>
    ),
    [handleAddEventCategory],
  );

  const renderActions = useCallback(
    (category: EventCategory) => (
      <ActionMenu
        items={[
          {
            key: "edit",
            label: "Edit",
            icon: <Pencil size={16} />,
            onClick: () =>
              openModal(
                <AddEventCategoryModal mode="edit" categoryId={category._id} />,
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
            icon: <BadgeCheck size={16} />,
            onClick: () => handleUpdateEventCategory(category._id, false),
          },
        ]}
      />
    ),
    [openModal, handleUpdateEventCategory],
  );

  return (
    <section className="space-y-8">
      <EventsCategoriesTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </section>
  );
}
