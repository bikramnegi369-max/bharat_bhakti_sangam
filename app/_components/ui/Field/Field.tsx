import { FieldProps } from "@/_types/Field.types";
import clsx from "clsx";
import { forwardRef, useId, useState } from "react";
import {
  getFieldStyles,
  getLabelStyles,
  getMessageStyles,
  iconButtonStyles,
  wrapperStyles,
} from "./Field.styles";
import { Eye, EyeOff } from "lucide-react";

export const Field = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FieldProps
>((props, ref) => {
  const {
    label,
    error,
    helperText,
    success,
    required,
    containerClassName,
    labelClassName,
    inputClassName,
    id,
    as = "input",
    ...rest
  } = props;

  const generatedId = useId();
  const fieldId = id || generatedId;
  const [showPassword, setShowPassword] = useState(false);

  const message = error || success || helperText;
  const isInvalid = !!error;
  const descriptionId = message ? `${fieldId}-message` : undefined;

  const LabelElement = label ? (
    <label
      htmlFor={fieldId}
      className={getLabelStyles({
        error,
        className: labelClassName,
      })}
    >
      {label}
      {required && (
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  ) : null;

  const MessageElement = message ? (
    <p
      id={descriptionId}
      className={getMessageStyles({ error, success })}
      role={error ? "alert" : undefined}
    >
      {message}
    </p>
  ) : null;

  if (as === "textarea") {
    return (
      <div className={clsx(wrapperStyles, containerClassName)}>
        {LabelElement}
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={fieldId}
          rows={
            (rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>).rows ||
            4
          }
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          aria-invalid={isInvalid}
          aria-describedby={descriptionId}
          aria-required={required}
          className={getFieldStyles({
            error,
            className: clsx("resize-none min-h-30", inputClassName),
          })}
        />
        {MessageElement}
      </div>
    );
  }

  const inputProps = rest as React.InputHTMLAttributes<HTMLInputElement>;
  const isPassword = inputProps.type === "password";
  const resolvedType = isPassword && showPassword ? "text" : inputProps.type;

  return (
    <div className={clsx(wrapperStyles, containerClassName)}>
      {LabelElement}
      <div className="relative">
        <input
          {...inputProps}
          id={fieldId}
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          type={resolvedType}
          aria-invalid={isInvalid}
          aria-describedby={descriptionId}
          aria-required={required}
          className={getFieldStyles({
            error,
            hasIcon: isPassword,
            className: inputClassName,
          })}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={iconButtonStyles}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {MessageElement}
    </div>
  );
});

Field.displayName = "Field";
