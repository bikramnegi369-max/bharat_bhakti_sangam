"use server";

import { apiRoutes } from "@/_config/Routes.config";
import { BookingFormData } from "@/_schemas/booking.schema";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";

export async function submitBooking(
  payload: BookingFormData,
  eventId: string,
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
