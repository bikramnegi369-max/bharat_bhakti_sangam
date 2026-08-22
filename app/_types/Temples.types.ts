export type TempleMilestone = {
  year: string;
  description: string;
};

export type TempleFeaturePillar = {
  title: string;
  tag: string;
  description: string;
  image: string;
};

export type TempleScheduleItem = {
  title: string;
  time: string;
};

export type TempleTravelGuide = {
  howToReach: string;
  stayAndFood: string;
  dressCode: string;
  bestTimeToVisit: string;
};

export type Temple = {
  slug: string;
  name: string;
  heroImage: string; // URL of the hero & card image for the temple
  description: string;
  descriptionImages: string[]; // Array of 2 image URLs related to the temple's description
  features: {
    title: string;
    featuresList: string[];
    featuresImages: string[]; // Array of 2 image URLs related to the temple's features
  };
  location: {
    title: string;
    description: string;
    locationImages: string[]; // Array of 2 image URLs related to the temple's location
  };
  history: {
    title: string;
    description: string;
    historyImages: string[]; // Array of 2 image URLs related to the temple's history
  };
  bestTimeToVisit: string;
  timings: string;
  entryFee: string;
  // Optional rich configuration fields matching the reference UI
  subtitle?: string;
  deity?: string;
  established?: string;
  rating?: number;
  ratingText?: string;
  significance?: string;
  statsPills?: string[];
  spiritualQuote?: {
    quote: string;
    author: string;
  };
  videoThumbnail?: {
    image: string;
    duration?: string;
    videoUrl?: string;
  };
  timeline?: TempleMilestone[];
  originsParagraphs?: string[];
  facts?: string[];
  factsBookImage?: string;
  featurePillars?: TempleFeaturePillar[];
  schedules?: TempleScheduleItem[];
  scheduleNote?: string;
  travelGuide?: TempleTravelGuide;
  nearbyTempleSlugs?: string[];
};

export type Temples = Temple[];

