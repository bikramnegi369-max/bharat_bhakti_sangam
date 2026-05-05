import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { Volunteer } from "@/_types/Volunteer.types";

export function isVolunteer(value: unknown): value is Volunteer {
  if (!isRecord(value)) return false;

  return (
    typeof value._id === "string" &&
    typeof value.name === "string" &&
    typeof value.role === "string" &&
    typeof value.email === "string" &&
    typeof value.contact === "string" &&
    typeof value.profilePicture === "string" &&
    typeof value.isActive === "boolean"
  );
}

export function isVolunteersListData(value: unknown): value is {
  data: Volunteer[];
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
  return value.data.every(isVolunteer);
}
