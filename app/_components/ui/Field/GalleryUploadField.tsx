"use client";

import {
  useFieldArray,
  Control,
  FieldValues,
  Path,
  PathValue,
  ArrayPath,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { FileUploadField } from "./FileUploadField";

interface GalleryUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  maxItems?: number;
}

export function GalleryUploadField<T extends FieldValues>({
  name,
  control,
  label = "Gallery Images",
  helperText,
  error,
  required,
  maxItems,
}: GalleryUploadFieldProps<T>) {
  const { fields, append, remove } = useFieldArray<T>({
    name: name as ArrayPath<T>,
    control,
  });

  const canAddMore = maxItems == null || fields.length < maxItems;

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900">{label}</p>
          {helperText ? (
            <p className="text-sm text-slate-500">{helperText}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => append("" as PathValue<T, typeof name>)}
          disabled={!canAddMore}
          className={clsx(
            "inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer",
            !canAddMore &&
              "cursor-not-allowed opacity-50 bg-slate-300 text-slate-600 hover:bg-slate-300 ",
          )}
        >
          <Plus size={16} />
          Add More
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {fields.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            <p className="text-sm font-medium">
              Add gallery images to showcase the artist.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Use the Add More button to create image slots.
            </p>
          </div>
        ) : null}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Gallery image {index + 1}
                </p>
                <p className="text-xs text-slate-500">
                  Upload an image for the artist gallery.
                </p>
              </div>
              {fields.length > 1 ? (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 cursor-pointer"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              ) : null}
            </div>

            <div className="mt-4">
              <FileUploadField
                name={`${name}.${index}` as Path<T>}
                control={control}
                label={`Gallery image ${index + 1}`}
                error={undefined}
                required={required && index === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {error ? (
        <p className="mt-3 text-xs font-medium text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
