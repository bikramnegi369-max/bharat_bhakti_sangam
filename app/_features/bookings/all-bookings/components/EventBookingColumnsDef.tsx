import { EventBooking } from "@/_types/EventBooking.types";
import { createColumn } from "@/_utils/createColumn";

const c = createColumn<EventBooking>();

export const EventBookingColumns = [
  c("name", {
    header: "Name",
    accessorFn: (row) => row.Name,
  }),
  c("eventName", {
    header: "Event Name",
    accessorFn: (row) => row.eventName,
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email,
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.contact,
  }),
  c("tickets", {
    header: "Tickets",
    accessorFn: (row) => row.tickets,
  }),
];
