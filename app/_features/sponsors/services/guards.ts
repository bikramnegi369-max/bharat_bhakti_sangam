import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { SponsorEnquiryRecord } from "@/_types/Sponsors.types";

export function isSponsorEnquiryRecord(value: unknown): value is SponsorEnquiryRecord {
  if (!isRecord(value)) return false;

  return (
    typeof value._id === "string" &&
    typeof value.fullName === "string" &&
    typeof value.companyName === "string" &&
    typeof value.email === "string" &&
    typeof value.phone === "string"
  );
}

export function isSponsorEnquiryListData(value: unknown): value is {
  data: SponsorEnquiryRecord[];
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
  return value.data.every(isSponsorEnquiryRecord);
}
