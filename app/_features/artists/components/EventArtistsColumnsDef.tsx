import { Artist } from "@/_types/Artists.types";
import { createColumn } from "@/_utils/createColumn";
import Image from "next/image";
import clsx from "clsx";
import { Mail, Phone, MapPin } from "lucide-react";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const c = createColumn<Artist>();

export const EventArtistsColumns = [
  c("profileImage", {
    header: "Profile",
    accessorFn: (row) => row.profileImage,
    cell: (value) => {
      if (!value || typeof value !== "string") {
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
            N/A
          </div>
        );
      }
      return (
        <div className="bg-gray-100 border border-slate-200 rounded-xl w-12 h-12 relative overflow-hidden shadow-xs">
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
    accessorFn: (row) =>
      row.artistName ||
      `${row.firstName || ""} ${row.lastName || ""}`.trim() ||
      "N/A",
    cell: (_value, row) => {
      const displayName =
        row.artistName ||
        `${row.firstName || ""} ${row.lastName || ""}`.trim() ||
        "N/A";
      const hasSeparateName =
        row.firstName &&
        row.lastName &&
        `${row.firstName} ${row.lastName}`.toLowerCase() !==
          row.artistName.toLowerCase();

      return (
        <div>
          <div className="font-semibold text-slate-800">{displayName}</div>
          {hasSeparateName && (
            <p className="text-[11px] text-slate-400 font-medium">
              {row.firstName} {row.lastName}
            </p>
          )}
          {row.aboutArtist && (
            <p className="text-xs text-slate-500 line-clamp-1 max-w-xs mt-0.5">
              {row.aboutArtist}
            </p>
          )}
        </div>
      );
    },
  }),
  c("role", {
    header: "Role / Genre",
    accessorFn: (row) => row.role || "Artist",
    cell: (value, row) => (
      <div className="flex flex-col gap-1 items-start">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
          {(value as string) || "Artist"}
        </span>
        {row.gender && (
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            {row.gender}
          </span>
        )}
      </div>
    ),
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.email || row.contactNo || row.phone || "N/A",
    cell: (_value, row) => {
      const contactNumber = row.contactNo || row.phone;
      return (
        <div className="space-y-1 text-xs text-slate-600">
          {row.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={13} className="text-slate-400 shrink-0" />
              <span className="truncate max-w-44">{row.email}</span>
            </div>
          )}
          {contactNumber && (
            <div className="flex items-center gap-1.5">
              <Phone size={13} className="text-slate-400 shrink-0" />
              <span>+91 {contactNumber}</span>
            </div>
          )}
        </div>
      );
    },
  }),
  c("location", {
    header: "Location",
    accessorFn: (row) =>
      row.address ? `${row.address.city || ""}, ${row.address.state || ""}` : "N/A",
    cell: (_value, row) => {
      if (!row.address || (!row.address.city && !row.address.state)) {
        return <span className="text-xs text-slate-400">N/A</span>;
      }
      return (
        <div className="flex items-start gap-1 text-xs text-slate-600">
          <MapPin size={13} className="text-slate-400 shrink-0 mt-0.5" />
          <span>
            {row.address.city}
            {row.address.state ? `, ${row.address.state}` : ""}
            {row.address.pincode ? ` (${row.address.pincode})` : ""}
          </span>
        </div>
      );
    },
  }),
  c("socialLinks", {
    header: "Social Profiles",
    accessorFn: (row) => row.socialLinks,
    cell: (value) => {
      const links = value as Artist["socialLinks"] | undefined;
      const hasLinks =
        links?.instagram?.trim() ||
        links?.youtube?.trim() ||
        links?.facebook?.trim();

      if (!hasLinks) {
        return <span className="text-xs text-slate-400">None</span>;
      }

      return (
        <div className="flex items-center gap-2">
          {links?.instagram && (
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
              title="Instagram Profile"
              aria-label="Instagram Profile"
            >
              <InstagramIcon />
            </a>
          )}
          {links?.youtube && (
            <a
              href={links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="YouTube Channel"
              aria-label="YouTube Channel"
            >
              <YoutubeIcon />
            </a>
          )}
          {links?.facebook && (
            <a
              href={links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              title="Facebook Profile"
              aria-label="Facebook Profile"
            >
              <FacebookIcon />
            </a>
          )}
        </div>
      );
    },
  }),
  c("performanceTime", {
    header: "Set Time",
    accessorFn: (row) =>
      row.startTime && row.endTime
        ? `${row.startTime} - ${row.endTime}`
        : "Not Scheduled",
    cell: (_value, row) => {
      if (!row.startTime && !row.endTime) {
        return <span className="text-xs text-slate-400 italic">Not set</span>;
      }
      return (
        <span className="text-xs font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200">
          {row.startTime} - {row.endTime}
        </span>
      );
    },
  }),
  c("status", {
    header: "Status",
    accessorFn: (row) => row.status || "approved",
    cell: (value) => {
      const rawStatus = (
        typeof value === "string" ? value : "approved"
      ).toLowerCase();
      const isApproved = rawStatus === "approved" || rawStatus === "active";
      const isRejected = rawStatus === "rejected";

      return (
        <span
          className={clsx(
            "px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
            isApproved &&
              "bg-emerald-100 text-emerald-800 border border-emerald-200",
            isRejected &&
              "bg-rose-100 text-rose-800 border border-rose-200",
            !isApproved &&
              !isRejected &&
              "bg-amber-100 text-amber-800 border border-amber-200",
          )}
        >
          {rawStatus}
        </span>
      );
    },
  }),
];
