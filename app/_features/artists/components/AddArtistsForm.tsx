"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/_components/ui/Field/Field";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import { GalleryUploadField } from "@/_components/ui/Field/GalleryUploadField";
import { FormTagsField } from "@/_components/ui/Field/FormTagsField";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { Artist } from "@/_types/Artists.types";
import { ArtistFormData, ArtistSchema } from "@/_schemas/Artists.schema";

interface AddArtistsFormProps {
  initialData?: Artist;
  handleSubmit: (data: ArtistFormData) => void;
  isEditMode: boolean;
}

export default function AddArtistsForm({
  initialData,
  handleSubmit,
  isEditMode,
}: AddArtistsFormProps) {
  const { closeDrawer } = useUI();

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArtistFormData>({
    resolver: zodResolver(ArtistSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      artistName: "",
      email: "",
      contactNo: "",
      instruments: [],
      startTime: "",
      endTime: "",
      profileImage: "",
      aboutArtist: "",
      galleryImages: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        artistName: initialData.artistName || "",
        email: initialData.email || "",
        contactNo: initialData.contactNo || "",
        instruments: initialData.instruments ?? [],
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
        profileImage: initialData.profileImage || "",
        galleryImages: initialData.galleryImages ?? [],
        aboutArtist: initialData.aboutArtist || "",
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="Artist Name"
          error={errors.artistName?.message as string}
          {...register("artistName")}
          required
        />

        <Field
          label="Email"
          type="email"
          error={errors.email?.message as string}
          {...register("email")}
          required
        />

        <Field
          label="Contact Number"
          type="tel"
          error={errors.contactNo?.message as string}
          {...register("contactNo")}
          required
          maxLength={10}
        />

        <FormTagsField
          name="instruments"
          control={control}
          label="Instruments"
          required
        />

        <Field
          label="Start Time"
          type="time"
          error={errors.startTime?.message as string}
          {...register("startTime")}
          required
        />

        <Field
          label="End Time"
          type="time"
          error={errors.endTime?.message as string}
          {...register("endTime")}
          required
        />

        <Field
          as="textarea"
          label="About Artist"
          error={errors.aboutArtist?.message as string}
          {...register("aboutArtist")}
          required
          inputClassName="min-h-48! h-full!"
        />

        <FileUploadField
          name="profileImage"
          control={control}
          label="Artist Profile Image"
          error={errors.profileImage?.message as string}
          required
        />
      </div>

      <GalleryUploadField
        name="galleryImages"
        control={control}
        label="Artist Gallery"
        helperText="Add supporting artist images. Use Add More to upload additional files."
        error={errors.galleryImages}
      />

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeDrawer}
        submitLabel={isEditMode ? "Update Artist" : "Create Artist"}
      />
    </form>
  );
}
