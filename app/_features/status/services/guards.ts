import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { StatusItem } from "@/_types/Status.types";


export function isStatusItem(value: unknown): value is StatusItem {
  if (!isRecord(value)) return false;

  return (
    typeof value._id === "string" &&
    typeof value.videoUrl === "string" &&
    (typeof value.thumbnailUrl === "string" || typeof value.thumbnailUrl === "undefined") &&
    Array.isArray(value.tags) &&
    value.tags.every((item) => typeof item === "string") &&
    typeof value.downloadsCount === "number" &&
    (typeof value.likes === "number" || typeof value.likes === "undefined") &&
    (typeof value.likesCount === "number" || typeof value.likesCount === "undefined") &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

export function isStatusListData(value: unknown): value is {
  data: StatusItem[];
  pagination: {
    page: number;
    total: number;
    limit: number;
    totalPages: number;
  };
} {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.data)) return false;
  if (!isRecord(value.pagination) || !isPaginationRecord(value.pagination)) {
    return false;
  }
  return value.data.every(isStatusItem);
}
