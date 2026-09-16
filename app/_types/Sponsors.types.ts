export interface Sponsor {
  _id: string;
  sponsorName: string;
  sponsorIcon: string;
}

export type SponsorEnquiryStatus = "pending" | "contacted" | "approved" | "rejected";

export interface SponsorEnquiryRecord {
  _id: string;
  fullName: string;
  companyName: string;
  designation?: string;
  email: string;
  phone: string;
  websiteOrInstagram?: string;
  sponsorshipInterest: string;
  estimatedBudgetRange?: string;
  productServiceContribution?: string;
  additionalMessage?: string;
  status?: SponsorEnquiryStatus;
  createdAt?: string;
  updatedAt?: string;
}
