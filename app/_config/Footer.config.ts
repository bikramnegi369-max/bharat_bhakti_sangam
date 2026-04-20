import { FooterConfig } from "@/_types/Footer.types";

export const footerConfig: FooterConfig = {
  logoSrc: "/logoTM.webp",
  logoAlt: "Bharat Bhakti Samaj Logo",

  description:
    "India’s First Devotional Clubbing Experience. Where devotion transforms into celebration and music becomes meditation.",

  socials: [
    {
      platform: "facebook",
      href: "https://www.facebook.com/BharatBhaktiSangam",
      label: "Facebook",
      icon: "/social_media/facebook_logo.png",
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
      platform: "twitter",
      href: "https://x.com/B_BhaktiSangam",
      label: "Twitter",
      icon: "/social_media/twitter_logo.png",
    },
  ],

  navSections: [
    {
      id: "main",
      links: [
        { label: "Home", href: "/" },
        { label: "Events", href: "/event" },
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        // { label: "Sponsors", href: "/sponsors" },
        { label: "Feedback", href: "/feedback" },
      ],
    },
  ],

  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],

  cta: {
    label: "Book Now",
    href: "/booking",
  },

  copyright: `© ${new Date().getFullYear()} Bharat Bhakti Sangam. All rights reserved.`,
};
