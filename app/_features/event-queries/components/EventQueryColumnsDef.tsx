import { createColumn } from "@/_utils/createColumn";
import { EventQuery } from "@/_types/EventQuery.types";

const c = createColumn<EventQuery>();

export const EventQueryColumns = [
  c("name", {
    header: "Name",
    accessorFn: (row) => row.name || "N/A",
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email,
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.contact || "N/A",
  }),
  c("query", {
    header: "Query",
    accessorFn: (row) => row.query || "N/A",
    enableSorting: false,
    minSize: 240,
  }),
];
