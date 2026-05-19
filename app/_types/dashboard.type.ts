export type EventStatus = "current" | "last" | "earlier" | "unknown";

type Nullable<T> = T | null | undefined;

export interface EventStatsInput {
  totalBookings?: Nullable<number>;
  attended?: Nullable<number>;
  attendanceRateDelta?: Nullable<number>;
}

export interface EventDataInput {
  id?: Nullable<string>;
  title?: Nullable<string>;
  date?: Nullable<string>;
  venue?: Nullable<string>;
  status?: Nullable<string>;
  stats?: EventStatsInput | null;
}

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
export type RawEventsApiResponse = EventDataInput[];
