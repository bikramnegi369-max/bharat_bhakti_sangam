import {
  BookingRegistrationTrendData,
  BookingRegistrationTrendInput,
  EventData,
  EventDataInput,
  EventStats,
  EventStatsInput,
  EventStatus,
  EventsApiResponse,
  TotalBookingTrendData,
  TotalBookingTrendInput,
} from "@/_types/dashboard.type";

const EVENT_STATUS_VALUES = new Set<EventStatus>([
  "current",
  "last",
  "earlier",
  "unknown",
]);

function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeText(
  value: string | null | undefined,
  fallback: string,
): string {
  return hasText(value) ? value.trim() : fallback;
}

function normalizeNumber(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function normalizeNumericValue(
  value: string | number | null | undefined,
): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (!hasText(value)) {
    return 0;
  }

  const parsedValue = Number(value.trim().replace(/,/g, ""));

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function normalizeTrendDate(date: string | null | undefined): string {
  if (!hasText(date)) {
    return "";
  }

  const value = date.trim();
  const dateParts = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);

  if (!dateParts) {
    return value;
  }

  const [, day, month, year] = dateParts;

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function normalizeEventStatus(
  status: string | null | undefined,
): EventStatus {
  return EVENT_STATUS_VALUES.has(status as EventStatus)
    ? (status as EventStatus)
    : "unknown";
}

export function normalizeEventStats(
  stats?: EventStatsInput | null,
): EventStats {
  return {
    totalBookings: normalizeNumber(stats?.totalBookings),
    totalRegistrations: normalizeNumber(stats?.totalRegistrations),
    attended: normalizeNumber(stats?.attended),
    barcodeEntry: normalizeNumber(
      stats?.barcodeEntry ?? stats?.barcodeEntries ?? stats?.barcode_entry,
    ),
    attendanceRateDelta: normalizeNumber(stats?.attendanceRateDelta),
  };
}

export function normalizeEventData(
  event: EventDataInput,
  index = 0,
): EventData {
  return {
    id: normalizeText(event.id, `event-${index + 1}`),
    title: normalizeText(event.title, "N/A"),
    date: hasText(event.date) ? event.date.trim() : "",
    venue: normalizeText(event.venue, "N/A"),
    status: normalizeEventStatus(event.status),
    stats: normalizeEventStats(event.stats),
  };
}

export function normalizeEventsData(
  events: EventDataInput[],
): EventsApiResponse {
  return events.map((event, index) => normalizeEventData(event, index));
}

/**
 * Formats an ISO date string to a human-readable form.
 * @example formatDate("2026-06-14") -> "14 June 2026"
 */
export function formatDate(iso?: string | null): string {
  if (!hasText(iso)) return "N/A";

  const parsedDate = new Date(iso);
  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

/**
 * Returns the attendance rate as a formatted string.
 * @example attendanceRateLabel(980, 1090) -> "980 / 1,090"
 */
export function attendanceRateLabel(
  attended?: number | null,
  total?: number | null,
): string {
  const safeAttended = normalizeNumber(attended);
  const safeTotal = normalizeNumber(total);

  return `${safeAttended.toLocaleString("en-IN")} / ${safeTotal.toLocaleString("en-IN")}`;
}

/**
 * Computes the attendance percentage (0-100).
 */
export function attendancePercent(
  attended?: number | null,
  total?: number | null,
): number {
  const safeAttended = normalizeNumber(attended);
  const safeTotal = normalizeNumber(total);

  if (safeTotal <= 0) return 0;

  return Math.min(
    100,
    Math.max(0, Math.round((safeAttended / safeTotal) * 100)),
  );
}

export function normalizeBookingRegistrationTrendData(
  item: BookingRegistrationTrendInput,
  selectedDate: string,
): BookingRegistrationTrendData {
  return {
    eventId: normalizeText(item.eventId, ""),
    eventName: normalizeText(item.eventName || item.title, "Selected Event"),
    date: hasText(item.date) ? item.date.trim() : selectedDate,
    totalBookings: normalizeNumber(
      item.totalBookings ?? item.totalBooking ?? item.bookings,
    ),
    totalRegistrations: normalizeNumber(
      item.totalRegistrations ?? item.totalRegistration ?? item.registrations,
    ),
  };
}

export function normalizeTotalBookingTrendData(
  items: TotalBookingTrendInput[],
): TotalBookingTrendData[] {
  return items
    .map((item) => ({
      date: normalizeTrendDate(item.date),
      totalTickets: normalizeNumericValue(item.totalTickets),
    }))
    .filter((item) => hasText(item.date));
}
