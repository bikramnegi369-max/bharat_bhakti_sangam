import {
  FounderStat,
  FounderMilestone,
  BehindTheScenesItem,
  CorePillarItem,
  DevotionalMoment,
  MovementActionCard,
} from "../types/founder.types";

export const FOUNDER_DATA = {
  name: "Deepak Kothari",
  role: "Founder & Visionary",
  organization: "Bharat Bhakti Sangam",
  shloka: "धर्मो रक्षति रक्षितः । संघे शक्तिः कलौ युगे । एकत्रित होकर भक्ति का प्रसार करें ।",
  heroQuote: "If music can unite a stadium,\ndevotion can unite a nation.",
  heroImage: "/founder.webp",
  messageImage: "/founder.webp",
  heroSubtitle: "A MESSAGE FROM OUR FOUNDER",
  heroTitle: "ONE VISION.\nMILLIONS OF VOICES.",
  messageHeading: "MY MESSAGE TO YOU",
  messageLead: "Every great movement begins with a pure whisper of the soul.",
  messageParagraphs: [
    "Bharat Bhakti Sangam wasn't born in a corporate boardroom; it was conceived at the sacred riverbanks, in the reverberating chants of thousands of seekers, and from an unshakeable yearning to reconnect modern youth with the eternal energy of Sanatan devotion.",
    "We saw a generation longing for belonging, ecstatic energy, and high-vibe music, yet quietly missing the deep, authentic spiritual anchor that only pure Hari Naam and Vedic vibrations can provide.",
    "Bhajan Clubbing is not simply music—it is a spiritual renaissance. It is a sacred bridge connecting timeless devotion with modern celebration: completely intoxication-free, overflowing with pure divine bliss.",
  ],
};

export const FOUNDER_STATS: FounderStat[] = [
  {
    id: "stat-1",
    iconName: "users",
    value: "2,000+",
    label: "Devotees Reached",
    sublabel: "Across Gatherings",
  },
  {
    id: "stat-2",
    iconName: "calendar",
    value: "200+",
    label: "Spiritual Events",
    sublabel: "Curated Nationwide",
  },
  {
    id: "stat-3",
    iconName: "heart",
    value: "Millions",
    label: "Lives Touched",
    sublabel: "Through Devotion",
  },
  {
    id: "stat-4",
    iconName: "shield",
    value: "1 Mission",
    label: "Uniting Sanatan Dharma",
    sublabel: "One Beat, One Soul",
  },
];

export const FOUNDER_TIMELINE: FounderMilestone[] = [
  {
    year: "2021",
    title: "ONE IDEA",
    description: "A simple thought to bring devotees together.",
    iconName: "idea",
  },
  {
    year: "2022",
    title: "FIRST VOLUNTEERS",
    description: "A few like-minded people joined hands with one strong belief.",
    iconName: "volunteers",
  },
  {
    year: "2023",
    title: "BIRTH OF BHAJAN CLUBBING",
    description: "A modern way to spread bhakti through music, energy & unity.",
    iconName: "music",
  },
  {
    year: "2024",
    title: "FIRST GURGAON GATHERING",
    description: "Our first event that turned the idea into a beautiful reality.",
    iconName: "location",
  },
  {
    year: "2025",
    title: "EXPANDING ACROSS INDIA",
    description: "More cities, more hearts, more devotion, one mission.",
    iconName: "energy",
  },
  {
    year: "2026+",
    title: "BUILDING A NATIONAL MOVEMENT",
    description: "A movement that belongs to Bharat, for every Bharatvasi.",
    iconName: "movement",
  },
];

export const BEHIND_THE_SCENES: BehindTheScenesItem[] = [
  {
    id: "bts-1",
    title: "Soundcheck & Vedic Rhythms",
    category: "Preparation",
    thumbnail: "/event.webp",
    videoUrl: "/hero-video.mp4",
    duration: "02:15",
  },
  {
    id: "bts-2",
    title: "The Pre-Gathering Aarti",
    category: "Sanctity",
    thumbnail: "/about_mission.webp",
    videoUrl: "/hero-video.mp4",
    duration: "03:40",
  },
  {
    id: "bts-3",
    title: "Devotees Uniting in Kirtan",
    category: "Ecstasy",
    thumbnail: "/home_hero.webp",
    videoUrl: "/hero-video.mp4",
    duration: "04:10",
  },
  {
    id: "bts-4",
    title: "Stage Setup & Light Sanctum",
    category: "Production",
    thumbnail: "/contact_hero.webp",
    videoUrl: "/hero-video.mp4",
    duration: "01:50",
  },
  {
    id: "bts-5",
    title: "Volunteer Spirit in Action",
    category: "Seva",
    thumbnail: "/about_hero.webp",
    videoUrl: "/hero-video.mp4",
    duration: "03:05",
  },
  {
    id: "bts-6",
    title: "Midnight Chants & Joy",
    category: "Community",
    thumbnail: "/event.webp",
    videoUrl: "/hero-video.mp4",
    duration: "05:12",
  },
];

export const DEVOTION_HIGHLIGHT = {
  title: "THIS IS WHAT DEVOTION LOOKS LIKE.",
  description:
    "Watch how thousands of young hearts immerse themselves in the divine nectar of Naam Kirtan, experiencing pure joy, elevated consciousness, and transcendent celebration without any substances.",
  ctaLabel: "WATCH FULL FILM",
  videoUrl: "/hero-video.mp4",
  thumbnail: "/home_hero.webp",
  duration: "05:20",
};

export const CORE_PILLARS: CorePillarItem[] = [
  {
    id: "pillar-1",
    title: "WHY BHAJAN CLUBBING?",
    type: "features",
    iconName: "music",
    features: [
      {
        iconName: "music",
        title: "High Energy Beats",
        description: "Live dhol, percussion, basslines & traditional instruments.",
      },
      {
        iconName: "om",
        title: "100% Vedic Mantras",
        description: "Pure sacred chants rooted directly in Vedic scripture.",
      },
      {
        iconName: "users",
        title: "Clean & Sober Space",
        description: "Intoxication-free environment for pure transcendental bliss.",
      },
    ],
  },
  {
    id: "pillar-2",
    title: "VISION 2030",
    type: "vision",
    iconName: "lotus",
    content:
      "To connect and inspire 10 Million young souls globally with the timeless power of Sanatan Bhakti through 1,000+ spiritual music festivals and community kirtan sanctums.",
    quote: "“Rooted in ancient roots, blossoming with modern youth.”",
  },
  {
    id: "pillar-3",
    title: "MY PROMISE",
    type: "promise",
    iconName: "heart",
    content:
      "We will always preserve the sacred authenticity and divine sanctity of our scriptures, while creating the most uplifting, soulful, and unforgettable celebration you have ever experienced.",
    signature: "— Deepak Kothari",
  },
];

export const DEVOTIONAL_MOMENTS: DevotionalMoment[] = [
  {
    id: "moment-1",
    title: "Varanasi Ghat Aarti Night",
    location: "Varanasi, UP",
    thumbnail: "/gallery/gallery_1.webp",
    iconType: "play",
    videoUrl: "/hero-video.mp4",
  },
  {
    id: "moment-2",
    title: "Delhi Youth Bhakti Fest",
    location: "New Delhi",
    thumbnail: "/gallery/gallery_2.webp",
    iconType: "heart",
    videoUrl: "/hero-video.mp4",
  },
  {
    id: "moment-3",
    title: "Vrindavan Ras Kirtan",
    location: "Vrindavan, Mathura",
    thumbnail: "/gallery/gallery_3.webp",
    iconType: "play",
    videoUrl: "/hero-video.mp4",
  },
  {
    id: "moment-4",
    title: "Haridwar Sacred Chants",
    location: "Haridwar, UK",
    thumbnail: "/festivals/slider/image-1.webp",
    iconType: "star",
    videoUrl: "/hero-video.mp4",
  },
  {
    id: "moment-5",
    title: "Maha Shivratri Ecstasy",
    location: "Gurugram, HR",
    thumbnail: "/festivals/slider/image-2.webp",
    iconType: "play",
    videoUrl: "/hero-video.mp4",
  },
];

export const MOVEMENT_ACTION_CARDS: MovementActionCard[] = [
  {
    id: "action-volunteer",
    title: "VOLUNTEER",
    description: "Serve with us and make an impact.",
    iconName: "volunteer",
    ctaLabel: "JOIN NOW",
    ctaHref: "/contact",
  },
  {
    id: "action-partner",
    title: "PARTNER WITH US",
    description: "Let's create divine experiences together.",
    iconName: "partner",
    ctaLabel: "PARTNER NOW",
    ctaHref: "/contact",
  },
  {
    id: "action-influencer",
    title: "BECOME AN INFLUENCER",
    description: "Spread devotion. Inspire millions.",
    iconName: "influencer",
    ctaLabel: "APPLY NOW",
    ctaHref: "/influencer",
  },
  {
    id: "action-sponsor",
    title: "BECOME A SPONSOR",
    description: "Support the movement. Build a legacy.",
    iconName: "sponsor",
    ctaLabel: "SPONSOR NOW",
    ctaHref: "/sponsors",
  },
  {
    id: "action-community",
    title: "JOIN OUR COMMUNITY",
    description: "Be the first to know. Stay connected.",
    iconName: "community",
    ctaLabel: "JOIN NOW",
    ctaHref: "/booking",
  },
];
