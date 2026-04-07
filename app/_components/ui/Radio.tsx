import clsx from "clsx";
import { forwardRef } from "react";

interface RadioProps {
  label: string;
  value: string | number;
  selected?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  disabled?: boolean;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ label, value, selected, onChange, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={() => !disabled && onChange?.(value)}
      disabled={disabled}
      className={clsx(
        "flex items-center gap-2 text-sm",
        disabled && "opacity-50 cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-1",
      )}
      aria-pressed={selected === value}
      {...props}
    >
      <span
        className={clsx(
          "w-4 h-4 rounded-full border  shrink-0",
          selected === value
            ? "bg-primary border-primary"
            : "border-gray-400 bg-white",
        )}
      />
      {label}
    </button>
  ),
);

Radio.displayName = "Radio";
