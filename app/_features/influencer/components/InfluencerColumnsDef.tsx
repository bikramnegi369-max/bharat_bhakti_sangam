import { InfluencerRequest } from "@/_types/Influencer.types";
import { createColumn } from "@/_utils/createColumn";
import clsx from "clsx";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

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

const c = createColumn<InfluencerRequest>();

export const InfluencerColumns = [
  c("profilePicture", {
    header: "Photo",
    accessorFn: (row) => row.profilePicture,
    cell: (value) => {
      if (!value || typeof value !== "string") {
        return (
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
            N/A
          </div>
        );
      }
      return (
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
          <Image
            src={value}
            alt="Influencer avatar"
            fill
            unoptimized
            className="object-cover object-center"
          />
        </div>
      );
    },
  }),
  c("name", {
    header: "Name",
    accessorFn: (row) =>
      `${row.firstName || ""} ${row.lastName || ""}`.trim() || "N/A",
    cell: (_value, row) => (
      <div>
        <div className="font-semibold text-slate-800">
          {row.firstName} {row.lastName}
        </div>
        {row.gender && (
          <span className="text-[11px] uppercase tracking-wider text-slate-400">
            {row.gender}
          </span>
        )}
      </div>
    ),
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.email || row.phone || "N/A",
    cell: (_value, row) => (
      <div className="space-y-1 text-xs text-slate-600">
        {row.email && (
          <div className="flex items-center gap-1.5">
            <Mail size={13} className="text-slate-400 shrink-0" />
            <span className="truncate max-w-44">{row.email}</span>
          </div>
        )}
        {row.phone && (
          <div className="flex items-center gap-1.5">
            <Phone size={13} className="text-slate-400 shrink-0" />
            <span>+91 {row.phone}</span>
          </div>
        )}
      </div>
    ),
  }),
  c("location", {
    header: "Location",
    accessorFn: (row) =>
      row.address ? `${row.address.city}, ${row.address.state}` : "N/A",
    cell: (_value, row) => {
      if (!row.address || (!row.address.city && !row.address.state)) {
        return "N/A";
      }
      return (
        <div className="flex items-start gap-1 text-xs text-slate-600">
          <MapPin size={13} className="text-slate-400 shrink-0 mt-0.5" />
          <span>
            {row.address.city}
            {row.address.state ? `, ${row.address.state}` : ""}
            {row.address.pincode ? ` - ${row.address.pincode}` : ""}
          </span>
        </div>
      );
    },
  }),
  c("socialLinks", {
    header: "Social Profiles",
    accessorFn: (row) => row.socialLinks,
    cell: (value) => {
      const links = value as InfluencerRequest["socialLinks"] | undefined;
      const hasLinks =
        links?.instagram?.trim() ||
        links?.youtube?.trim() ||
        links?.facebook?.trim();

      if (!hasLinks) {
        return <span className="text-xs text-slate-400">None provided</span>;
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
  c("status", {
    header: "Status",
    accessorFn: (row) => row.status || "pending",
    cell: (value) => {
      const rawStatus = (
        typeof value === "string" ? value : "pending"
      ).toLowerCase();
      const isApproved = rawStatus === "approved" || rawStatus === "active";
      const isRejected = rawStatus === "rejected";

      return (
        <span
          className={clsx(
            "px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
            isApproved &&
              "bg-emerald-100 text-emerald-800 border border-emerald-200",
            isRejected && "bg-rose-100 text-rose-800 border border-rose-200",
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
