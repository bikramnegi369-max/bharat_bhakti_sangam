"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TotalBookingTrendData } from "@/_types/dashboard.type";
import {
  ChartErrorState,
  ChartLoadingState,
  ChartMessageState,
  ChartSurface,
  DashboardChartCard,
  UpdatingBadge,
} from "../DashboardChartCard/DashboardChartCard";
import { fetchTotalBookingTrend } from "../../services/dashboard.service";

const LINE_COLOR = "#FFA32B";
const AXIS_COLOR = "rgba(61,46,14,0.72)";
const CHART_HEIGHT = 286;
const MIN_POINT_WIDTH = 64;
const MIN_PLOT_WIDTH = 720;

type ChartDatum = TotalBookingTrendData & {
  label: string;
};

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    const compact = value / 1000;
    return `${Number.isInteger(compact) ? compact : compact.toFixed(1)}K`;
  }

  return String(value);
}

function getTimestamp(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  return Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
}

function getNiceYAxisMax(maxValue: number) {
  if (maxValue <= 0) {
    return 10;
  }

  const exponent = Math.floor(Math.log10(maxValue));
  const magnitude = 10 ** exponent;
  const normalized = maxValue / magnitude;
  const niceNormalized =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;

  return niceNormalized * magnitude;
}

function getYAxisTicks(maxValue: number) {
  const axisMax = getNiceYAxisMax(maxValue);
  const step = axisMax / 5;

  return Array.from({ length: 6 }, (_, index) => Math.round(step * index));
}

function formatMetric(value: number) {
  return value.toLocaleString("en-IN");
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

function formatAxisDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return [date, ""];
  }

  const dayMonth = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(parsedDate);

  return [dayMonth, String(parsedDate.getFullYear())];
}

function CustomXAxisTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value?: string };
}) {
  const [dayMonth, year] = formatAxisDate(payload?.value || "");

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        textAnchor="middle"
        fill={AXIS_COLOR}
        fontSize={11}
        fontWeight={700}
      >
        <tspan x="0" dy="0.75em">
          {dayMonth}
        </tspan>
        {year && (
          <tspan x="0" dy="1.2em">
            {year}
          </tspan>
        )}
      </text>
    </g>
  );
}

function ChartSkeleton() {
  return (
    <ChartLoadingState className="h-71.5">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="block flex-1 rounded-t bg-primary/25"
          style={{ height: `${22 + ((index * 19) % 68)}%` }}
        />
      ))}
    </ChartLoadingState>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const value = Number(payload[0]?.value || 0);

  return (
    <div className="rounded-lg border border-primary/25 bg-[#100E0B] px-3 py-2 text-xs font-semibold text-white shadow-xl">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80">
        {formatDisplayDate(label || "")}
      </p>
      <p className="mt-1 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="text-white/70">Bookings</span>
        <span className="text-base font-black text-white">
          {value.toLocaleString("en-IN")}
        </span>
      </p>
    </div>
  );
}

function getChartData(data: TotalBookingTrendData[]) {
  return [...data]
    .sort(
      (first, second) => getTimestamp(first.date) - getTimestamp(second.date),
    )
    .map((item) => ({
      ...item,
      label: item.date,
    }));
}

function TotalBookingLine({ chartData }: { chartData: ChartDatum[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    canScroll: false,
  });
  const yAxisTicks = useMemo(
    () =>
      getYAxisTicks(Math.max(...chartData.map((item) => item.totalTickets), 0)),
    [chartData],
  );
  const plotWidth = Math.max(
    MIN_PLOT_WIDTH,
    chartData.length * MIN_POINT_WIDTH,
  );
  const updateScrollState = () => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const scrollableWidth =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const canScroll = scrollableWidth > 1;

    setScrollState({ canScroll });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(scrollContainer);

    return () => resizeObserver.disconnect();
  }, [chartData.length, plotWidth]);

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollState}
        className="dashboard-chart-scrollbar h-71.5 w-full overflow-x-auto overflow-y-hidden"
      >
        <div className="h-full" style={{ minWidth: plotWidth }}>
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <AreaChart
              data={chartData}
              margin={{ top: 22, right: 20, left: -14, bottom: 16 }}
            >
              <defs>
                <linearGradient
                  id="totalBookingArea"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={LINE_COLOR} stopOpacity={0.3} />
                  <stop offset="58%" stopColor={LINE_COLOR} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={LINE_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                interval={0}
                tickLine={false}
                axisLine={false}
                tick={<CustomXAxisTick />}
                minTickGap={8}
                height={42}
              />
              <YAxis
                width={58}
                tickLine={false}
                axisLine={false}
                domain={[0, yAxisTicks[yAxisTicks.length - 1]]}
                ticks={yAxisTicks}
                allowDecimals={false}
                tickFormatter={(value) => formatCompactNumber(Number(value))}
                tick={{
                  fill: AXIS_COLOR,
                  fontSize: 11,
                  fontWeight: 700,
                }}
                tickMargin={6}
              />
              <Tooltip
                cursor={{ stroke: "rgba(255,163,43,0.24)", strokeWidth: 1 }}
                content={<CustomTooltip />}
              />
              <Area
                type="monotone"
                dataKey="totalTickets"
                name="Total Bookings"
                stroke={LINE_COLOR}
                strokeWidth={2.5}
                fill="url(#totalBookingArea)"
                dot={{
                  r: 3.5,
                  stroke: "#FFF7E9",
                  strokeWidth: 2,
                  fill: LINE_COLOR,
                }}
                activeDot={{
                  r: 5,
                  stroke: "#100E0B",
                  strokeWidth: 2,
                  fill: LINE_COLOR,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {scrollState.canScroll && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#FFF1DC] via-[#FFF1DC]/80 to-transparent" />
      )}
    </div>
  );
}

export default function TotalBookingTrendChart() {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["total-booking-trend"],
    queryFn: async () => {
      const result = await fetchTotalBookingTrend();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch total booking trend.");
      }

      return result.data || [];
    },
  });

  const chartData = useMemo(() => getChartData(data || []), [data]);
  const totalTickets = useMemo(
    () => chartData.reduce((sum, item) => sum + item.totalTickets, 0),
    [chartData],
  );
  const peakDay = useMemo(
    () =>
      chartData.reduce<ChartDatum | null>(
        (peak, item) =>
          !peak || item.totalTickets > peak.totalTickets ? item : peak,
        null,
      ),
    [chartData],
  );
  const averageTickets = chartData.length
    ? Math.round(totalTickets / chartData.length)
    : 0;
  const hasData = chartData.length > 0;

  return (
    <DashboardChartCard
      eyebrow="Daily Momentum"
      title="Total Booking Trend"
      description="Track ticket demand by day and spot booking spikes quickly."
      ariaLabel="Total booking trend"
      metric={
        <div className="grid grid-cols-3 gap-2">
          <MetricPill label="Total" value={formatMetric(totalTickets)} />
          <MetricPill label="Avg/day" value={formatMetric(averageTickets)} />
          <MetricPill
            label="Peak"
            value={peakDay ? formatMetric(peakDay.totalTickets) : "0"}
          />
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
        ) : hasData ? (
          <div className="relative">
            {isFetching && <UpdatingBadge />}
            <TotalBookingLine chartData={chartData} />
          </div>
        ) : (
          <ChartMessageState className="min-h-71.5">
            No total booking trend data found.
          </ChartMessageState>
        )}
      </ChartSurface>
    </DashboardChartCard>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="min-w-20 rounded-lg border border-primary/25 bg-white/6 px-3 py-2 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      aria-label={`${label}: ${value}`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">
        {label}
      </p>
      <p className="mt-0.5 text-base font-black tabular-nums text-primary">
        {value}
      </p>
    </div>
  );
}
