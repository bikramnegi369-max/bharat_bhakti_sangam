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
import { Button } from "@/_components/ui/Button";
import { useRouter } from "next/navigation";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type EventInfoSectionProps = {
  date?: string;
  time?: string;
  venue?: {
    name: string;
    address: string;
  };
  capacity?: {
    current: number;
    total: number;
  };
  type?: string;
  booking?: {
    categories: string[];
    price: string;
  };
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
  booking = {
    categories: ["General Sitting", "Premium Seating"],
    price: "₹250",
  },
}: EventInfoSectionProps) {
  const router = useRouter();

  return (
    <section className="flex justify-center h-full ">
      <div className="h-full max-w-7xl mx-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] border-3 border-primary rounded-md p-6 lg:p-8 bg-primary_light flex flex-col">
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
              <p className="text-sm text-para">{venue.address}</p>
            </div>
          </div>

          <Divider />

          {/* ✅ UPDATED CAPACITY */}
          <InfoBlock
            icon={UsersRound}
            label="Capacity"
            value={`${capacity.current} / ${capacity.total} Attending`}
            capacity={capacity}
          />

          <Divider />

          <InfoBlock icon={BookmarkMinus} label="Type" value={type} />

          <Divider />

          {/* BOOKING */}
          <div className="flex gap-4 justify-between items-start">
            <div className="flex gap-4">
              <Ticket className="text-primary w-6 h-6 mt-1" />
              <div>
                <p
                  className={clsx(
                    "text-[clamp(1.188rem,calc(1.08rem+0.536vw),1.563rem)]",
                    cinzel.className,
                    "font-bold text-heading",
                  )}
                >
                  Booking
                </p>

                {booking.categories.map((cat, i) => (
                  <p
                    key={i}
                    className="text-para text-[clamp(0.813rem,calc(0.723rem+0.446vw),1.125rem)] font-medium"
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>

            <p
              className={clsx(
                "text-primary font-bold text-lg",
                cinzel.className,
              )}
            >
              {booking.price}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => router.push("/booking")}
            variant="primary"
            className="w-full text-[clamp(0.688rem,calc(0.491rem+0.982vw),1.375rem)] font-semibold py-2"
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
}

/*  Divider (cleaner + reusable) */
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
