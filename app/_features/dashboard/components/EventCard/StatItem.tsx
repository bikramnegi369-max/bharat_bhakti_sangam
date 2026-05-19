import { ReactNode } from "react";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  subLabel?: string;
  className?: string;
}

export function StatItem({
  label,
  value,
  icon,
  subLabel,
  className,
}: StatItemProps) {
  return (
    <div className={className}>
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[10px] font-semibold uppercase leading-4 tracking-wide text-para">
            {label}
          </span>
          {subLabel && (
            <span className="mt-0.5 block truncate text-xs text-para">
              {subLabel}
            </span>
          )}
        </span>
      </div>
      <span className="shrink-0 text-right text-xl font-bold leading-none text-[#1A1208] tabular-nums">
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
      </span>
    </div>
  );
}
