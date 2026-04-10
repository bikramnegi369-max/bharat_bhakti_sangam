"use client";
import { BookingForm } from "@/_components/sections/Marketing/Booking/BookingForm";
import { OrderSummary } from "@/_components/sections/Marketing/Booking/OrderSummary";
import Hero from "@/_components/sections/Marketing/Hero";
import { BookingFormData, bookingSchema } from "@/_schemas/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const PRICING = { general: 350, premium: 500, vip: 750 };

export default function BookingPage() {
  const methods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      tickets: 1,
      ticketType: "general",
    },
  });

  const onSubmit = (data: BookingFormData) => {
    console.log("FINAL DATA : ", data);
  };

  return (
    <div className="relative">
      {/* Preload the hero image */}
      <link
        rel="preload"
        as="image"
        href="/home_hero.jpg"
        fetchPriority="high"
      />
      <Hero
        title="Midnight Krishna Kirtan"
        location="ISKCON Temple Hall | Hare Krishna Land, Juhu, Mumbai 400049"
        date="12 Nov, 2026 | 11:00 a.m - 6:00 p.m"
        backgroundImage="/home_hero.jpg"
      />
      <FormProvider {...methods}>
        <div className="relative lg:-mt-40 z-10">
          <section className="w-full flex justify-center">
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full max-w-7xl py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] px-4 lg:px-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-0">
                <BookingForm pricing={PRICING} eventDate="12 Nov, 2026" />
                <OrderSummary eventDate="12 Nov, 2026" pricing={PRICING} />
              </div>
            </form>
          </section>
        </div>
      </FormProvider>
    </div>
  );
}
