import { EventStatus } from "@/_types/dashboard.type";
import { clsx } from "clsx";

const STATUS_CONFIG: Record<EventStatus, { label: string; className: string }> =
  {
    current: {
      label: "Current Event",
      className: "bg-[#1A6B3A] text-white",
    },
    last: {
      label: "Last Event",
      className: "bg-[#C8860A] text-white",
    },
    earlier: {
      label: "Earlier Event",
      className: "bg-[#555555] text-white",
    },
  };

interface StatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: colorClass } = STATUS_CONFIG[status];
  return (
    <div className={clsx("flex justify-center -mb-4 relative z-10", className)}>
      <span
        className={clsx(
          "px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-md",
          colorClass,
        )}
      >
        {label}
      </span>
    </div>
  );
}
