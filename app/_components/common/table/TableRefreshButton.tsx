"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";

interface TableRefreshButtonProps {
  onRefresh: () => Promise<unknown> | void;
  isFetching?: boolean;
  disabled?: boolean;
}

export function TableRefreshButton({
  onRefresh,
  isFetching = false,
  disabled = false,
}: TableRefreshButtonProps) {
  const [isManualTriggering, setIsManualTriggering] = useState(false);

  const handleClick = async () => {
    if (disabled || isFetching || isManualTriggering) {
      return;
    }

    try {
      setIsManualTriggering(true);
      await onRefresh();
    } finally {
      setIsManualTriggering(false);
    }
  };

  const isSpinning = isFetching || isManualTriggering;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isSpinning}
      aria-label="Refresh table data"
      aria-busy={isSpinning}
      title="Refresh data"
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/75 shadow-sm transition-all duration-150 hover:border-primary/60 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer active:scale-95"
    >
      <RotateCw
        size={16}
        className={`transition-transform ${
          isSpinning ? "animate-spin text-primary" : "text-black/70"
        }`}
      />
      <span>Refresh</span>
    </button>
  );
}
