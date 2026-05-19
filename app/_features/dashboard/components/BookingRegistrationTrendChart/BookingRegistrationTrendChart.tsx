"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/_components/ui/Button";
import { BookingRegistrationTrendData } from "@/_types/dashboard.type";
import { fetchBookingRegistrationTrend } from "../../services/dashboard.service";

const BOOKING_COLOR = "#FF5A00";
const REGISTRATION_COLOR = "#FFB13B";

type TrendChartDatum = BookingRegistrationTrendData & {
  label: string;
};

function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    const compact = value / 1000;
    return `${Number.isInteger(compact) ? compact : compact.toFixed(1)}K`;
  }

  return String(value);
}

function getEventLabel(item: BookingRegistrationTrendData) {
  const suffix = item.totalRegistrations
    ? `(${item.totalRegistrations.toLocaleString("en-IN")})`
    : "";

  return `${item.eventName}${suffix ? ` ${suffix}` : ""}`;
}

function ChartSkeleton() {
  return (
    <div className="h-[254px] animate-pulse bg-[#FFF9EF]">
      <div className="flex h-full items-end justify-center gap-3 px-16 pb-12">
        <div className="h-32 w-6 rounded-t bg-black/10" />
        <div className="h-24 w-6 rounded-t bg-black/10" />
      </div>
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    color?: string;
    dataKey?: string;
    name?: string;
    value?: number;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-md border border-white/15 bg-black px-3 py-2 text-xs font-semibold text-white shadow-xl">
      <p className="mb-2 max-w-48 truncate text-white/80">{label}</p>
      <div className="space-y-1">
        {payload.map((entry) => (
          <p key={entry.dataKey} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}</span>
            <span className="text-white/70">
              {Number(entry.value || 0).toLocaleString("en-IN")}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

function TrendBars({ data }: { data: BookingRegistrationTrendData }) {
  const chartData = useMemo<TrendChartDatum[]>(
    () => [
      {
        ...data,
        label: getEventLabel(data),
      },
    ],
    [data],
  );

  return (
    <div className="h-[254px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 12, right: 14, left: -6, bottom: 26 }}
          barGap={4}
          barCategoryGap="46%"
        >
          <CartesianGrid
            vertical={false}
            stroke="rgba(26,18,8,0.08)"
            strokeDasharray="0"
          />
          <XAxis
            dataKey="label"
            interval={0}
            tickLine={false}
            axisLine={{ stroke: "rgba(26,18,8,0.18)" }}
            tick={{
              fill: "rgba(26,18,8,0.62)",
              fontSize: 12,
              fontWeight: 600,
            }}
            tickMargin={8}
          />
          <YAxis
            width={54}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatCompactNumber(Number(value))}
            tick={{
              fill: "rgba(26,18,8,0.62)",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
          <Tooltip
            cursor={{ fill: "rgba(26,18,8,0.06)" }}
            content={<CustomTooltip />}
          />
          <Bar
            dataKey="totalBookings"
            name="Total Bookings"
            fill={BOOKING_COLOR}
            radius={[2, 2, 0, 0]}
            maxBarSize={26}
          />
          <Bar
            dataKey="totalRegistrations"
            name="Total Registration"
            fill={REGISTRATION_COLOR}
            radius={[2, 2, 0, 0]}
            maxBarSize={26}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function BookingRegistrationTrendChart() {
  const [selectedDate, setSelectedDate] = useState(getLocalDateInputValue);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["booking-registration-trend", selectedDate],
    queryFn: async () => {
      const result = await fetchBookingRegistrationTrend(selectedDate);

      if (!result.success) {
        throw new Error(
          result.error || "Failed to fetch booking registration trend.",
        );
      }

      return result.data || [];
    },
  });

  const hasData = Boolean(data);

  return (
    <section
      className="w-full max-w-[520px] rounded-lg border border-primary bg-black p-4 text-white shadow-[0_8px_32px_rgba(200,134,10,0.18)]"
      aria-label="Booking and registration trend"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold uppercase text-white/85">
            Booking & Registration Trend
          </h2>
          <Legend />
        </div>

        <label className="relative inline-flex w-36 shrink-0 items-center">
          <span className="sr-only">Select trend date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="h-8 w-full rounded border border-white/10 bg-white px-2 text-xs font-semibold text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </div>

      <div className="mt-2 overflow-hidden bg-gradient-to-b from-white to-[#FFF3DE]">
        {isLoading ? (
          <ChartSkeleton />
        ) : error ? (
          <div className="flex h-[254px] flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              {(error as Error).message}
            </p>
            <Button
              type="button"
              variant="secondary"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        ) : hasData ? (
          <div className="relative">
            {isFetching && (
              <div className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                Updating
              </div>
            )}
            <TrendBars data={data as BookingRegistrationTrendData} />
          </div>
        ) : (
          <div className="flex h-[254px] flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No booking or registration data found for{" "}
              {formatDisplayDate(selectedDate)}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Legend() {
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/85">
      <span className="inline-flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5"
          style={{ backgroundColor: BOOKING_COLOR }}
        />
        Total Bookings
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5"
          style={{ backgroundColor: REGISTRATION_COLOR }}
        />
        Total Registration
      </span>
    </div>
  );
}
