"use client";
import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface CounterProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  error?: string;
  label?: string;
}

export const Counter = forwardRef<HTMLInputElement, CounterProps>(
  (
    {
      value = 0,
      onChange,
      min = 0,
      max = Infinity,
      error,
      label,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const increment = () => {
      if (!disabled && value < max) {
        onChange?.(value + 1);
        // Trigger change event for React Hook Form
        inputRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
      }
    };

    const decrement = () => {
      if (!disabled && value > min) {
        onChange?.(value - 1);
        inputRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
      }
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-600">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="flex items-center">
          <div
            className={clsx(
              "flex items-center justify-between rounded-md overflow-hidden",
              error && "border-red-400",
              disabled && "opacity-50",
              "w-full lg:w-[33%]",
              "border border-para/40 focus:border-primary",
              "h-[clamp(2.625rem,calc(2.393rem+1.161vw),3.438rem)]",
            )}
          >
            <button
              type="button"
              onClick={decrement}
              disabled={disabled || value <= min}
              className={clsx(
                "h-[clamp(2.5rem,calc(2rem+2.5vw),3.5rem)] w-[clamp(2.5rem,calc(2rem+2.5vw),3.5rem)] flex items-center justify-center text-lg transition-colors shrink-0",
                "focus:outline-none focus:ring-2 focus:ring-orange-300",
                disabled || value <= min
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700",
              )}
              aria-label="Decrease value"
            >
              −
            </button>
            <span
              className={clsx(
                "flex-1 text-center text-[clamp(0.875rem,calc(0.75rem+0.625vw),1.25rem)]",
                disabled ? "text-gray-400" : "text-gray-900",
              )}
              aria-live="polite"
            >
              {value}
            </span>
            <button
              type="button"
              onClick={increment}
              disabled={disabled || value >= max}
              className={clsx(
                "h-[clamp(2.5rem,calc(2rem+2.5vw),3.5rem)] w-[clamp(2.5rem,calc(2rem+2.5vw),3.5rem)] flex items-center justify-center text-lg transition-colors shrink-0",
                "focus:outline-none focus:ring-2 focus:ring-orange-300",
                disabled || value >= max
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700",
              )}
              aria-label="Increase value"
            >
              +
            </button>
          </div>
        </div>
        {/* Hidden input for React Hook Form integration */}
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={() => {}} // Value controlled externally
          className="hidden"
          aria-hidden="true"
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Counter.displayName = "Counter";
