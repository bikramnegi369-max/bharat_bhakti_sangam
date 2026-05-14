"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field } from "@/_components/ui/Field/Field";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { Volunteer } from "@/_types/Volunteer.types";
import {
  VolunteerFormData,
  VolunteerSchema,
} from "@/_schemas/Volunteer.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddVolunteerFormProps {
  initialData?: Volunteer;
  handleSubmit: (data: VolunteerFormData) => void;
  isEditMode: boolean;
}

export default function AddVolunteerForm({
  initialData,
  handleSubmit,
  isEditMode,
}: AddVolunteerFormProps) {
  const { closeDrawer } = useUI();

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(VolunteerSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      role: "",
      email: "",
      contact: "",
      profilePicture: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        role: initialData.role || "",
        email: initialData.email || "",
        contact: initialData.contact || "",
        profilePicture: initialData.profilePicture || "",
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Field
          label="Name"
          error={errors.name?.message as string}
          {...register("name", {
            required: "Volunteer name is required",
          })}
          required
        />

        <Field
          label="Role"
          error={errors.role?.message as string}
          {...register("role", {
            required: "Role is required",
          })}
          required
        />

        <Field
          label="Email"
          type="email"
          error={errors.email?.message as string}
          {...register("email", {
            required: "Email is required",
          })}
          required
        />

        <Field
          label="Contact"
          type="tel"
          error={errors.contact?.message as string}
          {...register("contact", {
            required: "Contact number is required",
          })}
          required
          maxLength={10}
        />

        <FileUploadField
          name="profilePicture"
          control={control}
          label="Profile Picture"
          error={errors.profilePicture?.message as string}
          required
        />
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeDrawer}
        submitLabel={isEditMode ? "Update Volunteer" : "Create Volunteer"}
      />
    </form>
  );
}
