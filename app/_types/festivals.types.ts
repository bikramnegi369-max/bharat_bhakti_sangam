export interface FestivalDateBadge {
  day: string;
  month: string;
}

export interface FestivalRitualItem {
  title: string;
  description: string;
}

export interface FestivalFoodItem {
  name: string;
  image?: string;
}

export interface FestivalRegionalCelebration {
  region: string;
  title: string;
  description: string;
}

export interface FestivalMoment {
  title: string;
  image: string;
}

export interface FestivalMetaTag {
  label: string;
  value: string;
}

export interface FestivalSection {
  title: string;
  description: string;
  images: string[];
  descriptionAnchor?: "left" | "right";
  alts?: string[];
}

export interface FestivalDetailData {
  slug: string;
  name: string;
  tagline: string;
  dateBadge: FestivalDateBadge;
  heroImage: string;
  featuredOverviewImage?: string;
  aboutStory: {
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt?: string;
  };
  historyStory: {
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt?: string;
  };
  legendStory?: {
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt?: string;
  };
  rituals: {
    title: string;
    items: FestivalRitualItem[];
    image: string;
    imageAlt?: string;
  };
  traditionalFoods: {
    title: string;
    subtitle?: string;
    items: FestivalFoodItem[];
    showcaseImage: string;
  };
  panoramicBanner?: {
    image: string;
    alt?: string;
  };
  regionalCelebrations?: {
    title: string;
    subtitle?: string;
    items: FestivalRegionalCelebration[];
    image: string;
    imageAlt?: string;
  };
  momentsGallery?: {
    title: string;
    items: FestivalMoment[];
  };
  exploreMoreSlugs: string[];

  // Meta for listing cards
  listingCard: {
    shortDescription: string;
    season: string;
    significance: string;
    region: string;
    category?: string;
  };
}

export type Festival = FestivalSection & {
  slug: string;
  dateBadge?: FestivalDateBadge;
  season?: string;
  significance?: string;
  region?: string;
};
