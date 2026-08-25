export interface QuickSpecItem {
  label: string;
  value: string;
  iconName: "sun" | "moon" | "flame" | "compass" | "gem" | "calendar" | "shield" | "sparkles" | "hammer" | "droplet" | "wind" | "globe";
}

export interface PersonalityTraitItem {
  title: string;
  description?: string;
}

export interface CompatibilityItem {
  number: number;
  label: string; // e.g. "1, 3, 5, 9"
  relationship: "Harmonious" | "Neutral" | "Challenging" | "Best Match";
  colorBadge: string;
  description?: string;
}

export interface DeitiesGuidanceItem {
  name: string;
  title: string;
  role?: string;
  imageSrc?: string;
}

export interface RemedyItem {
  title: string;
  subtitle?: string;
  iconName: string;
  items: string[];
  highlightText?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NumerologyNumberDetailConfig {
  number: number;
  slug: string; // "number-1"
  title: string; // "THE PIONEER"
  tagline: string; // "Born to Lead, Build, and Inspire"
  description: string;
  heroImageSrc: string;
  heroBgImageSrc: string;
  
  // Hero right side card details
  heroCard: {
    planet: string; // "Surya (Sun)"
    element: string; // "Fire"
    gemstone: string; // "Ruby (Manik)"
    luckyDay: string; // "Sunday"
    deity: string; // "Surya Narayana"
    vibrationLevel?: string; // "High / Solar"
  };

  // Top pill attributes under hero
  heroPills: { label: string; iconName: string }[];

  // Quick horizontal specs bar
  quickSpecs: QuickSpecItem[];

  // Core Insights Section (Layout with Sidebar Navigation)
  understanding: {
    heading: string;
    paragraphs: string[];
    quote: {
      text: string;
      author?: string;
    };
  };

  // Personality Traits
  personality: {
    positiveTraits: PersonalityTraitItem[];
    shadowTraits: PersonalityTraitItem[];
  };

  // Strengths & Weaknesses
  strengthsAndWeaknesses: {
    strengths: string[];
    weaknesses: string[];
    karmicLesson: string;
    bgIllustration?: string;
  };

  // 4 Life Dimensions
  lifeDimensions: {
    professionalLife: {
      title: string;
      description: string;
      careers: string[];
      workStyle: string;
    };
    businessAndEntrepreneurship: {
      title: string;
      description: string;
      luckyDates: number[];
      luckyDays: string[];
      bestSectors: string[];
    };
    wealthAndFinancial: {
      title: string;
      description: string;
      mindset: string;
      financialTips: string[];
      growthPattern: string;
    };
    loveAndRelationships: {
      title: string;
      description: string;
      romanticStyle: string;
      bestMatches: number[];
      challenges: string;
      illustrationSrc?: string;
    };
  };

  // 4 Life Insights / Compatibility Grid
  insightsRow2: {
    relationshipsCard: {
      title: string;
      subtitle: string;
      points: string[];
    };
    compatibilitySummary: {
      title: string;
      matches: { targetNumber: number; relation: string; isGreen?: boolean; isRed?: boolean }[];
    };
    healthGuidance: {
      title: string;
      subtitle: string;
      points: string[];
    };
    growthPractices: {
      title: string;
      subtitle: string;
      points: string[];
    };
  };

  // Ruling Planet & Devotional Guidance Section (Mockup Dark Gold Area)
  rulingPlanet: {
    planetName: string; // "SURYA (THE SUN)"
    subTitle: string;
    description: string;
    attributes: { label: string; value: string }[];
    deities: DeitiesGuidanceItem[];
    devotionalPractices: string[];
  };

  // Sacred Remedies & Factors 4-Column Card
  remedies: {
    mantras: {
      title: string;
      sanskrit: string;
      english: string;
      benefit: string;
      chantCount: string;
    }[];
    luckyNumbers: {
      auspicious: number[];
      favorableDates: number[];
      challengingNumbers: number[];
    };
    luckyElements: {
      luckyColors: string[];
      luckyGems: string[];
      luckyMetals: string[];
      luckyDirection: string;
      rulingDay: string;
    };
    sacredDonation: {
      title: string;
      recommendedItems: string[];
      bestTime: string;
      spiritualSignificance: string;
    };
  };

  // FAQs
  faqs: FaqItem[];
}
