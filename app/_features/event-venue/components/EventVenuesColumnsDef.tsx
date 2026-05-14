import { Venue } from "@/_types/Venue.types";
import { createColumn } from "@/_utils/createColumn";
import clsx from "clsx";
import Image from "next/image";

const c = createColumn<Venue>();

export const EventVenuesColumns = [
  c("venue", {
    header: "Venue Name",
    accessorFn: (row) => row.venue || "N/A",
  }),
  c("address", {
    header: "Address",
    accessorFn: (row) => row.address || "N/A",
  }),
  c("city", {
    header: "City",
    accessorFn: (row) => row.city || "N/A",
  }),
  c("image", {
    header: "Venue Image",
    accessorFn: (row) => row.image,
    cell: (value) => {
      if (!value) return "N/A";
      return (
        <div className="bg-gray-200 border-2 rounded-xl w-16 h-16 relative overflow-hidden">
          <Image src={value} alt="venue image" fill unoptimized />
        </div>
      );
    },
  }),
  c("events", {
    header: "No of Events",
    accessorFn: (row) => row.events || "N/A",
  }),
  c("isActive", {
    header: "Status",
    accessorFn: (row) => row.isActive,
    cell: (value) => {
      return (
        <span
          className={clsx(
            "px-2 py-1 rounded-md text-xs font-medium",
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
          )}
        >
          {value ? "Active" : "Inactive"}
        </span>
      );
    },
  }),
];
