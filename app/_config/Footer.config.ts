import { FooterConfig } from "@/_types/Footer.types";
import { routes } from "./Routes.config";

export const footerConfig: FooterConfig = {
  logoSrc: "/logoTM.png",
  logoAlt: "Bharat Bhakti Sangam Logo",

  description:
    "Uniting hearts in devotion and preserving our rich cultural heritage for generations to come.",

  socials: [
    {
      platform: "whatsapp",
      href: "https://wa.me/918796086743",
      label: "WhatsApp",
      icon: "",
    },
    {
      platform: "instagram",
      href: "https://www.instagram.com/bharatbhaktisangam",
      label: "Instagram",
      icon: "/social_media/instagram_logo.png",
    },
    {
      platform: "youtube",
      href: "https://www.youtube.com/@Bharat.Bhakti.Sangam",
      label: "YouTube",
      icon: "/social_media/youtube_logo.png",
    },
    {
      platform: "facebook",
      href: "https://www.facebook.com/BharatBhaktiSangam",
      label: "Facebook",
      icon: "/social_media/facebook_logo.png",
    },
    {
      platform: "twitter",
      href: "https://x.com/B_BhaktiSangam",
      label: "Twitter / X",
      icon: "/social_media/twitter_logo.png",
    },
  ],

  quickLinks: [
    { label: "Home", href: routes.home },
    { label: "Events", href: routes.event },
    { label: "Famous Temples", href: routes.famousTemples },
    { label: "Festivals", href: routes.festivals },
    { label: "Sanatana Dharma", href: routes.sanatanaDharma },
    { label: "Blog", href: routes.blog },
  ],

  importantLinks: [
    { label: "About Us", href: routes.about },
    { label: "Our Founder", href: routes.founders },
    { label: "Sponsors & Partners", href: routes.sponsors },
    { label: "Feedback", href: routes.feedback },
    { label: "Contact Us", href: routes.contact },
    { label: "Privacy Policy", href: routes.privacyPolicy },
    { label: "Terms & Conditions", href: routes.termsAndConditions },
  ],

  contact: {
    companyName: "Bharat Bhakti Sangam",
    legalEntityName: "Bharat Bhakti Collective Ventures Pvt Ltd",
    phone: "+91 87960 86743",
    phoneRaw: "+918796086743",
    email: "contact@bharatbhaktisangam.com",
    addressLines: [
      "Plot No. 190, KH No. 114 1st Floor, Vipin Garden Extn, Gali No. 37, Uttam Nagar,",
      "New Delhi, West Delhi - 110059, Delhi, India",
    ],
  },

  cta: {
    label: "Book Now",
    href: routes.booking,
  },

  copyright: `© ${new Date().getFullYear()} Bharat Bhakti Sangam. All Rights Reserved.`,
  tagline: "Sacred Design for Eternal Devotion",
};

