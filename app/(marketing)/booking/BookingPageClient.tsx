"use client";

import Hero from "@/_components/sections/Marketing/Hero";
// import { OrderSummary } from "@/_features/bookings/components/OrderSummary";
import { useBookingForm } from "@/_hooks/useBookingForm";
import dynamic from "next/dynamic";
import { useEffect, useRef, useMemo } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { FormProvider } from "react-hook-form";
import BookingFormSkeleton from "@/_features/bookings/components/BookingFormSkeleton";

const BookingForm = dynamic(
  () => import("@/_features/bookings/components/BookingForm"),
  {
    ssr: false,
    loading: () => <BookingFormSkeleton />,
  },
);

const BookingFormStatus = dynamic(
  () => import("@/_features/bookings/components/BookingFormStatus"),
);

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
  const formRef = useRef<HTMLFormElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const bookingDetails = useMemo(
    () => ({
      eventTitle,
      eventDate,
      eventLocation,
      eventAddress,
      ticketTypes,
    }),
    [eventTitle, eventDate, eventLocation, eventAddress, ticketTypes],
  );

  useEffect(() => {
    if (status !== "idle" || !formRef.current) {
      return;
    }

    let attempts = 0;
    let timeoutId: number | null = null;
    let frameId: number | null = null;

    const focusBookingForm = () => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const fullNameInput = formRef.current?.querySelector<HTMLInputElement>(
        'input[name="fullName"]',
      );

      if (fullNameInput) {
        fullNameInput.focus({ preventScroll: true });
        return;
      }

      if (attempts >= 10) {
        return;
      }

      attempts += 1;
      timeoutId = window.setTimeout(focusBookingForm, 120);
    };

    frameId = window.requestAnimationFrame(focusBookingForm);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [status]);

  useEffect(() => {
    if (status === "success") {
      sendGAEvent("event", "booking_completed", {
        event_id: eventId,
        event_name: eventTitle,
        event_location: eventLocation,
      });
    }

    if ((status === "success" || status === "error") && statusRef.current) {
      statusRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status, eventId, eventTitle, eventLocation]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
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
            <div
              ref={statusRef}
              className="w-full flex justify-center max-w-2xl"
            >
              <BookingFormStatus
                status={status}
                onRetry={reset}
                errorMessage={specificErrorMessage}
              />
            </div>
          ) : (
            <FormProvider {...methods}>
              <form
                ref={formRef}
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
