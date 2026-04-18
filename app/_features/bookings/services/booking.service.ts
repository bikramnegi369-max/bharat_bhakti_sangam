"use server";

import { apiRoutes } from "@/_config/Routes.config";
import axiosInstance, { ApiError } from "@/_lib/axios";
import { BookingFormData } from "@/_schemas/booking.schema";
import { APIResponse } from "@/_types/Api.types";

export async function submitBooking(
  payload: BookingFormData,
  eventId: string,
): Promise<APIResponse> {
  try {
    await axiosInstance.post(apiRoutes.booking, {
      username: payload.fullName,
      eventId: eventId,
      email: payload.email,
      totalTicket: payload.tickets,
      phone: payload.mobile,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof ApiError
          ? error.backendMessage || error.message
          : "Booking failed",
    };
  }
}
