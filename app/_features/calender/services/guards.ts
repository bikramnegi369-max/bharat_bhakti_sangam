import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { isPaginationRecord, isRecord } from "@/_utils/guards";

export function isCalenderEntry(value: unknown): value is CalenderEntry {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value._id === "string" &&
    typeof value.festival === "string" &&
    typeof value.image === "string" &&
    typeof value.month === "string" &&
    typeof value.date === "string" &&
    (typeof value.createdAt === "undefined" ||
      typeof value.createdAt === "string") &&
    (typeof value.updatedAt === "undefined" ||
      typeof value.updatedAt === "string")
  );
}

export function isCalenderEntriesListData(value: unknown): value is {
  data: CalenderEntry[];
  pagination: {
    page: number;
    total: number;
    limit: number;
    totalPages: number;
  };
} {
  if (!isRecord(value)) {
    return false;
  }

  if (!Array.isArray(value.data)) {
    return false;
  }

  if (!isPaginationRecord(value.pagination)) {
    return false;
  }

  return value.data.every(isCalenderEntry);
}
