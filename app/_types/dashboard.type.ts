export type EventStatus = "current" | "last" | "earlier";

export interface EventStats {
  totalBookings: number;
  attended: number;
  attendanceRateDelta: number; // % change vs last event (positive = up)
}

export interface EventData {
  id: string;
  title: string;
  date: string;
  venue: string;
  status: EventStatus;
  stats: EventStats;
}

export type EventsApiResponse = EventData[];
