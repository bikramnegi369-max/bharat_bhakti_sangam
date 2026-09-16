import { z } from "zod";

export const sponsorEnquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Full name should only contain letters"),
  companyName: z
    .string()
    .trim()
    .min(2, "Company or brand name is required")
    .max(100, "Company name is too long"),
  designation: z
    .string()
    .trim()
    .max(80, "Designation is too long")
    .optional()
    .or(z.literal("")),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\s-]+$/, "Phone number must contain only digits"),
  websiteOrInstagram: z
    .string()
    .trim()
    .max(120, "Website/Instagram is too long")
    .optional()
    .or(z.literal("")),
  sponsorshipInterest: z
    .string()
    .trim()
    .min(1, "Please select your sponsorship interest"),
  estimatedBudgetRange: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  productServiceContribution: z
    .string()
    .trim()
    .max(1000, "Contribution details must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  additionalMessage: z
    .string()
    .trim()
    .max(1500, "Additional message must not exceed 1500 characters")
    .optional()
    .or(z.literal("")),
});

export type SponsorEnquiryFormData = z.infer<typeof sponsorEnquirySchema>;
