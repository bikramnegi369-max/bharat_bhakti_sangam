import { isPaginationRecord, isRecord } from "@/_utils/guards";

export function isVideoReviewsListData(value: unknown): value is {
  data: Record<string, unknown>[];
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
  return true;
}
