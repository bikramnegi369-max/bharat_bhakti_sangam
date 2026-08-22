"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { sendGAEvent } from "@next/third-parties/google";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import clsx from "clsx";

import { playfair } from "@/_lib/fonts";
import { trackMetaPixel } from "@/_lib/meta-pixel";
import { useBookingForm } from "@/_hooks/useBookingForm";
import BookingFormStatus from "@/_features/bookings/components/BookingFormStatus";
import { BookingEventSummary } from "@/_features/bookings/components/BookingEventSummary";
import { BookingPassSelector } from "@/_features/bookings/components/BookingPassSelector";
import { BookingTicketCounter } from "@/_features/bookings/components/BookingTicketCounter";
import { BookingUserInfoFields } from "@/_features/bookings/components/BookingUserInfoFields";
import { BookingOrderSummaryCard } from "@/_features/bookings/components/BookingOrderSummaryCard";
import {
  PassTierItem,
  mapEventBookingTypesToPasses,
} from "@/_components/sections/Marketing/Event/PassTiersSection";

type TicketType = {
  _id?: string;
  name: string;
  price: number;
};

type BookingPageClientProps = {
  eventId: string;
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
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
  eventTime,
  eventLocation,
  eventAddress,
  heroImage,
  ticketTypes,
  initialTicketType,
}: BookingPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passParam = searchParams.get("pass");
  const passIdParam = searchParams.get("passId");

  // Map dynamic ticketTypes into structured rich PassTierItems
  const passes: PassTierItem[] = useMemo(() => {
    return mapEventBookingTypesToPasses(ticketTypes);
  }, [ticketTypes]);

  // Determine active selected pass from searchParams or default
  const resolvedPassName = useMemo(() => {
    if (passIdParam) {
      const matchById = passes.find(
        (p) => p.passId === passIdParam || p.id === passIdParam,
      );
      if (matchById) return matchById.name;
    }
    if (passParam) {
      const match = passes.find(
        (p) => p.name.toLowerCase().trim() === passParam.toLowerCase().trim(),
      );
      if (match) return match.name;
    }
    return (
      initialTicketType ||
      passes.find((p) => p.isPopular)?.name ||
      passes[0]?.name ||
      "PASS"
    );
  }, [passIdParam, passParam, initialTicketType, passes]);

  const {
    methods,
    onSubmit,
    isSubmitting,
    status,
    specificErrorMessage,
    reset,
  } = useBookingForm(resolvedPassName, eventId, eventTitle);

  const selectedTicketName = methods.watch("ticketType") || resolvedPassName;
  const currentTicketCount = methods.watch("tickets") || 1;

  // Active pass item
  const activePassItem = useMemo(() => {
    return (
      passes.find(
        (p) =>
          p.name.toLowerCase().trim() ===
          selectedTicketName.toLowerCase().trim(),
      ) ||
      passes[0] || {
        name: "Standard Pass",
        price: 499,
      }
    );
  }, [passes, selectedTicketName]);

  // Sync ticketType value when resolvedPassName changes
  useEffect(() => {
    if (resolvedPassName) {
      methods.setValue("ticketType", resolvedPassName);
    }
  }, [resolvedPassName, methods]);

  // Handle pass selection with URL synchronization
  const handleSelectPass = useCallback(
    (pass: PassTierItem) => {
      methods.setValue("ticketType", pass.name);
      const query = pass.passId
        ? `passId=${pass.passId}`
        : `pass=${encodeURIComponent(pass.name)}`;
      router.replace(`/booking?${query}`, { scroll: false });
    },
    [methods, router],
  );

  // Adaptive Conversion Focus Strategy:
  // 1. If user came from Event Page with a specific pass (passId or pass param), they already made their choice!
  //    -> Auto-scroll smoothly and focus directly on "Step 04: Your Information" (Full Name input) to eliminate friction.
  // 2. If user came from general "Book Now" CTA (no pass param), auto-scroll smoothly to "Step 02: Choose Your Pass"
  //    so the dynamic passes and popular highlight are in full view without forcing the user to scroll manually.
  useEffect(() => {
    if (status !== "idle") return;

    const timer = setTimeout(() => {
      if (passParam || passIdParam) {
        // High Intent flow: Focus input directly
        const fullNameInput = document.getElementById("booking-fullName");
        if (fullNameInput) {
          fullNameInput.scrollIntoView({ behavior: "smooth", block: "center" });
          fullNameInput.focus({ preventScroll: true });
        }
      } else {
        // General discovery flow: Bring Pass Selector (Step 02) into comfortable view
        const stepPassSelector = document.getElementById(
          "step-choose-pass-section",
        );
        if (stepPassSelector) {
          stepPassSelector.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [passParam, passIdParam, status]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

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
    <div className="w-full min-h-screen bg-[#FFFDF9] py-6 sm:py-10 md:py-14">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Header Bar: Back to Event link & Trust note */}
        <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-[#F3E5CA]">
          <Link
            href="/event"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#740E0A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#740E0A]" />
            <span>Back to Event</span>
          </Link>

          <div className="flex items-center gap-1.5 text-right">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <div className="text-left">
              <p className="text-xs font-bold text-gray-800 leading-tight">
                Secure Booking
              </p>
              <p className="text-[0.625rem] text-gray-500 leading-tight">
                Your data is protected
              </p>
            </div>
          </div>
        </div>

        {/* Main Title Section with Gold Star Decoration */}
        <div className="text-center pt-8 sm:pt-10 pb-10 sm:pb-12 space-y-3">
          <div className="flex items-center justify-center gap-3 select-none">
            <span className="w-8 sm:w-16 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-lg sm:text-xl">★</span>
            <span className="w-8 sm:w-16 h-px bg-[#D4AF37]" />
          </div>

          <h1
            className={clsx(
              playfair.className,
              "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3F0605] tracking-widest uppercase",
            )}
          >
            BOOK YOUR TICKET
          </h1>

          <p
            className={clsx(
              playfair.className,
              "text-xs sm:text-sm md:text-base text-gray-600 italic tracking-wide",
            )}
          >
            Reserve your place at{" "}
            <span className="font-semibold text-gray-800">{eventTitle}</span>
          </p>
        </div>

        {/* Form or Status View */}
        {status === "success" || status === "error" ? (
          <div ref={statusRef} className="w-full flex justify-center py-8">
            <BookingFormStatus
              status={status}
              onRetry={reset}
              errorMessage={specificErrorMessage}
              bookingDetails={{
                eventTitle,
                eventDate,
                eventTime,
                eventLocation: [eventLocation, eventAddress]
                  .filter(Boolean)
                  .join(", "),
                ticketType: selectedTicketName,
                ticketCount: currentTicketCount,
                email: methods.getValues("email"),
                fullName: methods.getValues("fullName"),
              }}
            />
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              ref={formRef}
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-10 sm:space-y-12"
            >
              {/* Step 01: Event Summary */}
              <BookingEventSummary
                eventTitle={eventTitle}
                eventDate={eventDate}
                eventTime={eventTime}
                eventLocation={eventLocation}
                eventAddress={eventAddress}
                heroImage={heroImage}
                eventSlugOrUrl="/event"
              />

              {/* Step 02: Choose Your Pass */}
              <BookingPassSelector
                passes={passes}
                selectedPassName={selectedTicketName}
                onSelectPass={handleSelectPass}
              />

              {/* Step 03: Your Information */}
              <BookingUserInfoFields />

              {/* Step 04: Number of Tickets */}
              <BookingTicketCounter
                selectedPassName={activePassItem.name}
                unitPrice={activePassItem.price}
                ticketCount={currentTicketCount}
                onChangeCount={(val) => methods.setValue("tickets", val)}
              />

              {/* Step 05 & 06: Booking Summary & Payment */}
              <BookingOrderSummaryCard
                selectedPassName={activePassItem.name}
                ticketCount={currentTicketCount}
                unitPrice={activePassItem.price}
                convenienceFee={100}
                gstRate={0.18}
                isSubmitting={isSubmitting}
              />
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
}
