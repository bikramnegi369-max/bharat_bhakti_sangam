export interface NumerologyHeroData {
  eyebrow: string;
  titleLines: {
    line1: string;
    line2: string;
    line3: string;
  };
  description: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

export interface NumerologyNumberProfile {
  number: number;
  slug: string;
  planet: string;
  deity: string;
  title: string;
  traits: string[];
  element: string;
  gemstone: string;
  luckyColor: string;
  mantra: string;
  description: string;
}


export interface NumerologyFeature {
  id: string;
  title: string;
  description: string;
  iconName: "sparkles" | "compass" | "sun" | "flame" | "shield" | "hash";
}

export interface NumerologyLanguageData {
  eyebrow: string;
  title: {
    line1: string;
    line2: string;
    line3: string;
  };
  paragraphs: string[];
  quote: {
    line1: string;
    line2: string;
  };
  imageSrc: string;
  imageAlt: string;
}

export interface NumerologyJourneyStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  iconName: "user" | "calendar" | "chakra" | "personality" | "purpose" | "growth";
  isHighlighted?: boolean;
}

export interface NumerologyBenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: "brain" | "flame" | "target" | "compass" | "heart" | "award";
}

export interface NumerologyPillarBadge {
  id: string;
  title: string;
  description: string;
  iconName: "user" | "sparkles" | "compass" | "sun";
}


export interface NumerologyBeginJourneyData {
  title: string;
  subtitleLines: string[];
  ctaText: string;
  ctaHref: string;
  bgImageSrc: string;
  bgImageAlt: string;
  pillars: NumerologyPillarBadge[];
}





