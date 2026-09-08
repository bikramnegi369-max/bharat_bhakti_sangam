"use client";

import { BookingFormData, bookingSchema } from "@/_schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormSubmitStatus } from "@/_components/common/FormSubmitStatus";
import { siteConfig } from "@/_config/Site.config";
import type {
  RazorpayCheckoutFailureResponse,
  RazorpayCheckoutInstance,
  RazorpayCheckoutSuccessResponse,
} from "@/_features/payments/razorpay/types";
import {
  createBookingOrder,
  verifyBookingPayment,
} from "@/_features/bookings/services/booking.service";

const RAZORPAY_CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
const RAZORPAY_CHECKOUT_LOGO = `${siteConfig.url}/logo.png`;

function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "string" && error) return error;
  return error instanceof Error ? error.message : fallback;
}

function getBookingErrorMessage(error?: string): string | null {
  const normalizedError = error?.toLowerCase().trim();

  if (normalizedError?.includes("tickets sold out")) {
    return "Tickets sold out";
  }

  if (normalizedError?.includes("event has been ended")) {
    return "Thank you for reaching out. The booking has now ended because the event is over. We appreciate your interest and look forward to seeing you at one of our future events.";
  }

  if (
    normalizedError?.includes(
      "this number has already been used for booking tickets",
    )
  ) {
    return "This number has already been used for booking tickets.";
  }

  return error || null;
}

async function loadRazorpayCheckout(): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  if (window.Razorpay) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_CHECKOUT_SCRIPT}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Unable to load the secure payment gateway.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Unable to load the secure payment gateway."));
    document.body.appendChild(script);
  });

  if (!window.Razorpay) {
    throw new Error("Secure payment window is unavailable. Please try again.");
  }
}

export function useBookingForm(
  defaultTicketType: string = "",
  eventId: string = "",
  eventTitle: string = "Bhajan Clubbing",
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormSubmitStatus | "idle">("idle");
  const [specificErrorMessage, setSpecificErrorMessage] = useState<
    string | null
  >(null);

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      tickets: 1,
      ticketType: defaultTicketType,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setSpecificErrorMessage(null);

    try {
      setIsSubmitting(true);

      // 1. Ensure Razorpay Checkout script is loaded
      await loadRazorpayCheckout();

      // 2. Request order creation & inventory reservation from Express backend
      const orderResponse = await createBookingOrder(data, eventId);

      if (!orderResponse.success || !orderResponse.data) {
        throw new Error(
          orderResponse.error || "Unable to initiate booking order.",
        );
      }

      const order = orderResponse.data;

      // 3. Open Razorpay Checkout Modal
      await new Promise<void>((resolve, reject) => {
        if (!window.Razorpay) {
          reject(
            new Error(
              "Secure payment window is unavailable. Please try again.",
            ),
          );
          return;
        }

        let isCompleted = false;

        const options = {
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: "Bharat Bhakti Sangam",
          description: `${eventTitle} - ${order.ticketType || data.ticketType} Pass`,
          image: RAZORPAY_CHECKOUT_LOGO,
          order_id: order.orderId,
          prefill: {
            name: data.fullName,
            email: data.email,
            contact: data.mobile,
          },
          notes: {
            eventId,
            reservationId: order.reservationId,
            ticketType: data.ticketType,
            tickets: String(data.tickets),
          },
          theme: {
            color: "#5A0E0B",
          },
          modal: {
            ondismiss: () => {
              if (!isCompleted) {
                reject(
                  new Error("Payment was cancelled or closed before completion."),
                );
              }
            },
          },
          handler: async (paymentResponse: RazorpayCheckoutSuccessResponse) => {
            isCompleted = true;
            try {
              // 4. Verify cryptographic signature & confirm ticket generation with Express backend
              const verifyResult = await verifyBookingPayment({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                reservationId: order.reservationId,
              });

              if (!verifyResult.success) {
                throw new Error(
                  verifyResult.error ||
                    "Payment verification failed. Please contact support if amount was debited.",
                );
              }

              resolve();
            } catch (err) {
              reject(
                err instanceof Error
                  ? err
                  : new Error("Payment verification failed."),
              );
            }
          },
        };

        const checkout: RazorpayCheckoutInstance = new window.Razorpay(options);

        checkout.on(
          "payment.failed",
          (response: RazorpayCheckoutFailureResponse) => {
            isCompleted = true;
            reject(
              new Error(
                response.error?.description ||
                  "Payment failed. Please try another payment method.",
              ),
            );
          },
        );

        checkout.open();
      });

      // 5. Successful payment & ticket issuance
      setStatus("success");
    } catch (error) {
      console.error("Booking submission error:", error);
      setStatus("error");
      setSpecificErrorMessage(
        getBookingErrorMessage(
          getErrorMessage(error, "We couldn't process your booking."),
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStatus("idle");
    setSpecificErrorMessage(null);
    methods.reset();
  };

  return {
    methods,
    onSubmit,
    isSubmitting,
    status,
    specificErrorMessage,
    reset,
  };
}
