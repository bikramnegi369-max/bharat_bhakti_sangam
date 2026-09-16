import { createColumn } from "@/_utils/createColumn";
import { SponsorEnquiryRecord } from "@/_types/Sponsors.types";
import { Mail, Phone, Globe, DollarSign, Calendar } from "lucide-react";
import clsx from "clsx";

const c = createColumn<SponsorEnquiryRecord>();

export const SponsorEnquiryColumns = [
  c("companyName", {
    header: "Company / Brand",
    accessorFn: (row) => row.companyName,
    cell: (_value, row) => (
      <div className="space-y-1">
        <div className="font-bold text-neutral-900 text-sm">
          {row.companyName}
        </div>
        {row.designation && (
          <div className="text-xs text-neutral-500 font-medium">
            {row.designation}
          </div>
        )}
      </div>
    ),
    minSize: 180,
  }),

  c("fullName", {
    header: "Contact Person",
    accessorFn: (row) => row.fullName,
    cell: (_value, row) => (
      <div className="space-y-1">
        <div className="font-semibold text-neutral-800 text-sm">
          {row.fullName}
        </div>
        <div className="flex flex-col gap-0.5 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <Mail className="w-3 h-3 text-neutral-400" />
            <a
              href={`mailto:${row.email}`}
              className="hover:text-[#5A0A06] hover:underline"
            >
              {row.email}
            </a>
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className="w-3 h-3 text-neutral-400" />
            <a
              href={`tel:${row.phone}`}
              className="hover:text-[#5A0A06] hover:underline"
            >
              {row.phone}
            </a>
          </span>
        </div>
      </div>
    ),
    minSize: 200,
  }),

  c("sponsorshipInterest", {
    header: "Sponsorship Interest",
    accessorFn: (row) => row.sponsorshipInterest,
    cell: (value) => (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-[#8C120C] border border-amber-200">
        {String(value || "General")}
      </span>
    ),
    minSize: 170,
  }),

  c("estimatedBudgetRange", {
    header: "Budget / Offering",
    accessorFn: (row) => row.estimatedBudgetRange || row.productServiceContribution,
    cell: (_value, row) => (
      <div className="space-y-1 text-xs">
        {row.estimatedBudgetRange && (
          <div className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <DollarSign className="w-3 h-3" />
            <span>{row.estimatedBudgetRange}</span>
          </div>
        )}
        {row.productServiceContribution && (
          <p className="text-neutral-600 line-clamp-2 max-w-xs" title={row.productServiceContribution}>
            {row.productServiceContribution}
          </p>
        )}
        {!row.estimatedBudgetRange && !row.productServiceContribution && (
          <span className="text-neutral-400 italic">Not specified</span>
        )}
      </div>
    ),
    minSize: 180,
  }),

  c("websiteOrInstagram", {
    header: "Online Presence",
    accessorFn: (row) => row.websiteOrInstagram,
    cell: (value) => {
      if (!value || typeof value !== "string") {
        return <span className="text-neutral-400 text-xs italic">N/A</span>;
      }
      const isUrl = value.startsWith("http://") || value.startsWith("https://");
      const targetUrl = isUrl ? value : `https://${value}`;

      return (
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#E86A17] hover:underline font-medium"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="truncate max-w-36">{value}</span>
        </a>
      );
    },
    minSize: 140,
  }),

  c("additionalMessage", {
    header: "Message",
    accessorFn: (row) => row.additionalMessage || "N/A",
    cell: (value) => (
      <p
        className="text-xs text-neutral-600 max-w-sm line-clamp-2 font-normal"
        title={typeof value === "string" ? value : undefined}
      >
        {typeof value === "string" && value ? value : "No message provided."}
      </p>
    ),
    enableSorting: false,
    minSize: 220,
  }),

  c("status", {
    header: "Status",
    accessorFn: (row) => row.status || "pending",
    cell: (value) => {
      const status = String(value || "pending");
      const isApproved = status === "approved";
      const isContacted = status === "contacted";
      const isRejected = status === "rejected";

      return (
        <span
          className={clsx(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize",
            isApproved && "bg-emerald-100 text-emerald-800 border border-emerald-300",
            isContacted && "bg-blue-100 text-blue-800 border border-blue-300",
            isRejected && "bg-red-100 text-red-800 border border-red-300",
            !isApproved &&
              !isContacted &&
              !isRejected &&
              "bg-amber-100 text-amber-800 border border-amber-300",
          )}
        >
          {status}
        </span>
      );
    },
    minSize: 110,
  }),

  c("createdAt", {
    header: "Date",
    accessorFn: (row) => row.createdAt,
    cell: (value) => {
      if (!value || typeof value !== "string") {
        return <span className="text-neutral-400 text-xs italic">N/A</span>;
      }
      try {
        const dateStr = new Date(value).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return (
          <div className="inline-flex items-center gap-1 text-xs text-neutral-500 font-medium whitespace-nowrap">
            <Calendar className="w-3 h-3 text-neutral-400" />
            <span>{dateStr}</span>
          </div>
        );
      } catch {
        return <span className="text-neutral-400 text-xs">N/A</span>;
      }
    },
    minSize: 120,
  }),
];
