import { Button } from "@/_components/ui/Button";
import { Counter } from "@/_components/ui/Counter";
import { Field } from "@/_components/ui/Field/Field";
import { BOOKING_CONFIG } from "@/_lib/constants/booking.constants";
import { cinzel } from "@/_lib/fonts";
import { BookingFormData } from "@/_schemas/booking.schema";
import clsx from "clsx";
import { Info, Loader2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  eventDate?: string;
  isSubmitting: boolean;
  ticketTypes: { name: string; price: number }[];
};

export default function BookingForm({
  eventDate,
  isSubmitting,
  ticketTypes,
}: Props) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<BookingFormData>();

  const values = useWatch({ control });

  const selectedTicket = ticketTypes.find((t) => t.name === values.ticketType);
  const total = (values.tickets || 0) * (selectedTicket?.price || 0);

  const ticketOptions = ticketTypes.map((type) => ({
    label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
    value: type.name,
    price: type.price,
  }));

  return (
    <div
      className="w-full bg-white border-2 border-primary rounded-3xl! shadow-sm space-y-8 lg:space-y-16  px-[clamp(1.375rem,calc(1.054rem+1.607vw),2.5rem)]
           py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)] "
    >
      <h2
        className={clsx(
          "text-[clamp(1.313rem,calc(1.063rem+1.25vw),2.188rem)] font-bold text-heading text-center",
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
      {/* <div className="flex flex-col justify-center gap-8">
        <Controller
          name="ticketType"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Ticket Type"
              options={ticketOptions}
              value={ticketOptions.find((o) => o.value === field.value) ?? null}
              onChange={(opt) => field.onChange(opt?.value)}
            />
          )}
        />
      </div> */}
      <div className="flex flex-col justify-center gap-3">
        <span className="text-[clamp(0.813rem,calc(0.741rem+0.357vw),1.063rem)] font-semibold tracking-[0.25em] uppercase text-gray-500 ">
          Number of Tickets
        </span>
        <Counter
          min={1}
          value={values.tickets}
          onChange={(val: number) => setValue("tickets", val)}
        />
      </div>

      <hr className=" border-para opacity-20" />

      <div className=" flex flex-col gap-4">
        {/* <div className="flex justify-between items-center">
          <span className="text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-semibold text-para tracking-wider">
            Grand Total :
          </span>
          <span
            className={clsx(
              "text-[clamp(1.625rem,calc(1.464rem+0.804vw),2.188rem)] text-heading font-bold",
              cinzel.className,
            )}
          >
            ₹{total}
          </span>
        </div> */}
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] py-3 flex gap-4 justify-center items-center"
        >
          {isSubmitting && (
            <Loader2 className="w-4 h-4 lg:w-8 lg:h-8 animate-spin" />
          )}
          <span className="text-[clamp(0.875rem,calc(0.768rem+0.536vw),1.25rem)] font-semibold tracking-widest uppercase">
            {isSubmitting ? "Booking..." : "Book Now"}
          </span>
        </Button>
        <div className="flex gap-2 p-2 border rounded-md border-primary m-auto">
          <Info size={14} className="text-primary" />
          <span className="text-[8px] lg:text-sm text-primary">
            Valid for {values?.tickets}{" "}
            {values?.tickets === 1 ? "entry" : "entries"} for the event on{" "}
            {eventDate}.
          </span>
        </div>
      </div>
    </div>
  );
}
