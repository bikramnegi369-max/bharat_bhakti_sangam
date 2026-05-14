import Image from "next/image";
import { createColumn } from "@/_utils/createColumn";
import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { formatCalenderEntryDate } from "@/_lib/helpers/calender.helper";

const c = createColumn<CalenderEntry>();

export const CalenderEntryColumns = [
  c("festival", {
    header: "Festival",
    accessorFn: (row) => row.festival || "N/A",
  }),
  c("month", {
    header: "Month",
    accessorFn: (row) => row.month || "N/A",
    cell: (value) => (
      <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
        {String(value || "N/A")}
      </span>
    ),
  }),
  c("day", {
    header: "Day",
    accessorFn: (row) => row.day || "N/A",
    cell: (value) => (
      <span className="inline-flex rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
        {String(value || "N/A")}
      </span>
    ),
  }),
  c("date", {
    header: "Date",
    accessorFn: (row) => row.date || "N/A",
    cell: (value) => formatCalenderEntryDate(String(value || "")),
  }),
  c("image", {
    header: "Image",
    accessorFn: (row) => row.image,
    cell: (value, row) => {
      if (!value) {
        return "N/A";
      }

      return (
        <div className="relative h-16 w-20 overflow-hidden rounded-xl border border-black/10 bg-slate-100">
          <Image
            src={String(value)}
            alt={`${row.festival || "Festival"} image`}
            fill
            unoptimized
            sizes="80px"
            className="object-cover object-center"
          />
        </div>
      );
    },
    enableSorting: false,
  }),
];
