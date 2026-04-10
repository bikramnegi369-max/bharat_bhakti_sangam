import { SelectFieldProps } from "@/_types/Select.types";
import clsx from "clsx";
import { forwardRef, useId } from "react";
import {
  getLabelStyles,
  getMessageStyles,
  getSelectStyles,
  iconWrapperStyles,
  wrapperStyles,
} from "./Select.styles";
import { ChevronDown } from "lucide-react";

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id: propId,
      label,
      error,
      helperText,
      success,
      required,
      options,

      containerClassName,
      labelClassName,
      selectClassName,
      iconClassName,

      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const message = error || success || helperText;

    return (
      <div className={clsx(wrapperStyles, containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={getLabelStyles({
              error,
              className: labelClassName,
            })}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* Select */}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            required={required}
            aria-invalid={!!error}
            aria-describedby={message ? `${id}-message` : undefined}
            className={getSelectStyles({
              error,
              className: selectClassName,
            })}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Icon */}
          <div className={clsx(iconWrapperStyles, iconClassName)}>
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Message */}
        {message && (
          <p
            id={`${id}-message`}
            className={getMessageStyles({
              error,
              success,
            })}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
