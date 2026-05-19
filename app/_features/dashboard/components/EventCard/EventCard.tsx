import { EventDataInput } from "@/_types/dashboard.type";
import {
  attendancePercent,
  attendanceRateLabel,
  formatDate,
  normalizeEventStatus,
  normalizeEventData,
} from "@/_utils/dashboard.utils";
import { clsx } from "clsx";
import {
  Calendar,
  ClipboardList,
  MapPin,
  Ticket,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { AttendanceRing } from "./AttendanceRing";
import { StatItem } from "./StatItem";

interface EventCardProps {
  event: EventDataInput;
  className?: string;
}

const STATUS_STYLES = {
  current: "border-[#1A6B3A]/20 bg-[#E9F7EF] text-[#1A6B3A]",
  last: "border-primary/25 bg-[#FFF4DE] text-[#8A5A00]",
  earlier: "border-slate-300 bg-slate-100 text-slate-600",
  unknown: "border-[#E8D9B5] bg-[#FEF7EA] text-[#8C7A5E]",
};

const STATUS_LABELS = {
  current: "Current",
  last: "Last",
  earlier: "Earlier",
  unknown: "Pending",
};

export function EventCard({ event, className }: EventCardProps) {
  const normalizedEvent = normalizeEventData(event);
  const { title, date, venue, status, stats } = normalizedEvent;
  const { totalBookings, totalRegistrations, attended, attendanceRateDelta } =
    stats;

  const percent = attendancePercent(attended, totalBookings);
  const rateLabel = attendanceRateLabel(attended, totalBookings);
  const isPositiveDelta = attendanceRateDelta >= 0;
  const dateTimeValue = date || undefined;
  const resolvedStatus = normalizeEventStatus(status);

  return (
    <article
      className={clsx(
        "relative flex h-full w-full flex-col overflow-visible rounded-xl bg-white",
        "border border-primary transition-shadow hover:shadow-[0_8px_32px_rgba(200,134,10,0.18)]",
        status === "current"
          ? "shadow-2xl!"
          : "shadow-[0_4px_24px_rgba(200,134,10,0.10)]",
        className,
      )}
      aria-label={`Event card: ${title}`}
    >
      <div className="flex flex-1 flex-col gap-4 p-5">
        <header className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 min-w-0 text-base font-bold leading-snug text-[#1A1208]">
              {title}
            </h2>
            <span
              className={clsx(
                "shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold",
                STATUS_STYLES[resolvedStatus],
              )}
            >
              {STATUS_LABELS[resolvedStatus]}
            </span>
          </div>

          <div className="space-y-1.5 rounded-lg bg-[#FEF7EA] px-3 py-2.5 text-sm text-[#3D2E0E]">
            <p className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 shrink-0 text-primary" />
              <time dateTime={dateTimeValue}>{formatDate(date)}</time>
            </p>

            <p className="flex min-w-0 items-start gap-1.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="line-clamp-2">{venue}</span>
            </p>
          </div>
        </header>

        <div className="overflow-hidden rounded-xl border border-[#E8D9B5] bg-[#FEF7EA]">
          <div className="divide-y divide-[#E8D9B5]">
            <StatItem
              className="flex items-center justify-between gap-4 px-3 py-3"
              label="Booking"
              value={totalBookings}
              icon={<Ticket />}
              subLabel="Tickets"
            />
            <StatItem
              className="flex items-center justify-between gap-4 px-3 py-3"
              label="Registration"
              value={totalRegistrations}
              icon={<ClipboardList />}
              subLabel="People"
            />
            <StatItem
              className="flex items-center justify-between gap-4 px-3 py-3"
              label="Attended"
              value={attended}
              icon={<Users />}
              subLabel="People"
            />
          </div>
        </div>

        <div className="mt-auto grid gap-4 rounded-xl border border-[#E8D9B5] bg-white p-3 shadow-[0_1px_8px_rgba(200,134,10,0.08)] min-[360px]:grid-cols-[auto_1fr] min-[360px]:items-center">
          <div
            className="shrink-0"
            role="img"
            aria-label={`Attendance ring: ${percent}%`}
          >
            <AttendanceRing percent={percent} />
          </div>

          <div className="min-w-0 space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8C7A5E]">
              Attendance Rate
            </p>
            <p className="wrap-break-word text-base font-bold text-[#1A1208]">
              {rateLabel}
            </p>
            <p
              className={clsx(
                "flex items-center gap-1 text-xs font-semibold",
                isPositiveDelta ? "text-[#1A6B3A]" : "text-red-500",
              )}
            >
              {isPositiveDelta ? (
                <TrendingUp className="h-3 w-3 shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 shrink-0" />
              )}
              <span className="min-w-0">
                {isPositiveDelta ? "+" : ""}
                {attendanceRateDelta}% Vs Last Event
              </span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
