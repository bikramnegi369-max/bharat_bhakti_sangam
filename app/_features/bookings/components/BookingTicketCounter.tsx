import React from "react";
import clsx from "clsx";
import { Ticket, Plus, Minus } from "lucide-react";
import { BookingStepBadge } from "./BookingStepBadge";
import { playfair, poppins } from "@/_lib/fonts";

interface BookingTicketCounterProps {
  selectedPassName: string;
  unitPrice: number;
  ticketCount: number;
  onChangeCount: (count: number) => void;
  min?: number;
  max?: number;
}

export function BookingTicketCounter({
  selectedPassName,
  unitPrice,
  ticketCount,
  onChangeCount,
  min = 1,
  max = 5,
}: BookingTicketCounterProps) {
  const subtotal = unitPrice * ticketCount;

  const handleDecrement = () => {
    if (ticketCount > min) {
      onChangeCount(ticketCount - 1);
    }
  };

  const handleIncrement = () => {
    if (ticketCount < max) {
      onChangeCount(ticketCount + 1);
    }
  };

  return (
    <section aria-labelledby="step-ticket-count" className="w-full space-y-4">
      <BookingStepBadge step="03" title="NUMBER OF TICKETS" />

      <div className="w-full bg-[#FFFDF9] border border-[#F3E5CA] rounded-2xl p-4 sm:p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Selected Pass Info Badge */}
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-11 h-11 rounded-full bg-[#5A0E0B] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3
                className={clsx(
                  playfair.className,
                  "text-sm sm:text-base font-bold text-[#3F0605] tracking-wide uppercase",
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
                ₹{unitPrice} per ticket
              </p>
            </div>
          </div>

          {/* Stepper Controls & Subtotal Formula */}
          <div className="flex flex-col sm:items-end w-full sm:w-auto gap-1">
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-xs">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={ticketCount <= min}
                aria-label="Decrease ticket count"
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer",
                  ticketCount <= min
                    ? "text-gray-300 cursor-not-allowed bg-gray-50"
                    : "text-gray-700 hover:bg-gray-100 active:scale-95",
                )}
              >
                <Minus className="w-4 h-4" />
              </button>

              <span
                className={clsx(
                  poppins.className,
                  "text-base font-bold text-gray-900 w-6 text-center select-none",
                )}
              >
                {ticketCount}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                disabled={ticketCount >= max}
                aria-label="Increase ticket count"
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer",
                  ticketCount >= max
                    ? "text-gray-300 cursor-not-allowed bg-gray-50"
                    : "text-gray-700 hover:bg-gray-100 active:scale-95",
                )}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Formula Preview Badge */}
            <p
              className={clsx(
                poppins.className,
                "text-[0.688rem] sm:text-xs text-gray-400 font-medium text-center sm:text-right mt-1",
              )}
            >
              ₹{unitPrice} × {ticketCount} ={" "}
              <span className="text-gray-700 font-semibold">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
