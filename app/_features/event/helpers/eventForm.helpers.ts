import { EventFormInput } from "@/_schemas/Event.schemas";
import { Artist } from "@/_types/Artists.types";
import { BookingCategory } from "@/_types/Booking.types";
import { EventCategory } from "@/_types/EventCategories.types";
import { Sponsor } from "@/_types/Sponsors.types";
import { Venue } from "@/_types/Venue.types";
import { EventDetail } from "../types";

export type EventFormOptions = {
  bookingTypes: BookingCategory[];
  sponsors: Sponsor[];
  artists: Artist[];
  categories: EventCategory[];
  venues: Venue[];
};

export function createEmptyEventFormInput(): EventFormInput {
  return {
    eventName: "",
    eventDescription: "",
    venueName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    instruments: [],
    hashtags: [],
    bookingTypes: [],
    sponsors: [],
    artists: [],
    totalCapacity: 0,
    eventCategories: [],
    homeBanner: "",
    eventBanner: "",
    ogImage: "",
  };
}

export function toEventFormInput(initialData?: EventFormInput): EventFormInput {
  return {
    ...createEmptyEventFormInput(),
    ...initialData,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();
  return normalizedValue ? normalizedValue : undefined;
}

function getNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : undefined;
  }

  return undefined;
}

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => getString(item))
    .filter((item): item is string => Boolean(item));
}

function formatDateForInput(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return [
      value.getFullYear(),
      String(value.getMonth() + 1).padStart(2, "0"),
      String(value.getDate()).padStart(2, "0"),
    ].join("-");
  }

  const rawValue = getString(value);

  if (!rawValue) {
    return "";
  }

  const isoDateMatch = rawValue.match(/^(\d{4}-\d{2}-\d{2})/);

  if (isoDateMatch) {
    return isoDateMatch[1];
  }

  const parsedDate = new Date(rawValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return [
    parsedDate.getFullYear(),
    String(parsedDate.getMonth() + 1).padStart(2, "0"),
    String(parsedDate.getDate()).padStart(2, "0"),
  ].join("-");
}

function normalizeTimeToken(value: string): string {
  const normalizedValue = value.trim().replace(/\s+/g, " ");
  const match = normalizedValue.match(
    /^(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$/,
  );

  if (!match) {
    return "";
  }

  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === "PM" && hours < 12) {
    hours += 12;
  }

  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  if (hours > 23) {
    return "";
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

function getTimeRange(detail: EventDetail) {
  const explicitStartTime = getString(detail.startTime);
  const explicitEndTime = getString(detail.endTime);

  if (explicitStartTime || explicitEndTime) {
    const startTime = explicitStartTime
      ? normalizeTimeToken(explicitStartTime)
      : "";
    const endTime = explicitEndTime ? normalizeTimeToken(explicitEndTime) : "";

    return {
      startTime: startTime || endTime,
      endTime: endTime || startTime,
    };
  }

  const combinedTime = getString(detail.time);

  if (!combinedTime) {
    return { startTime: "", endTime: "" };
  }

  const extractedTimes =
    combinedTime.match(/\d{1,2}:\d{2}(?:\s*[AaPp][Mm])?/g) || [];
  const normalizedTimes = extractedTimes
    .map((time) => normalizeTimeToken(time))
    .filter((time): time is string => Boolean(time));

  if (!normalizedTimes.length) {
    return { startTime: "", endTime: "" };
  }

  return {
    startTime: normalizedTimes[0],
    endTime: normalizedTimes[1] || normalizedTimes[0],
  };
}

function resolveOptionId<T extends { _id?: string }>(
  rawValue: unknown,
  options: T[],
  getOptionLabel: (option: T) => string,
  labelFields: string[],
): string | undefined {
  const directValue = getString(rawValue);

  if (directValue) {
    const matchedById = options.find((option) => option._id === directValue);

    if (matchedById?._id) {
      return matchedById._id;
    }

    const normalizedValue = directValue.toLowerCase();
    const matchedByLabel = options.find(
      (option) => getOptionLabel(option).trim().toLowerCase() === normalizedValue,
    );

    if (matchedByLabel?._id) {
      return matchedByLabel._id;
    }
  }

  if (!isRecord(rawValue)) {
    return undefined;
  }

  const directId =
    getString(rawValue._id) ||
    getString(rawValue.id) ||
    getString(rawValue.value);

  if (directId) {
    const matchedById = options.find((option) => option._id === directId);

    if (matchedById?._id) {
      return matchedById._id;
    }
  }

  for (const field of labelFields) {
    const fieldValue = getString(rawValue[field]);

    if (!fieldValue) {
      continue;
    }

    const normalizedValue = fieldValue.toLowerCase();
    const matchedByLabel = options.find(
      (option) => getOptionLabel(option).trim().toLowerCase() === normalizedValue,
    );

    if (matchedByLabel?._id) {
      return matchedByLabel._id;
    }
  }

  return undefined;
}

function resolveOptionIds<T extends { _id?: string }>(
  rawValue: unknown,
  options: T[],
  getOptionLabel: (option: T) => string,
  labelFields: string[],
): string[] {
  const normalizedValues = Array.isArray(rawValue)
    ? rawValue
    : rawValue === undefined || rawValue === null
      ? []
      : [rawValue];

  return normalizedValues
    .map((item) => resolveOptionId(item, options, getOptionLabel, labelFields))
    .filter((item): item is string => Boolean(item));
}

function resolveVenueId(detail: EventDetail, venues: Venue[]): string {
  const venueById = resolveOptionId(detail.venueId, venues, (venue) => venue.venue, [
    "venue",
    "name",
  ]);

  if (venueById) {
    return venueById;
  }

  return (
    resolveOptionId(detail.venueName, venues, (venue) => venue.venue, [
      "venue",
      "name",
    ]) || ""
  );
}

export function mapEventDetailToFormInput(
  detail: EventDetail,
  options: EventFormOptions,
): EventFormInput {
  const { startTime, endTime } = getTimeRange(detail);

  return {
    eventName: getString(detail.eventName) || "",
    eventDescription:
      getString(detail.eventDescription) ||
      getString(detail.description) ||
      "",
    venueName: resolveVenueId(detail, options.venues),
    eventDate: formatDateForInput(detail.eventDate || detail.date),
    startTime,
    endTime,
    instruments: getStringArray(detail.instruments || detail.tabs),
    hashtags: getStringArray(detail.hashtags || detail.hashTags),
    bookingTypes: resolveOptionIds(
      detail.bookingTypes || detail.bookingType,
      options.bookingTypes,
      (bookingType) => bookingType.bookingType,
      ["bookingType", "name"],
    ),
    sponsors: resolveOptionIds(
      detail.sponsors,
      options.sponsors,
      (sponsor) => sponsor.sponsorName,
      ["sponsorName", "name"],
    ),
    artists: resolveOptionIds(
      detail.artists,
      options.artists,
      (artist) => artist.artistName,
      ["artistName", "name"],
    ),
    totalCapacity: getNumber(detail.totalCapacity || detail.maxSeats) || 0,
    eventCategories: resolveOptionIds(
      detail.eventCategories || detail.categories,
      options.categories,
      (category) => category.categoryName,
      ["categoryName", "name"],
    ),
    homeBanner: getString(detail.homeBanner) || "",
    eventBanner: getString(detail.eventBanner) || "",
    ogImage: getString(detail.ogImage) || "",
  };
}
