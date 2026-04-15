"use client";

import { BookingFormData, bookingSchema } from "@/_schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitBooking } from "@/_features/bookings/services/booking.service";
import { FormSubmitStatus } from "@/_components/common/FormSubmitStatus";

export function useBookingForm(
  defaultTicketType: string = "",
  eventId: string = "",
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormSubmitStatus | "idle">("idle");

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
    try {
      setIsSubmitting(true);
      await submitBooking(data, eventId);
      setStatus("success");
    } catch (error) {
      console.error("Booking submission failed:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStatus("idle");
    methods.reset();
  };

  return { methods, onSubmit, isSubmitting, status, reset };
}
