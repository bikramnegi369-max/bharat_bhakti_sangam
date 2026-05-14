"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { Field } from "@/_components/ui/Field/Field";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import {
  CalenderEntryFormData,
  CalenderEntrySchema,
} from "@/_schemas/calenderEntry.schema";
import { CalenderEntry } from "@/_types/CalenderEntry.types";
import { useUI } from "@/providers/UIProvider";
import {
  deriveMonthFromDate,
  deriveDayFromDate,
  CALENDER_DAYS,
  normalizeCalenderDateInput,
} from "@/_lib/helpers/calender.helper";

interface CreateCalenderEntryFormProps {
  initialData?: CalenderEntry;
  handleSubmit: (data: CalenderEntryFormData) => void;
  isEditMode: boolean;
}

export default function CreateCalenderEntryForm({
  initialData,
  handleSubmit,
  isEditMode,
}: CreateCalenderEntryFormProps) {
  const { closeDrawer } = useUI();

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CalenderEntryFormData>({
    resolver: zodResolver(CalenderEntrySchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      festival: "",
      image: "",
      month: "",
      day: "",
      date: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      const normalizedDate = normalizeCalenderDateInput(initialData.date);

      reset({
        festival: initialData.festival || "",
        image: initialData.image || "",
        date: normalizedDate,
        month: deriveMonthFromDate(normalizedDate) || initialData.month || "",
        day: deriveDayFromDate(normalizedDate) || initialData.day || "",
      });
    }
  }, [initialData, reset]);

  const selectedDate = useWatch({
    control,
    name: "date",
  });

  const selectedMonth = useWatch({
    control,
    name: "month",
  });

  const selectedDay = useWatch({
    control,
    name: "day",
  });

  useEffect(() => {
    const derivedMonth = deriveMonthFromDate(selectedDate);
    const derivedDay = deriveDayFromDate(selectedDate);

    if (selectedMonth !== derivedMonth) {
      setValue("month", derivedMonth, {
        shouldValidate: Boolean(selectedDate),
        shouldDirty: false,
      });
    }
    if (selectedDay !== derivedDay) {
      setValue("day", derivedDay, {
        shouldValidate: Boolean(selectedDate),
        shouldDirty: false,
      });
    }
  }, [selectedDate, selectedMonth, selectedDay, setValue]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Field
          label="Festival"
          error={errors.festival?.message}
          {...register("festival")}
          placeholder="Enter festival name"
          required
        />

        <Field
          label="Festival Date"
          type="date"
          error={errors.date?.message}
          {...register("date")}
          required
        />

        <Field
          label="Month"
          error={errors.month?.message}
          {...register("month")}
          placeholder="Month will be derived from the selected date"
          helperText="Month is auto-filled from the festival date to keep records consistent."
          readOnly
          required
        />

        <Field
          label="Day"
          error={errors.day?.message}
          {...register("day")}
          placeholder="Day will be derived from the selected date"
          helperText="Day is auto-filled from the festival date to keep records consistent."
          readOnly
          required
        />
        <div className="lg:col-span-2">
          <FileUploadField
            name="image"
            control={control}
            label="Festival Image"
            error={errors.image?.message}
            helperText="Upload a clear festival cover image for the calendar listing."
            required
          />
        </div>
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeDrawer}
        submitLabel={
          isEditMode ? "Update Calender Entry" : "Create Calender Entry"
        }
      />
    </form>
  );
}
