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
        ...(payload.reservationId
          ? { reservationId: payload.reservationId }
          : {}),
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
