import { apiRoutes } from "@/_config/Routes.config";
import axiosInstance from "@/_lib/axios";
import { BookingFormData } from "@/_schemas/booking.schema";

export async function submitBooking(
  payload: BookingFormData,
  eventId: string,
): Promise<void> {
  await axiosInstance.post(apiRoutes.booking, {
    username: payload.fullName,
    eventId: eventId,
    email: payload.email,
    totalTicket: payload.tickets,
    phone: payload.mobile,
  });
}
