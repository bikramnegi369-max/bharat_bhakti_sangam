"use client";

import { FormSubmitStatusScreen, FormSubmitStatus } from "@/_components/common/FormSubmitStatus";
import { FEEDBACK_STATUS_CONFIG } from "@/_lib/constants/feedback.constants";

type Props = { status: FormSubmitStatus; onRetry: () => void; errorMessage?: string | null };

export function FeedbackFormStatus({ status, onRetry, errorMessage }: Props) {
  return (
    <FormSubmitStatusScreen
      status={status}
      config={FEEDBACK_STATUS_CONFIG}
      onRetry={onRetry}
      cardClassName="bg-white"
      errorMessage={errorMessage}
    />
  );
}
