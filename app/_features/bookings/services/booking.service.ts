import { apiRoutes } from "@/_config/Routes.config";
import axiosInstance from "@/_lib/axios";
import { BookingFormData } from "@/_schemas/booking.schema";

export async function submitBooking(payload: BookingFormData): Promise<void> {
  await axiosInstance.post(apiRoutes.booking, payload);
}
