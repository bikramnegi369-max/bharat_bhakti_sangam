"use client";

import { BookingFormData, bookingSchema } from "@/_schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormSubmitStatus } from "@/_components/common/FormSubmitStatus";
import { siteConfig } from "@/_config/Site.config";
import type {
  RazorpayCheckoutFailureResponse,
  RazorpayCheckoutSuccessResponse,
  RazorpayOrderResponse,
} from "@/_features/payments/razorpay/types";

const RAZORPAY_CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
const RAZORPAY_CHECKOUT_LOGO = `${siteConfig.url}/logo.png`;

type ApiResult<T extends object = object> = {
  success: boolean;
  data?: T;
  error?: string;
  paymentId?: string;
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getBookingErrorMessage(error?: string) {
  const normalizedError = error?.toLowerCase();

  if (normalizedError?.includes("tickets sold out")) {
    return "Tickets sold out";
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

async function loadRazorpayCheckout() {
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
        () => reject(new Error("Unable to load the secure payment window.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Unable to load the secure payment window."));
    document.body.appendChild(script);
  });

  if (!window.Razorpay) {
    throw new Error("Secure payment window is unavailable. Please try again.");
  }
}

async function createPaymentOrder(
  data: BookingFormData,
  eventId: string,
): Promise<RazorpayOrderResponse> {
  const response = await fetch("/api/payments/razorpay/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, eventId }),
  });

  const result = (await response.json()) as ApiResult<RazorpayOrderResponse>;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.error || "Unable to start secure payment.");
  }

  return result.data;
}

async function verifyPaymentAndConfirmBooking({
  payment,
  booking,
  eventId,
  reservationId,
}: {
  payment: RazorpayCheckoutSuccessResponse;
  booking: BookingFormData;
  eventId: string;
  reservationId: string;
}) {
  const response = await fetch("/api/payments/razorpay/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payment,
      booking: {
        ...booking,
        eventId,
        reservationId,
      },
    }),
  });

  const result = (await response.json()) as ApiResult;

  if (!response.ok || !result.success) {
    const paymentReference = result.paymentId
      ? ` Payment id: ${result.paymentId}.`
      : "";
    throw new Error(
      `${result.error || "Payment verification failed."}${paymentReference}`,
    );
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
      await loadRazorpayCheckout();
      const order = await createPaymentOrder(data, eventId);

      await new Promise<void>((resolve, reject) => {
        if (!window.Razorpay) {
          reject(
            new Error(
              "Secure payment window is unavailable. Please try again.",
            ),
          );
          return;
        }

        let isPaymentResolved = false;
        const failPayment = (error: Error) => {
          if (!isPaymentResolved) {
            isPaymentResolved = true;
            reject(error);
          }
        };
        const completePayment = () => {
          if (!isPaymentResolved) {
            isPaymentResolved = true;
            resolve();
          }
        };

        const checkout = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: "Bharat Bhakti Sangam",
          description: `${eventTitle} - ${order.ticketType} Pass`,
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
            color: "#f6b545",
          },
          modal: {
            ondismiss: () => {
              failPayment(
                new Error("Payment was cancelled before completion."),
              );
            },
          },
          handler: async (payment) => {
            try {
              await verifyPaymentAndConfirmBooking({
                payment,
                booking: data,
                eventId,
                reservationId: order.reservationId,
              });
              completePayment();
            } catch (error) {
              failPayment(
                error instanceof Error
                  ? error
                  : new Error("Payment verification failed."),
              );
            }
          },
        });

        checkout.on(
          "payment.failed",
          (response: RazorpayCheckoutFailureResponse) => {
            failPayment(
              new Error(
                response.error?.description ||
                  "Payment failed. Please try another method.",
              ),
            );
          },
        );

        checkout.open();
      });

      setStatus("success");
    } catch (error) {
      console.error("Booking submission failed:", error);
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
