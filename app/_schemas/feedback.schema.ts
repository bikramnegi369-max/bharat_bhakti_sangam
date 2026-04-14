import z from "zod";

const ratingSchema = z
  .number({ error: "Invalid rating" })
  .min(1, "Minimum rating is 1")
  .max(5, "Maximum rating is 5");

export const feedbackSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Name too long"),

  email: z.string().min(1, "Email is required").check(z.email("Invalid email")),

  feedback: z
    .string()
    .min(5, "Feedback must be at least 5 characters")
    .max(1000, "Feedback too long"),

  ratings: z.object({
    food: ratingSchema,
    management: ratingSchema,
    crowd: ratingSchema,
  }),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
