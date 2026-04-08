import { createColumn } from "@/_utils/createColumn";
import { Event } from "../types";

const c = createColumn<Event>();

export const EventColumns = [
  c("title", {
    header: "Event Title",
    accessorFn: (row) => row.title,
  }),

  c("description", {
    header: "Description",
    accessorFn: (row) => row.description,
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

  c("day", {
    header: "Day",
    accessorFn: (row) => row.date,
    cell: (value) => {
      if (!value) return "N/A";
      return new Date(value as string).toLocaleDateString("en-IN", {
        weekday: "long",
      });
    },
    enableSorting: false,
  }),
];
