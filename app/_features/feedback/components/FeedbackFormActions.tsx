"use client";

import { FEEDBACK_FORM_CONTENT } from "@/_lib/constants/feedback.constants";
import { poppins } from "@/_lib/fonts";
import { Loader2, Send } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import clsx from "clsx";

type Props = {
  isSubmitting: boolean;
};

export function FeedbackFormActions({ isSubmitting }: Props) {
  return (
    <ScrollReveal animation="scale-up" duration={650} delay={180}>
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            poppins.className,
            "w-full h-11 sm:h-12 px-6 rounded-xl sm:rounded-2xl bg-[#68110D] hover:bg-[#520c09] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer",
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Submitting Feedback...</span>
            </>
          ) : (
            <>
              <Send size={15} strokeWidth={2.2} />
              <span>{FEEDBACK_FORM_CONTENT.submitButton}</span>
            </>
          )}
        </button>
      </div>
    </ScrollReveal>
  );
}
