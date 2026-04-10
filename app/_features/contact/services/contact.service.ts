import { apiRoutes } from "@/_config/Routes.config";
import axiosInstance from "@/_lib/axios";
import { ContactFormData } from "@/_schemas/contact.schema";

export async function submitContactForm(payload: ContactFormData): Promise<void> {
  await axiosInstance.post(apiRoutes.contact, payload);
}
