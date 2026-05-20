import { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/_components/ui/Button";

interface DashboardChartCardProps {
  title: string;
  eyebrow: string;
  description?: string;
  action?: ReactNode;
  metric?: ReactNode;
  children: ReactNode;
  ariaLabel: string;
}

interface ChartStateProps {
  children: ReactNode;
  className?: string;
}

interface ChartErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function DashboardChartCard({
  title,
  eyebrow,
  description,
  action,
  metric,
  children,
  ariaLabel,
}: DashboardChartCardProps) {
  return (
    <section
      className="relative isolate w-full overflow-hidden rounded-xl border border-primary/70 bg-[#100E0B] p-4 text-white shadow-[0_16px_46px_rgba(120,76,7,0.18)]"
      aria-label={ariaLabel}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-44 bg-primary/10 blur-3xl" />

      <header className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-1 truncate text-lg font-black uppercase leading-tight text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-xl text-xs font-medium leading-5 text-white/55">
              {description}
            </p>
          )}
          {metric && (
            <div className="mt-3 w-full min-w-0 sm:w-fit [&>.grid]:w-full [&>.grid]:grid-cols-1 min-[420px]:[&>.grid]:grid-cols-3 sm:[&>.grid]:w-auto">
              {metric}
            </div>
          )}
        </div>

        {action && (
          <div className="flex w-full min-w-0 items-start sm:w-auto lg:shrink-0 lg:justify-end [&_label]:w-full sm:[&_label]:w-40">
            {action}
          </div>
        )}
      </header>

      <div className="relative z-10 mt-4">{children}</div>
    </section>
  );
}

export function ChartSurface({ children, className = "" }: ChartStateProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-primary/25 bg-linear-to-b from-white via-[#FFFCF7] to-[#FFF1DC] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ChartLoadingState({
  children,
  className = "",
}: ChartStateProps) {
  return (
    <div
      className={`table-shimmer flex items-end gap-3 overflow-hidden bg-[#FFF7E9] px-6 pb-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function ChartMessageState({
  children,
  className = "",
}: ChartStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 text-center text-sm font-semibold text-[#3D2E0E] ${className}`}
    >
      {children}
    </div>
  );
}

export function ChartErrorState({ message, onRetry }: ChartErrorStateProps) {
  return (
    <ChartMessageState className="min-h-65 gap-4">
      <div>
        <p className="text-base font-black text-[#1A1208]">
          Unable to load chart
        </p>
        <p className="mt-1 text-sm text-[#7C6848]">{message}</p>
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={onRetry}
        className="min-w-0! gap-2 px-4! py-2! text-sm!"
      >
        <RefreshCw className="h-4 w-4" />
        Retry
      </Button>
    </ChartMessageState>
  );
}

export function UpdatingBadge() {
  return (
    <div className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/80 px-3 py-1 text-xs font-bold text-white shadow-lg">
      Updating
    </div>
  );
}
