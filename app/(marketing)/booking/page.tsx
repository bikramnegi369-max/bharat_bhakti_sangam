"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import { bookingConfig } from "@/_config/booking.config";
import { BookingForm } from "@/_features/bookings/components/BookingForm";
import { BookingFormStatus } from "@/_features/bookings/components/BookingFormStatus";
import { OrderSummary } from "@/_features/bookings/components/OrderSummary";
import { useBookingForm } from "@/_hooks/useBookingForm";
import { FormProvider } from "react-hook-form";

export default function BookingPage() {
  const { methods, onSubmit, isSubmitting, status, reset } = useBookingForm();

  return (
    <div className="relative">
      <link rel="preload" as="image" href="/home_hero.jpg" fetchPriority="high" />
      <Hero
        title="Midnight Krishna Kirtan"
        location="ISKCON Temple Hall | Hare Krishna Land, Juhu, Mumbai 400049"
        date={bookingConfig.eventDate}
        backgroundImage="/home_hero.jpg"
      />

      <div className="relative lg:-mt-40 z-10">
        <section className="w-full flex justify-center py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
          {status === "success" || status === "error" ? (
            <div className="w-full max-w-7xl">
              <BookingFormStatus status={status} onRetry={reset} />
            </div>
          ) : (
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full max-w-7xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-0">
                  <BookingForm {...bookingConfig} isSubmitting={isSubmitting} />
                  <OrderSummary {...bookingConfig} isSubmitting={isSubmitting} />
                </div>
              </form>
            </FormProvider>
          )}
        </section>
      </div>
    </div>
  );
}
