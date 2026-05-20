import z from "zod";

export const VolunteerSchema = z.object({
  name: z
    .string()
    .min(1, "Volunteer name is required")
    .regex(/^[^0-9]*$/, "Volunteer name should not contain numbers"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Enter a valid email"),
  contact: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^[0-9]+$/, "Contact number must contain only digits"),
  profilePicture: z.string().min(1, "Profile picture is required"),
});

export type VolunteerFormData = z.infer<typeof VolunteerSchema>;
