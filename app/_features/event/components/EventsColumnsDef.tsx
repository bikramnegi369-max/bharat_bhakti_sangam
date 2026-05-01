import { createColumn } from "@/_utils/createColumn";
import { Event } from "../types";
import clsx from "clsx";

const c = createColumn<Event>();

export const EventColumns = [
  c("title", {
    header: "Event Name",
    accessorFn: (row) => row.eventName,
  }),

  c("venue", {
    header: "venue",
    accessorFn: (row) => row.venueName?.venue,
    cell: (value) => (
      <p className="text-sm text-gray-600 line-clamp-2 max-w-75">{value}</p>
    ),
  }),

  c("date", {
    header: "Date",
    accessorFn: (row) => row.date,
    cell: (value) => {
      if (!value) return "N/A";
      const d = new Date(value as string);
      return (
        <span className="text-sm">
          {d.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  }),

  c("sponsors", {
    header: "Sponsors",
    accessorFn: (row) => row.sponsors,
    cell: (value) => {
      if (!value) return "N/A";
      return (
        <div className="flex gap-2">
          {value.map((s, index) => (
            <span
              key={index}
              className="px-2 py-1 border border-[#909090] bg-[#FFF5E1] rounded-md"
            >
              {s}
            </span>
          ))}
        </div>
      );
    },
    enableSorting: false,
  }),
  c("time", {
    header: "Time",
    accessorFn: (row) => {
      if (row.startTime && row.endTime) {
        return `${row.startTime} - ${row.endTime}`;
      }
      return row.startTime || row.time;
    },
    cell: (value) => {
      if (!value) return "N/A";
      return <span className="text-sm">{value as string}</span>;
    },
  }),
  c("category", {
    header: "Category",
    accessorFn: (row) => row.categories,
    cell: (value) => {
      if (!value) return "N/A";
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((c, i) => (
            <span
              key={i}
              className="px-2 py-1 border border-amber-400 bg-amber-50 text-amber-700 rounded-md"
            >
              {c}
            </span>
          ))}
        </div>
      );
    },
  }),
  c("artists", {
    header: "Artists",
    accessorFn: (row) => row.artists,
    cell: (value) => {
      if (!value) return "N/A";
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((a, i) => (
            <span
              key={i}
              className="px-2 py-1 border border-amber-400 bg-amber-50 text-amber-700 rounded-md"
            >
              {a.name}
            </span>
          ))}
        </div>
      );
    },
  }),
  c("isActive", {
    header: "Status",
    accessorFn: (row) => row.isActive,
    cell: (value) => {
      return (
        <span
          className={clsx(
            "px-2 py-1 border rounded-md",
            value
              ? "border-[#00941A] text-[#00941A] bg-[#CAFFD3]"
              : "border-[#535353] text-[#535353] bg-[#E1E1E1]",
          )}
        >
          {value ? "Active" : "Inactive"}
        </span>
      );
    },
  }),
];
