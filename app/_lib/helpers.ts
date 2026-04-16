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
  if (typeof event.venueName === "string") {
    return event.venueName.trim() || "Venue To Be Announced";
  }

  if (event.venueName?.venue?.trim()) {
    return event.venueName.venue.trim();
  }

  return "Venue To Be Announced";
}

function isValidBookingCategory(item: unknown): item is BookingCategory {
  return (
    typeof item === "object" &&
    item !== null &&
    "name" in item &&
    "price" in item &&
    typeof (item as BookingCategory).name === "string" &&
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
    name: cat.name.trim(),
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
      if (typeof artist === "string") {
        return {
          name: artist,
          role: "Artist",
          description: "Artist appearance for this event.",
          images: [] as string[],
        };
      }

      const name = artist.name?.trim();
      if (!name) {
        return null;
      }

      return {
        name,
        role: artist.role?.trim() || "Artist",
        description: artist.about?.trim() || "Featured artist for this event.",
        images: artist.image?.trim() ? [artist.image.trim()] : [],
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
