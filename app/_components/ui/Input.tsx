import clsx from "clsx";
import { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  labelClassName?: string;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id: propId, labelClassName, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;

    return (
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor={id}
          className={clsx("text-sm font-medium text-para", labelClassName)}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
          className={clsx(
            "border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300",
            props.className,
          )}
        />
        {error && (
          <span id={`${id}-error`} className="text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
