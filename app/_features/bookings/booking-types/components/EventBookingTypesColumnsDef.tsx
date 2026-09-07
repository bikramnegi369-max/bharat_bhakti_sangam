import { EventBookingType } from "@/_types/EventBookingType.types";
import { createColumn } from "@/_utils/createColumn";

const c = createColumn<EventBookingType>();

export const EventBookingTypesColumns = [
  c("bookingType", {
    header: "Booking Type",
    accessorFn: (row) => row.bookingType,
  }),
  c("price", {
    header: "Price",
    accessorFn: (row) => row.price,
    cell: (value) => `₹ ${value}`,
  }),
  c("isPopular", {
    header: "Popular",
    accessorFn: (row) => (row.isPopular ? "Yes" : "No"),
    cell: (value) =>
      value === "Yes" ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
          ★ Popular
        </span>
      ) : (
        <span className="text-gray-400 text-xs">-</span>
      ),
  }),
  c("features", {
    header: "Perks",
    accessorFn: (row) => (row.features ? row.features.length : 0),
    cell: (value) => (
      <span className="text-xs text-gray-600 font-medium">
        {value} {value === 1 ? "perk" : "perks"}
      </span>
    ),
  }),
];
