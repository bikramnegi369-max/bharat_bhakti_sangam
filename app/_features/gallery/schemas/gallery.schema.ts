import { z } from "zod";

export const GalleryItemSchema = z.object({
  imageUrl: z
    .url("Please provide a valid image URL")
    .min(1, "Gallery image is required"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters"),
  artistName: z
    .string()
    .min(2, "Artist name must be at least 2 characters")
    .max(100, "Artist name cannot exceed 100 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category cannot exceed 50 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location cannot exceed 100 characters"),
  date: z
    .string()
    .min(1, "Event date is required")
    .max(50, "Date cannot exceed 50 characters"),
  likes: z
    .number({ message: "Likes count is required" })
    .min(0, "Likes count cannot be negative"),
  commentsCount: z
    .number({ message: "Comments count is required" })
    .min(0, "Comments count cannot be negative"),
});

export type GalleryItemFormData = z.infer<typeof GalleryItemSchema>;
