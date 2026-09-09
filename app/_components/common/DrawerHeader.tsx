import React, { ReactNode } from "react";
import clsx from "clsx";
import { X } from "lucide-react";

interface DrawerHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function DrawerHeader({
  title,
  subtitle,
  badge,
  onClose,
  className,
}: DrawerHeaderProps) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-between border-b border-amber-900/30 bg-linear-to-r from-[#2d0403] via-[#370504] to-[#200202] px-8 py-5 text-white shadow-md select-none shrink-0",
        className,
      )}
    >
      <div className="flex flex-col gap-1 min-w-0 pr-4">
        {subtitle && (
          <p className="text-[10.5px] font-bold uppercase tracking-[0.25em] text-amber-400">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl lg:text-2xl font-semibold text-white tracking-wide truncate">
            {title}
          </h2>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close drawer"
          className="rounded-lg p-2 text-stone-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer shrink-0"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
