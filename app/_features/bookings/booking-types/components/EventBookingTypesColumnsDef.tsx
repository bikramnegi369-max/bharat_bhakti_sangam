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
    accessorFn: (row) => row.features,
    cell: (value) => {
      const perks = Array.isArray(value) ? value.filter((f) => Boolean(f && f.trim())) : [];
      if (perks.length === 0) {
        return <span className="text-gray-400 text-xs italic">No perks</span>;
      }
      return (
        <div className="flex flex-wrap gap-1.5 max-w-md py-1">
          {perks.map((perk, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 leading-tight"
            >
              {perk}
            </span>
          ))}
        </div>
      );
    },
  }),
];
