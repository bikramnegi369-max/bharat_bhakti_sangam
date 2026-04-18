"use client";

import { MapPin, Clock, BadgeCheck, CalendarDays } from "lucide-react";
import { Button } from "@/_components/ui/Button";
import Link from "next/link";
import { cinzel } from "@/_lib/fonts";

type TicketType = {
  name: string;
  price: number;
};

type BookingSectionProps = {
  eventDate: string;
  eventTime: string;
  eventDay: string;
  venueName: string;
  venueAddress: string;
  ticketTypes: TicketType[];
};

export default function BookingSection({
  eventDate,
  eventTime,
  eventDay,
  venueName,
  venueAddress,
  ticketTypes,
}: BookingSectionProps) {
  const minPrice =
    ticketTypes.length > 0 ? Math.min(...ticketTypes.map((t) => t.price)) : 0;

  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch justify-items-center">
        {/* Heading */}
        <div className="text-center lg:col-span-2">
          <h2
            className={`text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] font-bold ${cinzel.className}`}
          >
            Divine <span className="text-primary">Bhajanclubbing</span>
          </h2>

          {/* Date */}
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
            <CalendarDays className="text-primary w-[clamp(0.875rem,calc(0.679rem+0.982vw),1.563rem)] h-[clamp(0.875rem,calc(0.679rem+0.982vw),1.563rem)]" />
            <span className="font-medium uppercase text-[clamp(0.875rem,calc(0.679rem+0.982vw),1.563rem)]">
              {eventDate}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-5 lg:mt-10 bg-white rounded-lg p-6 lg:p-8 shadow-2xl w-full max-w-[22.813rem] lg:max-w-none flex flex-col justify-between">
          {/* SECTION 1 */}
          <div className="grid gap-3 lg:gap-6">
            {/* Location */}
            <div className="flex gap-3">
              <MapPin className="text-primary w-[clamp(0.875rem,calc(0.679rem+0.982vw),1.563rem)] h-[clamp(0.875rem,calc(0.679rem+0.982vw),1.563rem)]" />
              <div>
                <p
                  className={`font-bold text-heading ${cinzel.className} text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)]`}
                >
                  {venueName}
                </p>
                <p className="text-[clamp(0.625rem,calc(0.536rem+0.446vw),0.938rem)] text-para font-medium">
                  {venueAddress}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex gap-3">
              <Clock className="text-primary w-[clamp(0.875rem,calc(0.679rem+0.982vw),1.563rem)] h-[clamp(0.875rem,calc(0.679rem+0.982vw),1.563rem)] mt-1" />
              <div>
                <p
                  className={`font-bold text-heading ${cinzel.className} text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)]`}
                >
                  {eventDay}
                </p>
                <p className="text-[clamp(0.625rem,calc(0.536rem+0.446vw),0.938rem)] text-para font-medium">
                  {eventTime}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 lg:my-6 border-t border border-heading/20" />

          {/* SECTION 2 */}
          <div className="text-center flex flex-col justify-between">
            <p className="text-heading text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)] font-semibold">
              {ticketTypes.length > 1
                ? "Passes Starting From"
                : `${ticketTypes[0]?.name || "VVIP"} Pass`}
            </p>

            {/* <p
              className={`text-[clamp(1.063rem,calc(0.741rem+1.607vw),2.188rem)] font-bold text-primary mt-2 ${cinzel.className}`}
            >
              ₹{minPrice}
            </p> */}

            <p className="text-[clamp(0.375rem,calc(0.268rem+0.536vw),0.75rem)] text-para mt-1 font-bold">
              *Includes Premium High Tea & Snacks
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-4 px-4">
            <Link href="/booking" className="w-full">
              <Button
                variant="primary"
                className="w-full text-[clamp(0.688rem,calc(0.491rem+0.982vw),1.375rem)] font-semibold py-2"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>

        {/* What to Expect */}
        <div className="mt-5 lg:mt-10 bg-primary_light border-3 border-primary rounded-lg p-6 lg:p-8 w-full max-w-[22.813rem] lg:max-w-none flex flex-col justify-between">
          <h3
            className={`text-[clamp(0.938rem,calc(0.491rem+2.232vw),2.5rem)] text-heading font-bold mb-4 ${cinzel.className}`}
          >
            What to expect
          </h3>

          <ul className="space-y-3 flex-grow">
            {[
              "Enjoy powerful live bhajan and kirtan concerts.",
              "Dance to uplifting electronic bhakti beats.",
              "Collective Mantra Chanting",
              "Celebrate devotion in a vibrant setting.",
              "A Spiritually Elevated Environment",
              "Experience a unique blend of meditation & music.",
            ].map((item, index) => (
              <li key={index} className="flex gap-3 items-start">
                <BadgeCheck className="text-primary w-[clamp(0.625rem,calc(0.268rem+1.786vw),1.875rem)] h-[clamp(0.625rem,calc(0.268rem+1.786vw),1.875rem)]" />
                <span className="text-para text-[clamp(0.5rem,calc(0.286rem+1.071vw),1.25rem)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
