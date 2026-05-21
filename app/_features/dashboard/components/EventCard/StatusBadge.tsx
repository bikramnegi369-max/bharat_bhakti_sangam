import { EventStatus } from "@/_types/dashboard.type";
import { normalizeEventStatus } from "@/_utils/dashboard.utils";
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
    unknown: {
      label: "Status Pending",
      className: "bg-[#8C7A5E] text-white",
    },
  };

interface StatusBadgeProps {
  status?: EventStatus | string | null;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const resolvedStatus = normalizeEventStatus(status);
  const { label, className: colorClass } = STATUS_CONFIG[resolvedStatus];
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
