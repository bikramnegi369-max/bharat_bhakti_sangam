import { isPaginationRecord, isRecord } from "@/_utils/guards";
import { EventQuery } from "@/_types/EventQuery.types";

export function isEventQuery(value: unknown): value is EventQuery {
  if (!isRecord(value)) return false;

  const hasValidSubject =
    value.subject === undefined ||
    value.subject === null ||
    typeof value.subject === "string";

  return (
    typeof value._id === "string" &&
    typeof value.name === "string" &&
    typeof value.email === "string" &&
    typeof value.contact === "string" &&
    hasValidSubject &&
    typeof value.query === "string"
  );
}

export function isEventQueriesListData(value: unknown): value is {
  data: EventQuery[];
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
  return value.data.every(isEventQuery);
}
