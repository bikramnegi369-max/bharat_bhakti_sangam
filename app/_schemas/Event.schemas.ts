import { z } from "zod";

export const EventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  eventDescription: z.string().min(1, "Event description is required"),
  venueName: z.string().min(1, "Venue name is required"),
  eventDate: z
    .string()
    .min(1, "Event date is required")
    .transform((val) => new Date(val))
    .pipe(
      z
        .date()
        .min(
          new Date(new Date().setHours(0, 0, 0, 0)),
          "Event date must be in the future",
        ),
    ),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  instruments: z
    .array(z.string())
    .min(1, "At least one instrument is required"),
  hashtags: z.array(z.string()).min(1, "At least one hashtag is required"),
  bookingTypes: z
    .array(z.string())
    .min(1, "At least one booking type is required"),
  sponsors: z.array(z.string()).min(1, "At least one sponsor is required"),
  artists: z.array(z.string()).min(1, "At least one artist is required"),
  totalCapacity: z.coerce.number().min(1, "Total capacity must be at least 1"),
  eventCategories: z
    .array(z.string())
    .min(1, "At least one event category is required"),
  homeBanner: z.string().min(1, "Home banner is required"),
  eventBanner: z.string().min(1, "Event banner is required"),
  ogImage: z.string().min(1, "OG image is required"),
});

export type EventFormInput = z.input<typeof EventSchema>;

export type EventFormData = z.infer<typeof EventSchema>;
