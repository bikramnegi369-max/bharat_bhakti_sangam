import z from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email"),
  mobile: z.string().min(10, "Invalid number"),
  tickets: z.number().min(1).max(10),
  ticketType: z.enum(["general", "premium"]),
  paymentMethod: z.enum(["upi", "card"]),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
