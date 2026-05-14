import z from "zod";

export const EventBookingTypeSchema = z.object({
  bookingType: z.string().min(1, "Booking type is required"),
  price: z.number().min(0, "Price must be a positive number"),
});

export type EventBookingTypeFormData = z.infer<typeof EventBookingTypeSchema>;
