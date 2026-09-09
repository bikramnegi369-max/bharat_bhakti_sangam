"use client";

import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CheckCircle2, XCircle, Pencil, Plus, Trash2 } from "lucide-react";
import ActionMenu, { ActionMenuItem } from "@/_components/common/ActionMenu";
import { InfluencerTable } from "@/_features/influencer/components/InfluencerTable";
import AddInfluencerDrawer from "@/_features/influencer/components/AddInfluencerDrawer";
import {
  updateInfluencerRequestStatus,
  deleteInfluencer,
} from "@/_features/influencer/services/influencer.service";
import { ALL_INFLUENCERS } from "@/_lib/constants/influencer.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import { InfluencerRequest } from "@/_types/Influencer.types";
import useIsMobile from "@/_hooks/useIsMobile";

export default function AdminInfluencersPage() {
  const queryClient = useQueryClient();
  const { openDrawer } = useUI();
  const isMobileView = useIsMobile();

  const handleAddInfluencer = useCallback(() => {
    openDrawer(<AddInfluencerDrawer mode="create" />, {
      size: isMobileView ? "xl" : "full",
    });
  }, [openDrawer, isMobileView]);

  const handleUpdateStatus = useCallback(
    async (influencerId: string, status: "approved" | "rejected") => {
      try {
        await toast.promise(
          (async () => {
            const result = await updateInfluencerRequestStatus(
              influencerId,
              status,
            );

            if (!result.success) {
              throw new Error(
                result.error || `Failed to update status to ${status}.`,
              );
            }

            return result;
          })(),
          {
            pending:
              status === "approved"
                ? "Approving influencer request..."
                : "Rejecting influencer request...",
            success:
              status === "approved"
                ? "Influencer request approved successfully!"
                : "Influencer request rejected successfully!",
            error: `Failed to ${status} influencer request.`,
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_INFLUENCERS]),
        });
      } catch (error) {
        console.error(`Error updating influencer status to ${status}:`, error);
      }
    },
    [queryClient],
  );

  const handleDeleteInfluencer = useCallback(
    async (influencerId: string) => {
      try {
        await toast.promise(
          (async () => {
            const result = await deleteInfluencer(influencerId);

            if (!result.success) {
              throw new Error(result.error || "Failed to delete influencer.");
            }

            return result;
          })(),
          {
            pending: "Deleting influencer...",
            success: "Influencer deleted successfully!",
            error: "Failed to delete influencer.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_INFLUENCERS]),
        });
      } catch (error) {
        console.error("Error deleting influencer:", error);
      }
    },
    [queryClient],
  );

  const filterAction = useMemo(
    () => (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#740E0A] via-[#85130E] to-[#630B08] px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/25 hover:brightness-110 hover:shadow-md hover:shadow-primary/35 transition-all duration-200 active:scale-[0.98] cursor-pointer border border-[#8a1914]"
        onClick={handleAddInfluencer}
      >
        <Plus size={16} />
        <span>Add Influencer</span>
      </button>
    ),
    [handleAddInfluencer],
  );

  const renderActions = useCallback(
    (influencer: InfluencerRequest) => {
      const status = (influencer.status || "pending").toLowerCase();
      const isApproved = status === "approved" || status === "active";
      const isRejected = status === "rejected";

      const items: ActionMenuItem[] = [
        {
          key: "edit",
          label: "Edit",
          icon: <Pencil size={16} />,
          onClick: () =>
            openDrawer(
              <AddInfluencerDrawer
                mode="edit"
                influencerId={influencer._id}
              />,
              { size: isMobileView ? "xl" : "full" },
            ),
        },
      ];

      if (isApproved) {
        // If approved: show Reject and Edit
        items.push({
          key: "reject",
          label: "Reject",
          icon: <XCircle size={16} className="text-rose-600" />,
          onClick: () => handleUpdateStatus(influencer._id, "rejected"),
        });
      } else if (isRejected) {
        // If rejected: show Approve and Edit
        items.push({
          key: "approve",
          label: "Approve",
          icon: <CheckCircle2 size={16} className="text-emerald-600" />,
          onClick: () => handleUpdateStatus(influencer._id, "approved"),
        });
      } else {
        // Pending or any other initial status: show both Approve and Reject
        items.push(
          {
            key: "approve",
            label: "Approve",
            icon: <CheckCircle2 size={16} className="text-emerald-600" />,
            onClick: () => handleUpdateStatus(influencer._id, "approved"),
          },
          {
            key: "reject",
            label: "Reject",
            icon: <XCircle size={16} className="text-rose-600" />,
            onClick: () => handleUpdateStatus(influencer._id, "rejected"),
          },
        );
      }

      // Add Delete action
      items.push({
        key: "delete",
        label: "Delete",
        icon: <Trash2 size={16} className="text-rose-600" />,
        onClick: () => handleDeleteInfluencer(influencer._id),
        variant: "danger",
      });

      return <ActionMenu items={items} />;
    },
    [openDrawer, handleUpdateStatus, handleDeleteInfluencer, isMobileView],
  );

  return (
    <section className="space-y-8">
      <InfluencerTable
        filterAction={filterAction}
        renderActions={renderActions}
      />
    </section>
  );
}
