"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { BookingFormData } from "@/_schemas/booking.schema";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";

export type BookingPaymentPayload = {
  provider: "razorpay";
  orderId: string;
  eventId: string;
  paymentId: string;
  amount: number;
  currency: "INR";
  receipt: string;
  status: "created" | "attempted" | "paid" | "failed" | "refunded";
  phone: number;
  notes: Record<string, string>;
  method?: string;
  email?: string;
  razorpaySignature: string;
  paidAt?: string;
};

export async function submitBooking(
  payload: BookingFormData,
  eventId: string,
  payment?: BookingPaymentPayload,
): Promise<APIResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.booking}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.fullName,
        eventId: eventId,
        email: payload.email,
        totalTicket: payload.tickets,
        phone: payload.mobile,
        ...(payment ? { payment } : {}),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Booking failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Booking Submission Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Booking failed",
    };
  }
}
