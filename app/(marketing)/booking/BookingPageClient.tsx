"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import { BookingForm } from "@/_features/bookings/components/BookingForm";
import { BookingFormStatus } from "@/_features/bookings/components/BookingFormStatus";
import { OrderSummary } from "@/_features/bookings/components/OrderSummary";
import { useBookingForm } from "@/_hooks/useBookingForm";
import { useEffect, useRef } from "react";
import { FormProvider } from "react-hook-form";

type TicketType = {
  name: string;
  price: number;
};

type BookingPageClientProps = {
  eventId: string;
  eventTitle: string;
  eventDate?: string;
  eventLocation: string;
  eventAddress?: string;
  heroImage: string;
  ticketTypes: TicketType[];
};

export function BookingPageClient({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  eventAddress,
  heroImage,
  ticketTypes,
}: BookingPageClientProps) {
  const {
    methods,
    onSubmit,
    isSubmitting,
    status,
    specificErrorMessage,
    reset,
  } = useBookingForm(ticketTypes[0]?.name, eventId);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const bookingDetails = {
    eventTitle,
    eventDate,
    eventLocation,
    eventAddress,
    ticketTypes,
  };

  useEffect(() => {
    if ((status === "success" || status === "error") && statusRef.current) {
      statusRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      <Hero
        title={eventTitle}
        location={eventLocation}
        address={eventAddress}
        date={eventDate}
        backgroundImage={heroImage}
      />

      <div className="relative lg:-mt-40 z-10">
        <section className="w-full flex justify-center py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
          {status === "success" || status === "error" ? (
            <div ref={statusRef} className="w-full flex justify-center">
              <BookingFormStatus
                status={status}
                onRetry={reset}
                errorMessage={specificErrorMessage}
              />
            </div>
          ) : (
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full max-w-7xl flex justify-center items-center"
              >
                <div className="w-full grid grid-cols-1 place-items-center max-w-2xl">
                  <BookingForm
                    {...bookingDetails}
                    isSubmitting={isSubmitting}
                  />
                  {/* <OrderSummary
                    {...bookingDetails}
                    isSubmitting={isSubmitting}
                  /> */}
                </div>
              </form>
            </FormProvider>
          )}
        </section>
      </div>
    </div>
  );
}
