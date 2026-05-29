import { z } from "zod";

export const adminForgotPasswordSchema = z.object({
  email: z.email("Please enter a valid admin email address"),
});

export type AdminForgotPasswordSchema = z.infer<
  typeof adminForgotPasswordSchema
>;
