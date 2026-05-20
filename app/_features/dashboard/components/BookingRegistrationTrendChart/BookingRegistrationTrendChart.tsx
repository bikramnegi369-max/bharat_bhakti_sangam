"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BookingRegistrationTrendData } from "@/_types/dashboard.type";
import {
  ChartErrorState,
  ChartLoadingState,
  ChartMessageState,
  ChartSurface,
  DashboardChartCard,
  UpdatingBadge,
} from "../DashboardChartCard/DashboardChartCard";
import { fetchBookingRegistrationTrend } from "../../services/dashboard.service";

const BOOKING_COLOR = "#FF7A1A";
const REGISTRATION_COLOR = "#FCAD33";
const AXIS_COLOR = "rgba(61,46,14,0.72)";
const CHART_HEIGHT = 286;

type ComparisonDatum = {
  name: string;
  value: number;
  color: string;
};

type BarShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: ComparisonDatum;
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

function formatMetric(value: number) {
  return value.toLocaleString("en-IN");
}

function getRegistrationRate(data?: BookingRegistrationTrendData) {
  if (!data || data.totalBookings <= 0) {
    return 0;
  }

  return Math.round((data.totalRegistrations / data.totalBookings) * 100);
}

function ChartSkeleton() {
  return (
    <ChartLoadingState className="h-71.5 justify-center px-12">
      <span className="block h-[74%] w-20 rounded-t-lg bg-primary/25" />
      <span className="block h-[48%] w-20 rounded-t-lg bg-primary/15" />
    </ChartLoadingState>
  );
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload?: ComparisonDatum;
    value?: number;
  }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item) {
    return null;
  }

  return (
    <div className="rounded-lg border border-primary/25 bg-[#100E0B] px-3 py-2 text-xs font-semibold text-white shadow-xl">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80">
        {item.name}
      </p>
      <p className="mt-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-base font-black text-white">
          {Number(item.value || 0).toLocaleString("en-IN")}
        </span>
      </p>
    </div>
  );
}

function RoundedBarShape({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
}: BarShapeProps) {
  const radius = Math.min(10, width / 2, height);
  const right = x + width;
  const bottom = y + height;
  const color = payload?.color || REGISTRATION_COLOR;

  if (height <= 0 || width <= 0) {
    return null;
  }

  return (
    <path
      d={[
        `M ${x} ${bottom}`,
        `L ${x} ${y + radius}`,
        `Q ${x} ${y} ${x + radius} ${y}`,
        `L ${right - radius} ${y}`,
        `Q ${right} ${y} ${right} ${y + radius}`,
        `L ${right} ${bottom}`,
        "Z",
      ].join(" ")}
      fill={color}
    />
  );
}

function TrendBars({ data }: { data: BookingRegistrationTrendData }) {
  const chartData = useMemo<ComparisonDatum[]>(
    () => [
      {
        name: "Bookings",
        value: data.totalBookings,
        color: BOOKING_COLOR,
      },
      {
        name: "Registrations",
        value: data.totalRegistrations,
        color: REGISTRATION_COLOR,
      },
    ],
    [data],
  );

  return (
    <div className="h-71.5 w-full">
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart
          data={chartData}
          margin={{ top: 24, right: 24, left: -10, bottom: 20 }}
          barCategoryGap="34%"
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: AXIS_COLOR,
              fontSize: 12,
              fontWeight: 800,
            }}
            tickMargin={12}
          />
          <YAxis
            width={58}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            tickFormatter={(value) => formatCompactNumber(Number(value))}
            tick={{
              fill: AXIS_COLOR,
              fontSize: 11,
              fontWeight: 700,
            }}
          />
          <Tooltip
            cursor={{ fill: "rgba(252,173,51,0.08)" }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" maxBarSize={88} shape={<RoundedBarShape />} />
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

      return result.data || null;
    },
  });

  const trendData = data || null;
  const registrationRate = getRegistrationRate(trendData || undefined);
  const hasData = Boolean(trendData);

  return (
    <DashboardChartCard
      eyebrow={formatDisplayDate(selectedDate)}
      title="Booking & Registration"
      description={
        trendData?.eventName
          ? trendData.eventName
          : "Compare selected-day bookings against registrations."
      }
      ariaLabel="Booking and registration trend"
      action={
        <label className="relative inline-flex w-40 shrink-0 items-center">
          <span className="sr-only">Select trend date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="h-10 w-full rounded-lg border border-primary/25 bg-white/6 px-3 text-xs font-bold text-white outline-none transition scheme-dark hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
        </label>
      }
      metric={
        <div className="grid grid-cols-3 gap-2">
          <MetricPill
            label="Bookings"
            value={formatMetric(trendData?.totalBookings || 0)}
            color={BOOKING_COLOR}
          />
          <MetricPill
            label="Registrations"
            value={formatMetric(trendData?.totalRegistrations || 0)}
            color={REGISTRATION_COLOR}
          />
          <MetricPill label="Rate" value={`${registrationRate}%`} />
        </div>
      }
    >
      <ChartSurface>
        {isLoading ? (
          <ChartSkeleton />
        ) : error ? (
          <ChartErrorState
            message={(error as Error).message}
            onRetry={() => refetch()}
          />
        ) : hasData && trendData ? (
          <div className="relative">
            {isFetching && <UpdatingBadge />}
            <TrendBars data={trendData} />
          </div>
        ) : (
          <ChartMessageState className="min-h-71.5">
            No booking or registration data found for{" "}
            {formatDisplayDate(selectedDate)}.
          </ChartMessageState>
        )}
      </ChartSurface>
    </DashboardChartCard>
  );
}

function MetricPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div
      className="min-w-24 rounded-lg border border-primary/25 bg-white/6 px-3 py-2 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      aria-label={`${label}: ${value}`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">
        {label}
      </p>
      <p
        className="mt-0.5 text-base font-black tabular-nums"
        style={{ color: color || "var(--primary)" }}
      >
        {value}
      </p>
    </div>
  );
}
