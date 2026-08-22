"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Phone,
  MapPin,
  Link as LinkIcon,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import {
  CreatorApplicationFormData,
  creatorApplicationSchema,
} from "@/_schemas/creatorApplication.schema";
import { APIResponse } from "@/_types/Api.types";
import { ProfilePictureUpload } from "./ProfilePictureUpload";

export interface CreatorFormSectionProps {
  sidebarTitle?: string;
  sidebarDescription?: string;
  sidebarQuote?: string;
  submitButtonText?: string;
  submittingButtonText?: string;
  successTitle?: string;
  successDescription?: string;
  onSubmit: (data: CreatorApplicationFormData) => Promise<APIResponse>;
  className?: string;
}

export default function CreatorFormSection({
  sidebarTitle = "Your Talent Can\nInspire Millions",
  sidebarDescription = "Join Bharat Bhakti Sangam and let your art become a medium of devotion.",
  sidebarQuote = "Where talent meets devotion, memories are created for life.",
  submitButtonText = "Submit Application",
  submittingButtonText = "Submitting Application...",
  successTitle = "Application Submitted!",
  successDescription = "Thank you for joining hands with Bharat Bhakti Sangam. Our team will review your application and get in touch with you shortly.",
  onSubmit,
  className,
}: CreatorFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatorApplicationFormData>({
    resolver: zodResolver(creatorApplicationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      gender: undefined,
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
      termsAccepted: false,
    },
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if ((status === "success" || status === "error") && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  const onFormSubmit = async (data: CreatorApplicationFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const res = await onSubmit(data);

      if (res.success) {
        setStatus("success");
      } else {
        setErrorMessage(
          res.error || "Failed to submit your request. Please try again.",
        );
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
      setErrorMessage("Something unexpected happened. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    reset();
    setStatus("idle");
    setErrorMessage(null);
  };

  const labelClass = clsx(
    poppins.className,
    "block text-[11px] sm:text-[11.5px] lg:text-[12px] font-semibold text-stone-700 mb-1 tracking-tight",
  );

  const inputClass = (hasError?: boolean) =>
    clsx(
      poppins.className,
      "w-full h-10 sm:h-10.5 md:h-11 px-3.5 sm:px-4 text-xs sm:text-[13px] rounded-lg sm:rounded-xl border bg-stone-50/40 text-stone-800 placeholder:text-stone-400 placeholder:font-normal focus:bg-white focus:outline-none transition-all duration-200",
      hasError
        ? "border-red-400 bg-red-50/20 ring-1 ring-red-300"
        : "border-stone-200/90 hover:border-stone-300 focus:border-stone-400 focus:shadow-xs",
    );

  return (
    <section
      ref={containerRef}
      aria-labelledby="creator-form-heading"
      className={clsx(
        "relative w-full py-8 sm:py-12 md:py-16 lg:py-20",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Card Container */}
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-neutral-100/90 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Maroon Branding Column (30% on lg / 1024px) */}
          <div className="w-full lg:w-[32%] xl:w-[30%] bg-[#68110D] text-white p-6 sm:p-8 md:p-10 lg:p-9 xl:p-11 flex flex-col justify-between relative overflow-hidden shrink-0 min-h-105 sm:min-h-115 lg:min-h-full">
            <div
              aria-hidden="true"
              className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-24 w-72 h-72 bg-black/20 rounded-full blur-3xl pointer-events-none"
            />

            {/* Top Text Block */}
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <h2
                id="creator-form-heading"
                className={clsx(
                  playfair.className,
                  "text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.2rem] font-bold text-white leading-[1.2] whitespace-pre-line tracking-tight",
                )}
              >
                {sidebarTitle}
              </h2>

              <div
                aria-hidden="true"
                className="w-12 h-1 bg-[#D4AF37] rounded-full mt-2.5 mb-3.5"
              />

              <p
                className={clsx(
                  poppins.className,
                  "text-white/80 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed font-light max-w-xs",
                )}
              >
                {sidebarDescription}
              </p>
            </div>

            {/* Center Sacred Veena & Golden Emblem Illustration */}
            <div className="relative z-10 flex flex-col items-center justify-center my-6 sm:my-8 lg:my-9">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-44 lg:h-44 xl:w-52 xl:h-52 filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] opacity-95 transition-transform duration-500 hover:scale-105">
                <Image
                  src="/influencer_form_img.webp"
                  alt="Bharat Bhakti Sangam sacred instrument emblem"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 230px"
                  priority
                />
              </div>
            </div>

            {/* Bottom Quote Block */}
            <div className="relative z-10 pt-1 sm:pt-2">
              <span
                aria-hidden="true"
                className={clsx(
                  playfair.className,
                  "text-2xl sm:text-3xl text-[#D4AF37]/60 leading-none select-none",
                )}
              >
                “
              </span>
              <p
                className={clsx(
                  playfair.className,
                  "text-xs sm:text-[13px] lg:text-[13.5px] text-white/90 italic font-normal leading-relaxed -mt-2",
                )}
              >
                {sidebarQuote}
              </p>
            </div>
          </div>

          {/* Right Form Fields Column (70% on lg / 1024px) */}
          <div className="w-full lg:w-[68%] xl:w-[70%] p-5 sm:p-7 md:p-9 lg:p-8 xl:p-11 bg-white flex flex-col justify-between">
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
                  {successTitle}
                </h3>
                <p
                  className={clsx(
                    poppins.className,
                    "text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed",
                  )}
                >
                  {successDescription}
                </p>
                <button
                  type="button"
                  onClick={handleResetSuccess}
                  className={clsx(
                    poppins.className,
                    "mt-3 px-6 py-2.5 bg-[#8A110D] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#720E0B] transition-colors cursor-pointer",
                  )}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="space-y-6 sm:space-y-7"
                noValidate
              >
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

                {/* Section 1: Personal Information */}
                <div className="space-y-3 sm:space-y-3.5">
                  <div className="flex items-center gap-2 text-[#740E0A]">
                    <User size={16} strokeWidth={2.4} />
                    <h3
                      className={clsx(
                        poppins.className,
                        "text-[11.5px] sm:text-xs md:text-[13px] font-bold tracking-[0.12em] uppercase text-[#68110D]",
                      )}
                    >
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-4.5 items-stretch">
                    {/* Profile Picture Uploader (Left Column) */}
                    <div className="md:col-span-6 h-full">
                      <ProfilePictureUpload
                        name="profilePicture"
                        control={control}
                        label="Profile Picture"
                        error={errors.profilePicture?.message}
                        required
                      />
                    </div>

                    {/* First Name, Last Name, Gender (Right Column) */}
                    <div className="md:col-span-6 flex flex-col justify-between gap-2.5 sm:gap-3">
                      {/* First Name */}
                      <div className="w-full">
                        <label htmlFor="firstName" className={labelClass}>
                          First Name <span className="text-stone-700">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="Enter first name"
                          {...register("firstName")}
                          className={inputClass(!!errors.firstName)}
                        />
                        {errors.firstName && (
                          <p className="text-[10.5px] text-red-500 font-medium mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="w-full">
                        <label htmlFor="lastName" className={labelClass}>
                          Last Name <span className="text-stone-700">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Enter last name"
                          {...register("lastName")}
                          className={inputClass(!!errors.lastName)}
                        />
                        {errors.lastName && (
                          <p className="text-[10.5px] text-red-500 font-medium mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>

                      {/* Gender Select */}
                      <div className="w-full">
                        <label htmlFor="gender" className={labelClass}>
                          Gender <span className="text-stone-700">*</span>
                        </label>
                        <div className="relative w-full">
                          <select
                            id="gender"
                            {...register("gender")}
                            defaultValue=""
                            className={clsx(
                              inputClass(!!errors.gender),
                              "w-full appearance-none pr-9 cursor-pointer",
                            )}
                          >
                            <option
                              value=""
                              disabled
                              className="text-stone-400"
                            >
                              Select gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <ChevronDown
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                            size={16}
                          />
                        </div>
                        {errors.gender && (
                          <p className="text-[10.5px] text-red-500 font-medium mt-1">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact Information */}
                <div className="space-y-3 sm:space-y-3.5 pt-1">
                  <div className="flex items-center gap-2 text-[#740E0A]">
                    <Phone size={16} strokeWidth={2.4} />
                    <h3
                      className={clsx(
                        poppins.className,
                        "text-[11.5px] sm:text-xs md:text-[13px] font-bold tracking-[0.12em] uppercase text-[#68110D]",
                      )}
                    >
                      Contact Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-4.5">
                    {/* Email */}
                    <div className="md:col-span-6">
                      <label htmlFor="email" className={labelClass}>
                        Email Address <span className="text-stone-700">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        className={inputClass(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="text-[10.5px] text-red-500 font-medium mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number with country prefix */}
                    <div className="md:col-span-6">
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number <span className="text-stone-700">*</span>
                      </label>
                      <div
                        className={clsx(
                          "flex items-center w-full h-10 sm:h-10.5 md:h-11 rounded-lg sm:rounded-xl border bg-stone-50/40 overflow-hidden transition-all duration-200 focus-within:bg-white focus-within:border-stone-400 focus-within:shadow-xs",
                          errors.phone
                            ? "border-red-400 bg-red-50/20 ring-1 ring-red-300"
                            : "border-stone-200/90 hover:border-stone-300",
                        )}
                      >
                        <div className="flex items-center gap-1 px-3 border-r border-stone-200 bg-stone-100/70 text-stone-700 text-xs font-semibold select-none h-full">
                          <span>+91</span>
                          <ChevronDown size={13} className="text-stone-400" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          maxLength={10}
                          placeholder="Enter your phone number"
                          {...register("phone")}
                          className={clsx(
                            poppins.className,
                            "w-full px-3.5 text-xs sm:text-[13px] text-stone-800 placeholder:text-stone-400 placeholder:font-normal focus:outline-none bg-transparent",
                          )}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[10.5px] text-red-500 font-medium mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Address */}
                <div className="space-y-3 sm:space-y-3.5 pt-1">
                  <div className="flex items-center gap-2 text-[#740E0A]">
                    <MapPin size={16} strokeWidth={2.4} />
                    <h3
                      className={clsx(
                        poppins.className,
                        "text-[11.5px] sm:text-xs md:text-[13px] font-bold tracking-[0.12em] uppercase text-[#68110D]",
                      )}
                    >
                      Address
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5">
                    {/* City */}
                    <div>
                      <label htmlFor="city" className={labelClass}>
                        City <span className="text-stone-700">*</span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="Enter city"
                        {...register("address.city")}
                        className={inputClass(!!errors.address?.city)}
                      />
                      {errors.address?.city && (
                        <p className="text-[10.5px] text-red-500 font-medium mt-1">
                          {errors.address.city.message}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label htmlFor="state" className={labelClass}>
                        State <span className="text-stone-700">*</span>
                      </label>
                      <input
                        id="state"
                        type="text"
                        placeholder="Enter state"
                        {...register("address.state")}
                        className={inputClass(!!errors.address?.state)}
                      />
                      {errors.address?.state && (
                        <p className="text-[10.5px] text-red-500 font-medium mt-1">
                          {errors.address.state.message}
                        </p>
                      )}
                    </div>

                    {/* Pincode */}
                    <div>
                      <label htmlFor="pincode" className={labelClass}>
                        Pincode <span className="text-stone-700">*</span>
                      </label>
                      <input
                        id="pincode"
                        type="text"
                        placeholder="Enter pincode"
                        {...register("address.pincode")}
                        className={inputClass(!!errors.address?.pincode)}
                      />
                      {errors.address?.pincode && (
                        <p className="text-[10.5px] text-red-500 font-medium mt-1">
                          {errors.address.pincode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 4: Social Profiles */}
                <div className="space-y-3 sm:space-y-3.5 pt-1">
                  <div className="flex items-center gap-2 text-[#740E0A]">
                    <LinkIcon size={16} strokeWidth={2.4} />
                    <h3
                      className={clsx(
                        poppins.className,
                        "text-[11.5px] sm:text-xs md:text-[13px] font-bold tracking-[0.12em] uppercase text-[#68110D]",
                      )}
                    >
                      Social Profiles
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5">
                    {/* Instagram */}
                    <div>
                      <label htmlFor="instagramProfile" className={labelClass}>
                        Instagram Profile
                      </label>
                      <div className="relative flex items-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 text-stone-400 pointer-events-none fill-none stroke-current stroke-2"
                        >
                          <rect
                            width="20"
                            height="20"
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <input
                          id="instagramProfile"
                          type="text"
                          placeholder="https://instagram.com/..."
                          {...register("instagramProfile")}
                          className={clsx(
                            inputClass(!!errors.instagramProfile),
                            "pl-8.5 sm:pl-9",
                          )}
                        />
                      </div>
                    </div>

                    {/* Facebook */}
                    <div>
                      <label htmlFor="facebookProfile" className={labelClass}>
                        Facebook Profile
                      </label>
                      <div className="relative flex items-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 text-stone-400 pointer-events-none fill-none stroke-current stroke-2"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        <input
                          id="facebookProfile"
                          type="text"
                          placeholder="https://facebook.com/..."
                          {...register("facebookProfile")}
                          className={clsx(
                            inputClass(!!errors.facebookProfile),
                            "pl-8.5 sm:pl-9",
                          )}
                        />
                      </div>
                    </div>

                    {/* YouTube */}
                    <div>
                      <label htmlFor="youtubeChannel" className={labelClass}>
                        YouTube Channel
                      </label>
                      <div className="relative flex items-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 text-stone-400 pointer-events-none fill-none stroke-current stroke-2"
                        >
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                          <path d="m10 15 5-3-5-3z" />
                        </svg>
                        <input
                          id="youtubeChannel"
                          type="text"
                          placeholder="https://youtube.com/..."
                          {...register("youtubeChannel")}
                          className={clsx(
                            inputClass(!!errors.youtubeChannel),
                            "pl-8.5 sm:pl-9",
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Confirmation Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      {...register("termsAccepted")}
                      className="mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-stone-300 text-[#740E0A] focus:ring-[#740E0A] accent-[#740E0A] cursor-pointer shrink-0"
                    />
                    <span
                      className={clsx(
                        poppins.className,
                        "text-[11px] sm:text-xs text-stone-600 leading-normal group-hover:text-stone-800 transition-colors",
                      )}
                    >
                      I confirm that the information provided is accurate and
                      can be verified.
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-[10.5px] text-red-500 font-medium mt-1 ml-6 sm:ml-7">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx(
                      poppins.className,
                      "w-full h-11 sm:h-12 px-6 rounded-xl sm:rounded-2xl bg-[#8A110D] hover:bg-[#720E0B] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm md:text-base tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer",
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span>{submittingButtonText}</span>
                      </>
                    ) : (
                      <>
                        <span>{submitButtonText}</span>
                        <Send size={15} strokeWidth={2.2} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
