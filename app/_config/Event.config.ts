import { LatestEvent } from "@/_features/event/types";

/**
 * Configuration for event live status.
 */
export const EVENT_LIVE_CONFIG = {
  defaultLiveStreamUrl: "https://youtube.com/live/HaE2h-di7HA", // Default URL to use if event doesn't specify one
  latestEventEndpoint: "/event/latest",
  // How long before the event to consider "Live" (e.g., 0 for exact start)
  bufferMinutes: 30,
};

/**
 * Production-grade fallback event when remote API is unreachable or sleeping.
 * Ensures marketing home page, hero, and booking cards always render seamlessly.
 */
export const DEFAULT_FALLBACK_EVENT: LatestEvent = {
  _id: "fallback-latest-event",
  eventName: "Bharat Bhakti Sangam - Grand Kirtan & Bhajan Sandhya",
  description:
    "Join us for an electrifying evening of youth-led bhajans, transcendental kirtans, and divine ecstasy. Experience the ultimate spiritual vibe with pure devotion, music, and community.",
  venueName: {
    _id: "venue-default",
    venue: "Iskcon Auditorium",
    address: "Hare Krishna Land, Juhu, Mumbai, Maharashtra 400049",
  },
  date: "2026-09-15T18:00:00.000Z",
  time: "6:00 PM To 10:00 PM",
  startTime: "6:00 PM",
  endTime: "10:00 PM",
  tabs: ["Kirtan", "Bhajan Clubbing", "Prasadam"],
  hashTags: ["#BhajanClubbing", "#BhaktiVibes", "#KirtanRevolution"],
  bookingType: [
    { _id: "pass-gen", name: "General Pass", price: 0 },
    { _id: "pass-vip", name: "VIP Seating", price: 499 },
  ],
  artists: [
    {
      _id: "art-1",
      name: "BBS Kirtan Collective",
      role: "Lead Vocalists & Instrumentalists",
      ProfileImage: "/our_story_dance.webp",
      about: "A passionate group of youth devotional artists inspiring thousands.",
    },
  ],
  eventBanner: "/our_story_dance.webp",
  homeBanner: "/our_story_dance.webp",
  ogImage: "/ogDefault.png",
  ticketPrice: 0,
  maxSeats: 500,
  bookedSeats: 320,
  availableTickets: 180,
  isActive: true,
};
