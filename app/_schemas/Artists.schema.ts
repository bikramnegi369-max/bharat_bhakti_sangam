import z from "zod";

export const ArtistSchema = z.object({
  artistName: z
    .string()
    .trim()
    .min(1, "Artist / Stage name is required")
    .regex(/^[^0-9]*$/, "Artist name should not contain numbers"),
  firstName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s'-]*$/, "First name should only contain letters")
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s'-]*$/, "Last name should only contain letters")
    .optional()
    .or(z.literal("")),
  role: z.string().trim().min(1, "Role is required"),
  email: z.string().trim().email("Enter a valid email"),
  contactNo: z
    .string()
    .trim()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number is too long")
    .regex(/^[0-9]+$/, "Contact number must contain only digits"),
  instruments: z.array(z.string().min(1)).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  profileImage: z.string().min(1, "Profile image is required"),
  galleryImages: z.array(z.string().min(1)).optional(),
  aboutArtist: z.string().trim().min(1, "About artist is required"),
  gender: z.enum(["male", "female", "other"]).optional(),
  address: z
    .object({
      city: z.string().trim().optional().or(z.literal("")),
      state: z.string().trim().optional().or(z.literal("")),
      pincode: z.string().trim().optional().or(z.literal("")),
    })
    .optional(),
  socialLinks: z
    .object({
      instagram: z.string().trim().optional().or(z.literal("")),
      youtube: z.string().trim().optional().or(z.literal("")),
      facebook: z.string().trim().optional().or(z.literal("")),
    })
    .optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});

export type ArtistFormData = z.infer<typeof ArtistSchema>;
