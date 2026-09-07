"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Field } from "@/_components/ui/Field/Field";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { EventBookingType } from "@/_types/EventBookingType.types";
import {
  EventBookingTypeSchema,
  EventBookingTypeFormData,
  EventBookingTypeFormInput,
} from "@/_schemas/EventBookingType.schema";

interface EventBookingTypesFormProps {
  initialData?: EventBookingType;
  handleSubmit: (data: EventBookingTypeFormData) => void;
  isEditMode: boolean;
}

export default function EventBookingTypesForm({
  initialData,
  handleSubmit,
  isEditMode,
}: EventBookingTypesFormProps) {
  const { closeModal } = useUI();

  const {
    register,
    control,
    handleSubmit: handleSubmitForm,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventBookingTypeFormInput, any, EventBookingTypeFormData>({
    resolver: zodResolver(EventBookingTypeSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      bookingType: "",
      price: 0,
      subtitle: "",
      isPopular: false,
      features: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" as never,
  });

  const isPopularValue = watch("isPopular");

  useEffect(() => {
    if (initialData) {
      const initialFeatures =
        Array.isArray(initialData.features) && initialData.features.length > 0
          ? initialData.features
          : [""];

      reset({
        bookingType: initialData.bookingType || "",
        price: initialData.price || 0,
        subtitle: initialData.subtitle || "",
        isPopular: Boolean(initialData.isPopular),
        features: initialFeatures,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmitForm((data) => {
        // Filter out empty perk strings before sending
        const sanitizedData: EventBookingTypeFormData = {
          ...data,
          features: (data.features || []).filter(
            (f) => typeof f === "string" && f.trim().length > 0,
          ),
        };
        handleSubmit(sanitizedData);
      })}
      className="space-y-6 p-6 sm:p-8 max-h-[80vh] overflow-y-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Booking Type (e.g. VIP Pass)"
          error={errors.bookingType?.message}
          {...register("bookingType")}
          placeholder="e.g. VIP PASS"
          required
        />

        <Field
          label="Price (₹)"
          error={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
          type="number"
          step="1"
          min="0"
          placeholder="e.g. 999"
          required
        />
      </div>

      <Field
        label="Subtitle / Short Pitch"
        error={errors.subtitle?.message}
        {...register("subtitle")}
        placeholder="e.g. Best Experience & Front Seating"
      />

      {/* Most Popular Highlight Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-amber-50/40">
        <div className="space-y-0.5">
          <label
            htmlFor="isPopular-toggle"
            className="text-sm font-semibold text-gray-800 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Highlight as &ldquo;Most Popular&rdquo;</span>
          </label>
          <p className="text-xs text-gray-500">
            Enables golden ribbon badge and glow border on the marketing event
            and booking page.
          </p>
        </div>

        <input
          id="isPopular-toggle"
          type="checkbox"
          checked={isPopularValue}
          onChange={(e) => setValue("isPopular", e.target.checked)}
          className="w-5 h-5 accent-[#740E0A] rounded cursor-pointer"
        />
      </div>

      {/* Dynamic Features / Perks Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Features &amp; Perks List
            </label>
            <p className="text-xs text-gray-500">
              Add bullet perks shown on the pass card (e.g. Front Seating,
              Prasadam Kit).
            </p>
          </div>

          <button
            type="button"
            onClick={() => append("" as never)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#740E0A] hover:text-[#5A0E0B] px-3 py-1.5 rounded-lg border border-[#740E0A]/30 hover:bg-[#740E0A]/5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Perk</span>
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="p-4 rounded-lg border border-dashed border-gray-300 text-center text-xs text-gray-400">
            No perks added yet. Click &ldquo;Add Perk&rdquo; above.
          </div>
        ) : (
          <div className="space-y-2.5">
            {fields.map((field, idx) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  {...register(`features.${idx}` as const)}
                  placeholder={`Perk #${idx + 1} (e.g. Front Stage Seating)`}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove perk"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeModal}
        submitLabel={isEditMode ? "Update Booking Type" : "Add Booking Type"}
      />
    </form>
  );
}
