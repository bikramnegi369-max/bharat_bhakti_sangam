import { FieldProps } from "@/_types/Field.types";
import clsx from "clsx";
import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  getFieldStyles,
  getLabelStyles,
  getMessageStyles,
  iconButtonStyles,
  wrapperStyles,
} from "./Field.styles";

/**
 * Remove non-DOM props + normalize values for native inputs
 */
function sanitizeInputProps(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  const { valueAsDate, valueAsNumber, setValueAs, shouldUnregister, ...clean } =
    props as React.InputHTMLAttributes<HTMLInputElement> & {
      valueAsDate?: boolean;
      valueAsNumber?: boolean;
      setValueAs?: unknown;
      shouldUnregister?: boolean;
    };

  const type = clean.type;

  /**
   * Native date input only accepts yyyy-mm-dd
   */
  if (type === "date" && clean.value instanceof Date) {
    clean.value = clean.value.toISOString().split("T")[0];
  }

  /**
   * Native time input only accepts HH:mm
   */
  if (type === "time" && clean.value instanceof Date) {
    clean.value = clean.value.toTimeString().slice(0, 5);
  }

  /**
   * Number input should never receive null/undefined
   */
  if (type === "number" && clean.value == null) {
    delete clean.value;
  }

  return clean;
}

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
  const isInvalid = Boolean(error);
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
      role={error ? "alert" : undefined}
      className={getMessageStyles({
        error,
        success,
      })}
    >
      {message}
    </p>
  ) : null;

  /**
   * TEXTAREA
   */
  if (as === "textarea") {
    const textareaProps =
      rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

    return (
      <div className={clsx(wrapperStyles, containerClassName)}>
        {LabelElement}

        <textarea
          {...textareaProps}
          id={fieldId}
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          rows={textareaProps.rows ?? 4}
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

  /**
   * INPUT
   */
  const rawInputProps = rest as React.InputHTMLAttributes<HTMLInputElement>;

  const inputProps = sanitizeInputProps(rawInputProps);

  const isPassword = rawInputProps.type === "password";

  const resolvedType = isPassword && showPassword ? "text" : rawInputProps.type;

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
