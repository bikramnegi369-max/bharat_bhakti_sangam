import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { InfluencerRequest } from "@/_types/Influencer.types";

export function isInfluencerRequest(value: unknown): value is InfluencerRequest {
  if (!isRecord(value)) return false;

  return (
    typeof value._id === "string" &&
    typeof value.firstName === "string" &&
    typeof value.lastName === "string" &&
    typeof value.phone === "string" &&
    typeof value.email === "string" &&
    typeof value.profilePicture === "string"
  );
}

export function isInfluencerListData(value: unknown): value is {
  data: InfluencerRequest[];
  pagination: {
    page: number;
    total: number;
    limit: number;
    totalPages?: number;
  };
} {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.data)) return false;
  if (!isRecord(value.pagination)) return false;
  if (!isPaginationRecord(value.pagination)) {
    return false;
  }
  return value.data.every(isInfluencerRequest);
}
