import { createColumn } from "@/_utils/createColumn";
import { EventFeedback } from "@/_types/feedback.types";

const c = createColumn<EventFeedback>();

export const EventFeedbackColumns = [
  c("name", {
    header: "Name",
    accessorFn: (row) => row.name || "N/A",
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email || "N/A",
  }),
  c("rating", {
    header: "Rating",
    accessorFn: (row) => row.rating || "N/A",
  }),
  c("feedback", {
    header: "Feedback",
    accessorFn: (row) => row.feedback || "N/A",
    enableSorting: false,
    minSize: 240,
  }),
];
