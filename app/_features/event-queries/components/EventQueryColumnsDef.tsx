import { createColumn } from "@/_utils/createColumn";
import { EventQuery } from "@/_types/EventQuery.types";

const c = createColumn<EventQuery>();

export const EventQueryColumns = [
  c("name", {
    header: "Name",
    accessorFn: (row) => row.name,
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email,
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.contact,
  }),
  c("query", {
    header: "Query",
    accessorFn: (row) => row.query,
    enableSorting: false,
    minSize: 240,
  }),
];
