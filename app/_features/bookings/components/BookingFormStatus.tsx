"use client";

import {
  FormSubmitStatusScreen,
  FormSubmitStatus,
} from "@/_components/common/FormSubmitStatus";
import { BOOKING_CONFIG } from "@/_lib/constants/booking.constants";

type Props = {
  status: FormSubmitStatus;
  onRetry: () => void;
  errorMessage?: string | null;
};

export default function BookingFormStatus({
  status,
  onRetry,
  errorMessage,
}: Props) {
  return (
    <FormSubmitStatusScreen
      status={status}
      config={BOOKING_CONFIG}
      onRetry={onRetry}
      errorMessage={errorMessage}
      cardClassName="bg-white"
      maxWidth="max-w-7xl"
    />
  );
}
