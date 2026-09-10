import { z } from "zod";

export const StatusSchema = z.object({
  videoUrl: z.string().url("Please upload or provide a valid video URL"),
  thumbnailUrl: z.string().url("Invalid thumbnail URL").optional().or(z.literal("")),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "Please provide at least one tag (e.g. Shiva, Krishna, Diwali)"),
});

export type StatusFormData = z.infer<typeof StatusSchema>;
