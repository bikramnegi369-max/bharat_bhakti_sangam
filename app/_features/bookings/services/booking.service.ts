"use server";

import { authorizedAdminRequest } from "@/_features/admin-auth/server/request";
import { BookingFormData } from "@/_schemas/booking.schema";
import { APIResponse } from "@/_types/Api.types";
import { fetchWithTimeout } from "@/_utils/fetch";
import { BookingCategory } from "@/_types/Booking.types";
import { apiRoutes } from "@/_config/Routes.config";

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

export async function getBookingTypes(): Promise<
  APIResponse<BookingCategory[]>
> {
  try {
    const res = await authorizedAdminRequest(apiRoutes.getAllBookingTypes);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return { success: true, data: data.data.data };
  } catch (error) {
    return { success: false, error: "Failed to fetch booking types" };
  }
}
