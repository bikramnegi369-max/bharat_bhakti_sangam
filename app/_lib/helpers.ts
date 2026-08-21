import { DropdownOption } from "@/_types/Dropdown";
import { siteConfig } from "@/_config/Site.config";
import { LatestEvent } from "@/_features/event/types";
import { BookingCategory } from "@/_types/Booking.types";

export function isSelected<T>(
  option: DropdownOption<T>,
  selected: DropdownOption<T>[] | DropdownOption<T> | null | undefined,
  multiple: boolean,
) {
  if (multiple) {
    return (
      Array.isArray(selected) &&
      selected.some((item) => item.value === option.value)
    );
  }

  return !Array.isArray(selected) && selected?.value === option.value;
}

export function formatEventDate(date: string) {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(parsedDate);
}

export function formatLocalizedDateTimeParts(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const parsedValue = new Date(value);

  if (Number.isNaN(parsedValue.getTime())) {
    return undefined;
  }

  const dateParts = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).formatToParts(parsedValue);

  const weekday = dateParts.find((part) => part.type === "weekday")?.value;
  const day = dateParts.find((part) => part.type === "day")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;
  const year = dateParts.find((part) => part.type === "year")?.value;

  if (!weekday || !day || !month || !year) {
    return undefined;
  }

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })
    .format(parsedValue)
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

  return {
    date: `${weekday}, ${day} ${month.toLowerCase()}, ${year}`,
    time,
  };
}

/**
 * Parses time strings such as "05:00PM", "5:00 PM", "17:00", "05:00" into total minutes from midnight.
 */
export function parseTimeToMinutes(timeStr?: string | null): number | null {
  if (!timeStr || typeof timeStr !== "string") return null;

  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!match) {
    // Attempt Date object parsing if it's an ISO timestamp
    const parsedDate = new Date(trimmed);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.getHours() * 60 + parsedDate.getMinutes();
    }
    return null;
  }

  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const meridian = match[3]?.toUpperCase();

  if (meridian === "PM" && hours < 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Formats "05:00PM" or "17:00" into a user-friendly "5:00 PM".
 */
export function formatEventTimeString(timeStr?: string | null): string | null {
  if (!timeStr) return null;
  const minutes = parseTimeToMinutes(timeStr);
  if (minutes === null) return timeStr;

  const hours24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const formattedMinutes = mins < 10 ? `0${mins}` : mins;

  return `${hours12}:${formattedMinutes} ${period}`;
}

/**
 * Returns formatted time display object with primaryText (e.g., "5:00 PM - 10:00 PM" or "5:00 PM")
 * and subText (e.g. "(IST)" or "Onwards").
 */
export function formatEventTimeDisplay(event: Partial<LatestEvent>): {
  primaryText: string;
  subText?: string;
} {
  const formattedStart = formatEventTimeString(event.startTime);
  const formattedEnd = formatEventTimeString(event.endTime);

  if (formattedStart && formattedEnd) {
    return {
      primaryText: `${formattedStart} - ${formattedEnd}`,
      subText: "IST",
    };
  }

  if (formattedStart) {
    return {
      primaryText: formattedStart,
      subText: "Onwards",
    };
  }

  if (event.time?.trim()) {
    // Check if event.time already contains a range
    const parts = event.time.split(/[-–—to]+/i).map((s) => s.trim());
    if (parts.length === 2) {
      const p1 = formatEventTimeString(parts[0]) || parts[0];
      const p2 = formatEventTimeString(parts[1]) || parts[1];
      return {
        primaryText: `${p1} - ${p2}`,
        subText: "IST",
      };
    }

    const formatted = formatEventTimeString(event.time);
    return {
      primaryText: formatted || event.time.trim(),
      subText: "Onwards",
    };
  }

  return {
    primaryText: "6:00 PM",
    subText: "Onwards",
  };
}

export function calculateEventDuration(
  event: Partial<LatestEvent>,
): { primaryText: string; subText?: string } {
  // 1. Calculate from startTime and endTime (e.g. "05:00PM" and "10:00PM" or ISO timestamps)
  if (event.startTime && event.endTime) {
    const startMinutes = parseTimeToMinutes(event.startTime);
    const endMinutes = parseTimeToMinutes(event.endTime);

    if (startMinutes !== null && endMinutes !== null) {
      let diff = endMinutes - startMinutes;
      if (diff < 0) diff += 24 * 60; // Rollover past midnight

      if (diff > 0) {
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;

        if (hours > 0 && mins > 0) {
          return { primaryText: `${hours}h ${mins}m`, subText: "(Approx.)" };
        }
        if (hours > 0) {
          return { primaryText: `${hours} ${hours === 1 ? "Hour" : "Hours"}`, subText: "(Approx.)" };
        }
        return { primaryText: `${mins} Minutes`, subText: "(Approx.)" };
      }
    }
  }

  // 2. Try parsing a time range string in event.time (e.g. "05:00PM - 10:00PM" or "6:00 PM - 10:00 PM")
  if (event.time && typeof event.time === "string") {
    const parts = event.time.split(/[-–—to]+/i).map((s) => s.trim());
    if (parts.length === 2) {
      const startMinutes = parseTimeToMinutes(parts[0]);
      const endMinutes = parseTimeToMinutes(parts[1]);

      if (startMinutes !== null && endMinutes !== null) {
        let diff = endMinutes - startMinutes;
        if (diff < 0) diff += 24 * 60; // Rollover past midnight

        const hours = Math.floor(diff / 60);
        const mins = diff % 60;

        if (hours > 0 && mins > 0) {
          return { primaryText: `${hours}h ${mins}m`, subText: "(Approx.)" };
        }
        if (hours > 0) {
          return { primaryText: `${hours} ${hours === 1 ? "Hour" : "Hours"}`, subText: "(Approx.)" };
        }
        if (mins > 0) {
          return { primaryText: `${mins} Minutes`, subText: "(Approx.)" };
        }
      }
    }
  }

  // Fallback to default estimated duration
  return {
    primaryText: "4 Hours",
    subText: "(Approx.)",
  };
}

export function getEventDisplayDate(event: LatestEvent) {
  const formattedDate = formatEventDate(event.date);
  return formattedDate;
}

export function getEventUrl() {
  return `${siteConfig.url}/event`;
}

export function getEventImage(event: LatestEvent) {
  return event.eventBanner?.trim() ? event.eventBanner : "/event.jpg";
}

export function getHomeImage(event: LatestEvent) {
  return event.homeBanner?.trim() ? event.homeBanner : getEventImage(event);
}

export function getOgImageUrl(event: LatestEvent) {
  return event.ogImage?.trim() ? event.ogImage : getEventImage(event);
}

export function getAbsoluteEventImageUrl(event: LatestEvent) {
  const image = getEventImage(event);

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return image.startsWith("/")
    ? `${siteConfig.url}${image}`
    : `${siteConfig.url}/${image}`;
}

export function getEventDescription(event: LatestEvent) {
  const description = event.description.trim();

  if (description) {
    return description;
  }

  return `${event.eventName} is the latest event from Bharat Bhakti Sangam.`;
}

export function getEventVenueName(event: LatestEvent) {
  if (
    typeof event.venueName === "object" &&
    event.venueName !== null &&
    typeof event.venueName.venue === "string" &&
    event.venueName.venue.trim()
  ) {
    return event.venueName.venue.trim();
  }

  return "Venue To Be Announced";
}

function isValidBookingCategory(item: unknown): item is BookingCategory {
  return (
    typeof item === "object" &&
    item !== null &&
    "bookingType" in item &&
    "price" in item &&
    typeof (item as BookingCategory).bookingType === "string" &&
    typeof (item as BookingCategory).price === "number"
  );
}

export function getEventVenueAddress(event: LatestEvent) {
  if (typeof event.venueName === "object" && event.venueName?.address?.trim()) {
    return event.venueName.address.trim();
  }

  return undefined;
}

export function getEventBookingCategories(
  event: LatestEvent,
): BookingCategory[] {
  const { bookingType } = event;

  if (!bookingType) return [];

  const categories = Array.isArray(bookingType) ? bookingType : [bookingType];

  // Sanitize + normalize
  return categories.filter(isValidBookingCategory).map((cat) => ({
    bookingType: cat.bookingType.trim(),
    price: cat.price,
  }));
}

export function getEventArtistNames(event: LatestEvent) {
  return event.artists
    .map((artist) => {
      if (typeof artist === "string") return artist;
      return artist.name?.trim() || null;
    })
    .filter((artist): artist is string => Boolean(artist));
}

export function getEventArtistSummaries(event: LatestEvent) {
  return event.artists
    .map((artist) => {
      const name = artist.name?.trim();
      if (!name) {
        return null;
      }

      return {
        name,
        role: artist.role?.trim() || "Artist",
        description: artist.about?.trim() || "Featured artist for this event.",
        images: artist.galleryImages?.length
          ? artist.galleryImages.map((img) => img.trim()).filter(Boolean)
          : [],
      };
    })
    .filter(
      (
        artist,
      ): artist is {
        name: string;
        role: string;
        description: string;
        images: string[];
      } => Boolean(artist),
    );
}

export function formatTicketPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function isCloudinaryUrl(url?: string) {
  return !!url && url.includes("res.cloudinary.com");
}

type CloudinaryImageOptions = {
  width: number;
  quality?: number | "auto";
};

export function getCloudinaryImageUrl(
  url: string,
  { width, quality = "auto" }: CloudinaryImageOptions,
) {
  if (!isCloudinaryUrl(url)) {
    return url;
  }

  const qualityTransform =
    quality === "auto" ? "q_auto" : `q_${Math.max(1, quality)}`;

  return url.replace(
    "/upload/",
    `/upload/f_auto,${qualityTransform},w_${width}/`,
  );
}

type CloudinarySrcSetOptions = {
  widths: number[];
  quality?: number | "auto";
};

export function getCloudinaryImageSrcSet(
  url: string,
  { widths, quality = "auto" }: CloudinarySrcSetOptions,
) {
  if (!isCloudinaryUrl(url)) {
    return "";
  }

  return widths
    .map((width) => `${getCloudinaryImageUrl(url, { width, quality })} ${width}w`)
    .join(", ");
}

/**
 * Extracts the public_id from a standard Cloudinary URL.
 * Handles URLs with or without version strings.
 */
export const extractPublicIdFromUrl = (url: string): string | null => {
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;

  // Remove version (v1234567/) if present and remove file extension
  const pathAfterUpload = parts[1].replace(/^v\d+\//, "");
  return pathAfterUpload.split(".").slice(0, -1).join(".");
};
