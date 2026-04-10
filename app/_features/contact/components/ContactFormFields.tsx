"use client";

import { useFormContext } from "react-hook-form";
import { Field } from "@/_components/ui/Field/Field";
import { ContactFormData } from "@/_schemas/contact.schema";
import { CONTACT_CONTENT } from "@/_lib/constants/contact.constants";
import { CONTACT_FORM_LIMITS } from "@/_config/contact.config";

export function ContactFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactFormData>();

  return (
    <div className="space-y-8 lg:space-y-16">
      {/* Full Name */}
      <Field
        as="input"
        type="text"
        label={CONTACT_CONTENT.form.fullNameLabel}
        placeholder={CONTACT_CONTENT.form.fullNamePlaceholder}
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      {/* Email */}
      <Field
        as="input"
        type="email"
        label={CONTACT_CONTENT.form.emailLabel}
        placeholder={CONTACT_CONTENT.form.emailPlaceholder}
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Phone */}
      <Field
        as="input"
        type="tel"
        label={CONTACT_CONTENT.form.phoneLabel}
        placeholder={CONTACT_CONTENT.form.phonePlaceholder}
        error={errors.phone?.message}
        maxLength={CONTACT_FORM_LIMITS.phoneMaxLength}
        {...register("phone")}
      />

      {/* Query */}
      <Field
        as="textarea"
        rows={5}
        label={CONTACT_CONTENT.form.queryLabel}
        placeholder={CONTACT_CONTENT.form.queryPlaceholder}
        error={errors.query?.message}
        maxLength={CONTACT_FORM_LIMITS.queryMaxLength}
        {...register("query")}
      />
    </div>
  );
}
