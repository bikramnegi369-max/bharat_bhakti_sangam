import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required")
    .regex(/^[^0-9]*$/, "Full name should not contain numbers"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

  query: z
    .string()
    .min(5, "Query must be at least 5 characters")
    .max(500, "Query must not exceed 500 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
