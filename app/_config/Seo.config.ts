export const seoConfig = {
  home: {
    path: "/",
    image: "/home_hero.jpg",
    title: "Krishna Bhajan and Kirtan Events in Mumbai",
    description:
      "Discover Bharat Bhakti Sangam, a devotional music platform for Krishna bhajans, kirtan nights, and spiritual events in Mumbai.",
    keywords: [
      "krishna bhajan mumbai",
      "kirtan mumbai",
      "spiritual events mumbai",
    ],
  },
  about: {
    path: "/about",
    image: "/about_hero.jpg",
    title: "About Bharat Bhakti Sangam",
    description:
      "Learn about Bharat Bhakti Sangam, our mission to make devotional music gatherings more accessible, modern, and spiritually meaningful.",
    keywords: [
      "about bharat bhakti sangam",
      "bhajan clubbing mission",
      "devotional music community",
    ],
  },
  contact: {
    path: "/contact",
    image: "/home_hero.jpg",
    title: "Contact Bharat Bhakti Sangam",
    description:
      "Get in touch with Bharat Bhakti Sangam for event details, collaboration opportunities, and spiritual gathering inquiries.",
    keywords: [
      "contact bharat bhakti sangam",
      "event inquiry",
      "spiritual event contact",
    ],
  },
  event: {
    path: "/event",
    image: "/event.jpg",
    title: "Latest Event",
    description:
      "Explore the latest devotional event from Bharat Bhakti Sangam.",
    keywords: [
      "krishna event mumbai",
      "bhajan concert mumbai",
    ],
  },
  booking: {
    path: "/booking",
    image: "/event.jpg",
    title: "Event Booking",
    description: "Book tickets for the latest Bharat Bhakti Sangam event.",
    keywords: [
      "bhajan event booking",
      "iskcon juhu event tickets",
    ],
  },
  feedback: {
    path: "/feedback",
    image: "/event.jpg",
    noIndex: true,
    title: "Event Feedback",
    description:
      "Share your feedback for the latest Bharat Bhakti Sangam event.",
    keywords: [
      "event feedback",
      "devotional event feedback",
    ],
  },
  sponsors: {
    path: "/sponsors",
    noIndex: true,
    title: "Sponsors",
    description:
      "Sponsorship information for Bharat Bhakti Sangam will be available soon.",
    keywords: [
      "bharat bhakti sangam sponsors",
      "event sponsorship",
    ],
  },
} as const;

export type SeoPageKey = keyof typeof seoConfig;

export function getSeoKeywords(
  page: SeoPageKey,
  dynamicKeywords: string[] = [],
) {
  return [...seoConfig[page].keywords, ...dynamicKeywords];
}

export function getSeoPageConfig(
  page: SeoPageKey,
  overrides?: Partial<{
    path: string;
    image: string;
    noIndex: boolean;
    title: string;
    description: string;
    keywords: string[];
  }>,
) {
  return {
    ...seoConfig[page],
    ...overrides,
    keywords: overrides?.keywords ?? seoConfig[page].keywords,
  };
}
