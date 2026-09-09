import { z } from "zod";

export const artistApplicationSchema = z.object({
  artistName: z
    .string()
    .trim()
    .min(2, "Artist / Stage Name must be at least 2 characters")
    .max(100, "Artist name is too long")
    .optional(),
  role: z
    .string()
    .trim()
    .min(2, "Performance role is required")
    .optional(),
  aboutArtist: z
    .string()
    .trim()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio is too long")
    .optional(),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "First name should only contain letters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name should only contain letters"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  email: z
    .string()
    .trim()
    .email("Invalid email address"),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select your gender",
  }),
  address: z.object({
    city: z
      .string()
      .trim()
      .min(2, "City is required")
      .max(100, "City name is too long"),
    state: z
      .string()
      .trim()
      .min(2, "State is required")
      .max(100, "State name is too long"),
    pincode: z
      .string()
      .trim()
      .min(4, "Pincode is required")
      .max(10, "Invalid pincode length")
      .regex(/^[0-9a-zA-Z\s-]+$/, "Invalid pincode format"),
  }),
  profilePicture: z
    .string()
    .min(1, "Profile picture is required"),
  instagramProfile: z.string().trim().optional(),
  facebookProfile: z.string().trim().optional(),
  youtubeChannel: z.string().trim().optional(),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must confirm that the information provided is accurate",
    }),
});

export type ArtistApplicationFormData = z.infer<typeof artistApplicationSchema>;

export interface ArtistApplicationBackendPayload {
  artistName: string;
  role: string;
  aboutArtist: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactNo: string;
  gender: "male" | "female" | "other";
  address: {
    city: string;
    state: string;
    pincode: string;
  };
  profilePicture: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  status: "pending";
}

