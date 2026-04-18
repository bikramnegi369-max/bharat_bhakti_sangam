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
      const res = await submitBooking(data, eventId);

      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        if (res.error?.toLowerCase().includes("tickets sold out")) {
          setSpecificErrorMessage("Tickets sold out");
        }
      }
    } catch (error) {
      console.error("Booking submission failed:", error);
      setStatus("error");
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
