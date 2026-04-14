"use client";

import { FormSubmitStatusScreen, FormSubmitStatus } from "@/_components/common/FormSubmitStatus";
import { CONTACT_STATUS_CONFIG } from "@/_lib/constants/contact.constants";

type Props = { status: FormSubmitStatus; onRetry: () => void };

export function ContactFormStatus({ status, onRetry }: Props) {
  return (
    <FormSubmitStatusScreen
      status={status}
      config={CONTACT_STATUS_CONFIG}
      onRetry={onRetry}
      cardClassName="bg-white/95 backdrop-blur-sm"
    />
  );
}
