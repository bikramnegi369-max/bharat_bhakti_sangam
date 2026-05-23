import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { NonVisitedUser } from "@/_types/NonVisitedUser.types";

export function isNonVisitedUser(value: unknown): value is NonVisitedUser {
  if (!isRecord(value)) return false;

  return (
    typeof value._id === "string" &&
    typeof value.email === "string" &&
    typeof value.name === "string" &&
    typeof value.tickets === "number" &&
    typeof value.visitUsers === "number" &&
    typeof value.nonVisitCount === "number" &&
    typeof value.eventName === "string" &&
    typeof value.ticketId === "string" &&
    typeof value.contact === "number" &&
    typeof value.bookingDate === "string"
  );
}

export function isNonVisitedUsersListData(value: unknown): value is {
  data: NonVisitedUser[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
} {
  if (!isRecord(value)) return false;
  if (!isPaginationRecord(value.pagination)) return false;

  return Array.isArray(value.data) && value.data.every(isNonVisitedUser);
}
