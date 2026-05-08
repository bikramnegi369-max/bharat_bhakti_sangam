import z from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Valid email is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  tickets: z.number().min(1, "At least one ticket must be booked"),
  ticketType: z.string().min(1),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
