import { createColumn } from "@/_utils/createColumn";
import { EventFeedback } from "@/_types/feedback.types";

const c = createColumn<EventFeedback>();

export const EventFeedbackColumns = [
  c("name", {
    header: "Name",
    accessorFn: (row) => row.name,
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email,
  }),
  c("rating", {
    header: "Rating",
    accessorFn: (row) => row.rating,
  }),
  c("feedback", {
    header: "Feedback",
    accessorFn: (row) => row.feedback,
    enableSorting: false,
    minSize: 240,
  }),
];
