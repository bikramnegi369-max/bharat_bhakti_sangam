"use client";

import { FormSubmitStatusScreen, FormSubmitStatus } from "@/_components/common/FormSubmitStatus";
import { BOOKING_STATUS_CONFIG } from "@/_lib/constants/booking.constants";

type Props = { status: FormSubmitStatus; onRetry: () => void };

export function BookingFormStatus({ status, onRetry }: Props) {
  return (
    <FormSubmitStatusScreen
      status={status}
      config={BOOKING_STATUS_CONFIG}
      onRetry={onRetry}
      cardClassName="bg-white"
      maxWidth="max-w-7xl"
    />
  );
}
