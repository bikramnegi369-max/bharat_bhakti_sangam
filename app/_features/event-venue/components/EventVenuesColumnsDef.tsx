import { Venue } from "@/_types/Venue.types";
import { createColumn } from "@/_utils/createColumn";
import clsx from "clsx";
import Image from "next/image";

const c = createColumn<Venue>();

export const EventVenuesColumns = [
  c("venue", {
    header: "Venue Name",
    accessorFn: (row) => row.venue,
  }),
  c("address", {
    header: "Address",
    accessorFn: (row) => row.address,
  }),
  c("city", {
    header: "City",
    accessorFn: (row) => row.city,
  }),
  c("image", {
    header: "Venue Image",
    accessorFn: (row) => row.image,
    cell: (value) => (
      <div className="bg-gray-200 border-2 rounded-xl w-16 h-16 relative overflow-hidden">
        <Image src={value} alt="venue image" fill unoptimized />
      </div>
    ),
  }),
  c("events", {
    header: "No of Events",
    accessorFn: (row) => row.events,
  }),
  c("isActive", {
    header: "Status",
    accessorFn: (row) => row.isActive,
    cell: (value) => (
      <span
        className={clsx(
          "px-2 py-1 rounded-md text-xs font-medium",
          value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        )}
      >
        {value ? "Active" : "Inactive"}
      </span>
    ),
  }),
];
