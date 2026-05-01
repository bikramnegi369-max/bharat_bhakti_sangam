"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/_components/ui/Field/Field";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { EventCategory } from "@/_types/EventCategories.types";
import { EventCategoryFormData } from "@/_schemas/EventCategories.schema";

interface AddEventCategoryFormProps {
  initialData?: EventCategory;
  handleSubmit: (data: EventCategoryFormData) => void;
  isEditMode: boolean;
}

export default function AddEventCategoryForm({
  initialData,
  handleSubmit,
  isEditMode,
}: AddEventCategoryFormProps) {
  const { closeModal } = useUI();

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      categoryName: "",
      picture: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        categoryName: initialData.categoryName || "",
        picture: initialData.picture || "",
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      <div className="grid grid-cols-1 gap-8">
        <Field
          label="Category Name"
          error={errors.categoryName?.message as string}
          {...register("categoryName", {
            required: "Category name is required",
          })}
          required
        />

        <FileUploadField
          name="picture"
          control={control}
          label="Category Picture"
          error={errors.picture?.message as string}
          required
        />
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeModal}
        submitLabel={isEditMode ? "Update Category" : "Submit"}
      />
    </form>
  );
}
