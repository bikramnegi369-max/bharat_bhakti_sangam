export type SanatanaEpochKey =
  | "all"
  | "cosmic-origin"
  | "satya-yuga"
  | "treta-yuga"
  | "dvapara-yuga"
  | "kali-yuga"
  | "modern-revival";

export interface SanatanaEpochFilter {
  id: SanatanaEpochKey;
  label: string;
  sanskritLabel?: string;
  iconName?: string;
}

export interface TimelineNodeItem {
  id: string;
  epochId: SanatanaEpochKey;
  order: number;
  title: string;
  sanskritTitle?: string;
  periodBadge: string;
  category: string;
  description: string;
  scriptureQuote?: {
    verse: string;
    source: string;
  };
  keyPillars?: string[];
  imageUrl: string;
  imageAlt: string;
  featuredDeityOrAvatar?: string;
  significanceTag?: string;
}

export interface EpochSectionData {
  id: SanatanaEpochKey;
  title: string;
  sanskritTitle: string;
  durationLabel: string;
  themeColor: string;
  badgeBg: string;
  badgeBorder: string;
  description: string;
  nodes: TimelineNodeItem[];
}

export interface SanatanaHeroData {
  bannerSubtitle: string;
  sanskritMantra: string;
  heading: string;
  subheading: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  sacredSymbolImage: string;
  stats: {
    value: string;
    label: string;
    sublabel?: string;
  }[];
}
