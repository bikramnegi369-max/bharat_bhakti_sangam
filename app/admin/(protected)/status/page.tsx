"use client";

import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ActionMenu, { ActionMenuItem } from "@/_components/common/ActionMenu";
import { StatusTable } from "@/_features/status/components/StatusTable";
import AddStatusDrawer from "@/_features/status/components/AddStatusDrawer";
import StatusVideoPreviewModal from "@/_features/status/components/StatusVideoPreviewModal";
import { deleteStatus } from "@/_features/status/services/status.service";
import { ALL_STATUSES } from "@/_lib/constants/status.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { StatusItem } from "@/_types/Status.types";
import useIsMobile from "@/_hooks/useIsMobile";

export default function AdminStatusPage() {
  const queryClient = useQueryClient();
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();
  const [previewStatus, setPreviewStatus] = useState<StatusItem | null>(null);

  const handleAddStatus = useCallback(() => {
    openDrawer(<AddStatusDrawer mode="create" />, {
      size: isMobileView ? "full" : "lg",
      width: isMobileView ? "100%" : "560px",
    });
  }, [openDrawer, isMobileView]);

  const handleDeleteStatus = useCallback(
    async (statusId: string) => {
      try {
        await toast.promise(
          (async () => {
            const result = await deleteStatus(statusId);

            if (!result.success) {
              throw new Error(result.error || "Failed to delete status.");
            }

            return result;
          })(),
          {
            pending: "Deleting status...",
            success: "Status deleted successfully!",
            error: "Failed to delete status.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_STATUSES]),
        });
      } catch (error) {
        console.error("Error deleting status:", error);
      }
    },
    [queryClient],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 transition-all duration-200 active:scale-[0.98] cursor-pointer border border-[#8a1914]"
        onClick={handleAddStatus}
      >
        <Plus size={16} />
        <span>Add Status</span>
      </button>
    ),
    [handleAddStatus],
  );

  const renderActions = useCallback(
    (statusItem: StatusItem) => {
      const items: ActionMenuItem[] = [
        {
          key: "edit",
          label: "Edit",
          icon: <Pencil size={16} />,
          onClick: () =>
            openDrawer(
              <AddStatusDrawer mode="edit" statusId={statusItem._id} />,
              {
                size: isMobileView ? "full" : "lg",
                width: isMobileView ? "100%" : "560px",
              },
            ),
        },
        {
          key: "delete",
          label: "Delete",
          icon: <Trash2 size={16} className="text-rose-600" />,
          onClick: () => handleDeleteStatus(statusItem._id),
          variant: "danger",
        },
      ];

      return <ActionMenu items={items} />;
    },
    [openDrawer, handleDeleteStatus, isMobileView],
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
          Bhakti Status Videos
        </h1>
        <p className="text-xs lg:text-sm text-slate-500">
          Upload and manage vertical 9:16 devotional videos and searchable tags
        </p>
      </div>

      <StatusTable
        filterAction={filterAction}
        renderActions={renderActions}
        onPreviewStatus={setPreviewStatus}
      />

      {/* Video Preview Modal */}
      <StatusVideoPreviewModal
        status={previewStatus}
        onClose={() => setPreviewStatus(null)}
      />
    </section>
  );
}
