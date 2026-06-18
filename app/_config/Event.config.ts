/**
 * Configuration for event live status.
 */
export const EVENT_LIVE_CONFIG = {
  defaultLiveStreamUrl: "https://youtube.com/live/HaE2h-di7HA", // Default URL to use if event doesn't specify one
  latestEventEndpoint: "/event/latest",
  // How long before the event to consider "Live" (e.g., 0 for exact start)
  bufferMinutes: 30,
};
