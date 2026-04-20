"use client";

import * as React from "react";
import clsx from "clsx";
import { Star } from "lucide-react";

type RatingProps = {
  /** Current selected value */
  value: number;

  /** Called when user selects */
  onChange: (value: number) => void;

  /** Max stars */
  max?: number;

  /** Allow clearing selected value */
  allowClear?: boolean;

  /** Read only mode */
  readOnly?: boolean;

  /** Disabled mode */
  disabled?: boolean;

  /** Star size */
  size?: number;

  /** Gap between stars */
  gap?: number;

  /** Wrapper class */
  className?: string;

  /** Custom label */
  ariaLabel?: string;
};

export function Rating({
  value,
  onChange,
  max = 5,
  allowClear = true,
  readOnly = false,
  disabled = false,
  size = 24,
  gap = 6,
  className,
  ariaLabel = "Rating",
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const displayValue = hovered ?? value;

  const isInteractive = !readOnly && !disabled;

  const handleSelect = (star: number) => {
    if (!isInteractive) return;

    if (allowClear && star === value) {
      onChange(0);
      return;
    }

    onChange(star);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;

    let next = value;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        next = Math.min(value + 1, max);
        break;

      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        next = Math.max(value - 1, 0);
        break;

      case "Home":
        e.preventDefault();
        next = 0;
        break;

      case "End":
        e.preventDefault();
        next = max;
        break;

      default:
        return;
    }

    onChange(next);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={handleKeyDown}
      className={clsx(
        "flex items-center outline-none w-full",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      style={{ gap }}
    >
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const active = star <= displayValue;

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            disabled={disabled}
            onClick={() => handleSelect(star)}
            onMouseEnter={() => isInteractive && setHovered(star)}
            onMouseLeave={() => isInteractive && setHovered(null)}
            className={clsx(
              "max-w-full max-h-full rounded-md transition-all duration-150 ease-out",
              isInteractive && "hover:scale-110 active:scale-95",
              "focus-visible:ring-2 focus-visible:ring-primary/40",
              className,
            )}
          >
            <Star
              strokeWidth={1.8}
              className={clsx(
                "transition-colors duration-150 w-full h-full",
                active
                  ? "fill-primary text-primary"
                  : "fill-transparent text-muted-foreground/40",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
