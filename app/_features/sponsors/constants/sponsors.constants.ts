import {
  SponsorOpportunity,
  SponsorMetric,
  SponsorBenefit,
  HeroPillar,
} from "../types/sponsors.types";

export const SPONSOR_HERO_PILLARS: HeroPillar[] = [
  {
    id: "culture",
    label: "CULTURE",
    sublabel: "Our Roots",
    iconName: "lotus",
  },
  {
    id: "community",
    label: "COMMUNITY",
    sublabel: "Our Strength",
    iconName: "users",
  },
  {
    id: "music",
    label: "MUSIC",
    sublabel: "Our Expression",
    iconName: "music",
  },
  {
    id: "devotion",
    label: "DEVOTION",
    sublabel: "Our Purpose",
    iconName: "heart",
  },
];

export const SPONSOR_METRICS: SponsorMetric[] = [
  {
    id: "audience",
    value: "3,000+",
    title: "Expected Audience",
    description: "Devotees, families, youth and community leaders.",
    iconName: "users",
  },
  {
    id: "creators",
    value: "200+",
    title: "Creators & Influencers",
    description: "Amplifying your brand across digital platforms.",
    iconName: "sparkles",
  },
  {
    id: "duration",
    value: "5 Hours",
    title: "Live Event Experience",
    description: "Music, Dance, Aarti, Performances & More",
    iconName: "calendar",
  },
  {
    id: "location",
    value: "Delhi NCR",
    title: "Prime Location",
    description: "Easy accessibility and high visibility",
    iconName: "map-pin",
  },
];

export const SPONSOR_QUOTE = {
  text: "When devotion brings people together, brands become part of something bigger than business.",
};

export const SPONSORSHIP_OPPORTUNITIES: SponsorOpportunity[] = [
  {
    id: "presenting-title-partner",
    title: "Presenting / Title Partner",
    categoryName: "Presenting / Title Partner",
    imageSrc: "/home_hero.webp",
    iconName: "crown",
  },
  {
    id: "stage-partner",
    title: "Stage Partner",
    categoryName: "Stage Partner",
    imageSrc: "/event.webp",
    iconName: "stage",
  },
  {
    id: "devotional-music-partner",
    title: "Devotional Music Partner",
    categoryName: "Devotional Music Partner",
    imageSrc: "/artists/sachet_parampara/image1.png",
    iconName: "music",
  },
  {
    id: "aarti-partner",
    title: "Aarti Partner",
    categoryName: "Aarti Partner",
    imageSrc: "/gallery/gallery_3.webp",
    iconName: "flame",
  },
  {
    id: "prasad-partner",
    title: "Prasad Partner",
    categoryName: "Prasad Partner",
    imageSrc: "/festivals/diwali/diwali-1.webp",
    iconName: "bowl",
  },
  {
    id: "food-refreshment-partner",
    title: "Food & Refreshment Partner",
    categoryName: "Food & Refreshment Partner",
    imageSrc: "/festivals/slider/image-1.webp",
    iconName: "coffee",
  },
  {
    id: "water-partner",
    title: "Water Partner",
    categoryName: "Water Partner",
    imageSrc: "/festivals/slider/image-4.webp",
    iconName: "droplet",
  },
  {
    id: "hospitality-partner",
    title: "Hospitality Partner",
    categoryName: "Hospitality Partner",
    imageSrc: "/festivals/dhanteras/dhanteras-1.webp",
    iconName: "bell",
  },
  {
    id: "photography-video-partner",
    title: "Photography & Video Partner",
    categoryName: "Photography & Video Partner",
    imageSrc: "/gallery/gallery_1.webp",
    iconName: "camera",
  },
  {
    id: "creator-influencer-partner",
    title: "Creator / Influencer Partner",
    categoryName: "Creator / Influencer Partner",
    imageSrc: "/artists/hansraj_raghuwanshi/image1.png",
    iconName: "smartphone",
  },
  {
    id: "travel-partner",
    title: "Travel Partner",
    categoryName: "Travel Partner",
    imageSrc: "/festivals/slider/image-2.webp",
    iconName: "plane",
  },
  {
    id: "gift-merchandise-partner",
    title: "Gift / Merchandise Partner",
    categoryName: "Gift / Merchandise Partner",
    imageSrc: "/festivals/diwali/diwali-2.webp",
    iconName: "gift",
  },
  {
    id: "digital-social-media-partner",
    title: "Digital & Social Media Partner",
    categoryName: "Digital & Social Media Partner",
    imageSrc: "/gallery/gallery_2.webp",
    iconName: "monitor",
  },
  {
    id: "supporting-sponsor",
    title: "Supporting Sponsor",
    categoryName: "Supporting Sponsor",
    imageSrc: "/about_mission.webp",
    iconName: "heart",
  },
];

export const SPONSOR_BENEFITS: SponsorBenefit[] = [
  {
    id: "benefit-1",
    title: "Logo on event creatives & promotions",
    iconName: "megaphone",
  },
  {
    id: "benefit-2",
    title: "Presence on stage & LED screens",
    iconName: "tv",
  },
  {
    id: "benefit-3",
    title: "Mentions on social media",
    iconName: "share2",
  },
  {
    id: "benefit-4",
    title: "Stall / display space (as applicable)",
    iconName: "store",
  },
  {
    id: "benefit-5",
    title: "Announcements during the event",
    iconName: "mic",
  },
  {
    id: "benefit-6",
    title: "VIP access and special invites",
    iconName: "star",
  },
  {
    id: "benefit-7",
    title: "Inclusion in post-event content",
    iconName: "video",
  },
];

export const SPONSOR_BUDGET_RANGES = [
  { label: "Select range", value: "" },
  { label: "₹50,000 - ₹1,00,000", value: "50k-1lakh" },
  { label: "₹1,00,000 - ₹2,50,000", value: "1lakh-2.5lakh" },
  { label: "₹2,50,000 - ₹5,00,000", value: "2.5lakh-5lakh" },
  { label: "₹5,00,000 - ₹10,00,000", value: "5lakh-10lakh" },
  { label: "₹10,00,000+", value: "10lakh-plus" },
  { label: "Custom / In-Kind Partnership", value: "custom-in-kind" },
];
