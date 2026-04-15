"use client";

import { BookingFormData, bookingSchema } from "@/_schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitBooking } from "@/_features/bookings/services/booking.service";
import { FormSubmitStatus } from "@/_components/common/FormSubmitStatus";
import { ApiError } from "@/_lib/axios";

export function useBookingForm(
  defaultTicketType: string = "",
  eventId: string = "",
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormSubmitStatus | "idle">("idle");
  const [specificErrorMessage, setSpecificErrorMessage] = useState<
    string | null
  >(null);

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
    setSpecificErrorMessage(null); // Clear previous specific error message
    try {
      setIsSubmitting(true);
      await submitBooking(data, eventId);
      setStatus("success");
    } catch (error: any) {
      console.error("Booking submission failed:", error);
      setStatus("error");

      if (
        error instanceof ApiError &&
        error.backendMessage?.toLowerCase().includes("tickets sold out")
      ) {
        setSpecificErrorMessage("Tickets sold out");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStatus("idle");
    setSpecificErrorMessage(null); // Clear specific error message on reset
    methods.reset();
  };

  return {
    methods,
    onSubmit,
    isSubmitting,
    status,
    specificErrorMessage,
    reset,
  };
}
