"use client";

import {
  CalendarDays,
  Clock,
  MapPin,
  UsersRound,
  BookmarkMinus,
  Ticket,
  LucideIcon,
} from "lucide-react";
import { Cinzel } from "next/font/google";
import clsx from "clsx";
import { CTAButton } from "@/_components/ui/CTAButton";
import { BookingCategory } from "@/_types/Booking.types";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type EventInfoSectionProps = {
  date?: string;
  time?: string;
  venue?: {
    name: string;
    address?: string;
  };
  capacity?: {
    current: number;
    total: number;
  };
  type?: string;
  booking?: BookingCategory[];
};

export default function EventInfoSection({
  date = "Fri, 27 Mar, 2026",
  time = "8:00 PM - 11:30 PM",
  venue = {
    name: "ISKCON Temple Hall",
    address: "Hare Krishna Land, Juhu, Mumbai 400049",
  },
  capacity = { current: 150, total: 200 },
  type = "Public | Indoor | Classical Dance | Singing",
  booking = [
    {
      name: "General Sitting",
      price: 800,
    },
  ],
}: EventInfoSectionProps) {
  return (
    <section className="h-full w-full">
      <div className="h-full w-full border-3 border-primary rounded-md p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light flex flex-col">
        <div className="grid grid-cols-1 gap-[clamp(0.75rem,calc(0.536rem+1.071vw),1.5rem)]">
          <InfoBlock icon={CalendarDays} label="DATE" value={date} />

          <Divider />

          <InfoBlock icon={Clock} label="Time" value={time} />

          <Divider />

          {/* VENUE */}
          <div className="flex gap-4">
            <MapPin className="text-primary w-[clamp(1.188rem,calc(1.152rem+0.179vw),1.313rem)] h-[clamp(1.188rem,calc(1.152rem+0.179vw),1.313rem)] mt-1" />
            <div>
              <p
                className={clsx(
                  "text-[clamp(1.188rem,calc(1.08rem+0.536vw),1.563rem)]",
                  cinzel.className,
                  "font-bold text-heading",
                )}
              >
                Venue
              </p>
              <p className="font-semibold text-para">{venue.name}</p>
              {venue.address && (
                <p className="text-sm text-para">{venue.address}</p>
              )}
            </div>
          </div>

          <Divider />

          {/* CAPACITY */}
          <InfoBlock
            icon={UsersRound}
            label="Capacity"
            value={`${capacity.current} / ${capacity.total} Attending`}
            capacity={capacity}
          />

          <Divider />

          {type && (
            <>
              <InfoBlock icon={BookmarkMinus} label="Type" value={type} />
              <Divider />
            </>
          )}

          {/* BOOKING */}
          {/* <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <Ticket className="text-primary w-[clamp(1.188rem,calc(1.152rem+0.179vw),1.313rem)] h-[clamp(1.188rem,calc(1.152rem+0.179vw),1.313rem)] mt-1 shrink-0" />

              <div className="flex flex-col w-full gap-3">
                
                <p
                  className={clsx(
                    "text-[clamp(1.188rem,calc(1.08rem+0.536vw),1.563rem)]",
                    cinzel.className,
                    "font-bold text-heading",
                  )}
                >
                  Booking
                </p>

               
                {booking?.length ? (
                  <div className="flex flex-col gap-2 w-full">
                    {booking.map((cat) => {
                      const key = `${cat.name}-${cat.price}`;

                      return (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <p className="text-para text-[clamp(0.813rem,calc(0.723rem+0.446vw),1.125rem)] font-medium">
                            {cat.name}
                          </p>

                          <p
                            className={clsx(
                              "text-primary font-bold text-[clamp(1.188rem,calc(1.08rem+0.536vw),1.563rem)]",
                              cinzel.className,
                            )}
                          >
                            ₹{cat.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-para text-[clamp(0.813rem,calc(0.723rem+0.446vw),1.125rem)] font-medium opacity-70">
                    Tickets information unavailable
                  </p>
                )}
              </div>
            </div>
          </div> */}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-[clamp(1.5rem,calc(1.25rem+1.25vw),2.5rem)] flex justify-center">
          <CTAButton
            href="/booking"
            label="Book Now"
            className="w-full text-[clamp(0.688rem,calc(0.491rem+0.982vw),1.375rem)] font-semibold py-2"
          />
        </div>
      </div>
    </section>
  );
}

/*  Divider  */
function Divider() {
  return <div className="my-2 h-px w-full bg-para/30" />;
}

/*  Info Block */
function InfoBlock({
  icon: Icon,
  label,
  value,
  capacity,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  capacity?: { current: number; total: number };
}) {
  const percentage = capacity
    ? Math.min((capacity.current / capacity.total) * 100, 100)
    : 0;

  return (
    <div className="flex gap-4">
      <Icon className="text-primary w-[clamp(1.188rem,calc(1.152rem+0.179vw),1.313rem)] h-[clamp(1.188rem,calc(1.152rem+0.179vw),1.313rem)] mt-1" />

      <div className="w-full">
        <p
          className={clsx(
            "text-[clamp(1.188rem,calc(1.08rem+0.536vw),1.563rem)] font-bold text-heading",
            cinzel.className,
          )}
        >
          {label}
        </p>

        <p className="text-para font-medium text-[clamp(0.813rem,calc(0.723rem+0.446vw),1.125rem)] mb-2">
          {value}
        </p>

        {/* Progress Bar */}
        {capacity && (
          <div className="w-full h-2 bg-para/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
