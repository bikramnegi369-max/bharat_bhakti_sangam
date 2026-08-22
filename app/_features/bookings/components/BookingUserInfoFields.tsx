import React from "react";
import { useFormContext } from "react-hook-form";
import { User, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { BookingStepBadge } from "./BookingStepBadge";
import { BookingFormData } from "@/_schemas/booking.schema";
import { poppins } from "@/_lib/fonts";
import clsx from "clsx";

export function BookingUserInfoFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormData>();

  return (
    <section aria-labelledby="step-user-info" className="w-full space-y-4">
      <BookingStepBadge step="03" title="YOUR INFORMATION" />

      <div className="w-full bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 md:p-7 shadow-xs space-y-5">
        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="booking-fullName"
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1",
              )}
            >
              <span>Full Name</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="booking-fullName"
                type="text"
                placeholder="Enter your full name"
                {...register("fullName")}
                className={clsx(
                  poppins.className,
                  "w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border transition-all focus:outline-hidden",
                  errors.fullName
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                    : "border-gray-200 bg-[#FCFAF5] focus:border-[#740E0A] focus:bg-white focus:ring-2 focus:ring-[#740E0A]/15",
                )}
              />
            </div>
            {errors.fullName && (
              <p className="text-[0.688rem] sm:text-xs text-red-500 font-medium pl-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label
              htmlFor="booking-email"
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1",
              )}
            >
              <span>Email Address</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="booking-email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={clsx(
                  poppins.className,
                  "w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border transition-all focus:outline-hidden",
                  errors.email
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                    : "border-gray-200 bg-[#FCFAF5] focus:border-[#740E0A] focus:bg-white focus:ring-2 focus:ring-[#740E0A]/15",
                )}
              />
            </div>
            {errors.email && (
              <p className="text-[0.688rem] sm:text-xs text-red-500 font-medium pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="booking-mobile"
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1",
              )}
            >
              <span>Phone Number</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="booking-mobile"
                type="tel"
                maxLength={10}
                placeholder="+91 XXXXX XXXXX"
                {...register("mobile")}
                className={clsx(
                  poppins.className,
                  "w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border transition-all focus:outline-hidden",
                  errors.mobile
                    ? "border-red-400 bg-red-50/20 focus:ring-2 focus:ring-red-400/20"
                    : "border-gray-200 bg-[#FCFAF5] focus:border-[#740E0A] focus:bg-white focus:ring-2 focus:ring-[#740E0A]/15",
                )}
              />
            </div>
            {errors.mobile && (
              <p className="text-[0.688rem] sm:text-xs text-red-500 font-medium pl-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* City (Optional) */}
          <div className="space-y-1.5">
            <label
              htmlFor="booking-city"
              className={clsx(
                poppins.className,
                "text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1",
              )}
            >
              <span>City</span>
              <span className="text-gray-400 font-normal text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                id="booking-city"
                type="text"
                placeholder="Enter your city"
                className={clsx(
                  poppins.className,
                  "w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-gray-200 bg-[#FCFAF5] focus:border-[#740E0A] focus:bg-white focus:ring-2 focus:ring-[#740E0A]/15 transition-all focus:outline-hidden",
                )}
              />
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="pt-2 flex items-center gap-2 text-gray-400">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <p className="text-[0.688rem] sm:text-xs text-gray-500">
            Your details are safe with us. We never share your information.
          </p>
        </div>
      </div>
    </section>
  );
}
