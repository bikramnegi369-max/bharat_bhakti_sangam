

/**
 * Formats an ISO date string to a human-readable form.
 * @example formatDate("2026-06-14") → "14 June 2026"
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/**
 * Returns the attendance rate as a formatted string.
 * @example attendanceRate(980, 1090) → "980 / 1,090"
 */
export function attendanceRateLabel(attended: number, total: number): string {
  return `${attended.toLocaleString("en-IN")} / ${total.toLocaleString("en-IN")}`;
}

/**
 * Computes the attendance percentage (0-100).
 */
export function attendancePercent(attended: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((attended / total) * 100));
}