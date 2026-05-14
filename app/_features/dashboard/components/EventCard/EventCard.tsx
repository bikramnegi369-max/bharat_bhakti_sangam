// ─────────────────────────────────────────────────────────────
// components/EventCard/EventCard.tsx
// Pure presentational component – receives fully-typed data,
// renders nothing else. No fetch, no state.
// ─────────────────────────────────────────────────────────────

import { EventData } from "@/_types/dashboard.type";
import {
  attendancePercent,
  attendanceRateLabel,
  formatDate,
} from "@/_utils/dashboard.utils";
import { StatusBadge } from "./StatusBadge";
import { StatItem } from "./StatItem";
import { AttendanceRing } from "./AttendanceRing";
import { clsx } from "clsx";
import {
  Calendar,
  MapPin,
  Ticket,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

// ── Props ──────────────────────────────────────────────────────
interface EventCardProps {
  event: EventData;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────
export function EventCard({ event, className }: EventCardProps) {
  const { title, date, venue, status, stats } = event;
  const { totalBookings, attended, attendanceRateDelta } = stats;

  const percent = attendancePercent(attended, totalBookings);
  const rateLabel = attendanceRateLabel(attended, totalBookings);
  const isPositiveDelta = attendanceRateDelta >= 0;

  return (
    <article
      className={clsx(
        "relative rounded-xl overflow-visible bg-white",
        "border border-primary ",
        "w-full max-w-sm transition-shadow hover:shadow-[0_8px_32px_rgba(200,134,10,0.18)]",
        status === "current"
          ? "shadow-2xl!"
          : "shadow-[0_4px_24px_rgba(200,134,10,0.10)]",
        className,
      )}
      aria-label={`Event card: ${title}`}
    >
      {/* ── Status badge – floats above the card top edge ── */}
      <StatusBadge status={status} />

      {/* ── Card body ─────────────────────────────────── */}
      <div className="pt-7 pb-5 px-5 space-y-4">
        {/* Event meta */}
        <header className="space-y-2">
          <h2 className="text-base font-bold text-[#1A1208] leading-snug">
            {title}
          </h2>
          <p className="text-sm text-[#3D2E0E] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <time dateTime={date}>{formatDate(date)}</time>
          </p>
          <p className="text-sm text-[#3D2E0E] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            {venue}
          </p>
        </header>

        {/* Divider */}
        <hr className="border-[#E8D9B5]" />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-8">
          <StatItem
            label="Total Booking"
            value={totalBookings}
            icon={<Ticket />}
            subLabel="Tickets"
          />
          <StatItem
            label="Attended"
            value={attended}
            icon={<Users />}
            subLabel="People"
          />
        </div>

        {/* Attendance section */}
        <div className="flex items-center gap-4 bg-[#FEF7EA] rounded-xl p-3 border border-[#E8D9B5]">
          {/* Accessible label for screen readers */}
          <div role="img" aria-label={`Attendance ring: ${percent}%`}>
            <AttendanceRing percent={percent} />
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8C7A5E]">
              Attendance Rate
            </p>
            <p className="text-base font-bold text-[#1A1208]">{rateLabel}</p>
            <p
              className={clsx(
                "text-xs font-semibold flex items-center gap-1",
                isPositiveDelta ? "text-[#1A6B3A]" : "text-red-500",
              )}
            >
              {isPositiveDelta ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>
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
