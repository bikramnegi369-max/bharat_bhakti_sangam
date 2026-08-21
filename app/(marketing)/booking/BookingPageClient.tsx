"use client";

import Hero from "@/_components/sections/Marketing/Hero";
import BookingForm from "@/_features/bookings/components/BookingForm";
import BookingFormStatus from "@/_features/bookings/components/BookingFormStatus";
import { useBookingForm } from "@/_hooks/useBookingForm";
import { useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { FormProvider } from "react-hook-form";
import { trackMetaPixel } from "@/_lib/meta-pixel";

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
  initialTicketType?: string;
};

export function BookingPageClient({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  eventAddress,
  heroImage,
  ticketTypes,
  initialTicketType,
}: BookingPageClientProps) {
  const searchParams = useSearchParams();
  const passParam = searchParams.get("pass");

  const resolvedPass = useMemo(() => {
    if (passParam) {
      const match = ticketTypes.find(
        (t) => t.name.toLowerCase().trim() === passParam.toLowerCase().trim(),
      );
      if (match) return match.name;
    }
    return initialTicketType || ticketTypes[0]?.name || "";
  }, [passParam, initialTicketType, ticketTypes]);

  const {
    methods,
    onSubmit,
    isSubmitting,
    status,
    specificErrorMessage,
    reset,
  } = useBookingForm(resolvedPass, eventId, eventTitle);

  useEffect(() => {
    if (resolvedPass) {
      methods.setValue("ticketType", resolvedPass);
    }
  }, [resolvedPass, methods]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status !== "idle" || !formRef.current) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      formRef.current?.querySelector<HTMLInputElement>(
        'input[name="fullName"]',
      )?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [status]);

  useEffect(() => {
    if (status === "success") {
      sendGAEvent("event", "booking_completed", {
        event_id: eventId,
        event_name: eventTitle,
        event_location: eventLocation,
      });
      trackMetaPixel("CompleteRegistration", {
        content_name: eventTitle,
        content_category: "event_booking",
        event_id: eventId,
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
                    isSubmitting={isSubmitting}
                    eventDate={eventDate}
                    ticketTypes={ticketTypes}
                  />
                </div>
              </form>
            </FormProvider>
          )}
        </section>
      </div>
    </div>
  );
}
