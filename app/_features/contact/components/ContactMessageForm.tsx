"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import { ContactFormData, contactSchema } from "@/_schemas/contact.schema";
import { useContactForm } from "@/_hooks/useContactForm";
import { contactSubjectOptions } from "@/_config/contact.data";
import { sendGAEvent } from "@next/third-parties/google";
import { trackMetaPixel } from "@/_lib/meta-pixel";

export function ContactMessageForm() {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      query: "",
    },
  });

  const { handleSubmit: submitForm, isSubmitting, status, errorMessage, reset } =
    useContactForm();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "success") {
      sendGAEvent("event", "contact_form_submitted", {
        form_name: "contact_form",
        page_path: "/contact",
      });
      trackMetaPixel("Contact", {
        content_name: "Contact Form",
        content_category: "contact",
      });
    }

    if ((status === "success" || status === "error") && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  const handleRetry = () => {
    reset();
    resetForm();
  };

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
    <div
      ref={containerRef}
      className={clsx(
        "w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10",
        "border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)]",
        "flex flex-col justify-between",
      )}
    >
      {status === "success" ? (
        <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center space-y-4 my-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
            <CheckCircle2 size={30} />
          </div>
          <h3
            className={clsx(
              playfair.className,
              "text-2xl sm:text-3xl font-bold text-neutral-900",
            )}
          >
            Message Sent!
          </h3>
          <p
            className={clsx(
              poppins.className,
              "text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed",
            )}
          >
            Thank you for reaching out to Bharat Bhakti Sangam. Our team will get
            back to you shortly.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className={clsx(
              poppins.className,
              "mt-3 px-6 py-2.5 bg-[#8A110D] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#720E0B] transition-colors cursor-pointer",
            )}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-4 sm:space-y-5"
          noValidate
        >
          {/* Header Title with Golden Accent */}
          <div className="text-center pb-2">
            <h3
              className={clsx(
                playfair.className,
                "text-2xl sm:text-[1.75rem] font-bold text-[#8A110D] tracking-tight",
              )}
            >
              Send Us a Message
            </h3>
            <div
              aria-hidden="true"
              className="w-12 h-0.75 bg-[#D4AF37] mx-auto mt-2 rounded-full"
            />
          </div>

          {status === "error" && errorMessage && (
            <div
              role="alert"
              className="p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Submission failed</p>
                <p className="text-[11px] sm:text-xs text-red-600 mt-0.5">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* Row 1: Full Name & Email Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                {...register("fullName")}
                className={inputClass(!!errors.fullName)}
              />
              {errors.fullName && (
                <p className="text-[10.5px] text-red-500 font-medium mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email address"
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

          {/* Row 2: Phone Number & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                maxLength={10}
                placeholder="Your phone number"
                {...register("phone")}
                className={inputClass(!!errors.phone)}
              />
              {errors.phone && (
                <p className="text-[10.5px] text-red-500 font-medium mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>
              <div className="relative w-full">
                <select
                  id="subject"
                  {...register("subject")}
                  defaultValue=""
                  className={clsx(
                    inputClass(!!errors.subject),
                    "w-full appearance-none pr-9 cursor-pointer",
                  )}
                >
                  <option value="" disabled className="text-stone-400">
                    Select a subject
                  </option>
                  {contactSubjectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                  size={16}
                />
              </div>
              {errors.subject && (
                <p className="text-[10.5px] text-red-500 font-medium mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div>
            <label htmlFor="query" className={labelClass}>
              Message
            </label>
            <textarea
              id="query"
              rows={4}
              placeholder="How can we help you?"
              {...register("query")}
              className={clsx(
                poppins.className,
                "w-full p-3.5 sm:p-4 text-xs sm:text-[13px] rounded-lg sm:rounded-xl border bg-stone-50/50 text-stone-800 placeholder:text-stone-400 placeholder:font-normal focus:bg-white focus:outline-none transition-all duration-200 resize-none min-h-28",
                errors.query
                  ? "border-red-400 bg-red-50/20 ring-1 ring-red-300"
                  : "border-stone-200/90 hover:border-stone-300 focus:border-[#8A110D]/40 focus:shadow-xs",
              )}
            />
            {errors.query && (
              <p className="text-[10.5px] text-red-500 font-medium mt-1">
                {errors.query.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                poppins.className,
                "w-full h-11 sm:h-12 px-6 rounded-xl sm:rounded-2xl bg-[#68110D] hover:bg-[#520c09] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer",
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={15} strokeWidth={2.2} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
