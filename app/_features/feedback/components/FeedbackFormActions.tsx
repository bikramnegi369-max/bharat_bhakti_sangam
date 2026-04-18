"use client";

import { Button } from "@/_components/ui/Button";
import { FEEDBACK_FORM_CONTENT } from "@/_lib/constants/feedback.constants";
import { Loader2 } from "lucide-react";

type Props = {
  isSubmitting: boolean;
};

export function FeedbackFormActions({ isSubmitting }: Props) {
  return (
    <div className="pt-2">
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] py-3 flex justify-center items-center gap-4"
      >
        {isSubmitting && (
          <Loader2 className="w-4 h-4 lg:w-8 lg:h-8 animate-spin" />
        )}
        <span className="text-sm sm:text-base font-semibold tracking-widest uppercase">
          {isSubmitting ? "Submitting..." : FEEDBACK_FORM_CONTENT.submitButton}
        </span>
      </Button>
    </div>
  );
}
