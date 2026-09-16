"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Eye,
  CheckCircle2,
  PhoneCall,
  XCircle,
  Trash2,
  Handshake,
} from "lucide-react";
import ActionMenu, { ActionMenuItem } from "@/_components/common/ActionMenu";
import { SponsorEnquiryTable } from "@/_features/sponsors/components/admin/SponsorEnquiryTable";
import { SponsorEnquiryDetailsModal } from "@/_features/sponsors/components/admin/SponsorEnquiryDetailsModal";
import {
  updateSponsorEnquiryStatus,
  deleteSponsorEnquiry,
} from "@/_features/sponsors/services/sponsors.service";
import { ALL_SPONSOR_ENQUIRIES } from "@/_lib/constants/sponsor.constants";
import { useUI } from "@/providers/UIProvider";
import { getTableQueryKeyPrefix } from "@/_utils/queryKey";
import {
  SponsorEnquiryRecord,
  SponsorEnquiryStatus,
} from "@/_types/Sponsors.types";

export default function AdminSponsorsPage() {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useUI();

  const handleUpdateStatus = useCallback(
    async (enquiryId: string, status: SponsorEnquiryStatus) => {
      try {
        await toast.promise(
          (async () => {
            const result = await updateSponsorEnquiryStatus(enquiryId, status);
            if (!result.success) {
              throw new Error(
                result.error || `Failed to update status to ${status}.`,
              );
            }
            return result;
          })(),
          {
            pending: `Updating status to ${status}...`,
            success: `Sponsor inquiry marked as ${status}!`,
            error: `Failed to update status to ${status}.`,
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_SPONSOR_ENQUIRIES]),
        });
      } catch (error) {
        console.error("Status update error:", error);
      }
    },
    [queryClient],
  );

  const handleViewDetails = useCallback(
    (enquiry: SponsorEnquiryRecord) => {
      openModal(
        <SponsorEnquiryDetailsModal
          enquiry={enquiry}
          onClose={closeModal}
          onUpdateStatus={handleUpdateStatus}
        />,
        { size: "xl" },
      );
    },
    [openModal, closeModal, handleUpdateStatus],
  );

  const handleDelete = useCallback(
    async (enquiryId: string) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this sponsorship application?",
      );
      if (!confirmDelete) return;

      try {
        await toast.promise(
          (async () => {
            const result = await deleteSponsorEnquiry(enquiryId);
            if (!result.success) {
              throw new Error(result.error || "Failed to delete application.");
            }
            return result;
          })(),
          {
            pending: "Deleting sponsor application...",
            success: "Sponsor application deleted successfully!",
            error: "Failed to delete application.",
          },
        );

        await queryClient.invalidateQueries({
          queryKey: getTableQueryKeyPrefix([ALL_SPONSOR_ENQUIRIES]),
        });
      } catch (error) {
        console.error("Delete error:", error);
      }
    },
    [queryClient],
  );

  const renderActions = useCallback(
    (row: SponsorEnquiryRecord) => {
      const currentStatus = row.status || "pending";

      const items: ActionMenuItem[] = [
        {
          key: "view-details",
          label: "View Full Details",
          icon: <Eye className="w-4 h-4 text-neutral-600" />,
          onClick: () => handleViewDetails(row),
        },
      ];

      if (currentStatus !== "contacted") {
        items.push({
          key: "mark-contacted",
          label: "Mark as Contacted",
          icon: <PhoneCall className="w-4 h-4 text-blue-600" />,
          onClick: () => handleUpdateStatus(row._id, "contacted"),
        });
      }

      if (currentStatus !== "approved") {
        items.push({
          key: "mark-approved",
          label: "Approve Partnership",
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          onClick: () => handleUpdateStatus(row._id, "approved"),
        });
      }

      if (currentStatus !== "rejected") {
        items.push({
          key: "mark-rejected",
          label: "Reject / Decline",
          icon: <XCircle className="w-4 h-4 text-amber-600" />,
          onClick: () => handleUpdateStatus(row._id, "rejected"),
        });
      }

      items.push({
        key: "delete",
        label: "Delete",
        icon: <Trash2 className="w-4 h-4" />,
        variant: "danger",
        onClick: () => handleDelete(row._id),
      });

      return <ActionMenu items={items} placement="bottom-end" />;
    },
    [handleViewDetails, handleUpdateStatus, handleDelete],
  );

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E86A17] uppercase tracking-wider mb-1">
            <Handshake className="w-4 h-4" />
            <span>Commercial & Brand Partnerships</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Sponsor Enquiries & Applications
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 max-w-2xl">
            Review incoming corporate and brand partnership proposals, track
            contact status, and manage partner pipeline across all festival
            editions.
          </p>
        </div>
      </div>

      {/* Production-grade Data Table */}
      <div className="rounded-xl border border-neutral-200/80 bg-white p-4 sm:p-6 shadow-xs">
        <SponsorEnquiryTable renderActions={renderActions} />
      </div>
    </section>
  );
}

