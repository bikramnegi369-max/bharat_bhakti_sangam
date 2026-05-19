import {
  BookingRegistrationTrendInput,
  RawEventsApiResponse,
} from "@/_types/dashboard.type";

function isNullableString(value: unknown): value is string | null | undefined {
  return value === null || value === undefined || typeof value === "string";
}

function isNullableNumber(value: unknown): value is number | null | undefined {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "number" && Number.isFinite(value))
  );
}

export function isEventStats(data: unknown): data is RawEventsApiResponse {
  if (!Array.isArray(data)) return false;

  return data.every((item) => {
    if (typeof item !== "object" || item === null) return false;

    const { id, title, venue, date, status, stats } = item as Record<
      string,
      unknown
    >;

    if (
      !isNullableString(id) ||
      !isNullableString(title) ||
      !isNullableString(venue) ||
      !isNullableString(status) ||
      !isNullableString(date)
    ) {
      return false;
    }

    if (stats === null || stats === undefined) {
      return true;
    }

    if (typeof stats !== "object") {
      return false;
    }

    const {
      totalBookings,
      attended,
      attendanceRateDelta,
    } = stats as Record<string, unknown>;

    return (
      isNullableNumber(totalBookings) &&
      isNullableNumber(attended) &&
      isNullableNumber(attendanceRateDelta)
    );
  });
}

export function isBookingRegistrationTrendInput(
  data: unknown,
): data is BookingRegistrationTrendInput {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const {
    eventId,
    eventName,
    title,
    date,
    totalBookings,
    totalBooking,
    bookings,
    totalRegistrations,
    totalRegistration,
    registrations,
  } = data as Record<string, unknown>;

  return (
    isNullableString(eventId) &&
    isNullableString(eventName) &&
    isNullableString(title) &&
    isNullableString(date) &&
    isNullableNumber(totalBookings) &&
    isNullableNumber(totalBooking) &&
    isNullableNumber(bookings) &&
    isNullableNumber(totalRegistrations) &&
    isNullableNumber(totalRegistration) &&
    isNullableNumber(registrations)
  );
}
