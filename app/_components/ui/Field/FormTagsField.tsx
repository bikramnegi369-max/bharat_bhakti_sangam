"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { TagsField } from "../Field/TagField";

interface FormTagsFieldProps<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
> {
  name: Path<T>;
  control: Control<T, unknown, TTransformedValues>;
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function FormTagsField<
  T extends FieldValues,
  TTransformedValues extends FieldValues = T,
>({ name, control, ...props }: FormTagsFieldProps<T, TTransformedValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TagsField
          {...props}
          value={field.value as string[]}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={error?.message || props.error}
        />
      )}
    />
  );
}
