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
              "flex items-center border rounded-md overflow-hidden",
              error && "border-red-400",
              disabled && "opacity-50",
            )}
          >
            <button
              type="button"
              onClick={decrement}
              disabled={disabled || value <= min}
              className={clsx(
                "px-3 py-1.5 transition-colors",
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
                "px-4 py-1.5 text-center min-w-15",
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
                "px-3 py-1.5 transition-colors",
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
