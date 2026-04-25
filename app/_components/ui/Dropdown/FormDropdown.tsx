"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Dropdown } from ".";
import { DropdownOption } from "@/_types/Dropdown";

interface FormDropdownProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
  V = string,
> {
  name: Path<T>;
  control: Control<T, unknown, TTransformedValues>;
  options: DropdownOption<V>[];
  label: string;
  multiple?: boolean;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function FormDropdown<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
  V = string,
>({
  name,
  control,
  options,
  multiple,
  required,
  ...props
}: FormDropdownProps<T, TTransformedValues, V>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const formValue = field.value;

        if (multiple) {
          const visualValue = options.filter((opt) =>
            ((formValue as V[]) || []).includes(opt.value),
          );

          return (
            <Dropdown<V>
              {...props}
              options={options}
              multiple={true}
              value={visualValue}
              onBlur={field.onBlur}
              required={required}
              error={error?.message || props.error}
              onChange={(val) => {
                const selected = Array.isArray(val) ? val : [];
                field.onChange(selected.map((o) => o.value));
                field.onBlur();
              }}
            />
          );
        }

        const visualValue =
          options.find((opt) => opt.value === formValue) || null;

        return (
          <Dropdown<V>
            {...props}
            options={options}
            multiple={false}
            value={visualValue}
            required={required}
            error={error?.message || props.error}
            onChange={(val) => {
              const selected = val as DropdownOption<V> | null;
              field.onChange(selected?.value ?? null);
              field.onBlur();
            }}
          />
        );
      }}
    />
  );
}
