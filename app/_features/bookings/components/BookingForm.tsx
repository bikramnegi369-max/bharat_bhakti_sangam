import { Button } from "@/_components/ui/Button";
import { Counter } from "@/_components/ui/Counter";
import { Field } from "@/_components/ui/Field/Field";
import { BOOKING_CONFIG } from "@/_lib/constants/booking.constants";
import { cinzel } from "@/_lib/fonts";
import { BookingFormData } from "@/_schemas/booking.schema";
import clsx from "clsx";
import { CreditCard, Loader2, Ticket } from "lucide-react";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  isSubmitting: boolean;
  eventDate?: string;
  ticketTypes: { name: string; price: number }[];
};

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function BookingForm({
  isSubmitting,
  eventDate,
  ticketTypes,
}: Props) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<BookingFormData>();

  const values = useWatch({ control });
  const selectedTicket = useMemo(
    () => ticketTypes.find((ticket) => ticket.name === values.ticketType),
    [ticketTypes, values.ticketType],
  );
  const ticketCount = values.tickets || 1;
  const total = ticketCount * (selectedTicket?.price || 0);

  return (
    <div
      className="w-full bg-white border-2 border-primary rounded-3xl! shadow-sm space-y-8 lg:space-y-16  px-[clamp(1.375rem,calc(1.054rem+1.607vw),2.5rem)]
           py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)] "
    >
      <h2
        className={clsx(
          "text-[clamp(1.313rem,calc(1.116rem+0.982vw),2rem)] font-bold text-heading text-center",
          cinzel.className,
        )}
      >
        Booking Information
      </h2>
      <Field
        as="input"
        type="text"
        label={BOOKING_CONFIG.form.fullNameLabel}
        placeholder={BOOKING_CONFIG.form.fullNamePlaceholder}
        {...register("fullName")}
        error={errors.fullName?.message as string}
        labelClassName="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)]"
      />
      <Field
        as="input"
        type="email"
        label={BOOKING_CONFIG.form.emailLabel}
        placeholder={BOOKING_CONFIG.form.emailPlaceholder}
        {...register("email")}
        error={errors.email?.message as string}
        labelClassName="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)]"
      />
      <Field
        as="input"
        type="tel"
        label={BOOKING_CONFIG.form.phoneLabel}
        placeholder={BOOKING_CONFIG.form.phonePlaceholder}
        {...register("mobile")}
        error={errors.mobile?.message as string}
        maxLength={10}
        labelClassName="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)]"
      />

      {ticketTypes.length > 0 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="text-[clamp(0.813rem,calc(0.741rem+0.357vw),1.063rem)] font-semibold tracking-[0.25em] uppercase text-gray-500">
            Select Pass
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ticketTypes.map((ticket) => {
              const isSelected = values.ticketType === ticket.name;

              return (
                <label
                  key={ticket.name}
                  className={clsx(
                    "flex min-h-24 cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-colors",
                    isSelected
                      ? "border-primary bg-primary_light"
                      : "border-gray-200 bg-white hover:border-primary/60",
                  )}
                >
                  <input
                    type="radio"
                    value={ticket.name}
                    className="sr-only"
                    {...register("ticketType")}
                    onChange={() =>
                      setValue("ticketType", ticket.name, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                      isSelected
                        ? "border-primary bg-primary text-black"
                        : "border-gray-300 text-primary",
                    )}
                  >
                    <Ticket className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-semibold capitalize text-heading">
                      {ticket.name} Pass
                    </span>
                    <span className="block text-sm font-medium text-para">
                      {formatPrice(ticket.price)} per ticket
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          {errors.ticketType?.message && (
            <span className="text-sm text-red-600">
              {errors.ticketType.message}
            </span>
          )}
        </fieldset>
      )}

      <div className="flex flex-col justify-center gap-3">
        <span className="text-[clamp(0.813rem,calc(0.741rem+0.357vw),1.063rem)] font-semibold tracking-[0.25em] uppercase text-gray-500 ">
          Number of Tickets
        </span>
        <Counter
          min={1}
          max={5}
          value={ticketCount}
          onChange={(val: number) => setValue("tickets", val)}
          error={errors.tickets?.message as string}
        />
      </div>

      <div className="rounded-lg border border-primary/50 bg-primary_light/70 p-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
            Total
          </span>
          <span
            className={clsx(
              "text-[clamp(1.375rem,calc(1.232rem+0.714vw),1.875rem)] font-bold text-heading",
              cinzel.className,
            )}
          >
            {formatPrice(total)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-para">
          {ticketCount} {ticketCount === 1 ? "entry" : "entries"}
          {selectedTicket ? ` for ${selectedTicket.name} Pass` : ""}
          {eventDate ? ` on ${eventDate}` : ""}. Payment opens securely through
          Razorpay.
        </p>
      </div>

      <div className=" flex flex-col gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] py-3 flex gap-4 justify-center items-center"
        >
          {isSubmitting && (
            <Loader2 className="w-4 h-4 lg:w-8 lg:h-8 animate-spin" />
          )}
          {!isSubmitting && <CreditCard className="h-5 w-5" />}
          <span className="text-[clamp(0.875rem,calc(0.768rem+0.536vw),1.25rem)] font-semibold tracking-widest uppercase">
            {isSubmitting ? "Processing..." : `Pay ${formatPrice(total)}`}
          </span>
        </Button>
      </div>
    </div>
  );
}
