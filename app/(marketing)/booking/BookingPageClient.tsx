"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import { BookingForm } from "@/_features/bookings/components/BookingForm";
import { BookingFormStatus } from "@/_features/bookings/components/BookingFormStatus";
import { OrderSummary } from "@/_features/bookings/components/OrderSummary";
import { useBookingForm } from "@/_hooks/useBookingForm";
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
  const { methods, onSubmit, isSubmitting, status, reset } = useBookingForm(
    ticketTypes[0]?.name,
    eventId,
  );

  const bookingDetails = {
    eventTitle,
    eventDate,
    eventLocation,
    eventAddress,
    ticketTypes,
  };

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
            <BookingFormStatus status={status} onRetry={reset} />
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
