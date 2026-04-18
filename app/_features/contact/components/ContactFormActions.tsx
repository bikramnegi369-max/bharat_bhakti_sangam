"use client";

import { Button } from "@/_components/ui/Button";
import { CONTACT_CONTENT } from "@/_lib/constants/contact.constants";
import { Loader2 } from "lucide-react";

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
        className="w-full h-[clamp(2.5rem,calc(2.232rem+1.339vw),3.438rem)] py-3 flex gap-4 justify-center items-center"
      >
        {isSubmitting && (
          <Loader2 className="w-4 h-4 lg:w-8 lg:h-8 animate-spin" />
        )}
        <span className="text-sm sm:text-base font-semibold tracking-widest uppercase">
          {isSubmitting
            ? "Submitting..."
            : CONTACT_CONTENT.form.submitButtonText}
        </span>
      </Button>
    </div>
  );
}
