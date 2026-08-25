"use client";

import { useFormContext } from "react-hook-form";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import {
  FEEDBACK_FORM_CONTENT,
  FEEDBACK_LIMITS,
} from "@/_lib/constants/feedback.constants";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import clsx from "clsx";
import { User, Mail, MessageSquare } from "lucide-react";

export function FeedbackFormFields() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FeedbackFormData>();

  const feedbackText = watch("feedback") || "";
  const remainingChars = FEEDBACK_LIMITS.feedbackMaxLength - feedbackText.length;

  const labelClass = clsx(
    poppins.className,
    "block text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold text-stone-700 mb-1.5 tracking-tight",
  );

  const inputClass = (hasError?: boolean) =>
    clsx(
      poppins.className,
      "w-full h-10 sm:h-10.5 md:h-11 px-3.5 sm:px-4 text-xs sm:text-[13px] rounded-lg sm:rounded-xl border bg-stone-50/50 text-stone-800 placeholder:text-stone-400 placeholder:font-normal focus:bg-white focus:outline-none transition-all duration-200",
      hasError
        ? "border-red-400 bg-red-50/20 ring-1 ring-red-300"
        : "border-stone-200/90 hover:border-stone-300 focus:border-[#8A110D]/40 focus:shadow-xs",
    );

  return (
    <ScrollReveal animation="fade-up" duration={700} delay={120}>
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-5 sm:space-y-6 transition-shadow duration-300 hover:shadow-[0_15px_45px_rgba(116,14,10,0.06)]">
        {/* Form Fields Section Header */}
        <div className="text-center sm:text-left pb-1">
          <h2
            className={`${playfair.className} text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-heading tracking-tight`}
          >
            Your Information & Review
          </h2>
          <p
            className={`${poppins.className} mt-1 text-xs sm:text-[13px] text-stone-500 font-normal`}
          >
            Help us serve our spiritual community better with your honest feedback
          </p>
          <div
            aria-hidden="true"
            className="w-12 h-0.5 bg-[#D4AF37] mt-2.5 rounded-full"
          />
        </div>

        {/* Full Name & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={labelClass}>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                {FEEDBACK_FORM_CONTENT.fields.fullName.label}
              </span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder={FEEDBACK_FORM_CONTENT.fields.fullName.placeholder}
              {...register("fullName")}
              className={inputClass(!!errors.fullName)}
            />
            {errors.fullName && (
              <p className="text-[10.5px] text-red-500 font-medium mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                {FEEDBACK_FORM_CONTENT.fields.email.label}
              </span>
            </label>
            <input
              id="email"
              type="email"
              placeholder={FEEDBACK_FORM_CONTENT.fields.email.placeholder}
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            {errors.email && (
              <p className="text-[10.5px] text-red-500 font-medium mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Feedback Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="feedback" className={labelClass}>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                {FEEDBACK_FORM_CONTENT.fields.feedback.label}
              </span>
            </label>
            <span className="text-[10.5px] text-stone-400 font-normal">
              {remainingChars} characters remaining
            </span>
          </div>
          <textarea
            id="feedback"
            rows={5}
            placeholder={FEEDBACK_FORM_CONTENT.fields.feedback.placeholder}
            maxLength={FEEDBACK_LIMITS.feedbackMaxLength}
            {...register("feedback")}
            className={clsx(
              poppins.className,
              "w-full p-3.5 sm:p-4 text-xs sm:text-[13px] rounded-lg sm:rounded-xl border bg-stone-50/50 text-stone-800 placeholder:text-stone-400 placeholder:font-normal focus:bg-white focus:outline-none transition-all duration-200 resize-none min-h-32",
              errors.feedback
                ? "border-red-400 bg-red-50/20 ring-1 ring-red-300"
                : "border-stone-200/90 hover:border-stone-300 focus:border-[#8A110D]/40 focus:shadow-xs",
            )}
          />
          {errors.feedback && (
            <p className="text-[10.5px] text-red-500 font-medium mt-1">
              {errors.feedback.message}
            </p>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
