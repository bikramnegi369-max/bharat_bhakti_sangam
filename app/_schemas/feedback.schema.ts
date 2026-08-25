import z from "zod";

const ratingSchema = z
  .number({ error: "Please select a rating for this category" })
  .min(1, "Please rate at least 1 star")
  .max(5, "Maximum rating is 5 stars");

export const feedbackSchema = z.object({
  fullName: z
    .string()
    .min(1, "Please enter your full name")
    .max(100, "Full name cannot exceed 100 characters")
    .regex(/^[^0-9]*$/, "Full name should only contain letters and spaces"),

  email: z
    .string()
    .min(1, "Please enter your email address")
    .check(z.email("Please provide a valid email address (e.g. name@example.com)")),

  feedback: z
    .string()
    .min(5, "Feedback should be at least 5 characters long")
    .max(1000, "Feedback cannot exceed 1000 characters"),

  ratings: z.object({
    food: ratingSchema,
    management: ratingSchema,
    crowd: ratingSchema,
  }),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
