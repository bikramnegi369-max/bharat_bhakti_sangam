export const CALENDER_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type CalendarMonth = (typeof CALENDER_MONTHS)[number];

export const CALENDER_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type CalendarDay = (typeof CALENDER_DAYS)[number];

const CALENDER_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function normalizeCalenderDateInput(value?: string | null): string {
  if (!value) {
    return "";
  }

  const trimmedValue = value.trim();

  if (CALENDER_DATE_PATTERN.test(trimmedValue)) {
    return trimmedValue;
  }

  const isoDateMatch = trimmedValue.match(/^(\d{4}-\d{2}-\d{2})/);
  if (isoDateMatch) {
    return isoDateMatch[1];
  }

  const parsedValue = new Date(trimmedValue);
  if (Number.isNaN(parsedValue.getTime())) {
    return "";
  }

  const year = parsedValue.getUTCFullYear();
  const month = String(parsedValue.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedValue.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function deriveMonthFromDate(value?: string | null): CalendarMonth | "" {
  const normalizedDate = normalizeCalenderDateInput(value);

  if (!normalizedDate) {
    return "";
  }

  const [, monthPart] = normalizedDate.split("-");
  const monthIndex = Number.parseInt(monthPart ?? "", 10) - 1;

  return CALENDER_MONTHS[monthIndex] ?? "";
}

export function deriveDayFromDate(value?: string | null): CalendarDay | "" {
  const normalizedDate = normalizeCalenderDateInput(value);

  if (!normalizedDate) {
    return "";
  }

  const [year, month, day] = normalizedDate
    .split("-")
    .map((part) => Number.parseInt(part, 10));

  const date = new Date(Date.UTC(year, month - 1, day));

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return CALENDER_DAYS[date.getUTCDay()] ?? "";
}

export function formatCalenderEntryDate(value?: string | null): string {
  const normalizedDate = normalizeCalenderDateInput(value);

  if (!normalizedDate) {
    return "N/A";
  }

  const [year, month, day] = normalizedDate
    .split("-")
    .map((part) => Number.parseInt(part, 10));

  if (![year, month, day].every(Number.isFinite)) {
    return value?.trim() || "N/A";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
