import { Button } from "@/_components/ui/Button";
import { BookingFormData } from "@/_schemas/booking.schema";
import clsx from "clsx";
import { Info, Ticket } from "lucide-react";
import { Cinzel } from "next/font/google";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  eventDate?: string;
  isSubmitting: boolean;
  ticketTypes: { name: string; price: number }[];
};

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const OrderSummary = ({
  eventDate,
  ticketTypes,
  isSubmitting,
}: Props) => {
  const { control } = useFormContext<BookingFormData>();
  const data = useWatch({ control });

  const selectedTicket = ticketTypes.find((t) => t.name === data.ticketType);
  const total = (data?.tickets || 0) * (selectedTicket?.price || 0);

  return (
    <div className="hidden lg:visible bg-primary_light border-2 border-primary lg:border-l-0 rounded-lg lg:rounded-r-3xl! lg:rounded-t-none lg:rounded-b-none  space-y-8 lg:space-y-16 p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] lg:flex flex-col h-full">
      <h2
        className={clsx(
          "text-[clamp(1.313rem,calc(1.063rem+1.25vw),2.188rem)] font-bold text-heading",
          cinzel.className,
        )}
      >
        Order Summary
      </h2>

      <div className="flex flex-col gap-8">
        <div className="flex gap-6 items-center">
          <Ticket className="text-primary w-[clamp(1.5rem,calc(1.357rem+0.714vw),2rem)] h-[clamp(1.5rem,calc(1.357rem+0.714vw),2rem)]" />
          <span
            className={clsx(
              "capitalize text-[clamp(1.125rem,calc(1rem+0.625vw),1.563rem)] font-bold text-heading",
              cinzel.className,
            )}
          >
            {data?.ticketType} Pass
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-para text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-medium tracking-wide">
            Price ({data?.tickets} Tickets)
          </span>
          <span
            className={clsx(
              "text-[clamp(1.375rem,calc(1.232rem+0.714vw),1.875rem)] font-bold text-heading",
              cinzel.className,
            )}
          >
            ₹{total}
          </span>
        </div>

        <div className="border-t pt-2 flex justify-between">
          <span className="text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-semibold text-para tracking-wider">
            Grand Total
          </span>
          <span
            className={clsx(
              "text-[clamp(1.625rem,calc(1.464rem+0.804vw),2.188rem)] text-heading font-bold",
              cinzel.className,
            )}
          >
            ₹{total}
          </span>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-8">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] py-3"
        >
          <span className="text-[clamp(0.875rem,calc(0.768rem+0.536vw),1.25rem)] font-semibold tracking-widest uppercase">
            {isSubmitting ? "Booking..." : "Book Now"}
          </span>
        </Button>
        <div className="flex gap-3 p-2 border rounded-md bg-[#FFDFAF] border-para">
          <Info size={14} className="text-primary" />
          <span className="text-xs text-para">
            Valid for {data?.tickets}{" "}
            {data?.tickets === 1 ? "entry" : "entries"} for the event on{" "}
            {eventDate}.
          </span>
        </div>
      </div>
    </div>
  );
};
