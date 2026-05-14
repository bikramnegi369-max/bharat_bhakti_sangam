import { ReactNode } from "react";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  subLabel?: string;
}

export function StatItem({ label, value, icon, subLabel }: StatItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-para mb-2">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <span className="text-2xl font-bold text-[#1A1208] leading-none">
          {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        </span>
      </div>
      {subLabel && <span className="text-xs text-para ml-8">{subLabel}</span>}
    </div>
  );
}
