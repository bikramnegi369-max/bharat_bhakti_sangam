import z from "zod";

export const VenueSchema = z.object({
  venue: z.string().min(1, "Venue name is required"),
  address: z.string().min(1, "Address is required"),
  image: z.string().min(1, "Image is required"),
  city: z.string().min(1, "City is required"),
});

export type VenueFormData = z.infer<typeof VenueSchema>;
