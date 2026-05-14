"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/_components/ui/Field/Field";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { EventBookingType } from "@/_types/EventBookingType.types";
import {
  EventBookingTypeSchema,
  EventBookingTypeFormData,
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
    handleSubmit: handleSubmitForm,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventBookingTypeFormData>({
    resolver: zodResolver(EventBookingTypeSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      bookingType: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        bookingType: initialData.bookingType || "",
        price: initialData.price || 0,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      <div className="grid grid-cols-1 gap-8">
        <Field
          label="Booking Type"
          error={errors.bookingType?.message}
          {...register("bookingType")}
          placeholder="Enter booking type"
          required
        />

        <Field
          label="Price"
          error={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter price"
          required
        />
      </div>
      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeModal}
        submitLabel={isEditMode ? "Update Booking Type" : "Add Booking Type"}
      />
    </form>
  );
}
