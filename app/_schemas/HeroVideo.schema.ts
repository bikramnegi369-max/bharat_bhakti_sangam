import { z } from "zod";

export const HeroVideoSchema = z.object({
  videoUrl: z
    .string()
    .min(1, "Video URL is required")
    .url("Please provide a valid video URL"),
});

export type HeroVideoFormData = z.infer<typeof HeroVideoSchema>;
