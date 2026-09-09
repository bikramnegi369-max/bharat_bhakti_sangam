import { Artist } from "@/_types/Artists.types";
import { createColumn } from "@/_utils/createColumn";
import Image from "next/image";
import clsx from "clsx";
import { Mail, Phone } from "lucide-react";

const c = createColumn<Artist>();

export const EventArtistsColumns = [
  c("profileImage", {
    header: "Profile",
    accessorFn: (row) => row.profileImage,
    cell: (value) => {
      if (!value) {
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
            N/A
          </div>
        );
      }
      return (
        <div className="bg-gray-200 border border-slate-200 rounded-xl w-12 h-12 relative overflow-hidden shadow-xs">
          <Image
            src={value}
            alt="artist profile"
            fill
            sizes="48px"
            unoptimized
            className="object-cover"
          />
        </div>
      );
    },
  }),
  c("artistName", {
    header: "Artist / Stage Name",
    accessorFn: (row) => row.artistName || "N/A",
    cell: (_value, row) => (
      <div>
        <div className="font-semibold text-slate-800">{row.artistName || "N/A"}</div>
        {row.aboutArtist && (
          <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">{row.aboutArtist}</p>
        )}
      </div>
    ),
  }),
  c("role", {
    header: "Role / Genre",
    accessorFn: (row) => row.role || "N/A",
    cell: (value) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
        {value || "Artist"}
      </span>
    ),
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.email || row.contactNo || "N/A",
    cell: (_value, row) => (
      <div className="space-y-1 text-xs text-slate-600">
        {row.email && (
          <div className="flex items-center gap-1.5">
            <Mail size={13} className="text-slate-400 shrink-0" />
            <span className="truncate max-w-40">{row.email}</span>
          </div>
        )}
        {row.contactNo && (
          <div className="flex items-center gap-1.5">
            <Phone size={13} className="text-slate-400 shrink-0" />
            <span>+91 {row.contactNo}</span>
          </div>
        )}
      </div>
    ),
  }),
  c("performanceTime", {
    header: "Set Time",
    accessorFn: (row) =>
      row.startTime && row.endTime ? `${row.startTime} - ${row.endTime}` : "Not Scheduled",
    cell: (_value, row) => {
      if (!row.startTime && !row.endTime) {
        return <span className="text-xs text-slate-400 italic">Not set</span>;
      }
      return (
        <span className="text-xs font-medium text-slate-700">
          {row.startTime} - {row.endTime}
        </span>
      );
    },
  }),
  c("status", {
    header: "Status",
    accessorFn: (row) => row.status || "approved",
    cell: (value) => {
      const rawStatus = (typeof value === "string" ? value : "approved").toLowerCase();
      const isApproved = rawStatus === "approved" || rawStatus === "active";
      const isRejected = rawStatus === "rejected";

      return (
        <span
          className={clsx(
            "px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
            isApproved && "bg-emerald-100 text-emerald-800 border border-emerald-200",
            isRejected && "bg-rose-100 text-rose-800 border border-rose-200",
            !isApproved && !isRejected && "bg-amber-100 text-amber-800 border border-amber-200",
          )}
        >
          {rawStatus}
        </span>
      );
    },
  }),
];
