"use server";

import { apiRoutes } from "@/_config/APIRoutes.config";
import { BookingFormData } from "@/_schemas/booking.schema";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";
import { isRecord } from "@/_utils/guards";

type BookingPayloadWithReservation = BookingFormData & {
  reservationId?: string;
};

type BookingReservation = {
  reservationId: string;
  expiresAt?: string;
};

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
  razorpaySignature?: string;
  paidAt?: string;
};

export async function submitBooking(
  payload: BookingPayloadWithReservation,
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
        ticketType: payload.ticketType,
        ...(payload.reservationId
          ? { reservationId: payload.reservationId }
          : {}),
        ...(payment ? { payment } : {}),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || "Booking failed");
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

function extractReservation(payload: unknown): BookingReservation | null {
  if (!isRecord(payload)) {
    return null;
  }

  const data = isRecord(payload.data) ? payload.data : payload;
  const source = isRecord(data.reservation) ? data.reservation : data;
  const reservationId =
    typeof source.reservationId === "string"
      ? source.reservationId
      : typeof source._id === "string"
        ? source._id
        : null;

  if (!reservationId) {
    return null;
  }

  return {
    reservationId,
    expiresAt:
      typeof source.expiresAt === "string" ? source.expiresAt : undefined,
  };
}

export async function reserveBookingTickets(
  payload: BookingFormData,
  eventId: string,
): Promise<APIResponse<BookingReservation>> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.bookingReservations}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.fullName,
        eventId,
        email: payload.email,
        totalTicket: payload.tickets,
        phone: payload.mobile,
        ticketType: payload.ticketType,
      }),
    });

    const responsePayload = await response.json().catch(() => null);
    const reservation = extractReservation(responsePayload);

    if (!response.ok || !reservation) {
      const message =
        isRecord(responsePayload) && typeof responsePayload.message === "string"
          ? responsePayload.message
          : "Unable to reserve tickets.";
      throw new Error(message);
    }

    return { success: true, data: reservation };
  } catch (error) {
    console.error("Booking Reservation Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unable to reserve tickets.",
    };
  }
}

export async function createBookingOrder(
  payload: BookingFormData,
  eventId: string,
): Promise<APIResponse<import("@/_features/payments/razorpay/types").BackendBookingOrderResponse>> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.createBookingOrder}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: payload.fullName,
        email: payload.email,
        mobile: payload.mobile,
        tickets: payload.tickets,
        ticketType: payload.ticketType,
        eventId,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      const message =
        data.message || data.error || "Unable to initiate booking order.";
      throw new Error(message);
    }

    // Backend responds with { success: true, keyId, orderId, amount, currency, reservationId, eventName, ticketType, tickets }
    // or wrapped in data
    const orderData = data.data || data;

    return {
      success: true,
      data: {
        keyId: orderData.keyId,
        orderId: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        reservationId: orderData.reservationId,
        eventName: orderData.eventName,
        ticketType: orderData.ticketType,
        tickets: orderData.tickets,
      },
    };
  } catch (error) {
    console.error("Create Booking Order Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to initiate secure checkout.",
    };
  }
}

export async function verifyBookingPayment(
  payload: import("@/_features/payments/razorpay/types").BackendVerifyPaymentPayload,
): Promise<APIResponse<import("@/_features/payments/razorpay/types").BackendVerifyPaymentResponse>> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${apiRoutes.verifyBookingPayment}`;

  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      const message =
        data.message || data.error || "Payment verification failed.";
      throw new Error(message);
    }

    const resData = data.data || data;

    return {
      success: true,
      data: {
        success: true,
        message: resData.message || "Ticket created successfully",
        bookingId: resData.bookingId || "",
        ticketUrl: resData.ticketUrl,
      },
    };
  } catch (error) {
    console.error("Verify Booking Payment Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Payment verification failed.",
    };
  }
}

