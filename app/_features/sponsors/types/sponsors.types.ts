export interface SponsorOpportunity {
  id: string;
  title: string;
  categoryName: string;
  imageSrc: string;
  iconName:
    | "crown"
    | "stage"
    | "music"
    | "flame"
    | "bowl"
    | "coffee"
    | "droplet"
    | "bell"
    | "camera"
    | "smartphone"
    | "plane"
    | "gift"
    | "monitor"
    | "heart";
}

export interface SponsorMetric {
  id: string;
  value: string;
  title: string;
  description: string;
  iconName: "users" | "sparkles" | "calendar" | "map-pin";
}

export interface SponsorBenefit {
  id: string;
  title: string;
  iconName:
    | "megaphone"
    | "tv"
    | "share2"
    | "store"
    | "mic"
    | "star"
    | "video";
}

export interface HeroPillar {
  id: string;
  label: string;
  sublabel: string;
  iconName: "lotus" | "users" | "music" | "heart";
}

export interface SponsorEnquiryBackendPayload {
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
}
