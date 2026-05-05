import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { Artist } from "@/_types/Artists.types";

export function isArtist(value: unknown): value is Artist {
  if (!isRecord(value)) return false;

  return (
    typeof value._id === "string" &&
    typeof value.artistName === "string" &&
    typeof value.profileImage === "string" &&
    typeof value.email === "string" &&
    typeof value.contactNo === "string" &&
    (typeof value.instruments === "undefined" ||
      (Array.isArray(value.instruments) &&
        value.instruments.every((item) => typeof item === "string"))) &&
    typeof value.startTime === "string" &&
    typeof value.endTime === "string" &&
    (typeof value.galleryImages === "undefined" ||
      (Array.isArray(value.galleryImages) &&
        value.galleryImages.every((item) => typeof item === "string"))) &&
    typeof value.aboutArtist === "string"
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
