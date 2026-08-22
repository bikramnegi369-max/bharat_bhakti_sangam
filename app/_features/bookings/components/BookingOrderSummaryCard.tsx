import React from "react";
import clsx from "clsx";
import {
  Ticket,
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Zap,
  Headphones,
  Info,
} from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";

interface BookingOrderSummaryCardProps {
  selectedPassName: string;
  ticketCount: number;
  unitPrice: number;
  convenienceFee?: number;
  gstRate?: number; // e.g. 0.18 for 18%
  isSubmitting: boolean;
}

export function BookingOrderSummaryCard({
  selectedPassName,
  ticketCount,
  unitPrice,
  convenienceFee = 100,
  gstRate = 0.18,
  isSubmitting,
}: BookingOrderSummaryCardProps) {
  const ticketAmount = unitPrice * ticketCount;
  const gstAmount = Math.round(ticketAmount * gstRate);
  const grandTotal = ticketAmount + convenienceFee + gstAmount;

  return (
    <section aria-labelledby="booking-summary-heading" className="w-full space-y-6">
      {/* Main Booking Summary Card */}
      <div className="w-full bg-[#FFFDF9] border border-[#F3E5CA] rounded-2xl shadow-sm overflow-hidden">
        {/* Light Themed Header Banner */}
        <div className="bg-[#FFF7ED] border-b border-[#F3E5CA] py-3.5 px-6 flex items-center justify-center gap-2">
          <Ticket className="w-4 h-4 text-[#740E0A]" />
          <h2
            id="booking-summary-heading"
            className={clsx(
              playfair.className,
              "text-sm sm:text-base font-bold text-[#5A0E0B] tracking-widest uppercase",
            )}
          >
            BOOKING SUMMARY
          </h2>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Selected Pass & Ticket Count Badge */}
          <div className="flex items-center gap-3.5 pb-5 border-b border-[#F3E5CA]">
            <div className="w-10 h-10 rounded-full bg-[#FFF7ED] border border-[#F3E5CA] flex items-center justify-center text-[#740E0A] shrink-0 shadow-xs">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3
                className={clsx(
                  playfair.className,
                  "text-sm sm:text-base font-bold text-[#3F0605] uppercase",
                )}
              >
                {selectedPassName}
              </h3>
              <p
                className={clsx(
                  poppins.className,
                  "text-xs text-gray-500 font-normal",
                )}
              >
                {ticketCount} {ticketCount === 1 ? "Ticket" : "Tickets"}
              </p>
            </div>
          </div>

          {/* Itemized Cost Breakdown */}
          <div className={clsx(poppins.className, "space-y-3.5 text-xs sm:text-sm")}>
            <div className="flex items-center justify-between text-gray-600">
              <span>Ticket Amount</span>
              <span className="font-semibold text-gray-900">
                ₹{ticketAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-1">
                <span>Convenience Fee</span>
                <span title="Standard processing & platform fee">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                ₹{convenienceFee.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span>GST ({Math.round(gstRate * 100)}%)</span>
              <span className="font-semibold text-gray-900">
                ₹{gstAmount.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Dotted Divider */}
            <div className="border-t border-dashed border-gray-200 pt-3.5" />

            {/* TOTAL */}
            <div className="flex items-baseline justify-between pt-1">
              <span
                className={clsx(
                  playfair.className,
                  "text-sm sm:text-base font-bold text-gray-900 tracking-wider uppercase",
                )}
              >
                TOTAL
              </span>
              <span
                className={clsx(
                  playfair.className,
                  "text-2xl sm:text-3xl font-extrabold text-[#3F0605]",
                )}
              >
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              poppins.className,
              "w-full py-3.5 px-6 rounded-xl bg-[#5A0E0B] hover:bg-[#430A08] text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#FDE68A]" />
                <span>PROCESSING...</span>
              </>
            ) : (
              <>
                <span>CONTINUE TO PAYMENT</span>
                <ArrowRight className="w-4 h-4 text-[#FDE68A]" />
              </>
            )}
          </button>

          {/* Secure & Encrypted Subtext */}
          <div className="flex items-center justify-center gap-1.5 text-center text-[0.688rem] text-gray-400">
            <Lock className="w-3 h-3 text-[#D4AF37]" />
            <span>Secure & encrypted payment</span>
          </div>
        </div>
      </div>

      {/* Payment Gateway Accepted Pill */}
      <div className="w-full bg-[#FFFDF9] border border-[#F3E5CA] rounded-2xl p-4 sm:p-5 text-center shadow-2xs">
        <p className="text-[0.688rem] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          WE ACCEPT
        </p>
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-gray-700">
          <span className="text-[#3F0605] tracking-wider">UPI</span>
          <span className="text-[#1A1F71] italic font-black">VISA</span>
          <span className="flex items-center gap-1 font-extrabold text-[#EB001B]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block -mr-2 opacity-90" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] inline-block opacity-90" />
          </span>
          <span className="text-[#097938] font-bold">RuPay</span>
        </div>
      </div>

      {/* 3 Trust & Confidence Pills */}
      <div className="w-full bg-[#FFFDF9] border border-[#F3E5CA] rounded-2xl p-3.5 sm:p-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-[#F3E5CA] text-center">
          <div className="flex items-center justify-center gap-2 py-1.5 sm:py-0">
            <ShieldCheck className="w-4 h-4 text-[#E5A83B] shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-gray-800">100%</p>
              <p className="text-[0.625rem] text-gray-500 uppercase">Secure</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-1.5 sm:py-0">
            <Zap className="w-4 h-4 text-[#E5A83B] shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-gray-800">Instant</p>
              <p className="text-[0.625rem] text-gray-500 uppercase">Confirmation</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-1.5 sm:py-0">
            <Headphones className="w-4 h-4 text-[#E5A83B] shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold text-gray-800">24x7</p>
              <p className="text-[0.625rem] text-gray-500 uppercase">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
