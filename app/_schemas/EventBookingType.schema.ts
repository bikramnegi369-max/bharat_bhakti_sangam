import z from "zod";

export const EventBookingTypeSchema = z.object({
  bookingType: z.string().min(1, "Booking type is required"),
  price: z.number().min(0, "Price must be a positive number"),
  subtitle: z.string().optional(),
  isPopular: z.boolean().default(false),
  features: z
    .array(z.string().min(1, "Feature description cannot be empty"))
    .default([]),
});

export type EventBookingTypeFormInput = z.input<typeof EventBookingTypeSchema>;
export type EventBookingTypeFormData = z.infer<typeof EventBookingTypeSchema>;
