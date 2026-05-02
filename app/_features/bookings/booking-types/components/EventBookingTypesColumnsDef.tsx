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
    cell: (value) => `$${value}`,
  }),
];
