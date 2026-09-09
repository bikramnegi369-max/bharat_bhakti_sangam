import z from "zod";

export const ArtistSchema = z.object({
  artistName: z
    .string()
    .min(1, "Artist name is required")
    .regex(/^[^0-9]*$/, "Artist name should not contain numbers"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Enter a valid email"),
  contactNo: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Contact number must contain only digits"),
  instruments: z.array(z.string().min(1)).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  profileImage: z.string().min(1, "Profile image is required"),
  galleryImages: z.array(z.string().min(1)).optional(),
  aboutArtist: z.string().min(1, "About artist is required"),
  gender: z.enum(["male", "female", "other"]).optional(),
  address: z
    .object({
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
    })
    .optional(),
  socialLinks: z
    .object({
      instagram: z.string().optional(),
      youtube: z.string().optional(),
      facebook: z.string().optional(),
    })
    .optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});

export type ArtistFormData = z.infer<typeof ArtistSchema>;
