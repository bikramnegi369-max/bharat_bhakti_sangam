import z from "zod";

export const EventCategorySchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
  picture: z.string().min(1, "Picture is required"),
});

export type EventCategoryFormData = z.infer<typeof EventCategorySchema>;
