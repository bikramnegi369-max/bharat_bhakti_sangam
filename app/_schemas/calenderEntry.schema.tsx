import z from "zod";
import {
  CALENDER_MONTHS,
  CalendarMonth,
  CALENDER_DAYS,
  CalendarDay,
  normalizeCalenderDateInput,
} from "@/_lib/helpers/calender.helper";

export const CalenderEntrySchema = z.object({
  festival: z.string().trim().min(1, "Festival name is required"),
  image: z.string().trim().min(1, "Festival image is required"),
  month: z
    .string()
    .trim()
    .min(1, "Month is required")
    .refine(
      (value) => CALENDER_MONTHS.includes(value as CalendarMonth),
      "Select a valid month",
    ),
  day: z
    .string()
    .trim()
    .min(1, "Day is required")
    .refine(
      (value) => CALENDER_DAYS.includes(value as CalendarDay),
      "Select a valid day",
    ),
  date: z
    .string()
    .trim()
    .min(1, "Festival date is required")
    .refine((val) => !!normalizeCalenderDateInput(val), "Enter a valid date")
    .transform((val) => normalizeCalenderDateInput(val)),
});

export type CalenderEntryFormData = z.infer<typeof CalenderEntrySchema>;
