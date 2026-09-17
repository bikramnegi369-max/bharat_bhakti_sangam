import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { Artist } from "@/_types/Artists.types";

export function isArtist(value: unknown): value is Artist {
  if (!isRecord(value)) return false;

  const hasValidName =
    typeof value.artistName === "string" ||
    (typeof value.firstName === "string" && typeof value.lastName === "string");

  const hasValidContact =
    typeof value.contactNo === "string" || typeof value.phone === "string";

  const hasValidImage =
    typeof value.profileImage === "string" ||
    typeof value.profilePicture === "string";

  return (
    typeof value._id === "string" &&
    hasValidName &&
    typeof value.email === "string" &&
    hasValidContact &&
    hasValidImage &&
    (typeof value.role === "string" || typeof value.role === "undefined") &&
    (typeof value.instruments === "undefined" ||
      (Array.isArray(value.instruments) &&
        value.instruments.every((item) => typeof item === "string"))) &&
    (typeof value.startTime === "string" || typeof value.startTime === "undefined") &&
    (typeof value.endTime === "string" || typeof value.endTime === "undefined") &&
    (typeof value.galleryImages === "undefined" ||
      (Array.isArray(value.galleryImages) &&
        value.galleryImages.every((item) => typeof item === "string"))) &&
    (typeof value.aboutArtist === "string" || typeof value.aboutArtist === "undefined")
  );
}

export function isArtistsListData(value: unknown): value is {
  data: Artist[];
  pagination: {
    page: number;
    total: number;
    limit: number;
    totalPages: number;
  };
} {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.data)) return false;
  if (!isRecord(value.pagination)) return false;
  if (!isPaginationRecord(value.pagination)) {
    return false;
  }
  return value.data.every(isArtist);
}
