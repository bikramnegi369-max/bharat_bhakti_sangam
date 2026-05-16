import { Button } from "@/_components/ui/Button";
import { Counter } from "@/_components/ui/Counter";
import { Field } from "@/_components/ui/Field/Field";
import { BOOKING_CONFIG } from "@/_lib/constants/booking.constants";
import { cinzel } from "@/_lib/fonts";
import { BookingFormData } from "@/_schemas/booking.schema";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  isSubmitting: boolean;
};

export default function BookingForm({ isSubmitting }: Props) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<BookingFormData>();

  const values = useWatch({ control });

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
          <span className="text-[clamp(0.875rem,calc(0.768rem+0.536vw),1.25rem)] font-semibold tracking-widest uppercase">
            {isSubmitting ? "Booking..." : "Book Now"}
          </span>
        </Button>
      </div>
    </div>
  );
}
