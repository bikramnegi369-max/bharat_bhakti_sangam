export type EventStatus = "current" | "last" | "earlier" | "unknown";

type Nullable<T> = T | null | undefined;

export interface EventStatsInput {
  totalBookings?: Nullable<number>;
  totalRegistrations?: Nullable<number>;
  attended?: Nullable<number>;
  barcodeEntry?: Nullable<number>;
  barcodeEntries?: Nullable<number>;
  barcode_entry?: Nullable<number>;
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
  totalRegistrations: number;
  attended: number;
  barcodeEntry: number;
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

export interface BookingRegistrationTrendInput {
  eventId?: Nullable<string>;
  eventName?: Nullable<string>;
  title?: Nullable<string>;
  date?: Nullable<string>;
  totalBookings?: Nullable<number>;
  totalBooking?: Nullable<number>;
  bookings?: Nullable<number>;
  totalRegistrations?: Nullable<number>;
  totalRegistration?: Nullable<number>;
  registrations?: Nullable<number>;
}

export interface BookingRegistrationTrendData {
  eventId: string;
  eventName: string;
  date: string;
  totalBookings: number;
  totalRegistrations: number;
}

export interface TotalBookingTrendInput {
  date?: Nullable<string>;
  totalTickets?: Nullable<string | number>;
}

export interface TotalBookingTrendData {
  date: string;
  totalTickets: number;
}
