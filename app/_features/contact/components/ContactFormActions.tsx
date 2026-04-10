"use client";

import { Button } from "@/_components/ui/Button";
import { CONTACT_CONTENT } from "@/_lib/constants/contact.constants";

type ContactFormActionsProps = {
  isSubmitting: boolean;
};

export function ContactFormActions({ isSubmitting }: ContactFormActionsProps) {
  return (
    <div className="pt-2">
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] py-3"
      >
        <span className="text-sm sm:text-base font-semibold tracking-widest uppercase">
          {isSubmitting
            ? "Submitting..."
            : CONTACT_CONTENT.form.submitButtonText}
        </span>
      </Button>
    </div>
  );
}
