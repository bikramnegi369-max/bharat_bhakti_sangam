import { Artist } from "@/_types/Artists.types";
import { createColumn } from "@/_utils/createColumn";
import Image from "next/image";

const c = createColumn<Artist>();

export const EventArtistsColumns = [
  c("artistName", {
    header: "Artist Name",
    accessorFn: (row) => row.artistName || "N/A",
  }),
  c("role", {
    header: "Role",
    accessorFn: (row) => row.role || "N/A",
  }),
  c("profileImage", {
    header: "Profile",
    accessorFn: (row) => row.profileImage,
    cell: (value) => {
      if (!value) return "N/A";
      return (
        <div className="bg-gray-200 border-2 rounded-xl w-16 h-16 relative overflow-hidden">
          <Image src={value} alt="artist profile" fill unoptimized />
        </div>
      );
    },
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email || "N/A",
  }),
  c("contactNo", {
    header: "Contact",
    accessorFn: (row) => row.contactNo || "N/A",
  }),
  c("performanceTime", {
    header: "Performance Time",
    accessorFn: (row) => row.startTime + " - " + row.endTime || "N/A",
  }),
  c("instruments", {
    header: "Instruments",
    accessorFn: (row) => row.instruments,
    cell: (value) => {
      if (!value) return "N/A";
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((a, i) => (
            <span
              key={i}
              className="px-2 py-1 border border-amber-400 bg-amber-50 text-amber-700 rounded-md"
            >
              {a}
            </span>
          ))}
        </div>
      );
    },
  }),
];
