"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/_components/ui/Field/Field";
import { SelectField } from "@/_components/ui/Select/Select";
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
      firstName: "",
      lastName: "",
      gender: undefined,
      role: "",
      email: "",
      contactNo: "",
      address: {
        city: "",
        state: "",
        pincode: "",
      },
      socialLinks: {
        instagram: "",
        youtube: "",
        facebook: "",
      },
      instruments: [],
      startTime: "",
      endTime: "",
      profileImage: "",
      aboutArtist: "",
      galleryImages: [],
      status: "approved",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        artistName: initialData.artistName || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        gender: (initialData.gender as "male" | "female" | "other") || undefined,
        role: initialData.role || "",
        email: initialData.email || "",
        contactNo: initialData.contactNo || initialData.phone || "",
        address: {
          city: initialData.address?.city || "",
          state: initialData.address?.state || "",
          pincode: initialData.address?.pincode || "",
        },
        socialLinks: {
          instagram: initialData.socialLinks?.instagram || "",
          youtube: initialData.socialLinks?.youtube || "",
          facebook: initialData.socialLinks?.facebook || "",
        },
        instruments: initialData.instruments ?? [],
        startTime: initialData.startTime || "",
        endTime: initialData.endTime || "",
        profileImage: initialData.profileImage || "",
        galleryImages: initialData.galleryImages ?? [],
        aboutArtist: initialData.aboutArtist || "",
        status: (initialData.status as "pending" | "approved" | "rejected") || "approved",
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-6 md:p-8">
      {/* 1. Personal Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#740E0A] border-b pb-2">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field
            label="First Name"
            placeholder="e.g. Rahul"
            error={errors.firstName?.message as string}
            {...register("firstName")}
          />

          <Field
            label="Last Name"
            placeholder="e.g. Sharma"
            error={errors.lastName?.message as string}
            {...register("lastName")}
          />

          <SelectField
            label="Gender"
            error={errors.gender?.message as string}
            {...register("gender")}
            options={[
              { label: "Select gender", value: "" },
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
        </div>
      </div>

      {/* 2. Artist / Stage Persona */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#740E0A] border-b pb-2">
          Artist & Stage Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Artist / Stage Name"
            placeholder="e.g. Pt. Rahul Sharma or Bhakti Band"
            error={errors.artistName?.message as string}
            {...register("artistName")}
            required
          />

          <Field
            label="Performance Role / Genre"
            placeholder="e.g. Lead Bhajan Vocalist, Tabla Master"
            error={errors.role?.message as string}
            {...register("role")}
            required
          />

          <div className="md:col-span-2">
            <FormTagsField
              name="instruments"
              control={control}
              label="Instruments / Specialities (Optional)"
              placeholder="Type instrument (e.g. Harmonium, Dholak) and press Enter"
            />
          </div>

          <div className="md:col-span-2">
            <Field
              as="textarea"
              label="About Artist (Bio)"
              placeholder="Provide a detailed biography of the artist's musical journey and spiritual devotion..."
              error={errors.aboutArtist?.message as string}
              {...register("aboutArtist")}
              required
              inputClassName="min-h-32!"
            />
          </div>
        </div>
      </div>

      {/* 3. Performance Schedule */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#740E0A] border-b pb-2">
          Performance Schedule (Optional)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Set Start Time"
            type="time"
            error={errors.startTime?.message as string}
            {...register("startTime")}
          />

          <Field
            label="Set End Time"
            type="time"
            error={errors.endTime?.message as string}
            {...register("endTime")}
          />
        </div>
      </div>

      {/* 4. Contact Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#740E0A] border-b pb-2">
          Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Email Address"
            type="email"
            placeholder="artist@example.com"
            error={errors.email?.message as string}
            {...register("email")}
            required
          />

          <Field
            label="Contact Number (+91)"
            type="tel"
            placeholder="9876543210"
            error={errors.contactNo?.message as string}
            {...register("contactNo")}
            required
            maxLength={10}
          />
        </div>
      </div>

      {/* 5. Address Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#740E0A] border-b pb-2">
          Address Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field
            label="City"
            placeholder="e.g. Varanasi"
            error={errors.address?.city?.message as string}
            {...register("address.city")}
          />

          <Field
            label="State"
            placeholder="e.g. Uttar Pradesh"
            error={errors.address?.state?.message as string}
            {...register("address.state")}
          />

          <Field
            label="Pincode"
            placeholder="e.g. 221001"
            maxLength={10}
            error={errors.address?.pincode?.message as string}
            {...register("address.pincode")}
          />
        </div>
      </div>

      {/* 6. Social Profiles */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#740E0A] border-b pb-2">
          Social Profiles (Optional)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field
            label="Instagram Profile"
            placeholder="https://instagram.com/..."
            error={errors.socialLinks?.instagram?.message as string}
            {...register("socialLinks.instagram")}
          />

          <Field
            label="Facebook Profile"
            placeholder="https://facebook.com/..."
            error={errors.socialLinks?.facebook?.message as string}
            {...register("socialLinks.facebook")}
          />

          <Field
            label="YouTube Channel"
            placeholder="https://youtube.com/..."
            error={errors.socialLinks?.youtube?.message as string}
            {...register("socialLinks.youtube")}
          />
        </div>
      </div>

      {/* 7. Media & Profile Imagery */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#740E0A] border-b pb-2">
          Artist Imagery & Portfolio
        </h3>

        <div className="grid grid-cols-1 gap-6">
          <FileUploadField
            name="profileImage"
            control={control}
            label="Profile / Avatar Image"
            error={errors.profileImage?.message as string}
            required
          />

          <GalleryUploadField
            name="galleryImages"
            control={control}
            label="Performance Gallery & Highlights"
            helperText="Add supporting performance photos or stage highlights."
            error={errors.galleryImages}
          />
        </div>
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeDrawer}
        submitLabel={isEditMode ? "Update Artist" : "Create Artist"}
      />
    </form>
  );
}
