"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import React, {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getFieldStyles,
  getLabelStyles,
  getMessageStyles,
  wrapperStyles,
} from "./Field.styles";

/* =========================================================
   TYPES
========================================================= */

export type TagsFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange"
> & {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  required?: boolean;

  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;

  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;

  maxTags?: number;
  maxTagLength?: number;
  allowDuplicates?: boolean;

  separators?: string[]; // Enter, comma, Tab
};

/* =========================================================
   HELPERS
========================================================= */

const DEFAULT_SEPARATORS = ["Enter", ",", "Tab"];

const normalizeTag = (value: string) => value.trim().replace(/\s+/g, " ");

const unique = (items: string[]) => [...new Set(items)];

function parseMultipleTags(
  value: string,
  allowDuplicates: boolean,
  existing: string[],
  maxTagLength: number,
) {
  const parts = value
    .split(",")
    .map(normalizeTag)
    .filter(Boolean)
    .filter((item) => item.length <= maxTagLength);

  const merged = [...existing, ...parts];

  return allowDuplicates ? merged : unique(merged);
}

/* =========================================================
   COMPONENT
========================================================= */

export const TagsField = forwardRef<HTMLInputElement, TagsFieldProps>(
  (props, ref) => {
    const {
      label,
      error,
      success,
      helperText,
      required,
      id,

      value,
      defaultValue = [],
      onChange,

      placeholder = "Type and press Enter",

      containerClassName,
      labelClassName,
      inputClassName,

      maxTags = 20,
      maxTagLength = 30,
      allowDuplicates = false,
      separators = DEFAULT_SEPARATORS,

      className,
      onFocus,
      onBlur,
      onPaste,

      ...rest
    } = props;

    const generatedId = useId();
    const fieldId = id || generatedId;

    const inputRef = useRef<HTMLInputElement | null>(null);

    /* controlled / uncontrolled */
    const [internalTags, setInternalTags] = useState<string[]>(defaultValue);

    const isControlled = value !== undefined;

    const tags = useMemo(
      () => (isControlled ? value : internalTags),
      [isControlled, value, internalTags],
    );

    const updateTags = useCallback(
      (next: string[]) => {
        const limited = next.slice(0, maxTags);

        if (!isControlled) {
          setInternalTags(limited);
        }

        onChange?.(limited);
      },
      [isControlled, maxTags, onChange],
    );

    const message = error || success || helperText;

    const descriptionId = message ? `${fieldId}-message` : undefined;

    /* =====================================================
     ACTIONS
  ===================================================== */

    const addSingleTag = useCallback(
      (raw: string) => {
        const next = normalizeTag(raw);

        if (!next) return;
        if (next.length > maxTagLength) return;

        if (!allowDuplicates && tags.includes(next)) {
          return;
        }

        updateTags([...tags, next]);
      },
      [allowDuplicates, maxTagLength, tags, updateTags],
    );

    const commitInput = useCallback(() => {
      const input = inputRef.current;
      if (!input) return;

      const value = input.value;
      if (!value.trim()) return;

      const next = parseMultipleTags(
        value,
        allowDuplicates,
        tags,
        maxTagLength,
      );

      updateTags(next);
      input.value = "";
    }, [allowDuplicates, maxTagLength, tags, updateTags]);

    const removeTag = useCallback(
      (index: number) => {
        updateTags(tags.filter((_, i) => i !== index));
      },
      [tags, updateTags],
    );

    const editLastTag = useCallback(() => {
      if (!tags.length) return;

      const input = inputRef.current;
      if (!input) return;

      const last = tags[tags.length - 1];

      input.value = last;

      updateTags(tags.slice(0, -1));

      requestAnimationFrame(() =>
        input.setSelectionRange(last.length, last.length),
      );
    }, [tags, updateTags]);

    /* =====================================================
     EVENTS
  ===================================================== */

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input = inputRef.current;
        if (!input) return;

        const hasValue = input.value.trim().length > 0;

        /* create tag */
        if (separators.includes(event.key) && hasValue) {
          event.preventDefault();
          commitInput();
          return;
        }

        /* backspace edit last */
        if (
          event.key === "Backspace" &&
          input.value === "" &&
          tags.length > 0
        ) {
          event.preventDefault();
          editLastTag();
        }
      },
      [commitInput, editLastTag, separators, tags.length],
    );

    const handlePaste = useCallback(
      (event: React.ClipboardEvent<HTMLInputElement>) => {
        onPaste?.(event);

        if (event.defaultPrevented) return;

        const pasted = event.clipboardData.getData("text");

        if (!pasted.includes(",")) return;

        event.preventDefault();

        const next = parseMultipleTags(
          pasted,
          allowDuplicates,
          tags,
          maxTagLength,
        );

        updateTags(next);
      },
      [allowDuplicates, maxTagLength, onPaste, tags, updateTags],
    );

    /* =====================================================
     RENDER
  ===================================================== */

    return (
      <div className={clsx(wrapperStyles, containerClassName)}>
        {label && (
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
        )}

        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              e.preventDefault();
              inputRef.current?.focus();
            }
          }}
          className={getFieldStyles({
            error,
            className:
              " h-auto flex flex-wrap items-center gap-2 px-3 py-2 cursor-text transition focus-within:border-primary",
          })}
        >
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex items-center gap-1 rounded-full border border-amber-400 bg-amber-50 px-3 py-1 text-sm text-amber-700"
            >
              {tag}

              <button
                type="button"
                onClick={() => removeTag(index)}
                className="rounded-full p-0.5 hover:bg-black/5"
                aria-label={`Remove ${tag}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}

          <input
            {...rest}
            ref={(node) => {
              inputRef.current = node;

              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            id={fieldId}
            type="text"
            onFocus={onFocus}
            onBlur={onBlur}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            aria-invalid={!!error}
            aria-describedby={descriptionId}
            className={clsx(
              "w-full flex-1 border-none bg-transparent outline-none ring-0 placeholder:text-neutral-400",
              inputClassName,
              className,
            )}
            placeholder={tags.length === 0 ? placeholder : ""}
          />
        </div>

        {message && (
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
        )}
      </div>
    );
  },
);

TagsField.displayName = "TagsField";
