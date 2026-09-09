"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/_components/ui/Field/Field";
import { SelectField } from "@/_components/ui/Select/Select";
import { FileUploadField } from "@/_components/ui/Field/FileUploadField";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { useUI } from "@/providers/UIProvider";
import { InfluencerRequest } from "@/_types/Influencer.types";
import {
  InfluencerFormData,
  influencerSchema,
} from "@/_schemas/influencer.schema";

interface AddInfluencerFormProps {
  initialData?: InfluencerRequest;
  handleSubmit: (data: InfluencerFormData) => void;
  isEditMode: boolean;
}

export default function AddInfluencerForm({
  initialData,
  handleSubmit,
  isEditMode,
}: AddInfluencerFormProps) {
  const { closeDrawer } = useUI();

  const {
    register,
    handleSubmit: handleSubmitForm,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InfluencerFormData>({
    resolver: zodResolver(influencerSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      gender: "male",
      email: "",
      phone: "",
      address: {
        city: "",
        state: "",
        pincode: "",
      },
      instagramProfile: "",
      facebookProfile: "",
      youtubeChannel: "",
      termsAccepted: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        profilePicture: initialData.profilePicture || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        gender: (initialData.gender as "male" | "female" | "other") || "male",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: {
          city: initialData.address?.city || "",
          state: initialData.address?.state || "",
          pincode: initialData.address?.pincode || "",
        },
        instagramProfile: initialData.socialLinks?.instagram || "",
        facebookProfile: initialData.socialLinks?.facebook || "",
        youtubeChannel: initialData.socialLinks?.youtube || "",
        termsAccepted: true,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-8 p-8">
      {/* 1. Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary border-b pb-2">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="First Name"
            error={errors.firstName?.message}
            {...register("firstName")}
            required
          />

          <Field
            label="Last Name"
            error={errors.lastName?.message}
            {...register("lastName")}
            required
          />

          <SelectField
            label="Gender"
            error={errors.gender?.message}
            {...register("gender")}
            required
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />

          <FileUploadField
            name="profilePicture"
            control={control}
            label="Profile Picture"
            error={errors.profilePicture?.message}
            required
          />
        </div>
      </div>

      {/* 2. Contact Information */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary border-b pb-2">
          Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Email Address"
            type="email"
            error={errors.email?.message}
            {...register("email")}
            required
          />

          <Field
            label="Phone Number"
            type="tel"
            maxLength={10}
            error={errors.phone?.message}
            {...register("phone")}
            required
          />
        </div>
      </div>

      {/* 3. Address */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary border-b pb-2">
          Address Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Field
            label="City"
            error={errors.address?.city?.message}
            {...register("address.city")}
            required
          />

          <Field
            label="State"
            error={errors.address?.state?.message}
            {...register("address.state")}
            required
          />

          <Field
            label="Pincode"
            maxLength={10}
            error={errors.address?.pincode?.message}
            {...register("address.pincode")}
            required
          />
        </div>
      </div>

      {/* 4. Social Links */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary border-b pb-2">
          Social Links (Optional)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Field
            label="Instagram Profile"
            placeholder="https://instagram.com/..."
            error={errors.instagramProfile?.message}
            {...register("instagramProfile")}
          />

          <Field
            label="Facebook Profile"
            placeholder="https://facebook.com/..."
            error={errors.facebookProfile?.message}
            {...register("facebookProfile")}
          />

          <Field
            label="YouTube Channel"
            placeholder="https://youtube.com/..."
            error={errors.youtubeChannel?.message}
            {...register("youtubeChannel")}
          />
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="pt-2">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-600">
          <input
            type="checkbox"
            {...register("termsAccepted")}
            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary cursor-pointer"
          />
          <span>Confirm that the details provided are accurate and verified</span>
        </label>
        {errors.termsAccepted && (
          <p className="text-xs text-red-500 font-medium mt-1">
            {errors.termsAccepted.message}
          </p>
        )}
      </div>

      <FormActionButtons
        isSubmitting={isSubmitting}
        cancelOnClick={closeDrawer}
        submitLabel={isEditMode ? "Update Influencer" : "Add Influencer"}
      />
    </form>
  );
}
