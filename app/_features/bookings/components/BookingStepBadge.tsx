import React from "react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";

interface BookingStepBadgeProps {
  step: string;
  title: string;
  className?: string;
}

export function BookingStepBadge({
  step,
  title,
  className,
}: BookingStepBadgeProps) {
  return (
    <div className={clsx("flex items-center gap-3 select-none", className)}>
      <div
        className={clsx(
          poppins.className,
          "flex items-center justify-center w-8 h-8 rounded-full bg-[#E5A83B] text-white font-bold text-sm shadow-sm shrink-0",
        )}
      >
        {step}
      </div>
      <h2
        className={clsx(
          playfair.className,
          "text-base sm:text-lg lg:text-xl font-bold text-[#3F0605] tracking-wider uppercase",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

