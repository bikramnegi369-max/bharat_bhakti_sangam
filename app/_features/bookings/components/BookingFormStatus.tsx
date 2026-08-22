"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Mail,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";
import { FormSubmitStatus } from "@/_components/common/FormSubmitStatus";

interface BookingFormStatusProps {
  status: FormSubmitStatus;
  onRetry: () => void;
  errorMessage?: string | null;
  bookingDetails?: {
    eventTitle?: string;
    eventDate?: string;
    eventTime?: string;
    eventLocation?: string;
    ticketType?: string;
    ticketCount?: number;
    email?: string;
    fullName?: string;
  };
}

export default function BookingFormStatus({
  status,
  onRetry,
  errorMessage,
  bookingDetails,
}: BookingFormStatusProps) {
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-2xl mx-auto bg-white border border-[#E5DFD3] rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Top Success Header */}
        <div className="bg-linear-to-b from-[#3F0605] to-[#5A0E0B] py-8 sm:py-10 px-6 text-center text-white relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400/80 flex items-center justify-center mb-4 shadow-lg">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2 select-none">
            <span className="w-6 sm:w-10 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm sm:text-base">★</span>
            <span className="w-6 sm:w-10 h-px bg-[#D4AF37]" />
          </div>

          <h2
            className={clsx(
              playfair.className,
              "text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest uppercase text-[#FFFDF9]",
            )}
          >
            BOOKING CONFIRMED!
          </h2>

          <p
            className={clsx(
              poppins.className,
              "text-xs sm:text-sm text-gray-200 mt-2 max-w-md mx-auto leading-relaxed",
            )}
          >
            Har Har Mahadev! Your reservation has been successfully confirmed.
          </p>
        </div>

        {/* Confirmation Content Details */}
        <div className="p-6 sm:p-8 md:p-10 space-y-6">
          {/* Email Notification Card */}
          <div className="bg-[#FFFDF9] border border-[#F3E5CA] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#5A0E0B]/10 flex items-center justify-center text-[#5A0E0B] shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div className={poppins.className}>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                Ticket Sent via Email
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                We have sent an e-ticket with your QR code and entry
                instructions to{" "}
                <span className="font-semibold text-gray-900">
                  {bookingDetails?.email || "your registered email"}
                </span>
                .
              </p>
            </div>
          </div>

          {/* Booking Summary Box */}
          {bookingDetails && (
            <div className="bg-[#FCFAF5] border border-gray-200/80 rounded-2xl p-5 space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/70">
                <span className="text-gray-500 font-medium">Event</span>
                <span className="font-bold text-gray-900 text-right">
                  {bookingDetails.eventTitle || "Bharat Bhakti Mahotsav"}
                </span>
              </div>

              {bookingDetails.ticketType && (
                <div className="flex items-center justify-between pb-3 border-b border-gray-200/70">
                  <span className="text-gray-500 font-medium">
                    Pass Selected
                  </span>
                  <span className="font-bold text-[#5A0E0B]">
                    {bookingDetails.ticketType} (
                    {bookingDetails.ticketCount || 1}{" "}
                    {(bookingDetails.ticketCount || 1) === 1
                      ? "Ticket"
                      : "Tickets"}
                    )
                  </span>
                </div>
              )}

              {bookingDetails.eventDate && (
                <div className="flex items-center justify-between pb-3 border-b border-gray-200/70">
                  <span className="text-gray-500 font-medium">Date & Time</span>
                  <span className="font-semibold text-gray-800 text-right">
                    {bookingDetails.eventDate}
                    {bookingDetails.eventTime
                      ? ` • ${bookingDetails.eventTime}`
                      : ""}
                  </span>
                </div>
              )}

              {bookingDetails.eventLocation && (
                <div className="flex items-start justify-between">
                  <span className="text-gray-500 font-medium">Venue</span>
                  <span className="font-semibold text-gray-800 text-right max-w-[60%]">
                    {bookingDetails.eventLocation}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/event"
              className={clsx(
                poppins.className,
                "py-3 px-4 rounded-xl bg-[#5A0E0B] hover:bg-[#430A08] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center justify-center gap-2",
              )}
            >
              <span>EXPLORE EVENT</span>
              <ArrowRight className="w-4 h-4 text-[#FDE68A]" />
            </Link>

            <Link
              href="/"
              className={clsx(
                poppins.className,
                "py-3 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5",
              )}
            >
              <span>RETURN HOME</span>
            </Link>
          </div>

          {/* Support Reassurance Footer */}
          <p className="text-[0.688rem] text-center text-gray-400">
            Need help with your pass? Reach out to support at{" "}
            <a
              href="mailto:support@bharatbhaktisangam.com"
              className="text-[#E86A17] hover:underline"
            >
              support@bharatbhaktisangam.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Error State Component
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="w-full max-w-2xl mx-auto bg-white border border-red-200 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
    >
      {/* Top Error Header */}
      <div className="bg-linear-to-b from-[#4A0D0D] to-[#740E0A] py-8 sm:py-10 px-6 text-center text-white relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-red-500/20 border-2 border-red-400/80 flex items-center justify-center mb-4 shadow-lg">
          <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-300" />
        </div>

        <h2
          className={clsx(
            playfair.className,
            "text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest uppercase text-[#FFFDF9]",
          )}
        >
          BOOKING COULD NOT BE COMPLETED
        </h2>

        <p
          className={clsx(
            poppins.className,
            "text-xs sm:text-sm text-red-100 mt-2 max-w-md mx-auto leading-relaxed",
          )}
        >
          We encountered an issue while placing your reservation.
        </p>
      </div>

      {/* Error Details Content */}
      <div className="p-6 sm:p-8 md:p-10 space-y-6">
        {/* Error Notification Card */}
        <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className={poppins.className}>
            <h4 className="text-xs sm:text-sm font-bold text-red-900">
              Reason for Error
            </h4>
            <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
              {errorMessage ||
                "Your payment or booking could not be processed at this time. If amount was debited, it will be refunded within 3-5 business days."}
            </p>
          </div>
        </div>

        {/* Retry & Return Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className={clsx(
              poppins.className,
              "py-3.5 px-4 rounded-xl bg-[#5A0E0B] hover:bg-[#430A08] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95",
            )}
          >
            <RotateCcw className="w-4 h-4 text-[#FDE68A]" />
            <span>TRY AGAIN</span>
          </button>

          <Link
            href="/contact"
            className={clsx(
              poppins.className,
              "py-3.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5",
            )}
          >
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>CONTACT SUPPORT</span>
          </Link>
        </div>

        {/* Safety Guarantee Footer */}
        <p className="text-[0.688rem] text-center text-gray-400">
          Your payment information is always secured with 256-bit SSL
          encryption.
        </p>
      </div>
    </div>
  );
}
