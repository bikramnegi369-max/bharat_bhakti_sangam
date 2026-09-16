import { z } from "zod";

export const VideoReviewSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be under 120 characters"),
  reviewerName: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  rating: z.number().min(1, "Rating must be between 1 and 5").max(5, "Rating must be between 1 and 5"),
  highlightVideoSrc: z
    .string()
    .min(1, "Highlight preview video is required for the card loop"),
  videoSrc: z
    .string()
    .min(1, "Full review video is required for modal playback"),
  posterSrc: z.string().optional(),
});

export type VideoReviewFormData = z.infer<typeof VideoReviewSchema>;
