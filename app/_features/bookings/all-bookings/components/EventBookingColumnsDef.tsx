import { EventBooking } from "@/_types/EventBooking.types";
import { createColumn } from "@/_utils/createColumn";

const c = createColumn<EventBooking>();

export const EventBookingColumns = [
  c("name", {
    header: "Name",
    accessorFn: (row) => row.name || "N/A",
  }),
  c("eventName", {
    header: "Event Name",
    accessorFn: (row) => row.eventName || "N/A",
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email || "N/A",
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.contact || "N/A",
  }),
  c("tickets", {
    header: "Tickets",
    accessorFn: (row) => row.tickets || "N/A",
  }),
  c("ticketId", {
    header: "Ticket ID",
    accessorFn: (row) => row.ticketId || "N/A",
  }),
];
