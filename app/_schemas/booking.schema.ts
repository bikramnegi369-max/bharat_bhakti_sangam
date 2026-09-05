import z from "zod";

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required")
    .regex(/^[^0-9]*$/, "Full name should not contain numbers"),
  email: z.email("Valid email is required"),
  mobile: z
    .string()
    .min(10, "Valid mobile number is required")
    .regex(/^[0-9]+$/, "Mobile number must contain only digits"),
  tickets: z
    .number()
    .min(1, "At least one ticket must be booked"),
  ticketType: z.string().min(1),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
