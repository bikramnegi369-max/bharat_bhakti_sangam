import z from "zod";

export const ArtistSchema = z.object({
  artistName: z
    .string()
    .min(1, "Artist name is required")
    .regex(/^[^0-9]*$/, "Artist name should not contain numbers"),
  role: z.string().min(1, "Role is required"),
  email: z.email("Enter a valid email"),
  contactNo: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^[0-9]+$/, "Contact number must contain only digits"),
  instruments: z
    .array(z.string().min(1))
    .min(1, "At least one instrument is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  profileImage: z.string().min(1, "Profile image is required"),
  galleryImages: z
    .array(z.string().min(1, "Image is required"))
    .min(1, "At least one gallery image is required"),
  aboutArtist: z.string().min(1, "About artist is required"),
});

export type ArtistFormData = z.infer<typeof ArtistSchema>;
