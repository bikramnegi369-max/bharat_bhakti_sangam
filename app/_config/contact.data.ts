import { routes } from "./Routes.config";

export interface ContactInfoItem {
  id: string;
  iconType: "address" | "phone" | "email" | "hours";
  title: string;
  lines: Array<{
    text: string;
    href?: string;
    isPrimary?: boolean;
  }>;
}

export interface ContactSubjectOption {
  value: string;
  label: string;
}

export interface OfficeDetailInfo {
  address: string;
  landmark: string;
  hours: string;
  metro: {
    station: string;
    distance: string;
    line: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl: string;
  directionsUrl: string;
  socials: Array<{
    platform: "instagram" | "youtube" | "facebook" | "whatsapp";
    label: string;
    href: string;
  }>;
}

export const contactInfoData: ContactInfoItem[] = [
  {
    id: "office",
    iconType: "address",
    title: "Office Address",
    lines: [
      { text: "Bharat Bhakti Collective Ventures Pvt Ltd" },
      {
        text: "Plot No.190, KH No.114 1st Flr, Vipin Garden Extn, G.No.37, Uttam Nagar,",
      },
      { text: "New Delhi, West Delhi - 110059, Delhi, India" },
    ],
  },
  {
    id: "phone",
    iconType: "phone",
    title: "Call Us",
    lines: [
      { text: "+91 8796086743", href: "tel:+918796086743", isPrimary: true },
    ],
  },
  {
    id: "email",
    iconType: "email",
    title: "Email Us",
    lines: [
      {
        text: "contact@bharatbhaktisangam.com",
        href: "mailto:contact@bharatbhaktisangam.com",
        isPrimary: true,
      },
      {
        text: "bharatbhaktiventures@gmail.com",
        href: "mailto:bharatbhaktiventures@gmail.com",
      },
    ],
  },
  {
    id: "hours",
    iconType: "hours",
    title: "Working Hours",
    lines: [
      { text: "Monday – Saturday: 9:00 AM – 7:00 PM" },
      { text: "Sunday: 10:00 AM – 5:00 PM" },
    ],
  },
];

export const contactSubjectOptions: ContactSubjectOption[] = [
  { value: "event_inquiry", label: "Event Inquiry & Ticketing" },
  { value: "artist_performer", label: "Artist & Performer Collaboration" },
  { value: "volunteer", label: "Devotee & Volunteer Program" },
  { value: "sponsorship", label: "Sponsorship & Partnerships" },
  { value: "general_feedback", label: "General Feedback & Others" },
];

export const officeLocationData: OfficeDetailInfo = {
  address:
    "Plot No.190, KH No.114 1st Flr, Vipin Garden Extn, G.No.37, Uttam Nagar, New Delhi, West Delhi - 110059, Delhi, India",
  landmark: "Near Vipin Garden",
  hours: "Monday – Saturday: 9:00 AM – 7:00 PM",
  metro: {
    station: "Dwarka Mor / Uttam Nagar West",
    line: "Blue Line",
    distance: "750m",
  },
  mapCoordinates: {
    lat: 28.6185,
    lng: 77.0378,
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.384594248882!2d77.0345025!3d28.6225721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04c2780e0c0b%3A0xc3457e4e4a770281!2sVipin%20Garden%2C%20Uttam%20Nagar%2C%20Delhi%2C%20110059!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Vipin+Garden+Uttam+Nagar+Delhi+110059",
  socials: [
    {
      platform: "instagram",
      label: "INSTAGRAM",
      href: "https://www.instagram.com/bharatbhaktisangam",
    },
    {
      platform: "youtube",
      label: "YOUTUBE",
      href: "https://www.youtube.com/@Bharat.Bhakti.Sangam",
    },
    {
      platform: "facebook",
      label: "FACEBOOK",
      href: "https://www.facebook.com/BharatBhaktiSangam",
    },
    {
      platform: "whatsapp",
      label: "WHATSAPP",
      href: "https://wa.me/918796086743",
    },
  ],
};

