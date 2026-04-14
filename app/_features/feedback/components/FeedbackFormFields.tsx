"use client";

import { useFormContext } from "react-hook-form";
import { Field } from "@/_components/ui/Field/Field";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import {
  FEEDBACK_FORM_CONTENT,
  FEEDBACK_LIMITS,
} from "@/_lib/constants/feedback.constants";

export function FeedbackFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FeedbackFormData>();

  return (
    <div
      className="space-y-8 lg:space-y-16 border-2 border-primary px-[clamp(1.375rem,calc(1.054rem+1.607vw),2.5rem)]
           py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)] rounded-lg shadow-2xl bg-white"
    >
      {/* Full Name */}
      <Field
        as="input"
        type="text"
        label={FEEDBACK_FORM_CONTENT.fields.fullName.label}
        placeholder={FEEDBACK_FORM_CONTENT.fields.fullName.placeholder}
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      {/* Email */}
      <Field
        as="input"
        type="email"
        label={FEEDBACK_FORM_CONTENT.fields.email.label}
        placeholder={FEEDBACK_FORM_CONTENT.fields.email.placeholder}
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Feedback */}
      <Field
        as="textarea"
        rows={5}
        label={FEEDBACK_FORM_CONTENT.fields.feedback.label}
        placeholder={FEEDBACK_FORM_CONTENT.fields.feedback.placeholder}
        error={errors.feedback?.message}
        maxLength={FEEDBACK_LIMITS.feedbackMaxLength}
        {...register("feedback")}
      />
    </div>
  );
}
