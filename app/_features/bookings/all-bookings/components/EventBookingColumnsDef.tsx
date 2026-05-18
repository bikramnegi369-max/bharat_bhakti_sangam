import { EventBooking } from "@/_types/EventBooking.types";
import { formatLocalizedDateTimeParts } from "@/_lib/helpers";
import { createColumn } from "@/_utils/createColumn";

const c = createColumn<EventBooking>();

export const EventBookingColumns = [
  c("name", {
    header: "Name",
    width: "14%",
    accessorFn: (row) => row.name || "N/A",
  }),
  c("eventName", {
    header: "Event Name",
    width: "18%",
    accessorFn: (row) => row.eventName || "N/A",
  }),
  c("email", {
    header: "Email",
    width: "20%",
    cellClassName: "[overflow-wrap:anywhere]",
    accessorFn: (row) => row.email || "N/A",
  }),
  c("contact", {
    header: "Contact",
    width: "12%",
    accessorFn: (row) => row.contact || "N/A",
  }),
  c("tickets", {
    header: "Tickets",
    width: "8%",
    accessorFn: (row) => row.tickets || "N/A",
  }),
  c("ticketId", {
    header: "Ticket ID",
    width: "12%",
    cellClassName: "[overflow-wrap:anywhere]",
    accessorFn: (row) => row.ticketId || "N/A",
  }),
  c("bookingDate", {
    header: "Booking Date",
    width: "16%",
    accessorFn: (row) => row.bookingDate,
    cell: (value) => {
      if (!value) {
        return "N/A";
      }

      const formattedDateTime = formatLocalizedDateTimeParts(value);

      if (!formattedDateTime) {
        return value;
      }

      return (
        <div className="leading-tight">
          <p>{formattedDateTime.date}</p>
          <p className="mt-1 text-sm text-slate-500">
            {formattedDateTime.time}
          </p>
        </div>
      );
    },
  }),
];
