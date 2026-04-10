"use client";

import { BookingFormData, bookingSchema } from "@/_schemas/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { bookingConfig } from "@/_config/booking.config";
import { submitBooking } from "@/_features/bookings/services/booking.service";

export function useBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      tickets: 1,
      ticketType: Object.keys(bookingConfig.pricing)[0],
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true);
      await submitBooking(data);
    } catch (error) {
      console.error("Booking submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { methods, onSubmit, isSubmitting };
}
