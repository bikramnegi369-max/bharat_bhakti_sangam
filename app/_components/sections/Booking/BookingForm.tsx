import { Button } from "@/_components/ui/Button";
import { Counter } from "@/_components/ui/Counter";
import { Input } from "@/_components/ui/Input";
import { Radio } from "@/_components/ui/Radio";
import { BookingFormData } from "@/_schemas/booking";
import clsx from "clsx";
import { Cinzel } from "next/font/google";
import { useFormContext, useWatch } from "react-hook-form";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const BookingForm = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<BookingFormData>();

  const values = useWatch({ control });

  return (
    <div className="bg-white border-2 border-primary  rounded-lg lg:border-r-0 lg:rounded-t-none lg:rounded-b-none  lg:rounded-l-3xl! p-6 shadow-sm space-y-4 mx-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] lg:mx-0  px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] ">
      <h2
        className={clsx(
          "text-[clamp(1.313rem,calc(1.063rem+1.25vw),2.188rem)] font-bold text-heading",
          cinzel.className,
        )}
      >
        Contact Information
      </h2>

      <Input
        label="Full Name"
        {...register("fullName")}
        error={errors.fullName?.message as string}
        labelClassName="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)] font-bold! text-heading"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          {...register("email")}
          error={errors.email?.message as string}
          labelClassName="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)] font-bold! text-heading"
        />
        <Input
          label="Mobile"
          {...register("mobile")}
          error={errors.mobile?.message as string}
          maxLength={10}
          labelClassName="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)] font-bold! text-heading"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center gap-1">
          <span className="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)] font-bold text-heading">
            Number of Tickets
          </span>
          <Counter
            min={1}
            value={values.tickets}
            onChange={(val: number) => setValue("tickets", val)}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)] font-bold text-heading">
            Ticket Type
          </span>
          <div className="grid grid-cols-3 mt-2 gap-4">
            <Radio
              label="General"
              value="general"
              selected={values.ticketType}
              onChange={(v: string | number) =>
                setValue("ticketType", v as BookingFormData["ticketType"])
              }
            />
            <div className="col-span-2">
              <Radio
                label="Premium"
                value="premium"
                selected={values.ticketType}
                onChange={(v: string | number) =>
                  setValue("ticketType", v as BookingFormData["ticketType"])
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[clamp(0.625rem,calc(0.446rem+0.893vw),1.25rem)] font-bold text-heading">
          Payment Method
        </span>
        <div className="grid grid-cols-3 mt-2 gap-4">
          <Radio
            label="UPI"
            value="upi"
            selected={values.paymentMethod}
            onChange={(v: string | number) =>
              setValue("paymentMethod", v as BookingFormData["paymentMethod"])
            }
          />
          <div className="col-span-2">
            <Radio
              label="Card"
              value="card"
              selected={values.paymentMethod}
              onChange={(v: string | number) =>
                setValue("paymentMethod", v as BookingFormData["paymentMethod"])
              }
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full mt-4 text-[12px]! lg:text-[18px]! py-3"
      >
        <span>Confirm & Pay</span>
      </Button>
    </div>
  );
};
