export const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const LATEST_EVENT_REVALIDATE_SECONDS = 300;
export const LATEST_EVENT_TAG = "latest-event";
export const EVENT_CAPACITY_TAG = "latest_event-capacity";

export const CAPACITY_TIMEOUT_MS = 3000;

export type EventCapacity = {
  eventId: string;
  maxSeats: number;
  bookedSeats: number;
  availableTickets: number;
  isSoldOut: boolean;
};
