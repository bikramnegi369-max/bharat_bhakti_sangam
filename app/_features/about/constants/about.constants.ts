import {
  Sparkles,
  CalendarDays,
  Music,
  MapPin,
  HeartHandshake,
  Award,
  Users,
  Building2,
  Smile,
  Radio,
  Target,
  Eye,
  Lightbulb,
  Zap,
} from "lucide-react";
import type {
  MilestoneItem,
  ImpactMetricItem,
  OfferingItem,
  GalleryPhotoItem,
  PillarItem,
} from "../types/about.types";

/**
 * Single Source of Truth for About Us Page Data
 * Follows Open/Closed and DRY principles.
 */

export const ABOUT_HERO_DATA = {
  badge: "ABOUT US",
  titlePart1: "Welcome to",
  titleHighlight: "Bharat Bhakti Sangam",
  description1:
    "We are a vibrant spiritual experience platform dedicated to preserving Sanskrit devotional traditions and uniting young devotees through high-energy bhajans, soulful kirtans, and festive spiritual gatherings.",
  description2:
    "From ancient temples to modern temples, we create moments that inspire, connect, and transform.",
  primaryCta: {
    label: "Explore Events",
    href: "/event",
  },
  secondaryCta: {
    label: "Discover Us",
    href: "#journey",
  },
  heroImage: "/welcome.webp",
  heroImageAlt: "Devotee in prayer at Bharat Bhakti Sangam",
};

export const ABOUT_VISION_DATA = {
  badge: "OUR VISION",
  title: "A Vision Born from Devotion",
  paragraph1:
    "Bharat Bhakti Sangam was born out of a deep desire to build a soulful, connected community where sacred traditions and devotional music find new life in modern times across India.",
  paragraph2:
    "We blend timeless mantras with contemporary energy to create unforgettable gatherings of faith, fellowship, and divine celebration.",
  quote:
    "“Where devotion meets rhythm, faith becomes a joyful celebration of life.”",
  quoteAuthor: "Bharat Bhakti Sangam",
  image: "/about_hero.webp",
  imageAlt: "Ancient Temple roots and sacred architecture",
  pillars: [
    {
      id: "mission-pillar",
      title: "OUR MISSION",
      description:
        "To elevate spiritual energy through soulful bhajans, kirtans, and community connection.",
      icon: Target,
    },
    {
      id: "vision-pillar",
      title: "OUR VISION",
      description:
        "To build India's premier devotional movement unifying souls through faith & rhythm.",
      icon: Eye,
    },
  ] as PillarItem[],
};

export const ABOUT_JOURNEY_MILESTONES: MilestoneItem[] = [
  {
    id: "one-idea",
    title: "ONE IDEA",
    description: "A simple thought to bring devotees together.",
    icon: Lightbulb,
  },
  {
    id: "first-volunteers",
    title: "FIRST VOLUNTEERS",
    description: "A few like-minded people joined hands with one strong belief.",
    icon: HeartHandshake,
  },
  {
    id: "birth-of-bhajan-clubbing",
    title: "BIRTH OF BHAJAN CLUBBING",
    description: "A modern way to spread bhakti through music, energy & unity.",
    icon: Music,
  },
  {
    id: "first-gurgaon-gathering",
    title: "FIRST GURGAON GATHERING",
    description: "Our first event that turned the idea into a beautiful reality.",
    icon: MapPin,
  },
  {
    id: "expanding-across-india",
    title: "EXPANDING ACROSS INDIA",
    description: "More cities, more hearts, more devotion, one mission.",
    icon: Zap,
  },
  {
    id: "building-a-national-movement",
    title: "BUILDING A NATIONAL MOVEMENT",
    description: "A movement that belongs to Bharat, for every Bharatvasi.",
    icon: Building2,
  },
];

export const ABOUT_MISSION_DATA = {
  badge: "OUR MISSION",
  title: "A Mission Born from Devotion",
  paragraph1:
    "Our mission is to create a new-age devotional experience where people can chant, celebrate, connect, and feel spiritual energy together through immersive bhajan clubbing concerts, interactive kirtan sessions, and modern bhakti music festivals across India.",
  paragraph2:
    "We aim to build a community where spirituality feels joyful, inclusive, and alive for everyone, especially the younger generation.",
  quote:
    "“Where devotion meets rhythm, faith becomes a joyful celebration of life.”",
  quoteAuthor: "Bharat Bhakti Sangam",
  image: "/about_mission.webp",
  imageAlt: "Devotees performing evening Ganga Aarti and bhajan celebrations",
};

export const ABOUT_IMPACT_METRICS: ImpactMetricItem[] = [
  {
    id: "events",
    value: "200+",
    label: "Events Organized",
    icon: CalendarDays,
  },
  {
    id: "devotees",
    value: "50,000+",
    label: "Devotees Reached",
    icon: Users,
  },
  {
    id: "artists",
    value: "500+",
    label: "Artists & Performers",
    icon: Music,
  },
  {
    id: "cities",
    value: "100+",
    label: "Cities Impacted",
    icon: Building2,
  },
  {
    id: "satisfaction",
    value: "99%+",
    label: "Devotee Satisfaction",
    icon: Smile,
  },
  {
    id: "sessions",
    value: "300+",
    label: "Live & Virtual Sessions",
    icon: Radio,
  },
];

export const ABOUT_FOUNDER_DATA = {
  quote:
    "Our culture is not just our past—it is our inspiration for the future.",
  bioParagraph:
    "Bharat Bhakti Sangam was born from a simple belief: that devotion can unite and inspire across generations. Our goal is to create safe, sacred, and joyous spaces where faith, spirituality, and modern music harmoniously merge to touch every soul.",
  name: "Deepak Kothari",
  title: "Founder & Spiritual Curator",
  subtitle: "Bharat Bhakti Sangam",
  image: "/founder.webp",
  imageAlt: "Deepak Kothari, Founder of Bharat Bhakti Sangam",
};

export const ABOUT_OFFERINGS: OfferingItem[] = [
  {
    id: "curated-events",
    title: "Curated Events",
    description: "Celebrations with your devotion & authentic festive rites.",
    image: "/festivals/slider/image-1.webp",
    alt: "Curated Devotional Events",
  },
  {
    id: "devotional-music",
    title: "Devotional Music",
    description: "Immerse in soul-stirring bhajans, mantras, and chants.",
    image: "/gallery/gallery_1.webp",
    alt: "Devotional Music Concerts",
  },
  {
    id: "spiritual-gatherings",
    title: "Spiritual Gatherings",
    description: "Kirtans, satsangs, and sacred youth assemblies.",
    image: "/gallery/gallery_2.webp",
    alt: "Spiritual Gatherings",
  },
  {
    id: "community-exchange",
    title: "Community Exchange",
    description: "Connect with like-minded souls across cities.",
    image: "/festivals/slider/image-2.webp",
    alt: "Devotional Community Exchange",
  },
  {
    id: "cultural-celebrations",
    title: "Cultural Celebrations",
    description: "Rich traditional festivals celebrated in full splendor.",
    image: "/gallery/gallery_3.webp",
    alt: "Cultural Celebrations",
  },
  {
    id: "immersive-experiences",
    title: "Immersive Experiences",
    description: "Multi-sensory lighting, sound, and divine vibrations.",
    image: "/festivals/slider/image-4.webp",
    alt: "Immersive Bhakti Experiences",
  },
];

export const ABOUT_GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: "photo-1",
    src: "/temples-images/ayodhya/ayodhya-hero.webp",
    alt: "Aarti by the sacred river ghats at dusk",
    caption: "Sacred Aarti at the Ghats",
  },
  {
    id: "photo-2",
    src: "/gallery/gallery_1.webp",
    alt: "Temple courtyard illuminated at twilight",
    caption: "Twilight Temple Celebrations",
  },
  {
    id: "photo-3",
    src: "/gallery/gallery_2.webp",
    alt: "Devotional choir and musical performances",
    caption: "Live Kirtan Night",
  },
  {
    id: "photo-4",
    src: "/gallery/gallery_3.webp",
    alt: "Sacred darshan and devotees gathered in prayer",
    caption: "Devotional Gathering",
  },
  {
    id: "photo-5",
    src: "/festivals/slider/image-1.webp",
    alt: "Joyous bhajan celebrations and flowers",
    caption: "Maha Bhajan Clubbing Evening",
  },
  {
    id: "photo-6",
    src: "/festivals/slider/image-2.webp",
    alt: "Youth devotees singing together in satsang",
    caption: "Youth Satsang & Chanting",
  },
  {
    id: "photo-7",
    src: "/temples-images/vishwanath/vishwanath-hero.webp",
    alt: "Divine temple architecture and evening lights",
    caption: "Ancient Temple Heritage",
  },
];
