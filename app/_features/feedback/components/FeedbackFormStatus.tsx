import { FormSubmitStatusScreen, FormSubmitStatus } from "@/_components/common/FormSubmitStatus";
import { FEEDBACK_STATUS_CONFIG } from "@/_lib/constants/feedback.constants";
import ScrollReveal from "@/_components/common/ScrollReveal";

type Props = { status: FormSubmitStatus; onRetry: () => void; errorMessage?: string | null };

export function FeedbackFormStatus({ status, onRetry, errorMessage }: Props) {
  return (
    <ScrollReveal animation="scale-up" duration={700}>
      <FormSubmitStatusScreen
        status={status}
        config={FEEDBACK_STATUS_CONFIG}
        onRetry={onRetry}
        cardClassName="bg-white border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)]"
        errorMessage={errorMessage}
      />
    </ScrollReveal>
  );
}
