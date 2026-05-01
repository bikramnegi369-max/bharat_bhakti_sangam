"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/_components/ui/Field/Field";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { Venue } from "@/_types/Venue.types";
import { VenueFormData } from "@/_schemas/Venue.schema";

interface AddVenueFormProps {
  initialData?: Venue;
  handleSubmit: (data: VenueFormData) => void;
  isEditMode: boolean;
}

export default function AddVenueForm({
  initialData,
  handleSubmit,
  isEditMode,
}: AddVenueFormProps) {
  const { closeModal } = useUI();

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      venue: "",
      address: "",
      image: "",
      city: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        venue: initialData.venue || "",
        address: initialData.address || "",
        image: initialData.image || "",
        city: initialData.city || "",
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      <div className="grid grid-cols-1 gap-8">
        <Field
          label="Venue Name"
          error={errors.venue?.message as string}
          {...register("venue", {
            required: "Venue name is required",
          })}
          required
        />

        <Field
          label="Address"
          error={errors.address?.message as string}
          {...register("address", {
            required: "Address is required",
          })}
          required
        />

        <Field
          label="City"
          error={errors.city?.message as string}
          {...register("city")}
        />

        <FileUploadField
          name="image"
          control={control}
          label="Venue Image"
          error={errors.image?.message as string}
          required
        />
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeModal}
        submitLabel={isEditMode ? "Update Venue" : "Submit"}
      />
    </form>
  );
}
